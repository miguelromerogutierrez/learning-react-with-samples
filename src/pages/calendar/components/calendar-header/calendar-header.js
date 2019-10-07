import React from 'react';
import { getMonthNames } from '../../helpers';
import './calendar-header.scss';

const date = new Date();

const getDate = (props) => {
  const day = date.getDate();
  const sufix = {
    1: 'st',
    2: 'nd'
  };
  return <span className="day">, {day} <span className="sufix">{sufix[day] || 'th'}</span><img src={props.icon} /></span>
}
export default function CalendarHeader(props) {
  const isCurrent = date.getFullYear() === props.year && date.getMonth() === props.month;
  return (
    <div className="calendar--header">
      <div className="calendar--header-date">
      {getMonthNames(props.month)} {props.year}{
        isCurrent
         ? getDate({ icon: props.icon })
         : null
        }
      </div>
      <div className="calendar--header-cta">
        <button className="date-cta prev" onClick={props.onPrevClick}>{`<`}</button>
        <button className="date-cta today" onClick={props.onTodayClick}>today</button>
        <button className="date-cta next" onClick={props.onNextClick}>{`>`}</button>
      </div>
    </div>
  );
};
