import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

import { getItemsById } from '../services';

export default class CommentsData extends Component {

  static propTypes = {
    commentsId: PropTypes.array,
  };

  state = {
    comments: [],
    pending: false,
    mounted: false
  };

  async componentDidMount() {
    let comments = [];
    const { commentsId } = this.props; 

    if (commentsId.length > 0) {
      this.setState({ pending: true });
      const itemsPromise = this.props.commentsId.map(storyId => getItemsById(storyId));
      comments = await Promise.all(itemsPromise);
    }
    this.setState({ comments, mounted: true, pending: false })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.mounted && !shallowequal(prevProps.commentsId, this.props.commentsId)) {
      this.setState({ pending: true });
      const itemsPromise = this.props.commentsId.map(storyId => getItemsById(storyId));
      const comments = await Promise.all(itemsPromise);
      this.setState(oldState => ({
        comments: [...oldState.comments, ...comments],
        pending: false
      }))
    }
  }

  render() {
    const { mounted, ...state } = this.state; 
    return this.props.children({
      ...state
    });
  }
}
