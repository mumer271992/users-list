import { saveUsers } from './action';
import types from './types';
import { users } from '../../mockedData';

describe('user store actions test', () => {
  it('should create an action to store users list', () => {
    const expectedAction = {
      type: types.saveList,
      list: users
    };
    expect(saveUsers(users)).toEqual(expectedAction);
  });
});
