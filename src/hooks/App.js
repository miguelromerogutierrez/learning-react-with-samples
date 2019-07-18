import React from 'react';
import { Switch, Route } from "react-router-dom";

import HackerNewsPage from './hacker-news/hacker-news-page';

import '../App.css';

function App() {
  return (
    <Switch>
      <Route path="/hooks" exact component={HackerNewsPage} />
    </Switch>
  );
}

export default App;
