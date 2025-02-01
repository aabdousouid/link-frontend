import React, { useState, useEffect } from "react";
import axios from "axios";

//const API_BASE_URL = "http://localhost:5000/api/url"; // Update with your backend URL
const API_BASE_URL = "https://linkk-p590.onrender.com/api/url"
function URLShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setShortUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const shortenUrl = async () => {
    if (!longUrl.trim()) return;
    
    try {
      const response = await axios.post(`${API_BASE_URL}/shortenUrl`, { longUrl });
      setShortUrls([...shortUrls, response.data]);
      setLongUrl(""); // Clear input
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={shortenUrl}>Shorten</button>
      </div>
      <ul className="url-list">
        {shortUrls.map((url, index) => (
          <li key={index}>
            <a href={url.longUrl} target="_blank" rel="noopener noreferrer">
              {url.shortUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default URLShortener;
