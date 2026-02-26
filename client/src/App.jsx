import { useEffect, useReducer, useState } from 'react';

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

  //ui only states for New Event row
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsFavorite, setNewIsFavorite] = useState(false);

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
        const newEventData = {
          title: newTitle,
          date: newDate,
          description: newDescription,
          is_favorite: newIsFavorite,
        };
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEventData),
        });

        const newEvent = await response.json();
        dispatch({ type: 'added', event: newEvent });

        //Clear ui only form
        setNewTitle('');
        setNewDate('');
        setNewDescription('');
        setNewIsFavorite(false);
      }
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

      {/* NEW EVENT ROW */}
      <div>
        <input
          placeholder="New title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          type="datetime-local"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <textarea
          placeholder=" New Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <label>
          Favorite:
          <input
            type="checkbox"
            checked={newIsFavorite}
            onChange={(e) => setNewIsFavorite(e.target.checked)}
          />
        </label>

        <button onClick={() => handleSubmit({})}>Add Event</button>
      </div>

      <ul>
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
            />

            <input
              type="datetime-local"
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

            <textarea
              value={ev.description || ''}
              onChange={(e) =>
                dispatch({
                  type: 'fieldChanged',
                  id: ev.id,
                  field: 'description',
                  value: e.target.value,
                })
              }
            />

            <label>
              Favorite:
              <input
                type="checkbox"
                checked={newIsFavorite}
                onChange={(e) => setNewIsFavorite(e.target.checked)}
              />
            </label>

            <button onClick={() => handleSubmit(ev)}>Save</button>
            <button onClick={() => handleDelete(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
