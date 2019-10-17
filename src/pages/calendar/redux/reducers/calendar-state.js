
import { daysInMonth, firstDayAtMonth, getNextDate, getPrevDate } from '../../helpers';

const goToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    year,
    month,
    daysOfMonth: daysInMonth(year, month),
    firstDayMonth: firstDayAtMonth(year, month)
  };
}

const nextMonth = (state, to) => {
  const {year, month} = getNextDate(state, to);
  return {
    year,
    month,
    daysOfMonth: daysInMonth(year, month),
    firstDayMonth: firstDayAtMonth(year, month)
  };
};

const prevMonth = (state, from) => {
  const { year, month } = getPrevDate(state, from);
  return {
    year,
    month,
    daysOfMonth: daysInMonth(year, month),
    firstDayMonth: firstDayAtMonth(year, month)
  };
};

const initialState = goToday();

const calendarStateReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'calendar/TODAY':
      return goToday();
    case 'calendar/NEXT_MONTH':
      return nextMonth(state, action.to);
    case 'calendar/PREV_MONTH':
      return prevMonth(state, action.from);
    default:
      return state;
  }
}

export default calendarStateReducer;
