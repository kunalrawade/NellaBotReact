import React from 'react';
import { connect } from 'react-redux';
import Artyom from 'artyom.js';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import $ from "jquery";
import SockJsClient from 'react-stomp';


import {
	Carousel,
	CarouselControl,
	CarouselItem,
	CarouselIndicators,
	CarouselCaption,

} from 'reactstrap';
import './liveAgentBot.scss';
import '../../App.css';

const Jarvis = new Artyom();

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef() 
		this.state = {
			atterenceResponce: [],
			buttons: [],
			atterence: [],
			atteranceValue: "",
			typingLoderFlag: false,
			items: [],
			activeIndex: 0,
			sendBtn: true,
			tableHead: [],
			kapitxTableHead:[],
			tableBody: [],
			botResponse: [],
			planId: 0,
			LoginData: JSON.parse(localStorage.getItem('userLoginDto')),
			value: "", 
			autocompleteData: [],
			liveAgentFlag:false
    
		};

		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);

		// this.onChange = this.onChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.getItemValue = this.getItemValue.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

onSelect(selectedValue){

	if (selectedValue) {
		this.setState({
			atteranceValue: selectedValue,
			typingLoderFlag: true,
			sendBtn: false,
			value: selectedValue
		})
	}
	else {
		this.setState({ sendBtn: false, atteranceValue: selectedValue });
	}
}

renderItem(item, isHighlighted){
	return (
			<div className = "form-control" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
					{item.label}
			</div>   
	); 
}

