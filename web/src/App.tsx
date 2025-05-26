import BookingCalendar from './components/BookingCalendar';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Lashes Krashe</h1>
      <BookingCalendar />
      <Toaster position="top-right" />
    </div>
  );
}