import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./EventCalender.css"

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  // Sample events data
  const events = [
    {
      title: 'Event 1',
      start: new Date(2024, 1, 27, 10, 0),
      end: new Date(2024, 1, 27, 12, 0),
    },
    <button>join now</button>,
    {
      title: 'Event 2',
      start: new Date(2024, 1, 28, 11, 0),
      end: new Date(2024, 1, 28, 13, 0),
    },
    {
      title: 'Leammo Meet',
      start: new Date(2024, 1, 29, 13, 0),
      end: new Date(2024, 1, 29, 15, 0),
    },
    {
     
      start: new Date(2024, 1, 29, 16, 0),
      end: new Date(2024, 1, 29, 17, 0),
      title: 'Leammo Discussion',
    },
    
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 , width: "97%"}}
      />
    </div>
  );
};

export default EventCalendar;
