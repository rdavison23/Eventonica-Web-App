import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/events';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [is_favorite, setIsFavorite] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load events
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
}

export default App;
