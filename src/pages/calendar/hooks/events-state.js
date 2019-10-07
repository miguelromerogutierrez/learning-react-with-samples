import React from 'react';
import PropTypes from 'prop-types';

const EventContext = React.createContext({});

export function EventState(props) {
  const [events, setEvents] = React.useState({});

  const setSafeStateEvent = (node, value, cb) => {
    const nodeEvents = events[node] || [];
    const safeState = {
      events: {
        ...events,
        [node]: [
          ...nodeEvents,
          {...value}
        ]
      }
    };
    debugger;
    setEvents(safeState);
  }

  const createEvent = (
    { year, month, day, title, description, metadata = {} }
    ) => {
    setSafeStateEvent(
      `${year}/${month}/${day}`, {title, description, metadata}
    );
  };

  const getEvents = (year, month, day) => {
    return events[`${year}/${month}/${day}`] || [];
  }

  const getContextValue = () => {
    return {
      createEvent: createEvent,
      getEvents: getEvents
    };
  };

  return <EventContext.Provider {...props} value={getContextValue()} />;
}

export function useEventState() {
  const context = React.useContext(EventContext);
  if (!context) {
    throw new Error('useEventState must be inside EventProvider');
  }
  return context;
}
