import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

export default class Paginator extends React.Component {
  
  static propTypes = {
    data: PropTypes.array,
    itemsPerPage: PropTypes.number,
    children: PropTypes.func
  };

  static defaultProps = {
    itemsPerPage: 10,
  };
  
  state = {
    pages: 0,
    currentPage: 0,
    itemsPage: [],
  };

  componentDidMount() {
    this.initPaginator();
  }
  

  componentDidUpdate(prevProps) {
    if (
      !shallowequal(prevProps.data, this.props.data) ||
      prevProps.itemsPerPage !== this.props.itemsPerPage
    ) {
      this.initPaginator();
    }
  }

  initPaginator = () => {
    const pages = Math.ceil(this.props.data.length / this.props.itemsPerPage);
    const itemsPage = this.props.data.slice(0, this.props.itemsPerPage);
    this.setState({ pages, currentPage: 0, itemsPage });
  }
  
  goPage = index => {
    const posInit = this.state.currentPage + 1;
    const posEnd = Math.min(posInit + this.props.itemsPerPage, this.props.data.length);
    const itemsPage = this.props.data.slice(posInit, posEnd);
    this.setState({ currentPage: index, itemsPage });
  }
  
  nextPage = () => {
    this.goPage(Math.min(this.state.currentPage + 1, this.state.pages));
  }
  
  prevPage = () => {
    this.goPage(Math.max(this.state.currentPage - 1, 0));
  }
  
  getStateAndHelpers = () => ({
    ...this.state,
    prevPage: this.prevPage,
    nextPage: this.nextPage,
    goPage: this.goPage,
  });

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}
