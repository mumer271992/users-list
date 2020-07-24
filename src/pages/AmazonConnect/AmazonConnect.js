import React from "react";
import {connect} from 'react-redux'
import 'amazon-connect-streams';

// import Button from "components/CustomButtons/Button.jsx";
// import {receiveCallAttr, initCall, callFlow} from 'store/apps/AppSettings/actions';


class AmazonConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false,
      reloadAttempts:0,
      activeCall:{},
      cip:false,
      agentQueueNumber:"xxxxxxxxxx",
      recordingQueueNumber:"xxxxxxxxxx"
    };
    this.awsConnect = this.awsConnect.bind(this)
    this.loginWindow = this.loginWindow.bind(this);
    this.activeWindow = this.activeWindow.bind(this);
    this.initCall = this.initCall.bind(this)
    this.initContact = this.initContact.bind(this)
    this.redirect = this.redirect.bind(this)
  }


  componentWillReceiveProps(newProps){
    const {AppSettings, initCall, callFlow} = newProps
    const {cip, active} = this.state
    if( active && !cip){
      this.setState({activeCall: AppSettings.call})
      if(AppSettings.call.number){
        console.log("init call")
        this.initCall(AppSettings.call.number)
        initCall({})
      }
      else{
        console.log("Invalid Phone number")
      }
      if( AppSettings.flow !== "" ){
        this.setState({activeFlow: AppSettings.flow})
        this.initCallFlow(AppSettings.flow)
        callFlow("")
      }
    }

}

  initCallFlow = flow => new Promise((res, rej) => {
    if(this.contact){
    console.log(this.contact)
    let endpoint;
    switch(flow){
      case "agentQueue":
        endpoint = window.connect.Endpoint.byPhoneNumber(this.state.agentQueueNumber);
        this.contact.addConnection(endpoint, {
          success: function() {
            this.contact.conferenceConnections({
                success: function() { 
                  console.log("confrence success")
                  res("successfullly init ssn flow")
                 },
                failure: function() { 
                  console.log("confrence failure")
                  res("successfullly init ssn flow")
                }
            });

          },
          failure: function() { 
            rej("failed to init ssn flow")
           }
        });
        break
      case "recordingQueue":
        endpoint = window.connect.Endpoint.byPhoneNumber(this.state.recordingQueueNumber);
        this.contact.addConnection(endpoint, {
          success: function() {
            res("successfullly init recording flow")
          },
          failure: function() { 
            rej("failed to init recording flow")
           }
        });
        break
      default:
       res()
      break
    }
  }
  else{
    rej("no contact available")
  }
  })




  awsConnect = () => new Promise((res, rej) => {
    window.connect.core.initCCP(document.getElementById("softPhone"), {
      ccpUrl:        "https://pak-venture.awsapps.com/connect/ccp-v2/",        /*REQUIRED*/
      loginPopup:    true,          /*optional, default TRUE*/
      softphone:     {              /*optional*/
          disableRingtone:  false,    /*optional*/
          allowFramedSoftphone: true
      }
    });


    this.bus = window.connect.core.getEventBus();


    this.bus.subscribe(window.connect.AgentEvents.INIT, (agent) => {
      this.activeWindow()
    });

    this.bus.subscribe(window.connect.EventType.TERMINATED, () => {
      console.log("TERMINATED")
      this.setState({cip:false})
      this.logout()
    });

    this.bus.subscribe(window.connect.EventType.AUTH_FAIL, () => {
      console.log("AUTH_FAIL")
      this.logout()
    })


    window.connect.agent(function(agent) {
      const w = window.open('', window.connect.MasterTopics.LOGIN_POPUP);
      if (w) {
        w.close()
      }
    });

    window.connect.contact((contact) => { 
      this.contact = contact

      const {receiveCallAttr} = this.props
       try{
         var attr = contact.getAttributes()
         attr.active = true
         console.log(attr)
         receiveCallAttr(attr)
         this.redirect()
       }
       catch(err){
         console.log(err)
       }
      contact.onEnded(() => {
        console.log("call ended")
        receiveCallAttr({active:false})
        this.setState({cip:false})
        this.contact = null
      })

    });

    res()
    })

  initContact = () => {
    this.setState({cip:false})
  }

  redirect = () => {
    const {location, auth, history} = this.props
    switch(auth.user.type){
      case "Agent":
        if(location.pathname !== "/agent/management"){
          history.push({
            pathname: '/agent/management',
            search: '',
            state: {}
          })
        }
        break;
      case "Service":
      //handle redirect to service page
      if(location.pathname !== "/service/dashboard"){
        history.push({
          pathname: "/service/dashboard",
          search: '',
          state: {}
        })
      }
       break;
      default:
        break
    }

  }

  initCall = (phone) => {
    this.initContact()
      window.connect.agent(function(agent) {
        const endpoint = window.connect.Endpoint.byPhoneNumber(phone)
         agent.connect(endpoint , {
               queueARN : process.env.CONNECT_QUEUE_ARN,
               success : function(){
                 console.log("Success call!!!!!!")

                },
               failure : function(){
                 console.log("Call failed!!!!!!!")
                }
        });
      });
  }


  logout(){
    this.setState({cip:false})
    this.loginWindow()
    this.agent = null
    this.contact = null
    window.connect.core.terminate();
    window.connect.core.client = new window.connect.NullClient();
    window.connect.core.masterClient = new window.connect.NullClient();
    window.connect.core.eventBus = new window.connect.EventBus();
    window.connect.core.initialized = false;
    this.bus = false;
    var myNode = document.getElementById("softPhone")
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
  }


  componentWillUnmount() {
     console.log("terminating aws connect session")
     this.logout()
  }
 

  loginWindow(){
    this.setState({active:false})
  }

  activeWindow(){
    this.setState({active:true})
  }



  render() {

    const displaylogin = this.state.active? "none":"block";
    const displayConnect = this.state.active? "block":"none";
    return (
      <div>
          <button onClick={this.awsConnect} style={{display:displaylogin, width:320}}>Login to AWS Connect</button>
          <div id="softPhone" style={{height:465,width:320, display:displayConnect}}>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
   return state
}

export default AmazonConnect;