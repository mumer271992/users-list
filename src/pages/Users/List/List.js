import React, { useEffect, useState, useCallback } from 'react';
import PropTypes, { func } from 'prop-types';
import { useHistory } from 'react-router-dom';
// import CCPWrapper from 'aws-ccp';
// import UsersList from '../../../components/UsersList/UsersList';
// import Loader from '../../../components/Loader/Loader';

// import 'amazon-connect-streams';

// var instanceURL = 'https://pak-venture.awsapps.com/connect/ccp-v2/';
// var bus;

// function initCCP(activeWindow) {
//   // initialize the ccp
//   window.connect.core.initCCP(document.getElementById('containerDiv'), {
//     ccpUrl: instanceURL,
//     loginPopup: true,
//     loginPopupAutoClose: true,
//     region: 'eu-central-1',
//     softphone: {
//       allowFramedSoftphone: true,
//       disableRingtone: false,
//       ringtoneUrl: './ringtone.mp3'
//     }
//   });
//   bus = window.connect.core.getEventBus();
//   bus.subscribe(window.connect.AgentEvents.INIT, () => {
//     console.log("CCP Initiaalized...");
//     activeWindow(true);
//   });
// }

// function initCall(phone) {
//   window.connect.agent(function(agent) {
//     const endpoint = window.connect.Endpoint.byPhoneNumber('+1-800-555-1212');
//     agent.connect(endpoint, {
//       queueARN: process.env.CONNECT_QUEUE_ARN,
//       success: function(){
//         console.log("Success call!!!!!!")

//       },
//       failure: function(e){
//         console.log("Call failed!!!!!!!")
//         console.log(e);
//       }
//     });
//   });
// }

const List = ({ list, loading, fetchUsers, update }) => {
  // const history = useHistory();
  // const [state, setState] = useState({
  //   page: 1,
  //   pageSize: 10,
  //   users: []
  // });

  // const [active, setActive] = useState(false);

  // const init = () => {
  //   initCCP(setActive);
  // };

  // const onPrevPage = useCallback(() => {
  //   const start = (state.page - 2) * state.pageSize;
  //   const end = start + state.pageSize;
  //   setState({
  //     ...state,
  //     page: state.page - 1,
  //     users: list.slice(start, end)
  //   });
  // }, [list, state]);

  // const populateCurrrentPage = useCallback(() => {
  //   const start = state.pageSize * (state.page - 1);
  //   const end = start + state.pageSize;
  //   setState({
  //     ...state,
  //     users: list.slice(start, end)
  //   });
  // }, [list, state]);

  // const onNextPage = useCallback(() => {
  //   const start = state.pageSize * state.page;
  //   const end = start + state.pageSize;
  //   setState({
  //     ...state,
  //     page: state.page + 1,
  //     users: list.slice(start, end)
  //   });
  // }, [list, state]);

  // const hasNextPage = () => {
  //   return Math.ceil(list.length / state.pageSize) > state.page;
  // };

  // const updateStatus = (id, status) => {
  //   const data = {
  //     status
  //   };
  //   update(id, data);
  // };

  // const editUser = data => history.push(`/edit/${data.id}`);

  // useEffect(() => {
  //   if (!list || !list.length) {
  //     fetchUsers();
  //   }

  //   if (list && list.length) {
  //     populateCurrrentPage();
  //   }
  // }, [list, fetchUsers]);

  // useEffect(() => {
  //   console.log("Streams Connect");
  //   console.log(window.connect);
  //   setTimeout(() => {
  //     const containerDiv = document.getElementById('containerDiv');
  //     if (containerDiv) {
  //       initCCP(containerDiv);
  //     }
  //   }, 2000);
  //   console.log("Running...");
  // }, []);

  const [number, setNumber] = useState('');

  const onNumberChange = e => {
    setNumber(e.target.value);
  };

  const call = () => {
    console.log(number);
    // CCPWrapper.call(number)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => console.log(error));
  };

  // useEffect(() => {
  //   if (CCPWrapper) {
  //     const config = {
  //       ccpUrl: "https://pak-venture.awsapps.com/connect/ccp-v2/",
  //       loginPopup: true,
  //       loginPopupAutoClose: true,
  //       region: 'eu-central-1',
  //       softphone: {
  //         allowFramedSoftphone: true,
  //         disableRingtone: false,
  //         ringtoneUrl: './ringtone.mp3'
  //       }
  //     };
  //     CCPWrapper.init(config);
  //   }
  // }, []);

  return (
    <div className="container page users-list-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>Amazone Conect Contact Panel Integration</div>
        <input type="text" value={number} onChange={onNumberChange} />
        <button onClick={call}>Call</button>
        {/* <button onClick={CCPWrapper.show}>Show CCP</button> */}
        {/* <div>
          <button onClick={init} style={{display: active ? "none" : "block", width:320}}>Login to AWS Connect</button>
          <button onClick={initCall} style={{ display: active ? "block" : "none" }}>Call to Customer</button>
        </div> */}
      </div>
      <iframe
        title="aws-login"
        src="https://pak-venture.awsapps.com/connect/login"
        height="400"
        width="400"
        frameBorder="0"
        name="cake"
      />
      {/* <div id="containerDiv" style={{ width: '400px', height: '560px', margin: 'auto', display: active ? "block" : "none" }} /> */}
      {/* <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>UsersList</h3>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => history.push('/new')}
        >
          Add New User
        </button>
      </div> */}
      {/* <div className="position-relative">
        {loading && <Loader />}
        <UsersList
          list={state.users}
          updateStatus={updateStatus}
          onEdit={editUser}
        />
      </div> */}
      {/* {list && list.length && (
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
      )} */}
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
