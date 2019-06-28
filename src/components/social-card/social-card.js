import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import ExternalSource from '../external-source/external-source';
import CardAction from '../card-action/card-action';

import './social-card.scss';

export default function SocialCard(props) {
  const likeClassNames = classnames('theme-red', { active: props.hasLiked });
  const retweetClassNames = classnames('theme-green', { active: props.hasRetweeted });
  return (
    <div className="social-card">
      <div className="social-card__container">
        <div className="social-card__header">
          <p className="header--info">
            <b>{props.nickName}</b> {props.userName} • {props.postDate}
          </p>
        </div>
        <div className="social-card__content">
          <p>
            {props.cardContent}
          </p>

          {props.hasExternalSource ? <ExternalSource {...props.externalSourceProps} /> : null}

        </div>
        <div className="social-card__footer">
          <CardAction icon={<i class="far fa-comment" />} count={props.commentsCount} />
          <CardAction className={likeClassNames} icon={<i class="far fa-heart" />} count={props.likesCount} onClick={(e) => props.onLike(e, props.id)} />
          <CardAction className={retweetClassNames} icon={<i class="fas fa-retweet" />} count={props.retweetsCount} onClick={e => props.onRetweet(e, props.id)} />
          <CardAction icon={<i class="far fa-envelope" />} />
        </div>
      </div>
    </div>
  );
}

SocialCard.propTypes = {
  onLike: PropTypes.func,
  onRetweet: PropTypes.func,
}
