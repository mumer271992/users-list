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
      .catch(error => {
        dispatch(hideLoading());
        console.log(error);
      });
  };
};

export const updateAndStoreUser = (id, data) => {
  return dispatch => {
    dispatch(showLoading());
    return api.user
      .update(id, data)
      .then(() => {
        dispatch(hideLoading());
        dispatch(updateUser(id, data));
      })
      .catch(error => {
        dispatch(showLoading());
        console.log(error);
      });
  };
};
