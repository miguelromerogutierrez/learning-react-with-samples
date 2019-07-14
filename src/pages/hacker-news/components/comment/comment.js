import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paginator from '../Paginator';
import CommentsData from '../CommentsData';

import './comment.scss';

export default function Comment(props) {

  return (
    <div className="story-comments">
      <Paginator data={props.comments} itemsPerPage={7}>
        {
          ({ itemsPage, nextPage }) => {
            return <CommentsData commentsId={itemsPage}>
              {({pending, comments}) => {
                return comments.map(comment =>(
                  <div className="comment">
                    <i class="fas fa-chevron-circle-right"></i>
                    <div dangerouslySetInnerHTML={{__html: comment.text}} />
                    <div className="comment-footer">by {comment.by}</div>
                  </div>
                ))
              }}
            </CommentsData>
          }
        }
      </Paginator>
    </div>
  )
}
