import actionTypes from './types';

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.saveList: {
      const { list } = action;
      return {
        list
      };
    }
    default:
      return state;
  }
};
