import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Chọn file trước");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch(
        "https://kiemtra-cheban.vercel.app/api/compare",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      alert("Lỗi gọi API");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>So sánh file</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Đang xử lý..." : "Gửi"}
      </button>

      <pre style={{ marginTop: 20 }}>
        {result}
      </pre>
    </div>
  );
}

export default App;
