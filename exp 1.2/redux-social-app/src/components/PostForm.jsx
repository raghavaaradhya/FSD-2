import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function PostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platformId, setPlatformId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      platformId: Number(platformId),
    };

    dispatch(addPost(newPost));

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value)}
        >
          <option value="1">Instagram</option>
          <option value="2">LinkedIn</option>
          <option value="3">Twitter</option>
        </select>

        <button type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;