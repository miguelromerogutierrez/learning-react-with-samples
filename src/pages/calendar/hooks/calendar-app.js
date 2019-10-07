import React from 'react';

import useCalendarState from './calendar-state';
import { useEventState } from './events-state';
import CalendarHeader from '../components/calendar-header';
import Grid from '../components/grid';
import DayOfWeek from '../components/ui/day-of-week';
import Frame from '../components/right-frame';
import { daysOfWeek, getDaysOfMonthAsArray, isCurrentDate } from '../helpers';
import { getWeather } from '../weather-service';

import '../calendar.scss';

function CalendarApp() {
  const [showEventCreator, setshowEventCreator] = React.useState(false);
  const [eventForm, setEventForm] = React.useState({
    title: '',
    description: ''
  });
  const [weather, setWeather] = React.useState({
    icon: ''
  });
  const selectedDay = React.useRef(0);

  const events = useEventState();
  const calendar = useCalendarState();

  React.useEffect(() => {
    getWeather().then(data => {
      setWeather({
        icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      })
    });
  }, []);

  const handleCandelEvent = () => {
    setshowEventCreator(false);
  };

  const handelShowEventCreator = (event, day) => {
    selectedDay.current = day;
    setshowEventCreator(true);
  };

  const handleCreateEvent = () => {
    events.createEvent({
      year: calendar.year,
      month: calendar.month,
      day: selectedDay.current,
      title: eventForm.title,
      description: eventForm.description
    });
    selectedDay.current = 0;
    setshowEventCreator(false);
    setEventForm({
      title: '',
      description: ''
    });
  }

  const handleChangeFormField = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEventForm({
      ...eventForm,
      [name]: value
    });
  }

  const isLongMonth = calendar.firstDayMonth === 6 || (calendar.firstDayMonth === 5 && calendar.daysOfMonth === 31);
  const daysRows = isLongMonth ? '6' : '5'

  return (
    <div className="calendar CalendarApp">
      <CalendarHeader
        month={calendar.month}
        year={calendar.year}
        icon={weather.icon}
        onPrevClick={calendar.prevMonth}
        onTodayClick={calendar.goToday}
        onNextClick={calendar.nextMonth}
      />
      <div className="calendar--grid-container">
        <Grid columns="7" className="days-of-week" >
          {
            daysOfWeek.map(
              (day) => <DayOfWeek day={day} key={day} />
            )
          }
        </Grid>
        <Grid columns="7" rows={daysRows} className="days-of-month">
          {
            getDaysOfMonthAsArray(
              calendar.daysOfMonth, calendar.firstDayMonth
            ).map((day, index) => 
              <DayOfWeek
                key={day === '' ? index : `${calendar.year}${calendar.month}${day}`}
                day={day}
                active={isCurrentDate(calendar.year, calendar.month, day)}
                events={events.getEvents(calendar.year, calendar.month, day)}
                onCreateEvent={handelShowEventCreator}
              />
            )
          }
        </Grid>
      </div>
      <Frame show={showEventCreator}>
        <Frame.Dialog>
          <h1>Create Event</h1>
          <input
            placeholder="Title"
            name='title'
            value={eventForm.title}
            onChange={handleChangeFormField}
          />
          <input
            placeholder="Description"
            name="description"
            value={eventForm.description}
            onChange={handleChangeFormField}
          />
          <button onClick={handleCreateEvent}>Create</button>
          <button onClick={handleCandelEvent}>Cancel</button>
        </Frame.Dialog>
      </Frame>
    </div>
  );
};

export default CalendarApp;

// https://openweathermap.org/img/w/{icon}.png
