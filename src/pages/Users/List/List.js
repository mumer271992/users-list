import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const List = ({ list, fetchUsers }) => {
  useEffect(() => {
    if (!list || !list.length) {
      console.log('Fetching List of users');
      fetchUsers();
    }
  }, [list, fetchUsers]);

  return <div className="users-list-page">This is users list page</div>;
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchUsers: PropTypes.func.isRequired
};

export default List;
