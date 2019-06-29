import React from 'react';
import SocialCard from './components/social-card/social-card';
import { getSocialCardProps } from './components/social-card/prop-getters';
import Spinner from '../shared_component/spinner/spinner';
import { getCardsData } from './services';

import './social-cards-page.scss';

class SocialCardsPage extends React.Component {

  state = {
    cardsData: []
  };

  async componentDidMount() {
    const cardsData = await getCardsData();
    this.setState({ cardsData });
  }

  hanldeClickLike = (event, id) => {
    const cardsData = this.state.cardsData.map(card => {
      if(card.id === id) {
        card.post.user.hasLiked = !card.post.user.hasLiked;
        card.post.likes.count += card.post.user.hasLiked ? 1 : -1;
        return { ...card }
      }
      return card;
    });
    this.setState({ cardsData })
  }

  hanldeClickRetweet = (event, id) => {
    const cardsData = this.state.cardsData.map(card => {
      if(card.id === id) {
        card.post.user.hasRetweeted = !card.post.user.hasRetweeted;
        card.post.retweet.count += card.post.user.hasRetweeted ? 1 : -1;
        return { ...card }
      }
      return card;
    });
    this.setState({ cardsData })
  }

  render() {
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => <SocialCard {...getSocialCardProps(card)} onLike={this.hanldeClickLike} onRetweet={this.hanldeClickRetweet} />
            )}
          </div>
        );
  }
}

export default SocialCardsPage;
