/*
  TEST PLAN

  ✔ Should create an action to store users list 
  ✔ Should create an action to update specific user
  ✔ Should create an action to enable loading
  ✔ Should create an action to disbale loading
  ✔ Should create an action to add new user
  ✔ Should create an action to fetch users on success api response
  ✔ should create an action to fetch users on fail api response
  ✔ Should create an action to add user in stored list of users on success api response of create new user
  ✔ should show and the hide loader when add new user api call fails
  ✔ Should create an action to update existing user in stored list of users on success api response
  ✔ should show and hide loader on update user api call fails
*/

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import {
  saveUsers,
  updateUser,
  showLoading,
  hideLoading,
  addUser,
  createAndStoreUser,
  fetchAndStoreUserslist,
  updateAndStoreUser
} from './action';
import types from './types';
import { users } from '../../mockedData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});
const API_URL = 'http://js-assessment-backend.herokuapp.com';

describe('user store actions test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('should create an action to store users list', () => {
    const expectedAction = {
      type: types.saveList,
      list: users
    };
    expect(saveUsers(users)).toEqual(expectedAction);
  });
  it('should create an action to update specific user', () => {
    const targetUser = users[0];
    const expectedAction = {
      type: types.updateUser,
      id: targetUser.id,
      data: targetUser
    };
    expect(updateUser(targetUser.id, targetUser)).toEqual(expectedAction);
  });
  it('should create an action to enable loading', () => {
    const expectedAction = {
      type: types.loading,
      loading: true
    };
    expect(showLoading()).toEqual(expectedAction);
  });
  it('should create an action to disable loading', () => {
    const expectedAction = {
      type: types.loading,
      loading: false
    };
    expect(hideLoading()).toEqual(expectedAction);
  });
  it('should create an action to add new user', () => {
    const targetUser = users[0];
    const expectedAction = {
      type: types.addUser,
      user: targetUser
    };
    expect(addUser(targetUser)).toEqual(expectedAction);
  });
  it('should create an action to fetch users on success api response', async done => {
    mock.onGet(`${API_URL}/users.json`).reply(200, [...users]);
    await store.dispatch(fetchAndStoreUserslist()).then(() => {
      const expectedActions = [
        {
          type: types.loading,
          loading: true
        },
        {
          type: types.saveList,
          list: [...users]
        },
        {
          type: types.loading,
          loading: false
        }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
  it('should create an action to fetch users on fail api response', async done => {
    mock.onGet(`${API_URL}/users.json`).reply(401);
    await store.dispatch(fetchAndStoreUserslist()).then(() => {
      const expectedActions = [
        {
          type: types.loading,
          loading: true
        },
        {
          type: types.loading,
          loading: false
        }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
  it('should create an action to add user in stored list of users on success api response of create new user', async done => {
    const data = {
      first_name: 'Muhammad',
      last_name: 'Umer',
      status: 'active'
    };
    const onSuccess = jest.fn();
    const onError = jest.fn();
    mock.onPost(`${API_URL}/users.json`).reply(200, { id: 1, ...data });

    await store
      .dispatch(createAndStoreUser(data, onSuccess, onError))
      .then(() => {
        const expectedActions = [
          {
            type: types.loading,
            loading: true
          },
          {
            type: types.addUser,
            user: { id: 1, ...data }
          },
          {
            type: types.loading,
            loading: false
          }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(onSuccess).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
      });
    done();
  });
  it('should show and the hide loader when add new user api call fails', async done => {
    const data = {
      first_name: 'Muhammad',
      last_name: 'Umer',
      status: 'active'
    };
    const onSuccess = jest.fn();
    const onError = jest.fn();
    mock.onPost(`${API_URL}/users.json`).reply(401);

    await store
      .dispatch(createAndStoreUser(data, onSuccess, onError))
      .then(() => {
        const expectedActions = [
          {
            type: types.loading,
            loading: true
          },
          {
            type: types.loading,
            loading: false
          }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(onSuccess).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
    done();
  });
  it('should create an action to update existing user in stored list of users on success api response', async done => {
    const data = {
      id: 1,
      first_name: 'Muhammad',
      last_name: 'Umer',
      status: 'active'
    };
    const onSuccess = jest.fn();
    const onError = jest.fn();
    mock.onPut(`${API_URL}/users/${data.id}.json`).reply(200);

    await store
      .dispatch(updateAndStoreUser(data.id, data, onSuccess, onError))
      .then(() => {
        const expectedActions = [
          {
            type: types.loading,
            loading: true
          },
          {
            type: types.updateUser,
            id: data.id,
            data
          },
          {
            type: types.loading,
            loading: false
          }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(onSuccess).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
      });
    done();
  });
  it('should show and hide loader on update user api call fails', async done => {
    const data = {
      id: 1,
      first_name: 'Muhammad',
      last_name: 'Umer',
      status: 'active'
    };
    const onSuccess = jest.fn();
    const onError = jest.fn();
    mock.onPut(`${API_URL}/users/${data.id}.json`).reply(401);

    await store
      .dispatch(updateAndStoreUser(data.id, data, onSuccess, onError))
      .then(() => {
        const expectedActions = [
          {
            type: types.loading,
            loading: true
          },
          {
            type: types.loading,
            loading: false
          }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(onSuccess).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
    done();
  });
});
