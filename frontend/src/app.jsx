import React, { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("読み込み中...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg("APIエラー"));
  }, []);

  return (
    <div style={{
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "4rem"
    }}>
      <h1>🚀 フルスタックサーバー稼働中</h1>
      <p>{msg}</p>
    </div>
  );
}
