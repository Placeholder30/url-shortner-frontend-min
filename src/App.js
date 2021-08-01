import "./App.scss";
import { useState } from "react";
function App() {
  const [longUrl, setUrl] = useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND;
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl: longUrl.trim() }),
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}`, postData);
      if (response.status === 200) {
        const url = await response.json();
        setUrl(`${BACKEND_URL}/${url.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <h1>Trimmer</h1>
      <p>Shorten your URL</p>
      <input
        type="text"
        placeholder="paste your url here"
        value={longUrl}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />

      <button onClick={handleSubmit}>Trim</button>
    </div>
  );
}

export default App;
