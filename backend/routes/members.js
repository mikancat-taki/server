import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// メンバー一覧
router.get('/', async (req, res) => {
  const members = await prisma.member.findMany();
  res.json(members);
});

// メンバー追加
router.post('/', async (req, res) => {
  const { name } = req.body;
  const member = await prisma.member.create({ data: { name } });
  res.json(member);
});

// メンバー削除
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.member.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Member deleted' });
});

export default router;
