import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRescheduled } from '../features/posts/postsSlice';
import { createModalOpened } from '../features/ui/uiSlice';
import { selectPostsByDate } from '../features/posts/postsSlice';
import { selectActivePlatforms } from '../features/ui/uiSlice';
import PostChip from './PostChip';

const MAX_VISIBLE_MONTH = 3;

export default function DayCell({ day, variant = 'month' }) {
  const dispatch = useDispatch();
  const [isDragOver, setIsDragOver] = useState(false);

  const activePlatforms = useSelector(selectActivePlatforms);
  const postsForDay = useSelector((state) => selectPostsByDate(state, day.iso)).filter((p) =>
    activePlatforms.includes(p.platform)
  );

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const postId = e.dataTransfer.getData('text/plain');
    if (postId) dispatch(postRescheduled({ id: postId, date: day.iso }));
  }

  function handleCellClick() {
    dispatch(createModalOpened(day.iso));
  }

  const isMonth = variant === 'month';
  const visiblePosts = isMonth ? postsForDay.slice(0, MAX_VISIBLE_MONTH) : postsForDay;
  const overflowCount = isMonth ? postsForDay.length - visiblePosts.length : 0;

  return (
    <div
      className={[
        'day-cell',
        `day-cell--${variant}`,
        day.inCurrentMonth === false ? 'day-cell--muted' : '',
        day.isToday ? 'day-cell--today' : '',
        isDragOver ? 'day-cell--drag-over' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleCellClick}
    >
      <div className="day-cell-head">
        <span className={`day-num ${day.isToday ? 'day-num--today' : ''}`}>{day.date.getDate()}</span>
        {variant === 'week' && (
          <span className="day-cell-weekday">
            {day.date.toLocaleDateString(undefined, { weekday: 'short' })}
          </span>
        )}
      </div>

      <div className="day-cell-posts">
        {visiblePosts.map((post) => (
          <PostChip key={post.id} post={post} compact={isMonth} />
        ))}
        {overflowCount > 0 && <div className="day-cell-overflow">+{overflowCount} more</div>}
        {variant === 'week' && postsForDay.length === 0 && (
          <div className="day-cell-empty-hint">Drop a post here</div>
        )}
      </div>
    </div>
  );
}
