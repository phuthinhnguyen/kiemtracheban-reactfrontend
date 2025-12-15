import { useState } from "react";

function App() {
  const [goc, setGoc] = useState("");
  const [cheban, setCheban] = useState("");
  const [result, setResult] = useState("");

  const submit = async () => {
    const formData = new FormData();
    formData.append("goc", goc);
    formData.append("cheban", cheban);

    const res = await fetch(
      "https://kiemtra-cheban.vercel.app/api/compare",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>So sánh chế bản</h2>

      <textarea
        placeholder="Nội dung gốc"
        onChange={(e) => setGoc(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Nội dung chế bản"
        onChange={(e) => setCheban(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>Gửi</button>

      <pre>{result}</pre>
    </div>
  );
}

export default App;
