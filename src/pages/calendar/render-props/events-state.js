import React from 'react';
import PropTypes from 'prop-types';

const EventContext = React.createContext({});

export default class EventState extends React.Component {
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
          {this.props.children}
        </EventContext.Consumer>
      </EventContext.Provider>
    );
  }
}
