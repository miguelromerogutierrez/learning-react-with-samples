# Calendar App as Render prop

```javascript
class CalendarState extends React.Component {

  state = {
    calendar: {}
  };

  componentDidMount() {
    this.goToday();
  }
  

  nextYear = () => {...};

  prevYear = () => {...};

  nextMonth = () => {...};

  prevMonth = () => {...};

  goToday = () => {...}

  getCalendarApi = () => {
    return {
      ...this.state.calendar,
      prevMonth: this.prevMonth,
      nextMonth: this.nextMonth,
      goToday: this.goToday
    }
  }

  render() {
    return this.props.children(this.getCalendarApi());
  }
}
```
