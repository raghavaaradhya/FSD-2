import './App.css';
import { useState } from 'react';

const limits = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};

function App() {
  const [platforms, setPlatforms] = useState([]);
  const [post, setPost] = useState("");
  const [media, setMedia] = useState(null);

  const togglePlatform = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const smallestLimit =
    platforms.length > 0
      ? Math.min(...platforms.map((p) => limits[p]))
      : 0;

  const remaining = smallestLimit - post.length;

  return (
    <div className="container">
      <h1>Dynamic Post Composer</h1>

      <h3>Select Platforms</h3>

      {Object.keys(limits).map((platform) => (
        <label key={platform}>
          <input
            type="checkbox"
            onChange={() => togglePlatform(platform)}
          />
          {platform}
        </label>
      ))}

      <textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setMedia(e.target.files[0])}
      />

      {platforms.length > 0 && (
        <>
          <p>
            Characters: {post.length}/{smallestLimit}
          </p>

          {remaining >= 0 ? (
            <p className="green">
              Remaining: {remaining}
            </p>
          ) : (
            <p className="red">
              Exceeded by {-remaining}
            </p>
          )}
        </>
      )}

      {media && (
        <p>Selected Media: {media.name}</p>
      )}

      <button
        disabled={
          platforms.length === 0 ||
          remaining < 0 ||
          post.length === 0
        }
      >
        Publish
      </button>
    </div>
  );
}

export default App;