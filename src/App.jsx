import { useState } from "react";

function App() {
  const [goc, setGoc] = useState(null);
  const [cheban, setCheban] = useState(null);
  const [result, setResult] = useState("");

  const submit = async () => {
    if (!goc || !cheban) {
      alert("Vui lòng chọn đủ 2 ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("goc", goc);
    formData.append("cheban", cheban);

    try {
      const res = await fetch(
        "https://kiemtracheban-fastapibackend.vercel.app/api/compare",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      alert("Lỗi gọi API");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>So sánh ảnh chế bản</h2>

      <label>Ảnh gốc:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setGoc(e.target.files[0])}
      />

      <br /><br />

      <label>Ảnh chế bản:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCheban(e.target.files[0])}
      />

      <br /><br />

      <button onClick={submit}>Gửi</button>

      <pre>{result}</pre>
    </div>
  );
}

export default App;
