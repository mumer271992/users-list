import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import UsersList from '../../../components/UsersList/UsersList';

const List = ({ list, fetchUsers }) => {
  const initialState = {
    page: 0,
    pageSize: 10,
    users: []
  };
  const [state, setState] = useState(initialState);

  const onNextPage = useCallback(() => {
    const start = state.pageSize * state.page;
    const end = start + state.pageSize;

    setState({
      ...initialState,
      page: state.page + 1,
      users: list.slice(start, end)
    });
  }, [list, state]);

  useEffect(() => {
    if (!list || !list.length) {
      fetchUsers();
    }
    // Populate first page
    if (list && list.length) {
      onNextPage();
    }
  }, [list, fetchUsers]);

  return (
    <div className="users-list-page">
      <UsersList list={state.users} />
      <button onClick={() => onNextPage()}>Load Next</button>
    </div>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchUsers: PropTypes.func.isRequired
};

export default List;
