import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

// 危険コマンド制限
const ALLOWED_COMMANDS = ['ls','pwd','whoami','date','uptime'];

router.post('/', (req, res) => {
  const { command } = req.body;
  if(!command) return res.status(400).json({ error: 'command required' });
  
  // 危険コマンドチェック
  const cmd = command.split(' ')[0];
  if(!ALLOWED_COMMANDS.includes(cmd)) return res.status(403).json({ error: 'command not allowed' });

  exec(command, (err, stdout, stderr) => {
    if(err) return res.json({ error: stderr || err.message });
    res.json({ output: stdout });
  });
});

export default router;
