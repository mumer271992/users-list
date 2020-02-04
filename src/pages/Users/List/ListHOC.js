import { connect } from 'react-redux';
import List from './List';
import { fetchAndStoreUserslist } from '../../../store/users/action';

const mapStateToProps = state => ({
  list: state.users.list
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchAndStoreUserslist())
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
