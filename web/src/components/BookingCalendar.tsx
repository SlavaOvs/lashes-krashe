import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../lib/api';

interface FCEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
}

export default function BookingCalendar() {
  const [events, setEvents] = useState<FCEvent[]>([]);

  /** Загружаем брони на выбранную дату */
  async function load(date: Date) {
    const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
    const data: any[] = await api(`/api/bookings?date=${iso}`);
    setEvents(
      data.map((b) => ({
        id: b.id,
        title: `${b.clientName} – ${b.master.name}`,
        start: b.startsAt,
        end: b.endsAt,
        backgroundColor: b.master.color,
      })),
    );
  }

  /** начальная загрузка */
  useEffect(() => {
    load(new Date());
  }, []);

  /** выделение свободного слота */
  async function handleSelect(info: any) {
    const clientName = prompt('Имя клиента?');
    if (!clientName) return;

    try {
      await api('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          clientName,
          masterId: 1,          // ← пока фиксируем на мастера id=1
          startsAt: info.start,
          endsAt: info.end,
        }),
      });
      toast.success('Запись создана');
      load(info.start);
    } catch (e: any) {
      toast.error(e?.message || 'Ошибка');
    }
  }

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      selectable
      select={handleSelect}
      events={events}
      height="auto"
      slotMinTime="09:00:00"
      slotMaxTime="21:00:00"
      locale="ru"
    />
  );
}