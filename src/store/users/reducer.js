import actionTypes from './types';

const defaultState = {
  list: [],
  loading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.saveList: {
      const { list } = action;
      return {
        list
      };
    }
    case actionTypes.updateUser: {
      const { id, data } = action;
      const index = state.list.findIndex(item => item.id === id);
      const existingList = [...state.list];
      if (index > -1) {
        existingList[index] = {
          ...existingList[index],
          ...data
        };
      }
      return {
        ...state,
        list: existingList
      };
    }
    case actionTypes.addUser: {
      const { user } = action;
      const existingList = [...state.list];
      console.log('List Size Before: ', existingList.length);
      existingList.push(user);
      console.log('List Size After: ', existingList.length);
      return {
        ...state,
        list: existingList
      };
    }
    case actionTypes.loading: {
      const { loading } = action;
      return {
        ...state,
        loading
      };
    }
    default:
      return state;
  }
};
