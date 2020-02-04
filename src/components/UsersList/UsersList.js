import React from 'react';
import PropTypes from 'prop-types';

import './UsersList.scss';

const UsersList = ({ list }) => {
  const generateUsersList = () => {
    return (
      <div>
        {list &&
          list.length &&
          list.map(item => (
            <div
              key={item.id}
              data-test="users-list-item"
              className="users-list-item"
            >
              <div>{item.first_name}</div>
              <div>{item.last_name}</div>
              <div>{item.created_at}</div>
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="users-list">
      <div className="users-list-item headers">
        <div>First Name</div>
        <div>Last Name</div>
        <div>Created At</div>
      </div>
      {generateUsersList()}
    </div>
  );
};

UsersList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default UsersList;
