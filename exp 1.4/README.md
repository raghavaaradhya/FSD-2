# Experiment 1.4 — Interactive Calendar for Scheduling Posts

A React + Redux Toolkit implementation of the experiment manual
"Experiment 1.4": an interactive calendar interface for scheduling and
managing posts, with month/week views, temporal data mapping, click-to-
edit, and native drag-and-drop rescheduling.

## Aim

To design and implement an interactive calendar interface for
scheduling and managing posts.

## What's implemented

| Manual step | Where |
|---|---|
| Design calendar UI layout (day/week/month) | `src/components/MonthView.jsx`, `WeekView.jsx` — toggle in the header |
| Map post data to calendar events | `postsSlice.js` (`selectPostsByDate`), consumed by `DayCell.jsx` |
| Render events dynamically | `DayCell.jsx` renders each date's posts as `PostChip.jsx` |
| Click interactions (view/edit) | Clicking a chip opens `PostModal.jsx` pre-filled for editing; clicking empty cell space opens it pre-filled for creating a new post on that date |
| Drag-and-drop scheduling | `PostChip.jsx` (`draggable`, `onDragStart`) + `DayCell.jsx` (`onDragOver`/`onDrop`) → dispatches `postRescheduled` |
| Sync calendar with application state | Global Redux store (`src/app/store.js`), `postsSlice` + `uiSlice`, per the prerequisite on Redux-based state management |

Extra touches beyond the minimum brief:

- **Month grid** with a full 6-week layout including trailing/leading
  days from adjacent months, and a **Week agenda view**, toggled from
  the header — covers the "day/week/month view" design consideration.
- **Platform filter legend** — toggle Instagram / X / LinkedIn / Blog /
  Newsletter on and off; the grid re-filters live.
- **Status styling** — draft (dashed edge), scheduled, published
  (dimmed) are visually distinct on each chip.
- **Overflow handling** — month cells cap visible posts and show a
  "+N more" indicator, a standard technique for rendering dense
  time-based data without overwhelming the grid.
- Redux Toolkit `createSlice` + selectors throughout, matching the
  "preferably Redux" prerequisite.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Using it

- **Click any empty day cell** to create a new post scheduled for that date.
- **Click an existing post chip** to edit its title, platform, date,
  time, status, or notes — or delete it.
- **Drag a post chip onto a different day** to reschedule it instantly.
- Use the **Month / Week** toggle to switch views, and the **platform
  legend** to filter what's shown.
- **Today** jumps the visible range back to the current date.

The app ships with nine seed posts generated relative to today's date
(`src/data/initialPosts.js`), so the calendar always looks populated
regardless of when it's opened.

## Project structure

```
src/
  app/store.js                Redux store (posts + ui reducers)
  features/
    posts/postsSlice.js        Post CRUD + reschedule reducers, selectors
    ui/uiSlice.js               View, navigation cursor, filters, modal state
  utils/dateUtils.js            Month-grid / week-strip generation, ISO date helpers
  data/
    platforms.js                 Platform + status metadata (color coding)
    initialPosts.js              Seed data
  components/
    CalendarHeader.jsx           Navigation, view toggle, platform filters, "New post"
    MonthView.jsx / WeekView.jsx View-specific grids, built from the same DayCell
    DayCell.jsx                   Drop target; renders a date's posts; click-to-create
    PostChip.jsx                  Draggable, clickable event chip
    PostModal.jsx                 Create / edit / delete form
  App.jsx
  main.jsx
  index.css
```

## Notes on the design

- No calendar library (e.g. FullCalendar) is used — the month/week grid
  is built directly from native `Date` objects in `dateUtils.js`, so the
  "temporal data modeling" and "event mapping" logic from the theory
  section is fully visible and easy to trace, rather than hidden inside
  a third-party component.
- Drag-and-drop uses the browser's native HTML5 Drag and Drop API
  (`draggable`, `onDragStart`, `onDragOver`, `onDrop`) — no extra
  dependency required.
- State lives entirely in Redux (no component owns post data locally),
  so any component can read the same source of truth — this is the
  "sync calendar with application state" step from the procedure.

## Expected outcome

- Functional calendar interface ✅
- Posts mapped to time slots ✅
- Interactive scheduling system (click + drag-and-drop) ✅
- Improved UX for content planning (filters, status styling, week view) ✅
