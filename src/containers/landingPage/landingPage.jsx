
import React from 'react';
import { connect } from 'react-redux';
import './landingPage.scss';
import axios from 'axios';
import '../../../src/style.css';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import img1 from './../../img/01.png'
import img2 from './../../img/02.png'
import img3 from './../../img/03.png'
import img4 from './../../img/04.png'
import img5 from './../../img/05.png'
import img6 from './../../img/06.png'
import img7 from './../../img/Nessa-features.png'
import img9 from './../../img/Nella-features.png'
import img8 from './../../img/Chat-icon.png'
import MainBot from '../botMainPage/mainBot'		
import $ from "jquery";
import IdleTimer from 'react-idle-timer'
import queryString from 'query-string'
import {applicationContextPath} from '../botMainPage/api'

const SweetAlert = withSwalInstance(swal);

class Login extends React.Component {
	constructor(props) {
		debugger
		super(props);
		this.state = {
			LoginData: JSON.parse(localStorage.getItem('userLoginDto')),	
			BotType: JSON.parse(localStorage.getItem('bottype')),
			loginDataObj:{},
			authentication:false,
			botflag : false,
			port:'',
	    authentication:false,
			loginData:{}
		};

		this.idleTimer = null
		this.onAction = this._onAction.bind(this)
		this.onActive = this._onActive.bind(this)
		this.onIdle = this._onIdle.bind(this)
	}

	_onAction(e) {
		// console.log('user did something', e)
	  }
	 
	  _onActive(e) {
		// console.log('user is active', e)
		// console.log('time remaining', this.idleTimer.getRemainingTime())
	  }
	 
	  _onIdle(e) {
		this.botOpen()
		 console.log('user is idle', e)
		// console.log('last active', this.idleTimer.getLastActiveTime())
	  }


	kapitxBot = ()=>{
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000"
				//	this.props.history.push("/mainBot",port)
				this.setState({port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}
	
	onLoginSuccess=(botType)=>{

		var newLoginObj={};
		newLoginObj.botType=botType;
		axios.post(applicationContextPath+':8080/LiveAgent/activeUsers', newLoginObj,{
		}).then(response => {
			
		}).catch(error => {
			console.log(error);
		});
	}

	pensionBot = ()=>{
		debugger
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"
	//	this.props.history.push("/mainBot",port)
		this.onLoginSuccess("pension")
		this.setState({port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	telecomBot = ()=>{
		debugger
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password

			axios.post('http://172.31.3.36:8003/faq/mob/', loginDataObj, {
			}).then(response => {

				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				//console.log("getBotResponce", response.data)
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				console.log("getBotResponce", response.data)
				if(response.data.authentication == "success"){
					var port = "http://172.31.3.36:8003"
			//		this.props.history.push("/mainBot",port)
					this.onLoginSuccess("telecom")
					this.setState({ port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
			}).catch(error => {
				console.log(error);
			});
	
	}

	hrBot = ()=>{
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002"
				//	this.props.history.push("/mainBot",port)
					this.onLoginSuccess("HR")
					this.setState({ port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});	
	}

	germanBot = ()=>{
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"
				//	this.props.history.push("/mainBot",port)
					this.onLoginSuccess("german")
					this.setState({ port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	
	}

	hospitalBot = ()=>{
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://172.31.3.36:8008/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://172.31.3.36:8008"
				//	this.props.history.push("/mainBot",port)
					this.onLoginSuccess("hospital")
					this.setState({port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	
	}

	womenBot = () =>{
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"
				//	this.props.history.push("/mainBot",port)
					this.onLoginSuccess("hospital")
					this.setState({ port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	farmerBot = () =>{
		debugger
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				if(response.data.authentication == "success"){
					var port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"
				//	this.props.history.push("/mainBot",port)
					this.onLoginSuccess("farmer")
					this.setState({ port:port})		
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	liveAgentTelecom = ()=>{
		this.props.history.push("/liveAgent","telecom")
	}

	liveAgentHR =()=>{
		this.props.history.push("/liveAgent","HR")
	}

	liveAgentPension=()=>{
		this.props.history.push("/liveAgent","pension")
	}

	liveAgentKapittx = ()=>{
		this.props.history.push("/liveAgent","kapittx")
	}

	liveAgentKapittxGerman = ()=>{
		this.props.history.push("/liveAgent","german")
	}

	closeModal = () => {
    this.setState({
  	    botflag: !this.state.botflag
  	  })
		}

		botOpen = () =>{
			this.setState({
  	    botflag: true
  	  })
		}

	render() {
		console.log("bottype",this.state.BotType)
		console.log("this.state.loginDataObj.authentication",this.state.loginDataObj.authentication)
		console.log("this.state.authentication",this.state.authentication)
		$(document).ready(function(){
	
			var floatingdiv = $('#divfloating');
			var floatingdivposition = floatingdiv.position();
			$(window).scroll(function(){
				var scrollBarPosition = $(window).scrollTop();
				if(scrollBarPosition >= floatingdivposition.top){
					floatingdiv.css({
						'position' : 'fixed',
						'bottom': '50px',
            'right': '0px',
					})
				}else{
					floatingdiv.css({
						'position' : 'fixed',
						//'top':0
						'bottom': '50px',
						'right': '0px',
					})
				}
			})
		})
			return (
				<main>
					{this.state.loginData.authentication == "success" ?
					<SweetAlert
						show={this.state.authentication == true}
						title="Login Success"
						type='success'
						onConfirm={() => this.setState({ authentication: false,botflag : true })}
					/> : 
					<SweetAlert
						show={this.state.authentication == true}
						title="Invalid Credential"
						text="Please check user name and password"
						type='error'
						onConfirm={() => this.setState({ authentication: false })}
				/>}
        
        <article className="nella_div">

		<IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
		  timeout={5000} />
          <div className="container">

            <div className="about_nella text-center">
              <h1>Nella Bot</h1>
              <h5>Virtual Assistance Solutions</h5>
              <p>Nella offers fully managed Virtual Assistant solution that provides transformational benefits resulting in</p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="feature_list">
                  <ul>
                    <li>Fully developed avatar that provides self service options reducing physical agent interaction through phone calls, emails, and personal interactions</li>
                    <li>Ability to provide reliable, cost-effective, and responsive services (Self-help and Self-heal passing over to scripted support for L1, Automate fixes enriching user experience)</li>
                    <li>Increase overall productivity and reduce cost of operations</li>
                    <li>Integrate seamlessly to existing support lifecycle with managed auto escalation features</li>
                    <li>Feature rich speech recognition, AI and natural language processing capabilities</li>
                    <li>Machine Learning Base to continuously process intent and build context</li>
                    <li>Supports multiple languages through use of translational APIs</li>
                    <li>Interactive cards supporting multimodal conversations</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature_img">
                  <img src={img9} alt="Nessa features" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </article>

				<div className="chat_bot_section">
						<div className="chat_bot_icon" id="chat-icon">
							<img src={img8} alt="Chat Icon" onClick={()=>this.botOpen()}/>
							<div className="chatbot" id="divfloating">
					   {this.state.botflag?	
		     	       <MainBot  port={this.state.port} closeModal = {this.closeModal}/>:''}
			    </div>
						</div>
					
				</div>
      </main>
     
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
	Login
);