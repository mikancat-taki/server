import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// タスク一覧取得
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { due: 'asc' } });
  res.json(tasks);
});

// タスク追加
router.post('/', async (req, res) => {
  const { name, due } = req.body;
  const task = await prisma.task.create({
    data: { name, due: new Date(due), status: '未着手' }
  });
  res.json(task);
});

// タスク更新
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, due, status } = req.body;
  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { name, due: new Date(due), status }
  });
  res.json(task);
});

// タスク削除
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'deleted' });
});

export default router;
