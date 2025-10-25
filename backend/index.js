import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import membersRouter from './routes/members.js';
import networkRouter from './routes/network.js';
import terminalRouter from './routes/terminal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// API
app.use('/api/tasks', tasksRouter);
app.use('/api/members', membersRouter);
app.use('/api/network', networkRouter);
app.use('/api/terminal', terminalRouter);

// SPA対応
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
