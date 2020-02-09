import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import UsersList from '../../../components/UsersList/UsersList';
import Loader from '../../../components/Loader/Loader';

const List = ({ list, loading, fetchUsers, update }) => {
  const history = useHistory();
  const [state, setState] = useState({
    page: 1,
    pageSize: 10,
    users: []
  });

  const onPrevPage = useCallback(() => {
    const start = (state.page - 2) * state.pageSize;
    const end = start + state.pageSize;
    setState({
      ...state,
      page: state.page - 1,
      users: list.slice(start, end)
    });
  }, [list, state.page, state.pageSize]);

  const populateCurrrentPage = useCallback(() => {
    const start = state.pageSize * (state.page - 1);
    const end = start + state.pageSize;
    setState({
      ...state,
      users: list.slice(start, end)
    });
  }, [list, state.pageSize, state.page]);

  const onNextPage = useCallback(() => {
    const start = state.pageSize * state.page;
    const end = start + state.pageSize;
    setState({
      ...state,
      page: state.page + 1,
      users: list.slice(start, end)
    });
  }, [list, state.page, state.pageSize]);

  const hasNextPage = () => {
    return Math.ceil(list.length / state.pageSize) > state.page;
  };

  const updateStatus = (id, status) => {
    const data = {
      status
    };
    update(id, data);
  };

  const editUser = data => history.push(`/edit/${data.id}`);

  useEffect(() => {
    if (!list || !list.length) {
      fetchUsers();
    }

    if (list && list.length) {
      populateCurrrentPage();
    }
  }, [list, fetchUsers]);

  return (
    <div className="container page users-list-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>UsersList</h3>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => history.push('/new')}
        >
          Add New User
        </button>
      </div>
      <div className="position-relative">
        {loading && <Loader />}
        <UsersList
          list={state.users}
          updateStatus={updateStatus}
          onEdit={editUser}
        />
      </div>
      {list && list.length && (
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-secondary btn-sm"
            data-test="prev-btn"
            onClick={() => onPrevPage()}
            disabled={state.page && state.page < 2}
          >
            Load Prev Page
          </button>
          <button
            className="btn btn-secondary btn-sm"
            data-test="next-btn"
            onClick={() => onNextPage()}
            disabled={!hasNextPage()}
          >
            Load Next Page
          </button>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  fetchUsers: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

List.defaultProps = {
  loading: false
};

export default List;
