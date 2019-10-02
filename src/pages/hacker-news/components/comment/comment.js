import React from 'react'
import Paginator from '../Paginator';
import CommentsData from '../CommentsData';

import './comment.scss';

export default function Comments(props) {

  return (
    <Paginator data={props.comments} itemsPerPage={7}>
      {
        ({ itemsPage, nextPage }) => {
          return <CommentsData commentsId={itemsPage}>
            {({pending, comments}) => {
              return comments.map(comment => <Comment text={comment.text} by={comment.by} />)
            }}
          </CommentsData>
        }
      }
    </Paginator>
  )
}

function Comment(props) {
  return (
    <div className="comment">
      <i class="fas fa-chevron-circle-right"></i>
      <div dangerouslySetInnerHTML={{__html: props.text}} />
      <div className="comment-footer">by {props.by}</div>
    </div>
  );
}
