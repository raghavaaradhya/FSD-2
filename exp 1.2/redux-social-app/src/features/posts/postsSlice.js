import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Async API request
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    const data = await response.json();

    return data;
  }
);

// Initial Redux state
const initialState = {
  loading: false,
  error: null,

  entities: {
    1: {
      id: 1,
      title: "Welcome to Redux",
      content: "Learning centralized state management",
      platformId: 1,
    },

    2: {
      id: 2,
      title: "React Project",
      content: "Building a social media dashboard",
      platformId: 2,
    },
  },

  ids: [1, 2],
};

// Posts slice
const postsSlice = createSlice({
  name: "posts",

  initialState,

  // Normal CRUD operations
  reducers: {
    // CREATE
    addPost: (state, action) => {
      const post = action.payload;

      state.entities[post.id] = post;
      state.ids.push(post.id);
    },

    // DELETE
    deletePost: (state, action) => {
      const id = action.payload;

      delete state.entities[id];

      state.ids = state.ids.filter(
        (postId) => postId !== id
      );
    },

    // UPDATE
    updatePost: (state, action) => {
      const post = action.payload;

      state.entities[post.id] = post;
    },
  },

  // Async operations
  extraReducers: (builder) => {
    builder

      // API request started
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API request successful
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;

        action.payload.forEach((post) => {
          state.entities[post.id] = {
            id: post.id,
            title: post.title,
            content: post.body,
            platformId: 1,
          };

          if (!state.ids.includes(post.id)) {
            state.ids.push(post.id);
          }
        });
      })

      // API request failed
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch posts";
      });
  },
});

// Export actions
export const {
  addPost,
  deletePost,
  updatePost,
} = postsSlice.actions;

// Export reducer
export default postsSlice.reducer;