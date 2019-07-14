import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stories from './components/story/stories';
import Spinner from '../shared_component/spinner/spinner';


import { getStoriesByPath } from './services';

export default class HackerNewsPage extends Component {

  state = {
    loading: false,
    selection: 'newstories',
    stories: []
  };

  handleStoriesSelection = (event) => {
    this.setState({ selection: event.target.value });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const stories = await getStoriesByPath(this.state.selection);

    this.setState({ stories, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.selection !== this.state.selection) {
      this.setState({ loading: true });
      const stories = await getStoriesByPath(this.state.selection);
      this.setState({ stories, loading: false });
    }
  }
  

  render() {
    const { stories, loading } = this.state;
    if (stories.length === 0 || loading) return <Spinner />;
    return (
      <div className="hacker-news-page">
        <div className="page-header">
          <button value="topstories" onClick={this.handleStoriesSelection} >Top Stories</button>
          <button value="newstories" onClick={this.handleStoriesSelection} >New Stories</button>
          <button value="beststories" onClick={this.handleStoriesSelection} >Best Stories</button>
          <button value="askstories" onClick={this.handleStoriesSelection} >Ask Stories</button>
          <button value="showstories" onClick={this.handleStoriesSelection} >Show Stories</button>
          <button value="jobstories" onClick={this.handleStoriesSelection} >Job Stories</button>
        </div>
        <Stories stories={stories} />
      </div>
    );
  }
}
