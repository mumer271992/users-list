import { connect } from 'react-redux';
import Create from './Create';
import { createAndStoreUser } from '../../../store/users/action';

const mapStateToProps = state => ({
  loading: state.users.loading
});

const mapDispatchToProps = dispatch => ({
  create: (data, onSuccess, onError) =>
    dispatch(createAndStoreUser(data, onSuccess, onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
