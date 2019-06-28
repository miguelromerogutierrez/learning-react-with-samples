import React from 'react';
import SocialCard from './components/social-card/social-card';
import './App.css';

const cardsData = [
  {
    id:1,
    user: {
      nickName: 'The Practical Dev',
      userName: '@ThePracticalDev',
    },
    post: {
      date: 'Sep 10',
      content: `Learning React? Start small. { author: @dcddia }`,
      hasExternalSource: true,
      externalSource: {
        image: 'https://picsum.photos/id/248/500/200',
        title: 'Learning React? Start Small.',
        content: `Can't pry yourself away from the tutorials? The cure is to make tiny little experiment apps.`,
        link: 'dev.to'
      },
      comments: {
        count: 47,
      },
      likes: {
        count: 2,
      },
      retweet: {
        count: 190,
      },
      user: {
        hasRetweeted: true,
        hasLiked: false,
      }
    }
  },
  {
    id:2,
    user: {
      nickName: 'Mike Romero',
      userName: '@MikeRomero',
    },
    post: {
      date: 'Sep 9',
      content: `Learn javascript: ES6 features`,
      hasExternalSource: true,
      externalSource: {
        image: 'https://picsum.photos/id/883/500/200',
        title: 'Learn javascript: ES6 features',
        content: 'Are you confused with ES6 new features?, i explain you everything',
        link: 'mikedev.to'
      },
      comments: {
        count: 3,
      },
      likes: {
        count: 100,
      },
      retweet: {
        count: 230,
      },
      user: {
        hasRetweeted: true,
        hasLiked: true,
      }
    }
  },
  {
    id:3,
    user: {
      nickName: 'Jhon Doe',
      userName: '@JDoe',
    },
    post: {
      date: 'Sep 8',
      content: `Today i will start learning ReactJS, do you guys have some useful resources to start?`,
      hasExternalSource: false,
      comments: {
        count: 190,
      },
      likes: {
        count: 80,
      },
      retweet: {
        count: 30,
      },
      user: {
        hasRetweeted: false,
        hasLiked: true,
      }
    }
  }
];

function getSocialCardProps({user, post, id}) {
  return {
    id,
    nickName: user.nickName,
    userName: user.userName,
    postDate: post.date,
    cardContent: post.content,
    hasExternalSource: post.hasExternalSource,
    commentsCount: post.comments.count,
    likesCount: post.likes.count,
    retweetsCount: post.retweet.count,
    hasRetweeted: post.user.hasRetweeted,
    hasLiked: post.user.hasLiked,
    externalSourceProps: post.externalSource,
  }
}

class App extends React.Component {

  state = {
    cardsData: cardsData
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
    return (
      <div className="App">
        <div className="stories--container">
          {this.state.cardsData.map(
            (card) => <SocialCard {...getSocialCardProps(card)} onLike={this.hanldeClickLike} onRetweet={this.hanldeClickRetweet} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
