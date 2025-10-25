import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// タスク一覧取得
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ include: { member: true } });
  res.json(tasks);
});

// タスク追加
router.post('/', async (req, res) => {
  const { title, time, memberId } = req.body;
  const task = await prisma.task.create({ data: { title, time: new Date(time), memberId } });
  res.json(task);
});

// タスク削除
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Task deleted' });
});

export default router;
