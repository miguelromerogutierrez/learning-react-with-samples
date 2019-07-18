import React, { Component } from 'react'
import PropTypes from 'prop-types'
import usePaginator from '../usePaginator';
import useDeepCompareDependencies from '../useDeepCompareDependencies';
import useStoriesApi from '../stories-api/useStoriesApi';

import './comment.scss';

export default function Comment({ comments, loader }) {
  const { itemsPage } = usePaginator({ data: comments, itemsPerPage: 7 });

  const { pending, stories, retrieveStories } = useStoriesApi();

  React.useEffect(() => {
    retrieveStories(itemsPage)
  }, [itemsPage]);

  if (itemsPage.length === 0) return null;
  if (pending) return loader;
  return (
    <div className="story-comments">
      {
        stories.map(comment =>(
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
