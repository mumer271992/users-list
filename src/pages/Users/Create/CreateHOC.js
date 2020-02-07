import { connect } from 'react-redux';
import Create from './Create';
import {
  createAndStoreUser,
  updateAndStoreUser
} from '../../../store/users/action';

const mapStateToProps = state => ({
  loading: state.users.loading,
  list: state.users.list
});

const mapDispatchToProps = dispatch => ({
  create: (data, onSuccess, onError) =>
    dispatch(createAndStoreUser(data, onSuccess, onError)),
  update: (id, data, onSuccess, onError) =>
    dispatch(updateAndStoreUser(id, data, onSuccess, onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
