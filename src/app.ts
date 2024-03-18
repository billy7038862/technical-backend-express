import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER || 'general_user',
  host: process.env.PGHOST || '127.0.0.1',
  database: process.env.PGDATABASE || 'test',
  password: process.env.PGPASSWORD || 'password',
  port: +!process.env.PGPORT || 5400,
});

// Function to setup database schema
const setupDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      key SERIAL PRIMARY KEY,
      id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    );
  `);
};

const app = express();
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());

app.get('/duties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/duties', async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await pool.query('INSERT INTO todos (id, name) VALUES ($1, $2) RETURNING *', [id, name]);
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.put('/duties/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { id, name } = req.body;
    const result = await pool.query('UPDATE todos SET name = $1, id = $2 WHERE key = $3 RETURNING *', [name, id, key]);
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
app.delete('/duties/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await pool.query('DELETE FROM todos WHERE key = $1 RETURNING *', [key]);
    if (result.rows.length > 0) {
      res.send(`Deleted duty with key: ${key}`);
    } else {
      res.status(404).send(`Duty with key: ${key} not found`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
const startServer = async () => {
  try {
    // First, setup the database
    await setupDatabase();
    // Then, start the server
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
};

startServer();