import React from 'react';
import { connect } from 'react-redux';
import './login.scss';
import '../../../src/style.css';
//import '../../../src/bootstrap.min.css';
//import '../../../src/font-awesome.min.css';
import axios from 'axios';
import logo from './../../img/logo.png'
//import botResponse from './botResponse.json';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import $ from "jquery";
import {applicationContextPath} from '../botMainPage/api'
import { ThemeProvider } from 'styled-components';
const SweetAlert = withSwalInstance(swal);

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			userPassword: "",
			loginData: {},
			authentication: false
		};
	}

	componentDidMount() {
		debugger
		if(window.location.search!=undefined && window.location.search!=""){
			var port1 = {}
			port1 = "http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000"
			this.setState({kapittxtype:"kapittx",port:port1,mainFlag:true})
			var kapittx = window.location.search
			var search_params = new URLSearchParams(kapittx); 
			   var type = search_params.get('type');
			// var kapittx2 = kapittx.get('type')
			
		var data=	{authentication: "success",
					password: "shree@123",
					session_age: 1800000,
					session_key: "0pjajxbg5yx6vl6qhulvyos56f1abzgu",
					user_id: 1,
					username: "admin"}
				this.setState({loginDataObj : data,
					authentication : true})	
					// var data1 = JSON.stringify(data)
					this.autocomplete(port1)
					this.getBotResponceSuccess(data,port1)
					this.onLoginSuccess("kapittx")
		}else{
		this.getBotResponceSuccess(this.state.LoginData);
		console.log("FirstLogin Data = === === === ",this.state.LoginData)
		}
 
	}

	autocomplete=(port)=>{
		debugger
		axios.post(port!=undefined && port !=null && port != "" ?
		'http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000//faq/collections/'
			:this.state.port+'//faq/collections/', null, {
		}).then(response => {
			debugger
			console.log(response);
			
			console.log(response.data)
			var	autocompleteAllData=[];
			autocompleteAllData	=response.data;

			this.setState({
				autocompleteAllData
			})
     console.log(this.state.autocompleteAllData)
	})
}

