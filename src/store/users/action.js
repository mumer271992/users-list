import api from '../../api';
import actionTypes from './types';

export const saveUsers = list => ({
  type: actionTypes.saveList,
  list
});

export const updateUser = (id, data) => ({
  type: actionTypes.updateUser,
  id,
  data
});

export const showLoading = () => ({
  type: actionTypes.loading,
  loading: true
});

export const hideLoading = () => ({
  type: actionTypes.loading,
  loading: false
});

export const addUser = user => ({
  type: actionTypes.addUser,
  user
});

/* Async Actions */

export const fetchAndStoreUserslist = () => {
  return dispatch => {
    dispatch(showLoading());
    return api.user
      .list()
      .then(resp => {
        dispatch(hideLoading());
        if (resp) {
          dispatch(saveUsers(resp));
        }
      })
      .catch(() => {
        dispatch(hideLoading());
      });
  };
};

export const updateAndStoreUser = (id, data, onSuccess, onError) => {
  return dispatch => {
    dispatch(showLoading());
    return api.user
      .update(id, data)
      .then(() => {
        dispatch(hideLoading());
        dispatch(updateUser(id, data));
        if (onSuccess && typeof onSuccess === 'function') onSuccess();
      })
      .catch(err => {
        dispatch(hideLoading());
        if (onError && typeof onError === 'function') onError(err);
      });
  };
};

export const createAndStoreUser = (data, onSuccess, onError) => {
  return dispatch => {
    dispatch(showLoading());
    return api.user
      .create(data)
      .then(resp => {
        if (resp && resp.id) {
          dispatch(addUser(resp));
          dispatch(hideLoading());
          if (onSuccess && typeof onSuccess === 'function') onSuccess();
        }
      })
      .catch(err => {
        dispatch(hideLoading());
        if (onError && typeof onError === 'function') onError(err);
      });
  };
};
