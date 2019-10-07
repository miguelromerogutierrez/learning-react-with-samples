import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SocialCardsPage from './pages/social-cards/page';
import RegisterFormPage from './pages/register-page/register-page';
import HackerNewsPage from './pages/hacker-news/hacker-news-page';
import AuthPage from './pages/auth-user/page';
import Hooks from './hooks/App';
import Calendar from './pages/calendar/hoc/calendar-app';
import CalendarRP from './pages/calendar/render-props/calendar-app';
import CalendarHook from './pages/calendar/hooks';
import Header from './pages/shared_component/header/header';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/social-cards" exact component={SocialCardsPage} />
      <Route path="/register-form" exact component={RegisterFormPage} />
      <Route path="/hacker-news" exact component={HackerNewsPage} />
      <Route path="/auth-page" exact component={AuthPage} />
      <Route path="/hooks" exact component={Hooks} />
      <Route path="/calendar-hoc" exact component={Calendar} />
      <Route path="/calendar-rp" exact component={CalendarRP} />
      <Route path="/calendar-hooks" exact component={CalendarHook} />
    </Router>
  );
}

export default App;