getBotResponceSuccess = (res,port) => {
	debugger
	console.log("kapitxtype",this.state.kapittxtype)
	var requestData = JSON.stringify(res);
	axios.post(port!=undefined && port !=null && port != "" ?
	'http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq/mob_bot_launch/'
	:this.state.port+'/faq/mob_bot_launch/', requestData) 
		.then(response => {
			this.setState({botloader:false})
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
		// add a zero in front of numbers<10
		//	m = checkTime(m);
			var datetime = h+":"+m
			console.log("getBotResponce###############", response.data)
			var button = [];

			if(response.data.recommend!=undefined)
			for (const value of response.data.recommend) {
				const taskName = value.task;
				const utterence = value.utterance;
		
			//	button.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);
				if(value.link != ""){
						button.push(<div><button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button><sup><a className="fa fa-external-link" href={value.link} target="_blank"></a></sup></div>
						);
				}else{
					button.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);
				}			
			}
			var data = response.data.bot_responce[0] ? response.data.bot_responce[0].value : "";
			var atterenceResponce = [{
				flag: "bot",
				type: "text",
				message: data,
				buttons: button,
				datetime:datetime
			}]

		
			this.setState({
				atterenceResponce,
				taskbuttons : response.data.recommend
			})
			console.log(this.state.LoginData)
			debugger
			$(document).ready(function(){
				$('.card-body ').animate({
						scrollTop: $('.card-body')[0].scrollHeight}, 2000);
		});
			console.log("getBotResponce", response.data)
		}).catch(error => {
			console.log(error);
		});
}

	getUserName = (e) => {
		var userName = e.target.value;
		this.setState({
			userName
		})
	}

	getPassWord = (e) => {
		var userPassword = e.target.value;
		this.setState({
			userPassword
		})
	}

	onLoginSuccess = () => {

		var newLoginObj = {};
		newLoginObj.botType = "";
	  
		axios.post(applicationContextPath+':8080/LiveAgent/activeUsers', newLoginObj, {
		})
		.then(response => {

		}).catch(error => {
			console.log(error);
		});
	}

	login = () => {
		debugger
		var requestData = {}
		requestData.username = this.state.userName
		requestData.password = this.state.userPassword
		var newLoginObj = JSON.stringify(requestData)
		document.getElementById("loader-wrapper").style.visibility = "visible";
	
		axios.post(applicationContextPath+':8007/faq/mob/', newLoginObj, {
		})
		//  axios.post(applicationContextPath+':8022/faq/mob/', newLoginObj, {
		//  })
		.then(response => {
			localStorage.setItem('userLoginDto', JSON.stringify(response.data))

			if (response.data.authentication == "success") {
				document.getElementById("loader-wrapper").style.visibility = "hidden";
				localStorage.setItem('bottype', JSON.stringify(""))
				this.props.history.push("/landingPage")
			}else{
				document.getElementById("loader-wrapper").style.visibility = "hidden";
			}
			this.setState({
				loginData: response.data,
				authentication: true
			})
			this.onLoginSuccess();
			console.log("getBotResponce", response.data)
		}).catch(error => {
			console.log(error);
		});
	}

	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.login();
		}
	}
	

	render() {
		console.log("authentication", this.state.authentication)
		return (

			<div>
				<div id="loader-wrapper">
					<div id="loader"></div>
				</div>
				{this.state.loginData.authentication == "success" ?
					<SweetAlert
						show={this.state.authentication == true}
						title="Login Success"
						type='success'
						onConfirm={() => this.setState({ authentication: false })}
					/> :
					<SweetAlert
						show={this.state.authentication == true}
						title="Invalid Credential"
						text="Please check user name and password"
						type='error'
						onConfirm={() => this.setState({ authentication: false })}
					/>}
				{/* // 	<div className="main" />
			// 	<div className="grad" />
			// 	<div className="header">
			// 	  <div>NE<span>LL</span>A</div>
			// 	</div>
			// 	<br />
			// 	<div className="loginPage">
			// 	  <input type="text" placeholder="username" name="user" onChange={(e) =>this.getUserName(e)}/><br />
			// 	  <input type="password" placeholder="password" name="password" onChange={(e) =>this.getPassWord(e)} onKeyPress={this.handleKeyPress}/><br />
			// 	  <input type="button" value="Login" onClick={() => this.login()}/>
			// 	</div>
			//   </div> */}
				<main>
					<div className="backgoundimage">
						<div className="container">
							<div className="d-flex justify-content-center h-100 login_div">
								<div className="card arrow-down">
									<div className="card-header">
										<img src={logo} alt="Nella" />
									</div>
									<div className="card-body">
										<form>
											<div className="form-group">
												<label htmlFor="username">Username</label>
												<input type="text" className="form-control" name="username" onChange={(e) => this.getUserName(e)} />
											</div>
											<div className="form-group">
												<label htmlFor="password">Password</label>
												<input type="password" className="form-control" name="password" onChange={(e) => this.getPassWord(e)} onKeyPress={this.handleKeyPress} />
											</div>
											<div className="form-group">
												<input type="button" value="Login" className="btn float-right login_btn" onClick={() => this.login()} />
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="demo_video">
								<div className="demo_video_icon .d-none .d-sm-block">
								</div>
								<div className="video_link">
									<i className="fa fa-video-camera d-md-none d-sm-none d-lg-none" />
									<a href="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/support/telecomBot.mp4" target="_blank">Telecom Bot</a>
									<a href="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/support/hrBot.mp4" target="_blank">HR Bot</a>
									<a href="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/support/pensionBot.mp4" target="_blank">Pension Bot</a>
									<a href="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/support/adminConsole.mp4" target="_blank">Admin Console</a>
									<a href="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/support/liveAgent.mp4" target="_blank">Live Agent</a>
								</div>
							</div>
						</div>
					</div>
				</main>

			</div>
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
	Login
);