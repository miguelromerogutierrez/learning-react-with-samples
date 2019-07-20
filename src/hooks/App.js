import React from 'react';

import { HNProvider } from './hacker-news/components/stories-api/HNContext'
import HackerNewsPage from './hacker-news/hacker-news-page';

import '../App.css';

function App() {
  return (
    <HNProvider>
      <HackerNewsPage />
    </HNProvider>
  );
}

export default App;
