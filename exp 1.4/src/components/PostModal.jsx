import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModal,
  modalClosed,
} from '../features/ui/uiSlice';
import { postAdded, postUpdated, postDeleted, selectPostById } from '../features/posts/postsSlice';
import { PLATFORMS, STATUSES } from '../data/platforms';
import { formatDayLong, fromISODate } from '../utils/dateUtils';

const emptyForm = { title: '', platform: 'instagram', date: '', time: '09:00', status: 'draft', notes: '' };

export default function PostModal() {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);
  const existingPost = useSelector((state) =>
    modal.mode === 'edit' && modal.postId ? selectPostById(state, modal.postId) : null
  );

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!modal.open) return;
    if (modal.mode === 'edit' && existingPost) {
      setForm({ ...existingPost });
    } else {
      setForm({ ...emptyForm, date: modal.prefillDate ?? '' });
    }
    setError('');
  }, [modal.open, modal.mode, modal.postId, modal.prefillDate]); // eslint-disable-line

  if (!modal.open) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Give the post a title.');
      return;
    }
    if (!form.date) {
      setError('Choose a date.');
      return;
    }

    if (modal.mode === 'edit' && existingPost) {
      dispatch(postUpdated({ id: existingPost.id, changes: form }));
    } else {
      dispatch(postAdded(form));
    }
    dispatch(modalClosed());
  }

  function handleDelete() {
    if (existingPost) dispatch(postDeleted(existingPost.id));
    dispatch(modalClosed());
  }

  const isEdit = modal.mode === 'edit' && existingPost;
  const dateLabel = form.date ? formatDayLong(fromISODate(form.date)) : '';

  return (
    <div className="modal-overlay" onClick={() => dispatch(modalClosed())}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="panel-eyebrow">{isEdit ? 'EDIT POST' : 'NEW POST'}</div>
            <h2 className="modal-title">{isEdit ? existingPost.title || 'Untitled post' : 'Schedule a post'}</h2>
            {dateLabel && <p className="modal-subtitle">{dateLabel}</p>}
          </div>
          <button className="btn-icon" onClick={() => dispatch(modalClosed())} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Product launch teaser"
              autoFocus
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="platform">Platform</label>
              <select id="platform" value={form.platform} onChange={(e) => update('platform', e.target.value)}>
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={(e) => update('status', e.target.value)}>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="time">Time</label>
              <input id="time" type="time" value={form.time} onChange={(e) => update('time', e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Optional context, links, or copy notes"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            {isEdit && (
              <button type="button" className="btn-danger" onClick={handleDelete}>
                Delete
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="btn-ghost" onClick={() => dispatch(modalClosed())}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {isEdit ? 'Save changes' : 'Schedule post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
