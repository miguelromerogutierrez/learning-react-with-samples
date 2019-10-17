import React from 'react'
import { EventStateProvider } from './events-state';
import CalendarApp from './calendar-app';

function App(props) {
  return (
    <EventStateProvider>
      <CalendarApp />
    </EventStateProvider>
  )
}

export default App

