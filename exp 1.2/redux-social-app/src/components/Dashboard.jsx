import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const platforms = useSelector((state) => state.platforms);

  const handleLoadPosts = () => {
    dispatch(fetchPosts());
  };

  return (
    <div>
      <h1>Social Media Dashboard</h1>

      <p>Redux Toolkit State Management</p>

      <hr />

      <h2>Total Posts: {posts.ids.length}</h2>

      <h2>Total Platforms: {platforms.ids.length}</h2>

      <button onClick={handleLoadPosts}>
        Load Posts from API
      </button>

      {posts.loading && (
        <p>Loading posts...</p>
      )}

      {posts.error && (
        <p>{posts.error}</p>
      )}
    </div>
  );
}

export default Dashboard;