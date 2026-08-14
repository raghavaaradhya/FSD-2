import { useDispatch } from 'react-redux';
import { editModalOpened } from '../features/ui/uiSlice';
import { getPlatform } from '../data/platforms';
import { formatTime } from '../utils/dateUtils';

/**
 * A single scheduled post rendered on the calendar. Draggable (native
 * HTML5 DnD) so it can be dropped onto a different day cell to
 * reschedule it — the "drag-and-drop scheduling" interaction from the
 * experiment brief.
 */
export default function PostChip({ post, compact }) {
  const dispatch = useDispatch();
  const platform = getPlatform(post.platform);

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', post.id);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleClick(e) {
    e.stopPropagation(); // don't trigger the day cell's "create" handler
    dispatch(editModalOpened(post.id));
  }

  return (
    <button
      type="button"
      className={`post-chip status-${post.status} ${compact ? 'compact' : ''}`}
      style={{ '--chip-color': platform.color }}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      title={`${post.title} — ${platform.label} — ${formatTime(post.time)}`}
    >
      <span className="chip-dot" aria-hidden="true" />
      {!compact && <span className="chip-time">{formatTime(post.time)}</span>}
      <span className="chip-title">{post.title}</span>
    </button>
  );
}
