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
      <StoryCard>
        <StoryCard.Title url={this.props.url}>
          {this.props.title}
        </StoryCard.Title>
        <StoryCard.Footer>
          <span className="story-footer__autor" >By {this.props.by}</span>&nbsp;•&nbsp;
          {this.props.kids && (
            <span className="story-footer__comments" onClick={this.handleClickComments} >{this.props.kids.length} comments&nbsp;•&nbsp;</span>
          )}
          <span className="story-footer__date">{format(new Date(this.props.time*1000), 'MM/DD/YYYY')}</span>
        </StoryCard.Footer>
        <StoryCard.Comments>
          {
            this.state.displayComments
            ? <Comments comments={this.props.kids || []}/>
            : null
          }
        </StoryCard.Comments>
        <StoryCard.Score>{this.props.score}</StoryCard.Score>
      </StoryCard>
    );
  }
}

function StoryCard({children}) {
  return (
    <div className="story--card">
      {children}
    </div>
  )
}

const StoryTitle = ({url, children}) => <a href={url} className="story--title" > {children}</a>;
const StoryFooter = ({children}) => <div className="story-footer">{children}</div>;
const StoryComments = ({children}) => <div className="story-comments">{children}</div>;
const StoryScore = ({children}) => <div className="story--score">{children}</div>;

StoryCard.Title = StoryTitle;
StoryCard.Footer = StoryFooter;
StoryCard.Comments = StoryComments;
StoryCard.Score = StoryScore;

export default Story

