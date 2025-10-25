import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// メンバー一覧取得
router.get('/', async (req, res) => {
  const members = await prisma.member.findMany();
  res.json(members);
});

// メンバー追加
router.post('/', async (req, res) => {
  const { name, role } = req.body;
  const member = await prisma.member.create({ data: { name, role } });
  res.json(member);
});

// メンバー更新
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const member = await prisma.member.update({
    where: { id: parseInt(id) },
    data: { name, role }
  });
  res.json(member);
});

// メンバー削除
router.delete('/:id', async (req, res) => {
  await prisma.member.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'deleted' });
});

export default router;
