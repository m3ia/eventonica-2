import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pgPromise from 'pg-promise';

const app = express();
const PORT = 8080;

// pgPromise
const pgp = pgPromise({});
const db = pgp('postgres://localhost:5432/eventonica');

// Cors middleware
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Hola this server is running on port ${PORT}`));

app.get('/', (req, res) => res.json('Hello index'));

// Get Users
app.get('/users', async function (req, res, next) {

  try {
    const users = await db.any('SELECT * FROM users ORDER BY id', [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Add users listing. */
app.post('/users', async (req, res) => {
  console.log('reqbody: ', req.body)
  const user = {
    name: req.body.name,
    email: req.body.email
  };
  try {
    const createdUser = await db.one(
      'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
      [user.name, user.email]
    );
    console.log('createdUser: ', createdUser);
    res.send(createdUser);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Delete users listing. */

//Parameterized queries use placeholders instead of directly writing the
//values into the statements. Parameterized queries increase security and performance.

app.delete('/users/:id', async (req, res) => {
  // : acts as a placeholder
  const userId = req.params.id;
  try {
    await db.none('DELETE FROM users WHERE id=$1', [userId]);
    const users = await db.any('SELECT * FROM users ORDER BY id', [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// Edit Users
app.patch('/users/:id', async (req, res) => {
  const user = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
  };
  try {
    const createdUser = await db.one(
      `UPDATE users SET name = $1, email = $2 WHERE id=$3 RETURNING *`,
      [user.name, user.email, user.id]
    );
    console.log('createdUser: ', createdUser);
    const users = await db.any('SELECT * FROM users ORDER BY id', [true]);
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// Get Events
app.get('/events', async function (req, res, next) {

  try {
    const events = await db.any('SELECT * FROM events ORDER BY event_id', [true]);
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Add events listing. */
app.post('/events', async (req, res) => {
  const event = {
    name: req.body.name,
    date: req.body.date,
    userPosted: req.body.userPosted
  };
  try {
    const createdEvent = await db.one(
      'INSERT INTO events (name, event_date, user_posted) VALUES($1, $2, $3) RETURNING *',
      [event.name, event.date, event.userPosted]
    );
    console.log('createdEvent: ', createdEvent);
    res.send(createdEvent);
  } catch (e) {
    return res.status(400).json({ e });
  }
});