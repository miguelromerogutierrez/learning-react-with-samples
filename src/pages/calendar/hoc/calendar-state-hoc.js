import React from 'react';
import PropTypes from 'prop-types';

import { daysInMonth, firstDayAtMonth, getNextDate, getPrevDate } from '../helpers';

export default function withCalendar(Component) {
  return class CalendarState extends React.Component {

    static propTypes = {
      to: PropTypes.shape({
        year: PropTypes.number,
        month: PropTypes.number,
      }),
      from: PropTypes.shape({
        year: PropTypes.number,
        month: PropTypes.number,
      })
    };

    static defaultProps = {
      to: { year: 2080, month: 0 },
      from: { year: 1990, month: 0 }
    };

    state = {
      calendar: {}
    };

    componentDidMount() {
      this.goToday();
    }
    
  
    nextYear = () => {
      const newYear = Math.min(this.state.calendar.year + 1, Number(this.props.to.year));
      this.setState({
        calendar: {
          year: newYear,
          month: this.state.calendar.month,
          daysOfMonth: daysInMonth(newYear, this.state.calendar.month),
          firstDayMonth: firstDayAtMonth(newYear, this.state.calendar.month)
        }
      });
    };
  
    prevYear = () => {
      const newYear = Math.max(this.state.calendar.year - 1, Number(this.props.from.year));
      this.setState({
        calendar: {
          year: newYear,
          month: this.state.calendar.month,
          daysOfMonth: daysInMonth(newYear, this.state.calendar.month),
          firstDayMonth: firstDayAtMonth(newYear, this.state.calendar.month)
        }
      });
    };
  
    nextMonth = () => {
      const {year, month} = getNextDate(this.state.calendar, this.props.to);
      this.setState({
        calendar: {
          year,
          month,
          daysOfMonth: daysInMonth(year, month),
          firstDayMonth: firstDayAtMonth(year, month)
        }
      });
    };
  
    prevMonth = () => {
      const { year, month } = getPrevDate(this.state.calendar, this.props.from);
      this.setState({
        calendar: {
          year,
          month,
          daysOfMonth: daysInMonth(year, month),
          firstDayMonth: firstDayAtMonth(year, month)
        }
      });
    };

    goToday = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      this.setState({
        calendar: {
          year,
          month,
          daysOfMonth: daysInMonth(year, month),
          firstDayMonth: firstDayAtMonth(year, month)
        }
      });
    }

    getCalendarApi = () => {
      return {
        ...this.state.calendar,
        prevMonth: this.prevMonth,
        nextMonth: this.nextMonth,
        goToday: this.goToday
      }
    }
  
    render() {
      return <Component
        {...this.props}
        calendar={this.getCalendarApi()}
      />
    }
  }
}
