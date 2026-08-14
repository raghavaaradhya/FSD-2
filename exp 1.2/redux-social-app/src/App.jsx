import "./App.css";
import Dashboard from "./components/Dashboard";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PlatformForm from "./components/PlatformForm";
import PlatformList from "./components/PlatformList";

function App() {
  return (
    <div className="container">
      <Dashboard />

      <PostForm />

      <PostList />

      <PlatformForm />

      <PlatformList />
    </div>
  );
}

export default App;