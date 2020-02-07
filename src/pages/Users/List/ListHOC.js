import { connect } from 'react-redux';
import List from './List';
import {
  fetchAndStoreUserslist,
  updateAndStoreUser
} from '../../../store/users/action';

const mapStateToProps = state => ({
  list: state.users.list,
  loading: state.users.loading
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchAndStoreUserslist()),
  update: (id, data) => dispatch(updateAndStoreUser(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
