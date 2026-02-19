import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
  res.json({ message: 'Hola, from My template Express' });
});

app.get('/events', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events ORDER BY id,title');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
