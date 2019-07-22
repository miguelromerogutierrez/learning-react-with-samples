import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SocialCardsPage from './pages/social-cards/page';
import RegisterFormPage from './pages/register-page/register-page';
import HackerNewsPage from './pages/hacker-news/hacker-news-page';
import AuthPage from './pages/auth-user/page';
import Hooks from './hooks/App';
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
    </Router>
  );
}

export default App;
