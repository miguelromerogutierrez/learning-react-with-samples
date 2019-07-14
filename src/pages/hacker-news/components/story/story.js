import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../comment/comment';
import format from 'date-fns/format';

import './story.scss';

class Story extends React.PureComponent {

  state = {
    displayComments: false
  };

  handleClickComments = () => {
    this.setState(oldState => ({ displayComments: !oldState.displayComments }));
  }

  render() {
    return (
      <div className="story--card">
        <a href={this.props.url} className="story--title" >
          {this.props.title}
        </a>
        <div className="story-footer">
          <span className="story-footer__autor" >By {this.props.by}</span>&nbsp;•&nbsp;
          {this.props.kids && (
            <span className="story-footer__comments" onClick={this.handleClickComments} >{this.props.kids.length} comments&nbsp;•&nbsp;</span>
          )}
          <span className="story-footer__date">{format(new Date(this.props.time*1000), 'MM/DD/YYYY')}</span>
        </div>
        {
          this.state.displayComments
          ? <Comments comments={this.props.kids || []}/>
          : null
        }
        <div className="story--score">{this.props.score}</div>
      </div>
    );
  }
}

Story.propTypes = {

}

export default Story

