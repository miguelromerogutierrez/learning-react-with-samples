# Calendar App as hooks

```javascript
function useCalendar({
  to = { year: 2080, month: 0 },
  from = { year: 1990, month: 0 }
} = {}) {
  const {year, month} = React.useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    return { year, month };
  });
  const [calendar, setCalendar] = React.useState({
    year,
    month,
    daysOfMonth: daysInMonth(year, month),
    firstDayMonth: firstDayAtMonth(year, month)
  });

  const nextYear = () => {...};

  const prevYear = () => {...};

  const nextMonth = () => {...};

  const prevMonth = () => {...};

  const goToday = () => {...}

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

```