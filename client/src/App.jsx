import { useEffect, useReducer } from 'react';

const API_URL = 'http://localhost:3000/events';

function eventsReducer(events, action) {
  switch (action.type) {
    case 'loaded': {
      return action.events;
    }
    case 'added': {
      return [...events, action.event];
    }

    case 'fieldChanged': {
      return events.map((ev) =>
        ev.id === action.id ? { ...ev, [action.field]: action.value } : ev
      );
    }

    case 'deleted': {
      return events.filter((ev) => ev.id !== action.id);
    }
    case 'updated': {
      return events.map((ev) =>
        ev.id === action.event.id ? action.event : ev
      );
    }
    default:
      return events;
  }
}

function App() {
  //const [events, setEvents] = useState([]);
  const [eventsWithReducer, dispatch] = useReducer(eventsReducer, []);
  // const [title, setTitle] = useState('');
  // const [date, setDate] = useState('');
  // const [description, setDescription] = useState('');
  // const [is_favorite, setIsFavorite] = useState(false);
  // const [editingId, setEditingId] = useState(null);

  //load events
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'loaded', events: data }))
      .catch((err) => console.error(err));
  }, []);

  // const resetForm = () => {
  //   setTitle('');
  //   setDate('');
  //   setDescription('');
  //   setIsFavorite(false);
  //   setEditingId(null);
  // };

  //create or update
  const handleSubmit = async (ev) => {
    //e.preventDefault();
    //const update_load = { title, date, description, is_favorite };

    try {
      if (ev.id) {
        //update
        const response = await fetch(`${API_URL}/${ev.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ev),
        });
        const updatedEvent = await response.json();
        dispatch({ type: 'updated', event: updatedEvent });
      } else {
        //create
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ev),
        });

        const newEvent = await response.json();
        dispatch({ type: 'added', event: newEvent });
      }
      // resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      dispatch({ type: 'deleted', id });
    } catch (err) {
      console.error(err);
    }
  };

  // Load event into Form from editing
  // const startEdit = (ev) => {
  //   setTitle(ev.title);
  //   setDate(ev.date);
  //   setDescription(ev.description);
  //   setIsFavorite(ev.is_favorite);
  //   setEditingId(ev.id);
  // };

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {' '}
        {/*  CHANGE #3 — Use eventsWithReducer */}
        {eventsWithReducer.map((ev) => (
          <li key={ev.id}>
            <input
              value={ev.title}
              onChange={(e) =>
                dispatch({
                  type: 'fieldChanged',
                  id: ev.id,
                  field: 'title',
                  value: e.target.value,
                })
              }
            />{' '}
            <input
              type="date"
              value={ev.date}
              onChange={(e) =>
                dispatch({
                  type: 'fieldChanged',
                  id: ev.id,
                  field: 'date',
                  value: e.target.value,
                })
              }
            />
            <button onClick={() => handleSubmit(ev)}>Save</button>
            <button onClick={() => handleDelete(ev.id)}>Delete</button>
          </li>
        ))}{' '}
      </ul>{' '}
    </div>
  );
}

{
  /* <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          Favorite:
          <input
            type="checkbox"
            checked={is_favorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
        </label>
        <button type="submit">
          {editingId ? 'Update Event' : 'Add Event'}
        </button>
      </form> */
}

{
  /* <ul>
        {eventsWithReducer.map((ev) => (
          <li key={ev.id}>
            <input
              value={ev.title}
              onChange={(e) => dispatch({ type: 'fieldChanged', id: ev.id, field: 'title', value: e.target.value }) }
            />
            — {ev.date} */
}

export default App;
