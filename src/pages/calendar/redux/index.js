import React from 'react'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import CalendarApp from './calendar-app';
import calendarStateReducer from './reducers/calendar-state';
import eventsStateReducer from './reducers/events-state';

const store = createStore(combineReducers({
  calendar: calendarStateReducer,
  events: eventsStateReducer
}));

function App(props) {
  return (
    <Provider store={store}>
      <CalendarApp />
    </Provider>
  )
}

export default App

