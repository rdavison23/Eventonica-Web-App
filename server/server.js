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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
