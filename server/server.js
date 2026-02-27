import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// get all events
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY id, title');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get one event
app.get('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'event not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// create event
app.post('/events', async (req, res) => {
  const { title, date, description, is_favorite } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'title and date required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, description, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, date, description || null, is_favorite || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// UPDATE event
app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, description, is_favorite } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE events 
         SET title = $1, date = $2, description = $3, is_favorite = $4
         WHERE id = $5 
         RETURNING *`,
      [title, date, description || null, is_favorite ?? false, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// DELETE event
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM events WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted', deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
