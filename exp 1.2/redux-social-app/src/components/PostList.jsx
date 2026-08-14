import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  updatePost,
} from "../features/posts/postsSlice";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const platforms = useSelector((state) => state.platforms);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEditing = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const saveEdit = (post) => {
    dispatch(
      updatePost({
        ...post,
        title: editTitle,
        content: editContent,
      })
    );

    setEditingId(null);
  };

  return (
    <div>
      <h2>Posts</h2>

      {posts.ids.map((id) => {
        const post = posts.entities[id];
        const platform = platforms.entities[post.platformId];

        return (
          <div className="post" key={post.id}>

            {editingId === post.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <button onClick={() => saveEdit(post)}>
                  Save
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>

                <p>{post.content}</p>

                <p>
                  Platform: <strong>{platform?.name}</strong>
                </p>

                <button onClick={() => startEditing(post)}>
                  Edit
                </button>

                <button
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  Delete
                </button>
              </>
            )}

          </div>
        );
      })}
    </div>
  );
}

export default PostList;