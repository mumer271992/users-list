import api from '../../api';
import actionTypes from './types';

export const saveUsers = list => ({
  type: actionTypes.saveList,
  list
});

export const fetchAndStoreUserslist = () => {
  return dispatch => {
    return api.user
      .list()
      .then(resp => {
        if (resp) {
          dispatch(saveUsers(resp));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
