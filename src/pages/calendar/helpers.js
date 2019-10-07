export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getMonthNames =  month => monthNames[month];

export function daysInMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}

export function firstDayAtMonth(year, month) {
  return (new Date(year, month, 1)).getDay();
}

export function getNextDate(calendar, to) {
  let month = to.year === calendar.year
    ? Math.min(calendar.month + 1, Number(to.month))
    : calendar.month + 1;
  let year = calendar.year;
  if (month === 12) {
    year = Math.min(year + 1, to.year);
    month = 0;
  }
  return {
    year, month
  }
}

export function getPrevDate(calendar, from) { 
  let month = from.year === calendar.year
    ? Math.max(calendar.month - 1, Number(from.month))
    : calendar.month - 1;
  let year = calendar.year;
  if (month === -1) {
    year = Math.max(year - 1, from.year);
    month = 11;
  }
  return { year, month };
}

export const getDaysOfMonthAsArray = (daysOfMonth, firstDayOfMonth) => {
  const daysArray = Array.from({ length: daysOfMonth}, (ignore, index) => index + 1);
  let blankSpace = 0
  while(blankSpace++ < firstDayOfMonth) {
    daysArray.unshift('');
  }
  let module7 = daysArray.length % 7;
  blankSpace = 7 - module7;
  while(blankSpace--) {
    daysArray.push('');
  }
  return daysArray;
}

export const isCurrentDate = (year, month, day) => {
  const date = new Date();
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}
