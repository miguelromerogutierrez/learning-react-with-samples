import React from 'react'
import { EventState } from './events-state';
import CalendarApp from './calendar-app';

function App(props) {
  return (
    <EventState>
      <CalendarApp />
    </EventState>
  )
}

export default App

