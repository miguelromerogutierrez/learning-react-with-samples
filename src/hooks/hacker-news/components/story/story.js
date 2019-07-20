import React from 'react';
import Comments from '../comment/comment';
import format from 'date-fns/format';

import './story.scss';

function Story(props) {

  const [displayComments, setDisplayComments] = React.useState(false);

  const handleClickComments = () => {
    setDisplayComments(!displayComments);
  }

  return (
    <div className="story--card">
      <a href={props.url} className="story--title" >
        {props.title}
      </a>
      <div className="story-footer">
        <span className="story-footer__autor" >By {props.by}</span>&nbsp;•&nbsp;
        {props.kids && (
          <span className="story-footer__comments" onClick={handleClickComments} >{props.kids.length} comments&nbsp;•&nbsp;</span>
        )}
        <span className="story-footer__date">{format(new Date(props.time*1000), 'MM/DD/YYYY')}</span>
      </div>
      <Comments show={displayComments} comments={props.kids || []} parentId={props.id} />
      <div className="story--score">{props.score}</div>
    </div>
  );
}

Story.propTypes = {

}

export default Story

