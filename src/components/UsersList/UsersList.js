import React from 'react';
import PropTypes from 'prop-types';

import './UsersList.scss';
import { dateFilter } from '../../shared/utility';

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
              <div>{dateFilter(item.created_at)}</div>
              <div className="actions">
                <button
                  className="btn btn-outline-success btn-sm mr-1"
                  data-test="edit-btn"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  data-test="status-update-btn"
                  onClick={() => onStatusUpdate(item.id, item.status)}
                >
                  {item.status === 'active' ? 'Lock User' : 'Activate User'}
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="users-list custom-card">
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
