const express = require('express');
const router = express.Router();

// simple demo endpoints

// GET /api/ping
router.get('/ping', (req, res) => {
  res.json({ pong: true, time: Date.now() });
});

// GET /api/items
router.get('/items', (req, res) => {
  // demo: static items
  res.json([
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' }
  ]);
});

// POST /api/echo
router.post('/echo', (req, res) => {
  // echoes back payload plus server timestamp
  res.json({ received: req.body, serverTs: Date.now() });
});

module.exports = router;
