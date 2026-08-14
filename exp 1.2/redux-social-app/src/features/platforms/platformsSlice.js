import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {
    1: {
      id: 1,
      name: "Instagram",
    },

    2: {
      id: 2,
      name: "LinkedIn",
    },

    3: {
      id: 3,
      name: "Twitter",
    },
  },

  ids: [1, 2, 3],
};

const platformsSlice = createSlice({
  name: "platforms",

  initialState,

  reducers: {
    addPlatform: (state, action) => {
      const platform = action.payload;

      state.entities[platform.id] = platform;
      state.ids.push(platform.id);
    },

    deletePlatform: (state, action) => {
      const id = action.payload;

      delete state.entities[id];

      state.ids = state.ids.filter(
        (platformId) => platformId !== id
      );
    },
  },
});

export const {
  addPlatform,
  deletePlatform,
} = platformsSlice.actions;

export default platformsSlice.reducer;