getItemValue(item){
	return `${item.label}`;
}

	componentDidMount() {
	
		
    let urlQuery = this.props.history.location.state ? this.props.history.location.state : "";
   
		var items = [
			{
				src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin.png',
				altText: 'Slide 1',
				caption: 'Slide 1'
			},
			{
				src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant.png',
				altText: 'Slide 2',
				caption: 'Slide 2'
			},
			{
				src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard.png',
				altText: 'Slide 3',
				caption: 'Slide 3'
			}
		];
		this.setState({
      items,
		})
		debugger
		var data = this.props.history.location.state ? this.props.history.location.state : "";
		//this.state.liveAgentFlag=this.state.LoginData.clickedUser.agentChat;
		var flag=data.clickedUser.agentChat?true:false;
		this.setState({
       liveAgentFlag:flag
		});
		this.getBotResponceSuccess(this.state.LoginData);
	}

	getBotResponceSuccess = (res) => {
		
	
		var data = this.props.history.location.state ? this.props.history.location.state : ""
		var activeUserData = {}
		activeUserData.User_Id = data.clickedUser.username;
		activeUserData.Session_key = data.clickedUser.session_key
		activeUserData.botType=data.botType
		console.log("data###############", activeUserData)
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/getAllUserConversation', activeUserData, {
		})
			.then(response => {

				console.log("getBotResponce###############", response.data)
				var button = [];

				// for (const value of response.data.recommend) {
				// 	const taskName = value.task;
				// 	const utterence = value.utterance;
			
				// 	button.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn btn-outline-primary" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);
					
				// }
				var atterenceResponce = this.state.atterenceResponce;
				//var atterence = this.state.atterence;

				for(var i=0; i<response.data.length; i++){
					debugger
					//var botMessage = response.data[i].bot_responce[0].value
					var userMessage = response.data[i].user_uttarance
					var atterenceResponceBot=JSON.parse(response.data[i].bot_responce[0].value.replace(/'/g,'"'));
					for(var j=0;j<atterenceResponceBot.length;j++){ 
					var atterenceResponceBot1 = {
					 	flag: "bot",
					 	type: atterenceResponceBot[j].type,
					 	message: atterenceResponceBot[j].value ,
					 	buttons: button
					 }
					atterenceResponce.push(atterenceResponceBot1)
				}
				if(userMessage!="" && userMessage!=undefined){
					var atterenceUser = {
						flag: "user",
						type: "text",
						message: userMessage
					}
					atterenceResponce.push(atterenceUser)
				}
				}
				//var data = response.data.bot_responce[0] ? response.data.bot_responce[0].value : "";
			
				this.setState({
					atterenceResponce,
				})
			
				$(document).ready(function(){
					$('.card-body ').animate({
							scrollTop: $('.card-body')[0].scrollHeight}, 2000);
			});
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	onButtonClick(task, utterance) {
		debugger
		var atterenceResponce1 = {
			flag: "",
			type: "",
			message: utterance
		};
		var atterenceResponce = this.state.atterenceResponce;
		atterenceResponce.push(atterenceResponce1);
		this.setState({
			atterenceResponce
		})
		this.postBotResponceOnButtonClick(task);

	}

	onSubmitClick = (data) => {
		debugger
		// var login = this.state.LoginData;
		var data1 = this.props.history.location.state ? this.props.history.location.state : ""
	
		var utteranceObj = {}
		utteranceObj.message = data
		utteranceObj.Session_key = data1.clickedUser.session_key
		utteranceObj.Agent_Id = data1.LoginData.username
		utteranceObj.User_Id = data1.clickedUser.username
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/agentMessage', utteranceObj, {

		}).then(response => {
			console.log(response);
      debugger
      
						$(document).ready(function(){
							$('.card-body ').animate({
									scrollTop: $('.card-body')[0].scrollHeight}, 2000);
					});
		}).catch(error => {
			console.log(error);
		});

	}

	liveAgentJoin=()=>{
		debugger
		var data1 = this.props.history.location.state ? this.props.history.location.state : ""
	
		var utteranceObj = {}
		//utteranceObj.message = data
		utteranceObj.Session_key = data1.clickedUser.session_key
		utteranceObj.Agent_Id = data1.LoginData.username
		utteranceObj.User_Id = data1.clickedUser.username
		utteranceObj.botType=data1.botType
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/agentWantToJoin', utteranceObj, {

		}).then(response => {
			console.log(response);
      debugger
      this.setState({
				liveAgentFlag:true
			});
			$(document).ready(function(){
				$('.card-body ').animate({
						scrollTop: $('.card-body')[0].scrollHeight}, 2000);
				});
		}).catch(error => {
			console.log(error);
		});
	}	

	postBotResponceOnButtonClick = (data) => {
		var login = this.state.LoginData;
		login.answers = data;
		const request = JSON.stringify(login);
		console.log(request);
		axios.post(this.props.history.location.state+'/faq/Kaptixbot/', request, {

		}).then(response => {
			console.log(response);
			var button1 = [];
				if (response.data.recommend) {
				for (const value of response.data.recommend) {
					const taskName = value.task;
					if (taskName == undefined || taskName == "") {
						taskName = value.utterance;
					}
					const utterence = value.utterance;
					button1.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn btn-outline-primary" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);
				}
			}
			var atterenceResponce = this.state.atterenceResponce;
			for (var i = 0; i < response.data.bot_responce.length; i++) {
				var obj = response.data.bot_responce[i];
				if (obj.type === "list") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "list",
						message: obj.value,
						heading: obj.title,
						row: obj.data_items
					}
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
				} else if (obj.type === "slider") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "slider",
						//buttons: button1
					}

					var items = obj.data_items || [];
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					this.setState({
						items
					})
				} else if (obj.type === "document") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "document",
						message: obj.value,
						text:obj.displayMessage
					}

					var items = obj.data_items || [];
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					this.setState({
						items
					})
				} else if (obj.type === "audio") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "audio",
						message: obj.value,
						text:obj.text
					}

					var items = obj.data_items || [];
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					this.setState({
						items
					})
				}
				else if (obj.type === "video") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "video",
						message: obj.value,
						text:obj.text
					}

					var items = obj.data_items || [];
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					this.setState({
						items
					})
				}else{
					var data = response.data.bot_responce[i].value;
					var atterenceResponce1 = {
						flag: "bot",
						type: "text",
						message: data,
						//buttons: button1
					}
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
				}
				
			}
		
			this.setState({
				atterenceResponce
			})
			$(document).ready(function(){
				$('.card-body ').animate({
						scrollTop: $('.card-body')[0].scrollHeight}, 2000);
			});
		}).catch(error => {
			console.log(error);
		});
	}

	speakText = (atterenceResponce) => {

		Jarvis.initialize({
			lang: "hi-IN",
			speed: 1,
			debug: true,
			voice: ['Google हिन्दी', 'Alexa'],
			recognizing: false,
		});
		// let _this = this;
		Jarvis.ArtyomVoicesIdentifiers["hi-IN"] = ['Google हिन्दी', 'Alexa'];

		// Speak text with Artyom
		for (var i = 0; i < atterenceResponce.length; i++) {
			if (atterenceResponce[i].type === "text")
				Jarvis.say(atterenceResponce[i].message);
		}
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	atteranceValue = (e) => {
		debugger
		var user_query = {}
		user_query.user_query = e.target.value
		const user_query = JSON.stringify(user_query);
		this.setState({
			value:e.target.value
		})
		console.log("user_query======================", user_query)
		//var autocompleteData =  [{label:"i want to know the account details",value:1}, {label:"i want to know my account details",value:2}, {label:"i want to know about my amount",value:3}, {label:"i want to know plans suitable for me",value:4},{label: "i want to recharge",value:5}]
		axios.post(this.props.history.location.state+'/faq/auto_search/',user_query, {

		}).then(response => {

				this.setState({
					autocompleteData : response.data,
				})
				console.log("getBotResponce======================", response.data)
			}).catch(error => {
				console.log(error);
			});

		if (e.target.value) {
			this.setState({
				atteranceValue: e.target.value,
				typingLoderFlag: true,
				sendBtn: false
			})
		}
		else {
			this.setState({ sendBtn: false, atteranceValue: e.target.value });
		}
	}

	sendAtteranceValue = () => {
		debugger
		var atterence = [{
			flag: "bot",
			type: "text",
			message: this.state.atteranceValue
		}];

		this.state.botResponse.sort(function (a, b) {
			return a.sequence - b.sequence;
		})
		var atterenceResponce = this.state.atterenceResponce;
		for (var j = 0; j < atterenceResponce.length; j++) {
			if (atterenceResponce[j].message !== atterence[0].message) {
				atterenceResponce.push(atterence[0]);
				break;
			}
		}
		for (var i = 0; i < this.state.botResponse.length; i++) {
			if (this.state.botResponse[i].type !== "list") {
				atterenceResponce.push({
					flag: "bot",
					type: this.state.botResponse[i].type,
					message: this.state.botResponse[i].value
				})
				//this.speakText(atterenceResponce);
			} else {
				atterenceResponce.push({
					flag: "bot",
					type: this.state.botResponse[i].type,
					message: {
						heading: this.state.botResponse[i].title,
						row: this.state.botResponse[i].data_items
					}
				})
			}
		}

		if(this.state.atterenceResponce.length==0){
			atterenceResponce.push(atterence[0]);
		}
	
		this.setState({
			atterence,
			atterenceResponce,
			typingLoderFlag: false,
			atteranceValue: ""
		})
		$(document).ready(function(){
			$('.card-body ').animate({
					scrollTop: $('.card-body')[0].scrollHeight}, 2000);
	});
		this.onSubmitClick(this.state.atteranceValue);
	}

	
	userWebSocket=(msg) => {
		debugger
		var data1 = this.props.history.location.state ? this.props.history.location.state : ""

		var User_Id = data1.clickedUser.username;
		var session_Key=data1.clickedUser.session_key;
	  var atterenceResponce=this.state.atterenceResponce;
		if(msg.user_id!=undefined && msg.user_id==User_Id && msg.sessionKey===session_Key){
		var data=msg.bot_responce[0]? msg.bot_responce[0].value:"";
		var atterenceResponce1 = {
			flag: "",
			type: "text",
			message: msg.user_uttarance
		}
		atterenceResponce.push(atterenceResponce1);
		this.setState({
			atterenceResponce
		})
	}
	}



	tableHead(heading, row) {
		
		var cells = [];
		for (var i in row) {
			var str = [];
			Object.keys(row[i]).forEach(function (key) {
				var value = row[i][key];
				console.log(key + ':' + value);
				str.push(value);
			});
			cells.push(str);
		}

		const head = heading.map((value, index) =>
			<tr>
				<th key={'tableHead' + index}>{value.name}</th>
				<td>{
					cells.map((val, ind) => {
						return cells[0][index];
					})
				}</td>
			</tr>

		);
		return head;
	};

	kapitxTableHead(heading) {
		
		if(heading){
		var cells = [];

		const head = heading.map((value, index) =>
				<th key={'kapitxTableHead' + index}>{value.name}</th>	
		);
		return head;
	}
	};

	tableBody(row) {
		
		if(row){
		const rows = row.map((value, index) =>
			<tr>
				<td key={'tableBody' + index}>{value.IncidentId}</td>
				<td>{value.CreatedBy}</td>
				<td>{value.CreatedOn}</td>
			</tr>
		 );
		return rows;
	}
	}

	onselectPlan(planID) {
		//alert(planId);
		this.setState({
			planId: planID
		});
	}
	
	// scrollToBottom = () => {
	// 	this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	// }
	
	// componentDidMount() {
	// 	this.scrollToBottom();
	// }
	
	// componentDidUpdate() {
	// 	this.scrollToBottom();
	// }

	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.sendAtteranceValue();
		}
	}
	
	render() {

		
		//$('.abc').scrollTop($('.abc')[0].scrollHeight);
		// var msgDiv = document.getElementById("atterenceResponce").scrollHeight;
		// msgDiv.scrollTop = msgDiv.scrollHeight;
		
		console.log("Autocomplete++++++++++++",this.state.autocomplete)
		const slides = this.state.items.map((item) => {
			return (
				<CarouselItem
					onExiting={this.onExiting}
					onExited={this.onExited}
					key={item.src}
				>

					<div className="slide-container">
						<div className="wrapper">
							<div className="clash-card barbarian">
								<div className="clash-card__image clash-card__image--barbarian">
									<img src="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/media/images/hrms-banner.png" alt="telecom" />
								</div>
								<div className="clash-card__level clash-card__level--barbarian">{item.planType == undefined ? item.businessJustification : item.planType}</div>
								<div className="clash-card__unit-name">{item.planName == undefined ? item.userName : item.planName}</div>
								<div className="clash-card__unit-description">
									{item.planDetails}
									{item.fromDate} {item.fromDate == undefined ? "" : "To"} {item.toDate}<br />
									<button type='button' id="" className="btn btn-outline-primary" onClick={() => this.onselectPlan(item.planId)} >Select</button>
								</div>
								<div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
									<div className="one-third">
										<div className="stat">{item.charges == undefined ? "" : item.charges}<sup>{item.charges == undefined ? "" : "₹"}</sup></div>
										<div className="stat-value"></div>
									</div>
									<div className="one-third">
										<div className="stat">{item.country == undefined ? item.planType : item.country}</div>
										<div className="stat-value"></div>
									</div>
									<div className="one-third no-border">
										<div className="stat">15</div>
										<div className="stat-value"></div>
									</div>
								</div>
							</div> {/* end clash-card barbarian*/}
						</div> {/* end wrapper */}

					</div> {/* end container */}

					<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
				</CarouselItem>
			);
		});
		const file = '/QuickHeal.pdf';
		const type = 'pdf';
		const atterenceResponce = this.state.atterenceResponce.map((value, index,key) => {
			
			if (value.flag === "bot") {

				return (
					<div className="d-flex justify-content-start mb-4">
					{ index == 0 || (this.state.atterenceResponce[index-1] != undefined && this.state.atterenceResponce[index-1].flag != "bot")?
						<div className="img_cont_msg">
							<img src="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NELL_BOT/media/images/download.jpg" className="rounded-circle user_img_msg" alt="face" />
						</div>  : ""
					}
						<div className="msg_cotainer" key={'atterenceResponce' + index}>
							{value.type === "text" &&
								value.message
							}<br />
							{value.type === "text" &&
								value.buttons}
							{value.type === "video" &&
								<video
									className="controls-width"
									controls
									src={value.message}
								>
								</video>}
							{value.type === "audio" && <audio controls src={value.message} />}
							{value.type === "document" &&
								<a href={value.message} target="_blank">{value.displayMessage!=undefined?value.displayMessage:"Click Here to Download!"}</a>
								// <FileViewer
								// 	fileType={value.type}
								// 	filePath={value.message} />
							}
							{value.type === "image" && <img className="controls-width" src={value.message} />}
							{value.type === "list" && this.props.history.location.state != "http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000" ?
								<table className="table">
									<thead className="thead-light">
										<tr>
											{this.tableHead(value.heading, value.row)}
										</tr>
									</thead>
								</table> :
								
								<table className="table">
								<thead className="thead-light">
									<tr>
										{this.kapitxTableHead(value.heading)}
									</tr>
								</thead>
								<tbody>
									{this.tableBody(value.row)}
								</tbody>
							</table>
							}
							{value.type === "slider" &&
								<Carousel
									activeIndex={this.state.activeIndex}
									next={this.next}
									previous={this.previous}
								>
									<CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
									{slides}
									<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
									<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
								</Carousel>

							}{value.type === "slider" &&
								value.buttons
							}
							
							<div id="displayMessage"></div>
							<span className="msg_time">8:40 AM, Today</span>
						</div>

					</div>
				);
			} else {
				return (
					<div className="d-flex justify-content-end mb-4">
						<div className="msg_cotainer_send" key={'atterence' + index}>
							{value.message}
							<br /><span className="msg_time">8:40 AM, Today</span>
						</div>

						{/* {this.state.typingLoderFlag ?
							<div id="bubble">
								<div id="circleWrapper">
									<div className="circle" id="circle1"></div>
									<div className="circle" id="circle2"></div>
									<div className="circle" id="circle3"></div>
								</div>
							</div> : ""} */}

						<div className="img_cont_msg">
							<img alt="face" src="data:image/jpeg;base64,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" className="rounded-circle user_img_msg" />
						</div>
					</div>
				);
			}
		});

		return (

			<div className="login">
			<SockJsClient url='http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/chat-web-socket' topics={['/topic/user']}
            onMessage={(msg) => { this.userWebSocket(msg) }}
            ref={ (client) => { this.clientRef = client }} />
				<div className="container-fluid h-100">
					<div className="row justify-content-center h-100">

						<div className="col-md-8 col-xl-6 chat">
							<div className="card">
								<div className="card-header msg_head">
									<div className="d-flex bd-highlight">

										<div className="img_cont">
											<img src="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/NELL_BOT/media/images/download.jpg" className="rounded-circle user_img" alt="face" />
											<span className="online_icon" />
										</div>

										<div className="user_info">
											<span></span>
										</div>
									</div>
								</div>
								<div className="card-body msg_card_body abc" id="atterenceResponce">
									{atterenceResponce}
								</div>
								{!this.state.liveAgentFlag &&
								<button class="button" onClick={() => this.liveAgentJoin()}>Join</button>}
								<div ref={this.myRef}></div> 
								{/* <div style={{ float:"left", clear: "both" }}
										ref={(el) => { this.messagesEnd = el; }}>
								</div> */}
								<div className="card-footer">
									<div className="input-group">
										<div className="input-group-append">
											<span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
										</div>
										<div className="form-control type_msg" onKeyPress={this.handleKeyPress}>
											<Autocomplete 
												wrapperStyle={{ }}
												inputProps={{className:"form-control type_msg"}}
												getItemValue={this.getItemValue}
												items={this.state.autocompleteData}
												renderItem={this.renderItem}
												value={this.state.atteranceValue}
												onChange={this.atteranceValue}
												onSelect={this.onSelect}
											/>
										</div>
										<div className="input-group-append">
											<button className="input-group-text send_btn" disabled={this.state.sendBtn} onClick={() => this.sendAtteranceValue()}> 		<i className="fas fa-location-arrow" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	
	}
	
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
	Login
);