import actionTypes from './types';

const defaultState = {
  list: [],
  loading: false,
  selectedUser: {}
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
      existingList.push(user);
      return {
        ...state,
        list: existingList
      };
    }
    case actionTypes.selectUser: {
      const { user } = action;
      return {
        ...state,
        selectedUser: user
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
