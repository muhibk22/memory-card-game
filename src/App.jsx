import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [player, setPlayer] = useState({
    score: 0,
    best: 0,
    visited: [],
  });

  const [gifs, setGifs] = useState([]);
  const API_KEY = import.meta.env.VITE_GIPHY_KEY;

  const fetchGifs = async (query = "Elden Ring") => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10`
      );
      const data = await res.json();
      setGifs(data.data.map((gif) => gif.images.downsized_medium.url));
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  const increaseScore = () => {
    setPlayer((prev) => ({
      ...prev,
      score: prev.score + 1,
    }));
  };

  const resetGame = () => {
    setPlayer((prev) => ({
      ...prev,
      score: 0,
      visited: [],
    }));
  };

  return (
    <div>
      <p>Score: {player.score}</p>
      <p>Best: {player.best}</p>
      <button onClick={increaseScore}>Increase</button>
      <button onClick={resetGame}>Reset</button>

      <hr />
      <h3>Random GIF</h3>
      {gifs ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {gifs.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="gif"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          ))}
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default App;
