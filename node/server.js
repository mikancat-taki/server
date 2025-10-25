import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 静的ファイル（フロントエンドビルド済み）
app.use(express.static(path.join(__dirname, "public")));

// APIエンドポイント
app.get("/api/hello", (req, res) => {
  res.json({ message: "こんにちは！サーバーは正常に動作しています 🚀" });
});

// フロントエンドルート（SPA対応）
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
