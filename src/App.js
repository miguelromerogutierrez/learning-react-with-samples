import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SocialCardsPage from './pages/social-cards/page';
import RegisterFormPage from './pages/register-page/register-page';
import HackerNewsPage from './pages/hacker-news/hacker-news-page';
import Header from './pages/shared_component/header/header';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/social-cards" exact component={SocialCardsPage} />
      <Route path="/register-form" exact component={RegisterFormPage} />
      <Route path="/hacker-news" exact component={HackerNewsPage} />
    </Router>
  );
}

export default App;
