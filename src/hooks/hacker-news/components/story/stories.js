import React from 'react'
import PropTypes from 'prop-types'
import usePaginator from '../usePaginator';
import useDeepCompareDependencies from '../useDeepCompareDependencies';
import useStoriesApi from '../stories-api/useStoriesApi';
import Story from '../story/story';

function Stories({ storiesIds, loader }) {
  const { itemsPage } = usePaginator({ data: storiesIds, itemsPerPage: 15 });
  const { pending, stories, retrieveStories } = useStoriesApi();

  React.useEffect(() => {
    retrieveStories(itemsPage);
  }, [itemsPage]);

  if (itemsPage.length === 0) return null;
  if (pending) return loader;
  return (
    <div className="story--container">
      {
        stories.map(
          story => <Story {...story} loader={loader} />
        )
      }
    </div>
  );
}

Stories.propTypes = {

}

export default Stories

