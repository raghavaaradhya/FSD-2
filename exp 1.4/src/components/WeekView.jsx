import { useSelector } from 'react-redux';
import { selectCursorDate } from '../features/ui/uiSlice';
import { fromISODate, getWeekDays, isToday, toISODate } from '../utils/dateUtils';
import DayCell from './DayCell';

export default function WeekView() {
  const cursorDate = fromISODate(useSelector(selectCursorDate));
  const days = getWeekDays(cursorDate).map((d) => ({
    date: d,
    iso: toISODate(d),
    inCurrentMonth: true,
    isToday: isToday(d),
  }));

  return (
    <div className="week-view">
      {days.map((day) => (
        <DayCell key={day.iso} day={day} variant="week" />
      ))}
    </div>
  );
}
