import React from 'react';
import PropTypes from 'prop-types';

const EventContext = React.createContext({});

const splitDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return { year, month, day };
}

export default function withEventState(Component) {
  return class EventState extends React.Component {
    state = {
      events: {}
    };

    setSafeStateEvent = (node, value, cb) => {
      const nodeEvents = this.state.events[node] || [];
      const safeState = {
        events: {
          ...this.state.events,
          [node]: [
            ...nodeEvents,
            {...value}
          ]
        }
      };
      this.setState(safeState, cb);
    }

    createEvent = ({ year, month, day, title, description, metadata = {} }, cb) => {
      this.setSafeStateEvent(
        `${year}/${month}/${day}`, {title, description, metadata}, cb
      );
    };

    getEvents = (year, month, day) => {
      return this.state.events[`${year}/${month}/${day}`] || [];
    }

    getContextValue = () => {
      return {
        createEvent: this.createEvent,
        getEvents: this.getEvents
      };
    };
  
    render() {
      return (
        <EventContext.Provider value={this.getContextValue()}>
          <EventContext.Consumer>
            {value => <Component {...this.props} events={value} />}
          </EventContext.Consumer>
        </EventContext.Provider>
      );
    }
  }
}
