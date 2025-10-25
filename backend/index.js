import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import membersRouter from './routes/members.js';

const app = express();

app.use(cors());
app.use(express.json());

// APIルート
app.use('/api/tasks', tasksRouter);
app.use('/api/members', membersRouter);

// 起動確認
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
