import { createSlice, nanoid } from '@reduxjs/toolkit';
import { initialPosts } from '../../data/initialPosts';

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ title, platform, date, time, status, notes }) {
        return {
          payload: {
            id: nanoid(),
            title,
            platform,
            date,
            time,
            status,
            notes: notes ?? '',
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, changes } = action.payload;
      const post = state.find((p) => p.id === id);
      if (post) Object.assign(post, changes);
    },
    /** Dedicated action for drag-and-drop rescheduling (mapping an event to a new time slot). */
    postRescheduled(state, action) {
      const { id, date } = action.payload;
      const post = state.find((p) => p.id === id);
      if (post) post.date = date;
    },
    postDeleted(state, action) {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

export const { postAdded, postUpdated, postRescheduled, postDeleted } = postsSlice.actions;
export default postsSlice.reducer;

/* ------------------------------ selectors -------------------------------- */

export const selectAllPosts = (state) => state.posts;

export const selectPostsByDate = (state, iso) =>
  state.posts.filter((p) => p.date === iso).sort((a, b) => a.time.localeCompare(b.time));

export const selectPostById = (state, id) => state.posts.find((p) => p.id === id);
