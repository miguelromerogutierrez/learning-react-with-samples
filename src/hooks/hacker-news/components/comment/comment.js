import React from 'react'
import shallowequal from 'shallowequal';
import usePaginator from '../usePaginator';
import { useHNContext } from '../stories-api/HNContext';

import './comment.scss';
const emptyArr = [];
export default function Comment({ comments, parentId, show }) {
  const { itemsPage, nextPage, prevPage } = usePaginator({ data: show ? comments : emptyArr, itemsPerPage: 7 });
  const { stories, retrieveComments } = useHNContext();
  const itemsPageRef = React.useRef(itemsPage);
  React.useEffect(() => {
    if (show && !shallowequal(itemsPageRef.current, itemsPage)) {
      itemsPageRef.current = itemsPage;
      retrieveComments(itemsPage, parentId)
    }
  });

  if (!stories.storiesComments[parentId] || !show ) return null;
  return (
    <div className="story-comments">
      <div>
        <button onClick={prevPage}> &lt; </button>
        <button onClick={nextPage}> &gt; </button>
      </div>
      {
        stories.storiesComments[parentId]
          .filter(comment => comment !== null)
          .map(comment =>(
          <div className="comment">
            <i class="fas fa-chevron-circle-right"></i>
            <div dangerouslySetInnerHTML={{__html: comment.text}} />
            <div className="comment-footer">by {comment.by}</div>
          </div>
        ))
      }
    </div>
  )
}
