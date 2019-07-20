import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

const initState = {
  pages: 0,
  currentPage: 0,
  itemsPage: [],
};

export default function usePaginator({ data, itemsPerPage }) {
    const [state, setState] = React.useState(initState);
    const dataRef = React.useRef(data);

    const initPaginator = () => {
      const pages = Math.ceil(data.length / itemsPerPage);
      const itemsPage = data.slice(0, itemsPerPage);
      setState({ pages, currentPage: 0, itemsPage });
    }

    const goPage = index => {
      const posInit = index * itemsPerPage;
      const posEnd = Math.min(posInit + itemsPerPage, data.length);
      const itemsPage = data.slice(posInit, posEnd);
      setState({ ...state, currentPage: index, itemsPage });
    }

    const nextPage = () => {
      goPage(Math.min(state.currentPage + 1, state.pages));
    }

    const prevPage = () => {
      goPage(Math.max(state.currentPage - 1, 0));
    }

    React.useEffect(() => {
      if (!shallowequal(data, dataRef.current)) {
        dataRef.current = data;
        initPaginator();
      }
    });

    return {
      ...state,
      prevPage: prevPage,
      nextPage: nextPage,
      goPage: goPage,
    };
}

usePaginator.propTypes = {
  data: PropTypes.array,
  itemsPerPage: PropTypes.number,
  children: PropTypes.func
};

usePaginator.defaultProps = {
  itemsPerPage: 10,
};
