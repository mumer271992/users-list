import http from './http';

const RESOURCE_URL = '/users.json';

const list = () => {
  return new Promise((resolve, reject) => {
    http
      .getList(RESOURCE_URL)
      .then(resp => {
        resolve(resp);
      })
      .catch(error => reject(error));
  });
};

export default {
  list
};
