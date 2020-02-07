/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './Create.scss';

const userStatuses = ['active', 'locked'];
const Create = ({ create }) => {
  const history = useHistory();
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
    e.stopPropagation();
    create({ ...user }, onSuccess, onError);
  };

  const mapInputFieldWithError = (inputField, key) => {
    return (
      <div>
        {inputField}
        <span>{errors && errors[key] && errors[key][0]}</span>
      </div>
    );
  };

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
        <div>
          <label>Status</label>
          {mapInputFieldWithError(
            <select name="status" value={user.status} onChange={handleChange}>
              {userStatuses &&
                userStatuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
            </select>,
            'status'
          )}
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

Create.propTypes = {
  create: PropTypes.func
};

Create.defaultProps = {
  create: () => {}
};

export default Create;
