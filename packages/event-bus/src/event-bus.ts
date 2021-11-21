import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/events', (req, res) => {
  res.send('Hi there from events');
});

const server = app.listen(3020, () => {
  console.log('Events Bus start listening on port 3020');
});
