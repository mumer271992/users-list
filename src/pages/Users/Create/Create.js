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

  return (
    <div className="create-user">
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify(errors)}</pre>
        <div>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={user.first_name}
            name="first_name"
            onChange={handleChange}
          />
          <span>{errors && errors.first_name && errors.first_name[0]}</span>
        </div>
        <div>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
          <span>{errors && errors.last_name && errors.last_name[0]}</span>
        </div>
        <div>
          <label>
            Status <span>{errors && errors.status && errors.status[0]}</span>
          </label>
          <select name="status" value={user.status} onChange={handleChange}>
            {userStatuses &&
              userStatuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
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
