import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import users from './users/reducer';

const reducers = combineReducers({
  users
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
