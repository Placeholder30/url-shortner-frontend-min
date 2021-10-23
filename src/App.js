import { useState, useEffect } from "react";
import "./App.scss";
import loadingIndicator from "./ellipsis.svg";

const BACKEND_URL = process.env.REACT_APP_BACKEND;
function App() {
  const [longUrl, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [clipboardButton, setClipboardButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl: longUrl.trim() }),
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}`, postData);
      if (response.status === 200) {
        const url = await response.json();
        setUrl(`${BACKEND_URL}/${url.message}`);
        setIsLoading(false);
        setClipboardButton(true);
      } else {
        setErrorMessage(
          "there was a problem processing your request, please try again"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    // heroko tends to sleep so this just pings the server on component mount before the user is ready to paste a link
    fetch(`${BACKEND_URL}`)
      .then()
      .catch((e) => console.log(e));
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(longUrl).then(() => {
      alert("succesfully copied to clipboard");
      setClipboardButton(false);
      setUrl("");
    });
  };
  return (
    <div className="App">
      <h1>Trimmer</h1>
      <p>Take your long URL and make it brief</p>
      {isLoading ? (
        <div className="loader">
          <img src={loadingIndicator} alt="" />
        </div>
      ) : null}
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
