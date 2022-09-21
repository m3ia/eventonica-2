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

// Get Mock Users
const mockUsers = [
  { name: "Marlin", email: "marlin@gmail.com", id: "1" },
  { name: "Nemo", email: "nemo@gmail.com", id: "2" },
  { name: "Dory", email: "dory@gmail.com", id: "3" }
]

// app.get('/users', function (req, res, next) {
//   res.json({ users: mockUsers });
// });

app.get('/users', async function (req, res, next) {

  try {
    const users = await db.any('SELECT * FROM users', [true]);
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

app.delete('/:id', async (req, res) => {
  // : acts as a placeholder
  const userId = req.params.id;
  try {
    await db.none('DELETE FROM users WHERE id=$1', [userId]);
    res.send({ status: 'success' });
  } catch (e) {
    return res.status(400).json({ e });
  }
});