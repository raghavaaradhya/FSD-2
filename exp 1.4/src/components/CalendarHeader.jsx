import { useDispatch, useSelector } from 'react-redux';
import {
  viewChanged,
  cursorSet,
  platformToggled,
  allPlatformsShown,
  createModalOpened,
  selectView,
  selectCursorDate,
  selectActivePlatforms,
} from '../features/ui/uiSlice';
import { PLATFORMS } from '../data/platforms';
import {
  fromISODate,
  toISODate,
  addMonths,
  addDays,
  formatMonthYear,
  getWeekDays,
  MONTH_LABELS,
} from '../utils/dateUtils';

export default function CalendarHeader() {
  const dispatch = useDispatch();
  const view = useSelector(selectView);
  const cursorIso = useSelector(selectCursorDate);
  const activePlatforms = useSelector(selectActivePlatforms);
  const cursorDate = fromISODate(cursorIso);

  function step(direction) {
    const next =
      view === 'month' ? addMonths(cursorDate, direction) : addDays(cursorDate, direction * 7);
    dispatch(cursorSet(toISODate(next)));
  }

  function goToday() {
    dispatch(cursorSet(toISODate(new Date())));
  }

  const label =
    view === 'month'
      ? formatMonthYear(cursorDate)
      : (() => {
          const [start, end] = [getWeekDays(cursorDate)[0], getWeekDays(cursorDate)[6]];
          const sameMonth = start.getMonth() === end.getMonth();
          return sameMonth
            ? `${MONTH_LABELS[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`
            : `${MONTH_LABELS[start.getMonth()]} ${start.getDate()} – ${MONTH_LABELS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
        })();

  const allActive = activePlatforms.length === PLATFORMS.length;

  return (
    <header className="cal-header">
      <div className="cal-header-top">
        <div className="cal-brand">
          <div className="cal-brand-eyebrow">EXPERIMENT 1.4</div>
          <h1 className="cal-brand-title">Post Scheduler</h1>
        </div>
        <button className="btn-primary" onClick={() => dispatch(createModalOpened(cursorIso))}>
          + New post
        </button>
      </div>

      <div className="cal-header-controls">
        <div className="cal-nav">
          <button className="btn-icon" onClick={() => step(-1)} aria-label="Previous">‹</button>
          <button className="btn-text" onClick={goToday}>Today</button>
          <button className="btn-icon" onClick={() => step(1)} aria-label="Next">›</button>
          <span className="cal-nav-label">{label}</span>
        </div>

        <div className="cal-view-toggle" role="tablist" aria-label="Calendar view">
          {['month', 'week'].map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              className={`view-tab ${view === v ? 'view-tab--active' : ''}`}
              onClick={() => dispatch(viewChanged(v))}
            >
              {v === 'month' ? 'Month' : 'Week'}
            </button>
          ))}
        </div>
      </div>

      <div className="cal-legend">
        <button
          className={`legend-chip legend-chip--all ${allActive ? 'legend-chip--active' : ''}`}
          onClick={() => dispatch(allPlatformsShown())}
        >
          All
        </button>
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            className={`legend-chip ${activePlatforms.includes(p.id) ? 'legend-chip--active' : ''}`}
            style={{ '--chip-color': p.color }}
            onClick={() => dispatch(platformToggled(p.id))}
          >
            <span className="legend-dot" />
            {p.label}
          </button>
        ))}
      </div>
    </header>
  );
}
