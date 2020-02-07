import http from './http';

const list = () => {
  return new Promise((resolve, reject) => {
    http
      .getList('/users.json')
      .then(resp => {
        resolve(resp);
      })
      .catch(error => reject(error));
  });
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    http
      .put(`/users/${id}.json`, data)
      .then(resp => {
        resolve(resp);
      })
      .catch(error => reject(error));
  });
};

const create = data => {
  return new Promise((resolve, reject) => {
    http
      .post('/users.json', data)
      .then(resp => {
        resolve(resp);
      })
      .catch(error =>
        reject((error && error.response && error.response.data) || {})
      );
  });
};

export default {
  list,
  update,
  create
};
