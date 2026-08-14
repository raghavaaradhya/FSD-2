import { createSlice } from '@reduxjs/toolkit';
import { toISODate } from '../../utils/dateUtils';
import { PLATFORMS } from '../../data/platforms';

const initialState = {
  view: 'month', // 'month' | 'week'
  cursorDate: toISODate(new Date()), // anchor date for the visible month/week
  activePlatforms: PLATFORMS.map((p) => p.id), // all enabled by default
  modal: {
    open: false,
    mode: 'create', // 'create' | 'edit'
    postId: null,
    prefillDate: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    viewChanged(state, action) {
      state.view = action.payload;
    },
    cursorSet(state, action) {
      state.cursorDate = action.payload;
    },
    platformToggled(state, action) {
      const id = action.payload;
      state.activePlatforms = state.activePlatforms.includes(id)
        ? state.activePlatforms.filter((p) => p !== id)
        : [...state.activePlatforms, id];
    },
    allPlatformsShown(state) {
      state.activePlatforms = PLATFORMS.map((p) => p.id);
    },
    createModalOpened(state, action) {
      state.modal = { open: true, mode: 'create', postId: null, prefillDate: action.payload };
    },
    editModalOpened(state, action) {
      state.modal = { open: true, mode: 'edit', postId: action.payload, prefillDate: null };
    },
    modalClosed(state) {
      state.modal = { open: false, mode: 'create', postId: null, prefillDate: null };
    },
  },
});

export const {
  viewChanged,
  cursorSet,
  platformToggled,
  allPlatformsShown,
  createModalOpened,
  editModalOpened,
  modalClosed,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectView = (state) => state.ui.view;
export const selectCursorDate = (state) => state.ui.cursorDate;
export const selectActivePlatforms = (state) => state.ui.activePlatforms;
export const selectModal = (state) => state.ui.modal;
