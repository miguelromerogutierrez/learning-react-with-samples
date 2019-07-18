import React from 'react';
import PropTypes from 'prop-types';

import Stories from './components/story/stories';
import useStoriesApi from './components/stories-api/useStoriesApi';
import Spinner from '../../pages/shared_component/spinner/spinner';

export default function HackerNewsPage() {

  const [kind, setKind] = React.useState('newstories');

  const { pending, storiesIds, retrieveStoriesIds } = useStoriesApi();

  const handleStoriesSelection = (event) => {
    setKind(event.target.value);
  }

  React.useEffect(() => {
    retrieveStoriesIds(kind);
  }, [kind]);

  if (storiesIds.length === 0 || pending) return <Spinner />;
  return (
    <div className="hacker-news-page">
      <div className="page-header">
        <button value="topstories" onClick={handleStoriesSelection} >Top Stories</button>
        <button value="newstories" onClick={handleStoriesSelection} >New Stories</button>
        <button value="beststories" onClick={handleStoriesSelection} >Best Stories</button>
        <button value="askstories" onClick={handleStoriesSelection} >Ask Stories</button>
        <button value="showstories" onClick={handleStoriesSelection} >Show Stories</button>
        <button value="jobstories" onClick={handleStoriesSelection} >Job Stories</button>
      </div>
      <Stories storiesIds={storiesIds} loader={<Spinner />} />
    </div>
  );
}
