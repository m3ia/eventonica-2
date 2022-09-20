import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Cors middleware
app.use(cors());
app.listen(PORT, () => console.log(`Hola this server is running on port ${PORT}`));

app.get('/', (req, res) => res.json('Hello index'));

// Get Mock Users
const mockUsers = [
  { name: "Marlin", email: "marlin@gmail.com", id: "1" },
  { name: "Nemo", email: "nemo@gmail.com", id: "2" },
  { name: "Dory", email: "dory@gmail.com", id: "3" }
]

app.get('/users', function (req, res, next) {
  res.json({ users: mockUsers });
});

