/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import './Create.scss';
import Loader from '../../../components/Loader/Loader';

const Create = ({ list, create, update, loading }) => {
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
        <span className="error">
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
    <div className="container page create-user">
      <h3>{`${user && user.id ? 'Update' : 'Create New'}`} User</h3>
      <div className="custom-card mt-4 position-relative">
        <form onSubmit={handleSubmit}>
          {loading && <Loader />}
          <div className="form-group">
            <label>First Name</label>
            {mapInputFieldWithError(
              <input
                className="form-control"
                data-test="first_name"
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
                className="form-control"
                data-test="last_name"
                placeholder="Last Name"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
              />,
              'last_name'
            )}
          </div>
          <div className="text-right mt-4">
            <button
              className="btn btn-secondary btn-sm mr-2"
              onClick={onSuccess}
            >
              Cancel
            </button>
            {/* TODO: Submit button should be disabled until values are filled */}
            <button
              className="btn btn-primary btn-sm"
              data-test="action-btn"
              type="submit"
              // disabled={!user.first_name || !user.last_name}
            >
              {`${user && user.id ? 'Update' : 'Create'}`} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  create: PropTypes.func,
  update: PropTypes.func,
  loading: PropTypes.bool
};

Create.defaultProps = {
  list: [],
  create: () => {},
  update: () => {},
  loading: false
};

export default Create;
