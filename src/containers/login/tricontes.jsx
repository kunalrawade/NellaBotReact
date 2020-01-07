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
import queryString from 'query-string'

const SweetAlert = withSwalInstance(swal);

class TricontesLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			userPassword: "",
			loginData: {},
            authentication: false,
            botname:""
		};
	}

	componentDidMount() {

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
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/activeUsers', newLoginObj, {
		}).then(response => {

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
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8007/faq/mob/', newLoginObj, {
		}).then(response => {
			localStorage.setItem('userLoginDto', JSON.stringify(response.data))

			if (response.data.authentication == "success") {
                document.getElementById("loader-wrapper").style.visibility = "hidden";
               
               if(window.location.pathname=="/tricontes"){
                localStorage.setItem('bottype', JSON.stringify('tricontes'))
               }
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
	TricontesLogin
);