import { useSelector } from 'react-redux';
import { selectCursorDate } from '../features/ui/uiSlice';
import { fromISODate, getMonthGrid, WEEKDAY_LABELS } from '../utils/dateUtils';
import DayCell from './DayCell';

export default function MonthView() {
  const cursorDate = fromISODate(useSelector(selectCursorDate));
  const weeks = getMonthGrid(cursorDate);

  return (
    <div className="month-view">
      <div className="month-weekday-row">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="month-weekday-label">{label}</div>
        ))}
      </div>
      <div className="month-grid">
        {weeks.map((week, i) => (
          <div className="month-week-row" key={i}>
            {week.map((day) => (
              <DayCell key={day.iso} day={day} variant="month" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
