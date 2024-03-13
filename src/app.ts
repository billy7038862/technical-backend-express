import express from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const app = express();
app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await pool.query('INSERT INTO todos (id, name) VALUES ($1, $2) RETURNING *', [id, name]);
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE todos SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running at http://localhost:3000');
});