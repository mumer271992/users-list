import actionTypes from './types';

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.saveList: {
      const { list } = action;
      console.log('Users Reducer: ', list);
      return {
        list
      };
    }
    default:
      return state;
  }
};
