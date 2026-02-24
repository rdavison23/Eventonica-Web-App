import { useEffect, useReducer, useState } from 'react';

const API_URL = 'http://localhost:3000/events';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [is_favorite, setIsFavorite] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //load events
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  const resetForm = () => {
    setTitle('');
    setDate('');
    setDescription('');
    setIsFavorite(false);
    setEditingId(null);
  };

  //create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const update_load = { title, date, description, is_favorite };

    try {
      let response;

      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update_load),
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update_load),
        });
      }

      await response.json();

      const updated = await fetch(API_URL).then((res) => res.json());
      setEvents(updated);

      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setEvents(events.filter((ev) => ev.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Load event into Form from editing
  const startEdit = (ev) => {
    setTitle(ev.title);
    setDate(ev.date);
    setDescription(ev.description);
    setIsFavorite(ev.is_favorite);
    setEditingId(ev.id);
  };

  return (
    <div>
      <h1>Events</h1>

      <form onSubmit={handleSubmit}>
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
      </form>

      <ul>
        {events.map((ev) => (
          <li key={ev.id}>
            <strong>{ev.title}</strong> — {ev.date}
            <button onClick={() => startEdit(ev)}>Edit</button>
            <button onClick={() => handleDelete(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
