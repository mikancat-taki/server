import express from 'express';
import os from 'os';

const router = express.Router();

router.get('/ip', (req, res) => {
  const nets = os.networkInterfaces();
  const results = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push({ iface: name, address: net.address });
      }
    }
  }
  res.json(results);
});

export default router;
