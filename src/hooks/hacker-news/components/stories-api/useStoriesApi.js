import React from 'react';

import { getItemsById, getStoriesByPath } from './services';

const HNContext = React.createContext({});

const composeReducers = (reducers) => {
  const reducersKeys = Object.keys(reducers);
  return (...args) => {
    return reducersKeys.reduce((state, keyReducer) => {
      return {
        ...state,
        [keyReducer]: reducers[keyReducer](state[keyReducer], args[1])
      };
    }, args[0])
  }
}

const HNstoriesIdReducer = (state, {type, payload}) => {
  switch(type) {
    case 'GET_STORIE_IDS':
      return { ...state, pending: true };
    case 'SUCCESS_GET_STORIE_IDS':
      return { ...state, pending: false, success: true, payload };
    case 'ERROR_GET_STORIE_IDS':
      return { ...state, pending: false, error: true, payload }
    default:
      return state;
  }
}

const HNstoriesReducer = (state, {type, payload}) => {
  switch(type) {
    case 'SUCCESS_GET_STORIES':
      return payload
    case 'ERROR_GET_STORIES':
      return payload
    default:
      return state;
  }
}

const HNcommentsReducer = (state, {type, payload}) => {
  switch(type) {
    case 'SUCCESS_GET_COMMENTS':
      return { ...state, ...payload }
    case 'ERROR_GET_COMMENTS':
      return { ...state, ...payload }
    default:
      return state;
  }
}

const reducerIdentity = CHECK_TYPE => (state, { type }) => {
  if (Array.isArray(CHECK_TYPE)) {
    return CHECK_TYPE.includes(type) ? true : state;
  }
  return type === CHECK_TYPE ? true : state;
};

const HNReducers = composeReducers({
  storiesids: HNstoriesIdReducer,
  stories: composeReducers({
    pending: reducerIdentity([
      'GET_STORIES', 'SUCCESS_GET_STORIES', 'ERROR_GET_STORIES',
      'GET_COMMENTS', 'SUCCESS_GET_COMMENTS', 'ERROR_GET_COMMENTS',
    ]),
    success: reducerIdentity('SUCCESS_GET_STORIES'),
    error: reducerIdentity('ERROR_GET_STORIES'),
    asArray: HNstoriesReducer,
    storiesComments: HNcommentsReducer
  }),
});

export const HNProvider = () => {
  const [state, dispatch] = React.useReducer(HNReducers, {
    storiesIds: {
      pending: false,
      success: false,
      error: false
    },
    stories: {
      pending: false,
      success: false,
      error: false,
      asArray: [],
      storiesComments: {}
    }
  });

  const retrieveStoriesIds = async (kind) => {
    dispatch({ type: 'GET_STORIE_IDS' });
    try {
      const storiesIds = await getStoriesByPath(kind)
      dispatch({type: 'SUCCESS_GET_STORIE_IDS', payload: storiesIds });
    } catch ({response}) {
      dispatch({type: 'ERROR_GET_STORIE_IDS', payload: response });
    }
  };

  const retrieveStories = async (storiesIds) => {
    if (storiesIds.length === 0) return;
    dispatch({ type: 'GET_STORIES' });
    try {
      const itemsPromise = storiesIds.map(storyId => getItemsById(storyId));
      const stories = await Promise.all(itemsPromise);
      dispatch({ type: 'SUCCESS_GET_STORIES', payload: stories });
    } catch (err) {
      dispatch({ type: 'ERROR_GET_STORIES', payload: err.response });
    }
  };

  const retrieveComments = async (commentsIds, parentId) => {
    if (commentsIds.length === 0) return;
    dispatch({ type: 'GET_COMMENTS' });
    try {
      const itemsPromise = commentsIds.map(commentId => getItemsById(commentId));
      const stories = await Promise.all(itemsPromise);
      dispatch({ type: 'SUCCESS_GET_COMMENTS', payload: { [parentId]: stories } });
    } catch (err) {
      dispatch({ type: 'ERROR_GET_COMMENTS', payload: err.response });
    }
  };

  return <HNContext.Provider value={{
    ...state,
    retrieveStoriesIds,
    retrieveStories,
    retrieveComments
  }}/>
}

export const useHNContext = () => {
  const context = React.useContext(HNContext);
  if (!context) {
    throw new Error(
      'useHNContext cannot be used outside HNContext',
    );
  }
  return context;
};
