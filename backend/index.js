import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

// __dirname を ESM で取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(cors());

// 静的ファイル配信（フロントエンド）
app.use(express.static(path.join(__dirname, '../frontend')));

// API 例: タスク取得
app.get('/api/tasks', (req, res) => {
  const tasks = [
    { name: "デザイン作成", due: "2025-10-30", status: "進行中" },
    { name: "コードレビュー", due: "2025-10-28", status: "未着手" },
    { name: "テスト実施", due: "2025-11-02", status: "完了" }
  ];
  res.json(tasks);
});

// その他のルートはフロントにリダイレクト
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
