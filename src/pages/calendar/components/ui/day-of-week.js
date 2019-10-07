import React from 'react';
import classnames from 'classnames';
import './day-of-week.scss';

export default function DayOfWeek({
  day, className = '', active, events = [], onCreateEvent
}) {
  const containerCN = classnames('day-of-week', { active: active }, className);
  return (
    <div className={containerCN}>
      <div className="day">{day}</div>
      <div className="events" onDoubleClick={day !== '' ? (e) => onCreateEvent(e, day) : null}>
        {events.map(event => <div>{event.title}</div>)}
      </div>
    </div>
  )
}