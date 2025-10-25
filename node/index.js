const express = require('express');
const path = require('path');
const api = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', api);

// static frontend
app.use('/', express.static(path.join(__dirname, 'public')));

// simple health
app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

app.listen(PORT, () => {
  console.log(`[Node] Server listening on http://0.0.0.0:${PORT}`);
});
