import { useSelector } from 'react-redux';
import { selectView } from './features/ui/uiSlice';
import CalendarHeader from './components/CalendarHeader';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import PostModal from './components/PostModal';

export default function App() {
  const view = useSelector(selectView);

  return (
    <div className="app-shell">
      <CalendarHeader />
      <main className="cal-body">
        {view === 'month' ? <MonthView /> : <WeekView />}
      </main>
      <PostModal />
    </div>
  );
}
