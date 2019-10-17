import React from 'react';
import PropTypes from 'prop-types';

import { daysInMonth, firstDayAtMonth, getNextDate, getPrevDate } from '../helpers';

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  return { year, month };
}

export default function useCalendar({
  to = { year: 2080, month: 0 },
  from = { year: 1990, month: 0 }
} = {}) {
  const {year, month} = React.useMemo(() => getCurrentDate(), []);
  const [calendar, setCalendar] = React.useState({
    year,
    month,
    daysOfMonth: daysInMonth(year, month),
    firstDayMonth: firstDayAtMonth(year, month)
  });

  const nextYear = () => {
    const newYear = Math.min(calendar.year + 1, Number(to.year));
    setCalendar({
      year: newYear,
      month: calendar.month,
      daysOfMonth: daysInMonth(newYear, calendar.month),
      firstDayMonth: firstDayAtMonth(newYear, calendar.month)
    });
  };

  const prevYear = () => {
    const newYear = Math.max(calendar.year - 1, Number(from.year));
    setCalendar({
      year: newYear,
      month: calendar.month,
      daysOfMonth: daysInMonth(newYear, calendar.month),
      firstDayMonth: firstDayAtMonth(newYear, calendar.month)
    });
  };

  const nextMonth = () => {
    const {year, month} = getNextDate(calendar, to);
    setCalendar({
      year,
      month,
      daysOfMonth: daysInMonth(year, month),
      firstDayMonth: firstDayAtMonth(year, month)
    });
  };

  const prevMonth = () => {
    const { year, month } = getPrevDate(calendar, from);
    setCalendar({
      year,
      month,
      daysOfMonth: daysInMonth(year, month),
      firstDayMonth: firstDayAtMonth(year, month)
    });
  };

  const goToday = () => {
    const {year, month} = getCurrentDate();
    setCalendar({
      year,
      month,
      daysOfMonth: daysInMonth(year, month),
      firstDayMonth: firstDayAtMonth(year, month)
    });
  }

  const getCalendarApi = () => {
    return {
      ...calendar,
      prevMonth: prevMonth,
      nextMonth: nextMonth,
      goToday: goToday
    }
  }

  return getCalendarApi();
}
