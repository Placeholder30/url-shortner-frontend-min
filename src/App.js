import { useState } from "react";
import "./App.scss";

function App() {
  const [longUrl, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [clipboardButton, setClipboardButton] = useState(false);
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
        setClipboardButton(true);
      } else {
        setErrorMessage(
          "there was a problem processing your request, please try again"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCopyToClipboard = () => {
    console.log(longUrl);
    navigator.clipboard.writeText(longUrl).then(() => {
      alert("succesfully copied to clipboard");
      setClipboardButton(false);
      setUrl("");
    });
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
      {clipboardButton ? (
        <button onClick={handleCopyToClipboard}>Copy Url</button>
      ) : (
        <button onClick={handleSubmit}>Trim</button>
      )}
      <div className="error">{errorMessage}</div>
    </div>
  );
}

export default App;
