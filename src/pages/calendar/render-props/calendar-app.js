import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CalendarState from './calendar-state';
import EventState from './events-state';
import CalendarHeader from '../components/calendar-header';
import Grid from '../components/grid';
import DayOfWeek from '../components/ui/day-of-week';
import Frame from '../components/right-frame';
import { daysOfWeek, getDaysOfMonthAsArray, isCurrentDate } from '../helpers';
import { getWeather } from '../weather-service';

import '../calendar.scss';

class CalendarApp extends Component {

  state = {
    showEventCreator: false,
    eventForm: {
      title: '',
      description: ''
    },
    weather: {
      icon: ''
    }
  };

  componentDidMount() {
    getWeather().then(data => {
      this.setState({
        weather: {
          icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        }
      })
    });
  }

  handleCandelEvent = () => {
    this.setState({
      showEventCreator: false
    });
  };

  handelShowEventCreator = (event, day) => {
    this.day = day;
    this.setState({
      showEventCreator: true
    });
  };

  handleChangeFormField = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(state => ({
      eventForm: {
        ...state.eventForm,
        [name]: value
      }
    }))
  }

  render() {
    const { showEventCreator, eventForm, weather } = this.state;
    return (
      <div className="calendar CalendarApp">
        <EventState>
          {
            (events) => (
              <CalendarState>
                {(calendar) =>  {
                  const isLongMonth = calendar.firstDayMonth === 6 || (calendar.firstDayMonth === 5 && calendar.daysOfMonth === 31);
                  const daysRows = isLongMonth ? '6' : '5';

                  const handleCreateEvent = () => {
                    const { eventForm } = this.state;
                    events.createEvent({
                      year: calendar.year,
                      month: calendar.month,
                      day: this.day,
                      title: eventForm.title,
                      description: eventForm.description
                    }, () => {
                      this.day = '';
                      this.setState({
                        showEventCreator: false,
                        eventForm: {
                          title: '',
                          description: ''
                        }
                      });
                    });
                  }
                  return (
                    <div>
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
                                onCreateEvent={this.handelShowEventCreator}
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
                            onChange={this.handleChangeFormField}
                          />
                          <input
                            placeholder="Description"
                            name="description"
                            value={eventForm.description}
                            onChange={this.handleChangeFormField}
                          />
                          <button onClick={handleCreateEvent}>Create</button>
                          <button onClick={this.handleCandelEvent}>Cancel</button>
                        </Frame.Dialog>
                      </Frame>
                    </div>
                  )
                }}
              </CalendarState>
            )
          }
        </EventState>
      </div>
    );
  }
};

export default CalendarApp;

// https://openweathermap.org/img/w/{icon}.png
