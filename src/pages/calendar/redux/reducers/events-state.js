
const initialState = {};

const eventsStateReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'events/CREATE':
      const {year, month, day, title, description} = action;
      const node = `${year}/${month}/${day}`;
      const nodeEvents = state[node] || [];
      return {
        ...state,
        [node]: [
          ...nodeEvents,
          { title, description }
        ]
      };
    default:
      return state;
  }
}

export default eventsStateReducer;
