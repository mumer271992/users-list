/*
  TEST PLAN

  ✔ Should return the initial state 
  ✔ Should return state with users list
  ✔ Should return state loading enabled
  ✔ Should store new user in users list
  ✔ Should update existing user in users list
*/

import reducer from './reducer';
import types from './types';
import { users } from '../../mockedData';

describe('todos reducer', () => {
  const initialState = {
    list: [],
    loading: false
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return state with users list', () => {
    const result = reducer(initialState, {
      type: types.saveList,
      list: [...users]
    });
    const expected = {
      list: [...users]
    };
    expect(result).toEqual(expected);
  });

  it('should return state loading enabled', () => {
    const result = reducer(initialState, {
      type: types.loading,
      loading: true
    });
    const expected = {
      ...initialState,
      loading: true
    };
    expect(result).toEqual(expected);
  });

  it('should store new user in users list', () => {
    const newUser = {
      ...users[0],
      id: users[0].id * 2
    };
    const result = reducer(initialState, {
      type: types.addUser,
      user: newUser
    });
    const expected = {
      ...initialState,
      list: [newUser]
    };
    expect(result).toEqual(expected);
  });
  it('should update existing user in users list', () => {
    const targetUser = { ...users[0] };
    const updatedUser = {
      ...users[0],
      status: targetUser.status === 'active' ? 'locked' : 'active'
    };
    const result = reducer(
      { ...initialState, list: [...users] },
      {
        type: types.updateUser,
        id: updatedUser.id,
        data: updatedUser
      }
    );
    const updatedList = [...users];
    updatedList[0] = updatedUser;
    const expected = {
      ...initialState,
      list: [...updatedList]
    };
    expect(result).toEqual(expected);
  });
});
