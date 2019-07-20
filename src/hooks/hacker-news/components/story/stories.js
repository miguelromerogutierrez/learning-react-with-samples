import React from 'react'
import shallowequal from 'shallowequal';
import usePaginator from '../usePaginator';
import { useHNContext } from '../stories-api/HNContext';
import Story from '../story/story';
import Spinner from '../../../../pages/shared_component/spinner/spinner';

function Stories() {
  const { stories, storiesIds, retrieveStories } = useHNContext();
  const { itemsPage, nextPage, prevPage } = usePaginator({ data: storiesIds.payload, itemsPerPage: 15 });
  const itemsPageRef = React.useRef(itemsPage);

  React.useEffect(() => {
    if (!shallowequal(itemsPageRef.current, itemsPage)) {
      itemsPageRef.current = itemsPage;
      retrieveStories(itemsPage);
    }
  });

  if (itemsPage.length === 0 || stories.pending) return <Spinner />;
  return (
    <div className="story--container">
      <div>
        <button onClick={prevPage}> &lt; </button>
        <button onClick={nextPage}> &gt; </button>
      </div>
      {
        stories.asArray.map(
          story => <Story {...story} />
        )
      }
    </div>
  );
}

Stories.propTypes = {

}

export default Stories

