// expressライブラリを読み込む
const express = require('express');
// expressアプリを初期化する
const app = express();
// Renderが指定するポート番号、もしくはローカル開発用に3000番ポートを設定
const PORT = process.env.PORT || 3000;

// ルートURL ('/') にGETリクエストがあった場合の処理
app.get('/', (req, res) => {
  res.send('Hello World! This is my server on Render.');
});

// 指定したポートでサーバーを起動する
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
