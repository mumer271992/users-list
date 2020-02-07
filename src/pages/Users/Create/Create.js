/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import './Create.scss';

const Create = ({ list, create, update }) => {
  const history = useHistory();
  const { userId } = useParams();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const onSuccess = () => history.push('/list');
  const onError = error => setErrors(error);

  const handleSubmit = e => {
    e.preventDefault();
    if (user && user.id) {
      update(user.id, { ...user }, onSuccess, onError);
    } else {
      create({ ...user }, onSuccess, onError);
    }
  };

  const mapInputFieldWithError = (inputField, key) => {
    return (
      <div>
        {inputField}
        <span>
          {errors && errors[key] && errors[key][0]
            ? `${key} ${errors[key][0]}`
            : ''}
        </span>
      </div>
    );
  };

  useEffect(() => {
    if (userId) {
      const targetUser = list.find(item => item.id === parseInt(userId, 10));
      if (targetUser) {
        setUser({
          id: targetUser.id,
          first_name: targetUser.first_name,
          last_name: targetUser.last_name
        });
      }
    }
  }, [list, userId]);

  return (
    <div className="create-user">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          {mapInputFieldWithError(
            <input
              placeholder="First Name"
              value={user.first_name}
              name="first_name"
              onChange={handleChange}
            />,
            'first_name'
          )}
        </div>
        <div>
          <label>Last Name</label>
          {mapInputFieldWithError(
            <input
              placeholder="Last Name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
            />,
            'last_name'
          )}
        </div>
        <button type="submit">
          {`${user && user.id ? 'Update' : 'Create'}`} User
        </button>
      </form>
    </div>
  );
};

Create.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  create: PropTypes.func,
  update: PropTypes.func
};

Create.defaultProps = {
  list: [],
  create: () => {},
  update: () => {}
};

export default Create;
