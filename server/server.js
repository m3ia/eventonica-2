import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Cors middleware
app.use(cors());
app.listen(PORT, () => console.log(`Hola this server is running on port ${PORT}`));

app.get('/', (req, res) => res.json('Hello index'));