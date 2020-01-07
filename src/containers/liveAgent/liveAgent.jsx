import React, { Component } from 'react'
import axios from 'axios';
import './liveAgent.css';
import SockJsClient from 'react-stomp';

 class landingPage extends Component {
     constructor(props) {
       super(props)
     
       this.state = {
        hrbot:'',
        telecom:'',
        pension:'',
        liveAgent:[],
        LoginData: JSON.parse(localStorage.getItem('userLoginDto')),
        
       }
     }

     componentDidMount(){
         debugger
        let urlQuery = this.props.history.location.state ? this.props.history.location.state : "";
        this.liveAgent();
     }

     liveAgent = () =>{
       debugger
        var utteranceObj={};
        utteranceObj.botType=this.props.history.location.state ? this.props.history.location.state : "";
        axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/getActiveUsers', utteranceObj, {

        }).then(response => {
            debugger
            localStorage.setItem('userLoginDto', JSON.stringify(response.data))
            console.log("getBotResponce=", response.data)
            this.setState({liveAgent:response.data.logged_users})
        }).catch(error => {
            console.log(error);
        });
        
    }

    submit = (value,Status)=>{
        var submitedData = {}
        submitedData.LoginData = this.state.LoginData;
        submitedData.clickedUser = value
        submitedData.Status = Status
        submitedData.botType=this.props.history.location.state ? this.props.history.location.state : "";
        this.props.history.push('/liveAgentBot',submitedData)
    }
   
    loggedWebSocket=(activeUsers)=>{
        debugger
        var type=this.props.history.location.state ? this.props.history.location.state : "";
        if(activeUsers.botType===type){
        this.setState({liveAgent:activeUsers.logged_users})
        }
    }
     
    render() {
    console.log("liveAgents=========",this.state.liveAgent)
           
    const liveAgentsData  = this.state.liveAgent.map((value, index) => {
    console.log("value",value)
    return (
        
        value.agentChat == true ? 
        <div className="cards-list1">
            
        
            <div className="card1 1 button" onClick={()=>this.submit(value,"Active")}>
            <div className="card_image"> <img src="https://media.giphy.com/media/6oeRBKg7mwEZnSnYkn/giphy.gif" /> </div>
                <div className="card_title title-white">
                <p style={{color:"#f4f4f4"}}>{value.username}</p>
                </div>
            </div>
        </div> : <div className="cards-list1">
            <div className="card1 1" onClick={()=>this.submit(value,"NotActive")}>
            <div className="card_image"> <img src="https://media.giphy.com/media/6oeRBKg7mwEZnSnYkn/giphy.gif" /> </div>
                <div className="card_title title-white">
                <p style={{color:"#f4f4f4"}}>{value.username}</p>
                </div>
            </div>
        </div>
        );
    });
    
    return (
        <div>
        <SockJsClient url='http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/chat-web-socket' topics={['/topic/loggedUser']}
            onMessage={(msg) => { this.loggedWebSocket(msg) }}
            ref={ (client) => { this.clientRef = client }} />
         <div className = "displayRow">{liveAgentsData}</div></div>
      );
    }
}

export default landingPage
