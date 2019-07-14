import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

import { getItemsById } from '../services';

export default class StoriesData extends Component {

  static propTypes = {
    storiesId: PropTypes.array,
  };

  state = {
    stories: [],
    pending: false,
    mounted: false
  };

  async componentDidMount() {
    this.setState({ pending: true });
    const itemsPromise = this.props.storiesId.map(storyId => getItemsById(storyId));
    const stories = await Promise.all(itemsPromise);
    this.setState({ stories, mounted: true, pending: false })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.mounted && !shallowequal(prevProps.storiesId, this.props.storiesId)) {
      this.setState({ pending: true });
      const itemsPromise = this.props.storiesId.map(storyId => getItemsById(storyId));
      const stories = await Promise.all(itemsPromise);
      this.setState({ stories, pending: false })
    }
  }

  render() {
    const { mounted, ...state } = this.state; 
    return this.props.children({
      ...state
    });
  }
}
