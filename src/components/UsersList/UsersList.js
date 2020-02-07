import React from 'react';
import PropTypes from 'prop-types';

import './UsersList.scss';

const UsersList = ({ list, updateStatus, onEdit }) => {
  const onStatusUpdate = (id, status) => {
    updateStatus(id, status === 'locked' ? 'active' : 'locked');
  };

  const generateUsersList = () => {
    return (
      <div>
        {list &&
          list.length &&
          list.map(item => (
            <div
              key={item.id}
              data-test="users-list-item"
              className={`${
                item.status === 'locked' ? 'line-through' : ''
              } users-list-item`}
            >
              <div>{item.first_name}</div>
              <div>{item.last_name}</div>
              <div>{item.created_at}</div>
              <div>
                <button onClick={() => onEdit(item)}>Edit</button>
                <button onClick={() => onStatusUpdate(item.id, item.status)}>
                  {item.status === 'active' ? 'Lock User' : 'Activate User'}
                </button>
              </div>
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
        <div>Actions</div>
      </div>
      {generateUsersList()}
    </div>
  );
};

UsersList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateStatus: PropTypes.func,
  onEdit: PropTypes.func
};

UsersList.defaultProps = {
  updateStatus: () => {},
  onEdit: () => {}
};

export default UsersList;
