import React from 'react';
import { connect } from 'react-redux';
import Artyom from 'artyom.js';
import axios, {post} from 'axios';
import Autocomplete from 'react-autocomplete';
import SockJsClient from 'react-stomp';
import $ from "jquery";
import SpeechRecognizer from 'components/speechRecognizer'
import logo from '../../img/icon.png'
import logo1 from '../../img/user-profile.png'
import logo2 from '../../img/user.jpg'
import logo3 from '../../img/paperclip1.png'
import logo4 from '../../img/arrowup.jpg'
import { number } from 'prop-types';	
// import IcCardPage from '../icCardpage'
// import backgroundImg from '../../img/bg-img-chat.jpg'
//import '../../../src/style.css';
//import './mainBot.scss'
//import logo from './../../img/user.png'
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
//  import EmojiPicker from 'emoji-picker-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
/////

/////
import Parser from 'html-react-parser';
import {
	Carousel,
	CarouselControl,
	CarouselItem,
	CarouselIndicators,
	CarouselCaption,

} from 'reactstrap';
import './mainBotKapittx.scss';
 import '../../App.css';
import './styleKap.css'
import {Modal, Button } from 'antd/lib/radio';
import JSEMOJI from "emoji-js";

let jsemoji = new JSEMOJI();

// set the style to emojione (default - apple)
jsemoji.img_set = "emojione";
// set the storage location for all emojis
jsemoji.img_sets.emojione.path =
  "https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/";

// some more settings...
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = "unified";

const Jarvis = new Artyom();

class MainBotKap extends React.Component {
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
			importIcCardModel :false,
			tableHead: [],
			kapitxTableHead:[],
			tableBody: [],
			botResponse: [],
			planId: 0,
			LoginData: JSON.parse(localStorage.getItem('userLoginDto')),
			BotType: JSON.parse(localStorage.getItem('bottype')),
			value: "", 
			autocompleteData: [],
			failureAnalysisData:[],
			liveAgent:false,
			autocompleteAllData:[],
			speecgRec:false,
			headers:[],
			fileList:'',
			uploadfileloc:'',
			notification:[],
			dashboardFlag:true,
			mainFlag:false,
			// LoginData: JSON.parse(localStorage.getItem('userLoginDto')),	
			loginDataObj:{},
			authentication:false,
			botflag : false,
			port:'',
			date: '',
			date1:'',
			localdate:'',
			modalIsOpen: false,
			intCardData:[],
			intCardData1:[],
			header:{},
			taskbuttons:[],
			taskbuttonsflag:false,
			openMenu:false,
			botConfig:{},
			headerColor:'',
			footerColor:'',
			bodyColor:'',
			imagePath:'',
			datacardDate:'',
			datacardDate1:'',
			fromdatacardDate:'',
			fromdatacardDate1:'',
			emojipicker:false,
			emoji:''
		};

		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
		//this.saveWord = this.saveWord.bind(this)
		// this.onChange = this.onChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.getItemValue = this.getItemValue.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.myRef = React.createRef();
		this.autocomplete();

	}

	changeDate = date =>{
		debugger
		var m = date.getMonth();
		m += 1;  
		var d = date.getDate();
		var y = date.getFullYear();
		var datacardDate1 = d+"/"+m+"/"+y
			 this.setState({ datacardDate:date,datacardDate1:datacardDate1})
	}

	fromchangeDate = e =>{
		debugger
		var formdate = e.target.value
		
		this.setState({[e.target.id]: formdate})
		// var m = date.getMonth();
		// m += 1;  
		// var d = date.getDate();
		// var y = date.getFullYear();
		// var fromdatacardDate = d+"/"+m+"/"+y
		// 	 this.setState({ fromdatacardDate:date,fromdatacardDate1:fromdatacardDate})
	}									

	onChange = date =>	{
		debugger
		// var newdate = date.toLocaleDateString()
		var m = date.getMonth();
		m += 1;  
		var d = date.getDate();
		var y = date.getFullYear();
		var fulldate = d+"/"+m+"/"+y
		var fulldate4 = m+"/"+d+"/"+y
			 this.setState({ date:date })
			//  this.onSubmitClick(fulldate)
			var atterenceResponce = this.state.atterenceResponce;
			var atterenceResponce1 = {
				flag: "user",
				type: "text",
				message: fulldate,
			}
			 atterenceResponce.push(atterenceResponce1);
			this.setState({
				atterenceResponce,
			});
			this.onSubmitClick(fulldate)
	}

	getBotConfig = () =>{
		debugger
		var data1 = {}
		if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"){
			data1.flag = "kapitxbot"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"){
			data1.flag = "pension"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"){
			data1.flag = "telecombot"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"){
			data1.flag = "hrbot"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"){
			data1.flag = "germanbot"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"){
			data1.flag = "farmerbot"
	    }
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"){
			data1.flag = "hospitalbot"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"){
			data1.flag = "hindibot"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004"){
			data1.flag = "interviewBot"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"){
			data1.flag = "apricot"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"){
			data1.flag = "tricontes"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"){
			data1.flag = "germantricontes"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"){
			data1.flag = "doctorassistant"
		}
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NellaConsole-Services/getBotConfig', data1,{
        }).then(response => {
		   console.log("getBotConfig",response.data)
		   this.setState({botConfig:response.data,headerColor:response.data.headerColor,
			footerColor:response.data.footerColor,
			bodyColor:response.data.bodyColor,
			imagePath:response.data.imagePath
		})
        }).catch(error => {
            console.log(error);
        });
	}

	onChange1 = e =>	{
		debugger

		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m


		var inputvalue1= e.target.value
		var fulldate = inputvalue1.split("-")
		var year = fulldate[0];
		var month = fulldate[1];
		var day = fulldate[2];

		var fulldate1 = day+"/"+month+"/"+year
		var fulldate2 = month+"/"+day+"/"+year

		// var m = date.getMonth();
		// m += 1;  
		// var d = date.getDate();
		// var y = date.getFullYear();
		// var fulldate1 = d+"/"+m+"/"+y
		// var fulldate2 = m+"/"+d+"/"+y
		// 	 this.setState({ date1:date })
			//  this.onSubmitClick(fulldate1)
			var atterenceResponce = this.state.atterenceResponce;
			var atterenceResponce1 = {
				flag: "user",
				type: "text",
				message: fulldate2,
				datetime:datetime
			}
			 atterenceResponce.push(atterenceResponce1);
			this.setState({
				atterenceResponce,
			});
			this.onSubmitClick(fulldate1)
	}
	
	kapitxBot = ()=>{
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
				port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"
				// port = "http://192.168.0.114:8000"	
				//	this.props.history.push("/mainBot",port)
				}
				this.setState({botflag : true, port:port, mainFlag:true})
				this.getBotConfig()		
				console.log("getBotResponce", response.data)
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("kapittx")
				this.getNotification("kapittx");

			}).catch(error => {
				console.log(error);
			});
	}

	handleClick = (e) => {
		debugger
		// console.log("emoji....",e.native)
		
		// let emoji = jsemoji.replace_colons(`:${e.name}:`);
		let sym = e.unified.split('-')
		let codesArray = []
		sym.forEach(el => codesArray.push('0x' + el))
		let emoji = String.fromCodePoint(...codesArray)
		this.setState({
		  atteranceValue: this.state.atteranceValue+""+emoji,emojipicker:false
		});

	
	  };
	
	onLoginSuccess=(botType)=>{

		var newLoginObj={};
		newLoginObj.botType=botType;
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/activeUsers', newLoginObj,{
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
				var port;
				if(response.data.authentication == "success"){
					 port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"		
				}
				this.setState({botflag : true, port:port,mainFlag:true})
				this.getBotConfig()	
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);	
				this.onLoginSuccess("pension")
				this.getNotification("pension");
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

			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003/faq/mob/', loginDataObj, {
			}).then(response => {

				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				//console.log("getBotResponce", response.data)
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				console.log("getBotResponce", response.data)
				var port;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"
			//		this.props.history.push("/mainBot",port)
					
				}
				this.setState({botflag : true, port:port,mainFlag:true})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);	
				this.onLoginSuccess("telecom")
				this.getNotification("telecom");

			}).catch(error => {
				console.log(error);
			});
	
	}

	hrBot = ()=>{
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port ;
				if(response.data.authentication == "success"){
					 port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"
				//	this.props.history.push("/mainBot",port)
					
				}	
				this.setState({botflag : true, port:port,mainFlag:true})	
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);	
				this.onLoginSuccess("HR")
				this.getNotification("HR");

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
				var port ;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"
				//	this.props.history.push("/mainBot",port)
				}
				this.setState({botflag : true, port:port,mainFlag:true})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);		
				this.onLoginSuccess("german")
				this.getNotification("german");

				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	
	}

	hospitalBot = ()=>{
		debugger
		console.log("LoginData",this.state.LoginData)
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port ;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"
				//	this.props.history.push("/mainBot",port)
				
				}
				this.setState({botflag : true, port:port,mainFlag:true})
				this.getBotConfig()	
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);	
				this.onLoginSuccess("hospital")
				this.getNotification("hospital");

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
				var port ;
				if(response.data.authentication == "success"){
					 port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"
				//	this.props.history.push("/mainBot",port)

				}
				this.setState({botflag : true, port:port,mainFlag:true})
				this.getBotConfig()	
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);	
				this.onLoginSuccess("hindi");
				this.getNotification("hindi");

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
					this.setState({botflag : true,port:port,mainFlag:true})	
					
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);	
				this.onLoginSuccess("farmer")	
				this.getNotification("farmer");

				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	interviewBot = () =>{
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004"
				//	this.props.history.push("/mainBot",port)
				
					this.setState({botflag : true,port:port,mainFlag:true})	
				
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("interview")		
				this.getNotification("interview");

				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}


	apricotBot = () =>{
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"
				//	this.props.history.push("/mainBot",port)
				
					this.setState({botflag : true,port:port,mainFlag:true})	
				
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("apricot")	
				this.getNotification("apricot");
	
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	tricontesBot = () =>{
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"
				//	this.props.history.push("/mainBot",port)
				
					this.setState({botflag : true,port:port,mainFlag:true})	
				
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("tricontes")	
				this.getNotification("tricontes");
	
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	germantricontesBot  = () =>{
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"
				//	this.props.history.push("/mainBot",port)
				
					this.setState({botflag : true,port:port,mainFlag:true})	
				
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("germantricontes")	
				this.getNotification("germantricontes");
	
				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
	}

	doctorAssistant = () =>{
		var loginDataObj = {}
		loginDataObj.username = this.state.LoginData.username
		loginDataObj.password = this.state.LoginData.password
			axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				response.data.password=this.state.LoginData.password;
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
					port = "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"
				//	this.props.history.push("/mainBot",port)
				
					this.setState({botflag : true,port:port,mainFlag:true})	
				
				}
				this.setState({
					loginData : response.data,
					authentication : true
				})
				this.getBotConfig()
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("doctorassistant")		
				this.getNotification("doctorassistant");

				console.log("getBotResponce", response.data)
			}).catch(error => {
				console.log(error);
			});
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
	debugger
	return (
			<div className = "form-control" style={{ background: isHighlighted ? 'lightgray' : 'white',height:'3.5em' }}>
					{item.label}
			</div>   
	); 
}

getItemValue(item){
	debugger
	return `${item.label}`;
}

	componentDidMount() {
		debugger
		if(window.location.search!=undefined && window.location.search!=""){
			this.setState({kapittxtype:"kapittx",mainFlag:true})
			var kapittx = window.location.search
			var search_params = new URLSearchParams(kapittx); 
			   var type = search_params.get('type');			
			var loginDataObj = {}
		loginDataObj.username = "admin"
		loginDataObj.password = "shree@123"
			axios.post('http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq/mob/', loginDataObj, {
			}).then(response => {
				this.setState({
					loginDataObj : response.data,
					authentication : true
				})
				localStorage.setItem('userLoginDto', JSON.stringify(response.data))
				var port;
				if(response.data.authentication == "success"){
				port = "http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000"
				}
				this.setState({botflag : true, port:port, mainFlag:true})
				this.getBotConfig()		
				console.log("getBotResponce", response.data)
				this.autocomplete();
				this.getBotResponceSuccess(this.state.loginDataObj);
				this.onLoginSuccess("kapittx")
				this.getNotification("kapittx");

			}).catch(error => {
				console.log(error);
			});

		// var data=	{authentication: "success",
		// 			password: "shree@123",
		// 			session_age: 1800000,
		// 			session_key: "0pjajxbg5yx6vl6qhulvyos56f1abzgu",
		// 			user_id: 1,
		// 			username: "admin"}
		// 		this.setState({loginDataObj : data,
		// 			authentication : true})	
		// 			// var data1 = JSON.stringify(data)
		// 			this.autocomplete(port1)
		// 			this.getBotResponceSuccess(data,port1)
		// 			this.onLoginSuccess("kapittx")
		}else{
		this.getBotResponceSuccess(this.state.LoginData);
		console.log("FirstLogin Data = === === === ",this.state.LoginData)
		}
	}

	getBotResponceSuccess = (res,port) => {
		debugger
		console.log("kapitxtype",this.state.kapittxtype)
		var requestData = JSON.stringify(res);
		axios.post(this.state.port+'/faq/mob_bot_launch/', requestData, {
		})
			.then(response => {
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

	getDashBoardData = () =>{
		
				 var failureRecords = {};
				 failureRecords.user_Id = this.state.LoginData.username
				 if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"){
						 failureRecords.flag = "kapitxbot"
				 }
				 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"){
						 failureRecords.flag = "pension"
				 }
				 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"){
						 failureRecords.flag = "telecombot"
				 }
				 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"){
						 failureRecords.flag = "hrbot"
				 }
				 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"){
						 failureRecords.flag = "germanbot"
				 }
				 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"){
					failureRecords.flag = "farmerbot"
	    	}
	    		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"){
					failureRecords.flag = "hospitalbot"
	    	}
					else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"){
						failureRecords.flag = "hindibot"
				}  
					else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004"){
					failureRecords.flag = "interviewBot"
				}
				else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"){
					failureRecords.flag = "apricot"
				}
				else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"){
					failureRecords.flag = "tricontes"
				}	
				else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"){
					failureRecords.flag = "germantricontes"
				}
				else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"){
					failureRecords.flag = "doctorassistant"
				}
 
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NellaConsole-Services/getDashboardData',failureRecords)
		.then(response => {
	console.log("failureAnalysisData",response.data)
	//	this.setState({ failureAnalysisData: response.data })
		}
 
	).catch(error => {
			console.log(error);
	});
 
	}

	importIcCardModel =(flag) =>{
		this.setState({importIcCardModel:flag})

	}

	closeModal = () => {
		this.setState({
			failureData: !this.state.failureData
		  })
		}

		importFaqFile=(flag,row, rowindex)=>{
    
			this.setState({importIcCardModel: flag})
		
		  
		  }

	getNotification=(botType)=>{
		debugger
		var notificationRequest={};
		notificationRequest.userId=this.state.LoginData.username;
		notificationRequest.botType=botType;
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/getNotificationByUserId',notificationRequest)
		.then(response => {
			debugger
				if(response!=undefined && response.data!=undefined ){
						console.log("notificationData",response.data)
						this.setState({ items: response.data })
				}
				console.log(this.state.notification);
				debugger
			}).catch(error => {
					console.log(error);
			});
	}

	onButtonClick(task, utterance) {
		debugger
		this.setState({datacardDate:''})
		// this.setState({importIcCardModel:false,datacardDate:''})
			if(!this.state.liveAgent){
				var today = new Date();
				var h = today.getHours();
				var m = today.getMinutes();
				var s = today.getSeconds();
				var datetime = h+":"+m

			var atterenceResponce1 = {
				flag: "",
				type: "",
				message: utterance,
				datetime:datetime
			};
			var atterenceResponce = this.state.atterenceResponce;
			for(var i=1;i<atterenceResponce.length;i++){		
				if(atterenceResponce[i].buttons!=undefined && atterenceResponce[i].buttons.length>0){			
					var button1=[];		
					for(var j=0;j<atterenceResponce[i].buttons.length;j++){		
					button1.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outlined" onClick={() => this.onButtonClick(null,null)} disabled>{atterenceResponce[i].buttons[j].props.children}</button>);		
					}		
					atterenceResponce[i].buttons=button1;		
				}		
			}
			atterenceResponce.push(atterenceResponce1);
			this.setState({
				atterenceResponce,
				openMenu:false
			})
			//this.myRef.current.scrollTo(0,300);
			window.scrollTo(0, this.myRef.current.offsetTop);
			this.postBotResponceOnButtonClick(task);
		}

	}

	onAgentMessage=(meg) =>{
		console.log(this.state.LoginData);
		var data = meg.bot_responce[0] ? meg.bot_responce[0].value : "";
		var today = new Date();
				var h = today.getHours();
				var m = today.getMinutes();
				var s = today.getSeconds();
			// add a zero in front of numbers<10
			//	m = checkTime(m);
				var datetime = h+":"+m
		if(meg.user_id!=undefined && meg.user_id==this.state.loginDataObj.username && meg.sessionKey===this.state.loginDataObj.session_key){
		var atterenceResponce1 = {
			flag: "bot",
			type: "text",
			message: data,
			datetime:datetime
		//	buttons: button
		};
		
		var atterenceResponce = this.state.atterenceResponce;
		atterenceResponce.push(atterenceResponce1);
		this.setState({
			atterenceResponce
		})
	}
			$(document).ready(function(){
				$('.card-body ').animate({
						scrollTop: $('.card-body')[0].scrollHeight}, 2000);
		})
		//alert(meg);
	}

	onAgentWantToTalk=(meg)=>{
		
		if(meg.User_Id!=undefined && meg.User_Id==this.state.loginDataObj.username && meg.Session_key===this.state.loginDataObj.session_key){
	
			this.setState({
				liveAgent:true
		})
	}
	}

	onNotificationBySocket = (notification1)=>{
		debugger
		if(notification1!=undefined && notification1.notification_user_id===this.state.LoginData.username
			&& notification1.botType===this.state.BotType){
		var items=this.state.items;
		items.push(notification1);
		this.setState({
			items
		})
	}
	}

	autocomplete=(port)=>{
		debugger
		axios.post(this.state.port+'//faq/collections/', null, {
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

handleEmojiPicker = () =>{
	debugger
	if(this.state.emojipicker == false){
		this.setState({emojipicker:true})
	}else{
		this.setState({emojipicker:false})
	}
}

	onLoginSuccess=()=>{

		var newLoginObj={};
	
		if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"){
			newLoginObj.botType = "kapittx"
		}
		else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"){
					newLoginObj.botType = "pension"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"){
					newLoginObj.botType = "telecom"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"){
					newLoginObj.botType= "HR"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"){
			newLoginObj.botType = "german"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"){
				newLoginObj.botType = "farmer"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"){
				newLoginObj.botType = "hospital"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"){
				newLoginObj.botType = "hindi"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"){
				newLoginObj.botType = "apricot"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"){
			newLoginObj.botType = "tricontes"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"){
			newLoginObj.botType = "germantricontes"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"){
			newLoginObj.botType = "doctorassistant"
			}
				axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/activeUsers', newLoginObj,{
		}).then(response => {
			
		}).catch(error => {
			console.log(error);
		});
	}

	onSubmitClick = (data) => {
		debugger
		var login = this.state.loginDataObj;
		if(!this.state.liveAgent){
			if(data.includes("#")){
				this.setState({date:'',date1:""})
				if(this.state.planId!=0){
					login.answers = data+"?@identifier="+this.state.planId;
					this.setState({planId:0})
				}	
				else{
					login.answers = data;
					this.setState({datacardDate:''})
					}
			}else if(this.state.planId!=0){
				login.answers = this.state.planId;
				this.setState({planId:0})
			}else if(data=="IC_Entities"){
				var string1 =  JSON.stringify(this.state.header);
				var string2= string1.replace(/"/g, "'");
				login.answers = "#redirect-IC_Task="+string2;
			}
			else{
				login.answers = data;
				this.setState({datacardDate:''})
				}
			// if(this.state.planId!=0){
			// 	login.answers = data+"?identifier="+this.state.planId;
			// 	this.setState({planId:0})
			// }else{
			// login.answers = data;
			// }
		const requestdata = JSON.stringify(login);
		const request = requestdata.replace(/\\/g, '');
		console.log(request);
		if(data == "IC_Entities"){
			document.getElementById("loader-wrapper1").style.visibility = "visible";
		}
		axios.post(this.state.port+'/faq/Kaptixbot/', request, {

		}).then(response => {
			 document.getElementById("loader-wrapper1").style.visibility = "hidden";
			console.log(response);
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
		// add a zero in front of numbers<10
		//	m = checkTime(m);
			var datetime = h+":"+m
      debugger
      this.getDashBoardData()
			var button1 = [];
			var sliderPresent=false;
			if (response.data.recommend) {	
			var status=false;	
				for (const value of response.data.recommend) {
					if(value.recomend_flag=="yes"){
						status=true;
					}
				}
				if(status){
					for(const value of response.data.bot_responce)
					if(value.type=="slider"){
						sliderPresent=true
					}
				}

				for (const value of response.data.recommend) {
					const taskName = value.task;
					 
					if (taskName == undefined || taskName == "") {
						taskName = value.utterance;
					}
					const utterence = value.utterance;
					if(value.recomend_flag=="yes" && !sliderPresent){

					}else{

					//	button1.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);
						if(value.link != ""){
							button1.push(<div><button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>
							<sup><a className="fa fa-external-link" href={value.link} target="_blank"></a></sup></div>);        
							}else{
								button1.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);        
							}		
					}
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
						//buttons: button1,
						heading: obj.title,
						row: obj.data_items,
						datetime:datetime
					}
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
				} else if (obj.type === "slider") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "slider",
						datetime:datetime,
						items:[],
						headers:[]
						//buttons: button1
					}
					var items = obj.data_items || [];
					var headers= obj.title || [];
				
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}

					this.setState({
						items,
						headers,
						activeIndex:0
					})
					atterenceResponce1.items=items;
					atterenceResponce1.headers=headers;
					atterenceResponce.push(atterenceResponce1);
				} else if (obj.type === "document") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "document",
						message: obj.value,
						text:obj.displayMessage,
						datetime:datetime
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
				else if (obj.type === "audio") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "audio",
						message: obj.value,
						text:obj.text,
						datetime:datetime
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
						text:obj.text,
						datetime:datetime
					}

					var items = obj.data_items || [];
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					this.setState({
						items
					})
				}else if (obj.type === "image") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "image",
						message: obj.value,
						text:obj.text,
						datetime:datetime
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
				else {
					var data = response.data.bot_responce[i].value;
					debugger
					console.log(data);
					var atterenceResponce1 = {
						flag: "bot",
						type: "text",
						message: data,
						datetime:datetime
						//buttons: button1
					}
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
				}
			}
			for(var i=0;i<response.data.bot_responce.length;i++){
				var res=response.data.bot_responce[i];
				if(res.value==="Sure I will transfer the call to our live agent, please wait." || res.value==="Sure I will transfer the call to our supervisor please wait." || res.value==="Sicher, ich werde den Anruf an Ihren Vorgesetzten weiterleiten. Bitte warten Sie."){
					this.state.liveAgent=true;
					this.onLoginSuccess(this.state.BotType);
				}

			}
			
			if(response.data.header){
				if(response.data.header.IC_Entities != undefined && response.data.header.IC_Entities.length!=0){
					if(response.data.header.ICFlag=="yes"){
					
						this.setState({
							intCardData:response.data.header.IC_Entities,
							header: response.data.header
						})
							this.importIcCardModel(true)
				}
				}
			 if(response.data.header.entity_catogry== "anydate" || response.data.header.entity_catogry=="futuredate" || response.data.header.entity_catogry=="pastdate"){
					// if(response.data.header.Entity_Name=="from_date"){
					// 	var atterenceResponce1 = {
					// 		type:"fromdate",
					// 		flag:"bot",
					// 		datetime:datetime
					// 		}
					// }else{
						var atterenceResponce1 = {
							type:"date",
							flag:"bot",
							name:response.data.header.Entity_Name,
							datetime:datetime
						}
					// }
					atterenceResponce.push(atterenceResponce1)
				}
				 if(response.data.header.upload_flag=="yes"){
					var atterenceResponce1 = {
						type:"uploadfile",
						datetime:datetime
						}
						this.setState({
							uploadfileloc:response.data.header.upload_file_loc
						})
					atterenceResponce.push(atterenceResponce1)
				}
				// else if(response.data.header.ICFlag=="yes")
				// {
				// 	this.setState({
				// 		intCardData:response.data.header.IC_Entities,
                //         header: response.data.header
				// 	})
					
				// 		this.importIcCardModel(true)
								
				// }

			}

			if(!this.state.liveAgent){
				this.isUserWantToChatWithLiveAgent();
			}
			this.onLoginSuccess(this.state.BotType);
		
			this.setState({
				atterenceResponce,
			})
			$(document).ready(function(){
				$('.card-body ').animate({
						scrollTop: $('.card-body')[0].scrollHeight}, 2000);
		});
		}).catch(error => {
			console.log(error);
		});
	}else{
		var utteranceObj={};
		utteranceObj.message = data
		 utteranceObj.Session_key = login.session_key
		 utteranceObj.Agent_Id = ""
		 utteranceObj.User_Id = login.username
		 utteranceObj.botType=this.state.port ? this.state.port : "";
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/userMessage', utteranceObj, {

			}).then(response => {
			// 	console.log(response);
			// 	$(document).ready(function(){
			// 		$('.card-body ').animate({
			// 				scrollTop: $('.card-body')[0].scrollHeight}, 2000);
			// });
	}).catch(error => {
	console.log(error);
	});
	}

	}

	isUserWantToChatWithLiveAgent(){
		debugger
		var login = this.state.loginDataObj;
		var utteranceObj={};
		
		if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"){
			utteranceObj.botType = "kapittx"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"){
				utteranceObj.botType = "pension"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"){
				utteranceObj.botType = "telecom"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"){
				utteranceObj.botType= "HR"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"){
				utteranceObj.botType = "german"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"){
				utteranceObj.botType = "farmer"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"){
				utteranceObj.botType = "hospital"
			}
			else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"){
				utteranceObj.botType = "hindi"
		  }
		  else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"){
			utteranceObj.botType = "apricot"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"){
			utteranceObj.botType = "tricontes"
		 }
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"){
			utteranceObj.botType = "germantricontes"
		}
		 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"){
			utteranceObj.botType = "doctorassistant"
		 }
		 //utteranceObj.message = data
		 utteranceObj.Session_key = login.session_key
		 utteranceObj.Agent_Id = ""
		 utteranceObj.User_Id = login.username
		 //utteranceObj.botType=this.state.port ? this.state.port : "";
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/userStatus', utteranceObj, {

			}).then(response => {
				if(response.data!=undefined && response.data.chatWithLiveAgent){
					this.state.liveAgent=true;
					this.onLoginSuccess(this.state.BotType);
				}
	}).catch(error => {
	console.log(error);
	});
	}
	

	postBotResponceOnButtonClick = (data) => {
		debugger
		var login = this.state.loginDataObj;
		if(data.includes("#")){
			this.setState({date:'',date1:"",importIcCardModel:false})
			if(this.state.planId!=0){
				login.answers = data+"?@identifier="+this.state.planId;
				this.setState({planId:0})
			}	
			else{
				login.answers = data;
				}
		}else if(this.state.planId!=0){
			login.answers = this.state.planId;
			this.setState({planId:0})
		}
		else{
			login.answers = data;
			}



		// if(this.state.planId!=0){
		// 	login.answers = data+"?identifier="+this.state.planId;
		// 	this.setState({planId:0})
		// }else{
		// login.answers = data;
		// }
		const request = JSON.stringify(login);
		console.log(request);
		axios.post(this.state.port+'/faq/Kaptixbot/', request, {

		}).then(response => {
			debugger
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
		// add a zero in front of numbers<10
		//	m = checkTime(m);
			var datetime = h+":"+m
			this.getDashBoardData()
			console.log(response);
			var button1 = [];
			var sliderPresent=false;
			if (response.data.recommend) {	
			var status=false;	
				for (const value of response.data.recommend) {
					if(value.recomend_flag=="yes"){
						status=true;
					}
				}
				if(status){
					for(const value of response.data.bot_responce)
					if(value.type=="slider"){
						sliderPresent=true
					}
				}

				for (const value of response.data.recommend) {
					const taskName = value.task;
					 
					if (taskName == undefined || taskName == "") {
						taskName = value.utterance;
					}
					const utterence = value.utterance;
					if(value.recomend_flag=="yes" && !sliderPresent){

					}else{
					//	button1.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);
					if(value.link != ""){
						button1.push(<div><button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>
						<sup><a className="fa fa-external-link" href={value.link} target="_blank"></a></sup></div>);        
						}else{
							button1.push(<button type='button' style={{margin: "5px 5px 5px 5px"}} className="btn-outline" onClick={() => this.onButtonClick(taskName, utterence)}>{value.title}</button>);        
						}		
					}
				}
      }
			var atterenceResponce = this.state.atterenceResponce;
			debugger
			for (var i = 0; i < response.data.bot_responce.length; i++) {
				var obj = response.data.bot_responce[i];
				if (obj.type === "list") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "list",
						message: obj.value,
						heading: obj.title,
						row: obj.data_items,
						datetime:datetime
					}
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
				} else if (obj.type === "slider") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "slider",
						datetime:datetime,
						items:[],
						headers:[]
						//buttons: button1
					}
					var items = obj.data_items || [];
					var headers= obj.title || [];
				
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}

					this.setState({
						items,
						headers,
						activeIndex:0
					})
					atterenceResponce1.items=items;
					atterenceResponce1.headers=headers;
					atterenceResponce.push(atterenceResponce1);
					
					
					//console.log(this.state.headers[0] != undefined ? this.state.items[this.state.headers[0].name] : "");
					debugger
				} else if (obj.type === "document") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "document",
						message: obj.value,
						text:obj.displayMessage,
						datetime:datetime
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
						text:obj.text,
						datetime:datetime
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
						text:obj.text,
						datetime:datetime
					}

					var items = obj.data_items || [];
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					this.setState({
						items
					})
				}else if (obj.type === "image") {
					var atterenceResponce1 = {
						flag: "bot",
						type: "image",
						message: obj.value,
						text:obj.text,
						datetime:datetime
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
				else{
					var data = response.data.bot_responce[i].value;
					console.log(data);
					var atterenceResponce1 = {
						flag: "bot",
						type: "text",
						message: data,
						datetime:datetime
						//buttons: button1
					}
					if( response.data.bot_responce.length-1 == i ){
						atterenceResponce1.buttons = button1
					}
					atterenceResponce.push(atterenceResponce1);
					console.log("atterenceResponce....",atterenceResponce)
				}
			}

			if(response.data.header){
				if(response.data.header.IC_Entities != undefined && response.data.header.IC_Entities.length!=0){
					if(response.data.header.ICFlag=="yes"){
					
						this.setState({
							intCardData:response.data.header.IC_Entities,
							header: response.data.header
						})
							this.importIcCardModel(true)
				}
				}
				 if(response.data.header.entity_catogry== "anydate" || response.data.header.entity_catogry=="futuredate" || response.data.header.entity_catogry=="pastdate"){
					// if(response.data.header.Entity_Name=="from_date"){
					// 	var atterenceResponce1 = {
					// 		type:"fromdate",
					// 		flag:"bot",
					// 		datetime:datetime
					// 		}
					// }else{
						var atterenceResponce1 = {
							type:"date",
							flag:"bot",
							name:response.data.header.Entity_Name,
							datetime:datetime
						}
					// }
					atterenceResponce.push(atterenceResponce1)
				}
				 if(response.data.header.upload_flag=="yes"){
					var atterenceResponce1 = {
						type:"uploadfile",
						datetime:datetime
						}
					this.setState({
						uploadfileloc:response.data.header.upload_file_loc
					})
					atterenceResponce.push(atterenceResponce1)
				}
				// else if(response.data.header.ICFlag=="yes"){
					
				// 	this.setState({
				// 		intCardData:response.data.header.IC_Entities,
                //         header: response.data.header
				// 	})
						
				
				// 			this.importIcCardModel(true)
					

				// 	}
						
				}

			for(var i=0;i<response.data.bot_responce.length;i++){
				var res=response.data.bot_responce[i];
				if(res.value==="Sure I will transfer the call to our live agent, please wait." || res.value==="Sure I will transfer the call to our supervisor please wait." || res.value==="Sicher, ich werde den Anruf an Ihren Vorgesetzten weiterleiten. Bitte warten Sie."){
					this.state.liveAgent=true;
					this.onLoginSuccess(this.state.BotType);
				}

			}
			if(!this.state.liveAgent){
				this.isUserWantToChatWithLiveAgent();
			}
			debugger
			this.setState({
				atterenceResponce,
			})
			this.onLoginSuccess(this.state.BotType)
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

	next(items) {
		debugger
		if (this.animating) return;
		
		const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
		if(nextIndex!=this.state.activeIndex){
			this.setState({ activeIndex: nextIndex });			
		} 
	}

	previous(items) {
		debugger
		if (this.animating) return;
		
		const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
		if(nextIndex!=this.state.activeIndex){
		this.setState({ activeIndex: nextIndex });	
	}
	}


	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	atteranceValue = (e) => {
		
		var user_query = {}
		user_query.user_query = e.target.value
		user_query = JSON.stringify(user_query);
		this.setState({
			value:e.target.value
		})
		console.log("user_query======================", user_query)
		//var autocompleteData =  [{label:"i want to know the account details",value:1}, {label:"i want to know my account details",value:2}, {label:"i want to know about my amount",value:3}, {label:"i want to know plans suitable for me",value:4},{label: "i want to recharge",value:5}]
		// axios.post(this.state.port+'//faq/auto_search/',user_query, {

		// }).then(response => {

		// 		this.setState({
		// 			autocompleteData : response.data,
		// 		})
		// 		console.log("getBotResponce======================", response.data)
		// 	}).catch(error => {
		// 		console.log(error);
		// 	});
		var data=[]; 
		data=this.state.autocompleteAllData;
		var autocompleteData1=[];
		autocompleteData1=data.filter((elem) => {
			return elem.includes(e.target.value);
		});
		var autocompleteData=[];
		for(var i=0;i<autocompleteData1.length;i++){
				autocompleteData.push({"label":autocompleteData1[i],"value":i})
		}
		this.setState({
			 			autocompleteData
		})
		console.log(this.state.autocompleteData);
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

	closeIcResponse  = () =>{
		this.setState({importIcCardModel:false})
	}

	// minimizeResponse = () =>{
	// 	var x = document.getElementById("target1");
	// 	if (x.style.display === "none") {
	// 	  x.style.display = "block";
	// 	} else {
	// 	  x.style.display = "none";
	// 	}
	// }

	sendAtteranceValue = () => {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m

		if(!this.state.liveAgent){
		var atterence = [{
			flag: "user",
			type: "text",
			message: this.state.atteranceValue,
			datetime:datetime
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
					message: this.state.botResponse[i].value,
					datetime:datetime
				})
				
				//this.speakText(atterenceResponce);
			} else {
				atterenceResponce.push({
					flag: "bot",
					type: this.state.botResponse[i].type,
					message: {
						heading: this.state.botResponse[i].title,
						row: this.state.botResponse[i].data_items
					},
					datetime:datetime
				})
			}
		}
		this.onSubmitClick(this.state.atteranceValue);
		this.setState({
			atterence,
			atterenceResponce,
			typingLoderFlag: false,
			atteranceValue: ""
		})
	}else{
		var atterenceResponce=this.state.atterenceResponce;
		var atterenceResponce1 = {
			flag: "",
			type: "text",
			message:  this.state.atteranceValue,
			datetime:datetime
	}
	atterenceResponce.push(atterenceResponce1);

		this.onSubmitClick(this.state.atteranceValue);
		this.setState({
			atterenceResponce,
			atteranceValue: ""
	})
	}
	$(document).ready(function(){
		$('.card-body ').animate({
				scrollTop: $('.card-body')[0].scrollHeight}, 2000);
	});
	
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

	handleClose = () => {
		debugger
		this.props.closeModal()
  }

	uploadFile = () =>{
		debugger
	
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '-' + dd + '-' + yyyy;

	 const data = new FormData()
	 if(this.state.fileList!=null && this.state.fileList!=undefined && this.state.fileList!=""){
	 data.append('file', this.state.fileList)
	 data.append('uploadfileloc',this.state.uploadfileloc);
	 data.append('date',today);
	 data.append('username',this.state.LoginData.username)

	 var data1 ={}
	 data1.user_Id = this.state.LoginData.username
	 data1.date = today
	 if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"){
		data1.flag = "kapitxbot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"){
		data1.flag = "pension"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"){
		data1.flag = "telecombot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"){
		data1.flag = "hrbot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"){
		data1.flag = "germanbot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"){
		data1.flag = "farmerbot"
  }
 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"){
	data1.flag = "hospitalbot"
  }
  else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"){
	data1.flag = "hindibot"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004"){
	data1.flag = "interviewBot"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"){
	data1.flag = "apricot"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"){
	data1.flag = "tricontes"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"){
	data1.flag = "germantricontes"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"){
	data1.flag = "doctorassistant"
}
document.getElementById("loader-wrapper1").style.visibility = "visible";
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NellaConsole-Services/uplaodDoc', data,{
		}).then(response => {
			document.getElementById("loader-wrapper1").style.visibility = "hidden";
			this.onSubmitClick(response.data.path)
			data1.path = response.data.path
			data1.upload_file_name = response.data.upload_file_name
			return axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NellaConsole-Services/saveuploadedDoc',data1);
		}).then((res) => {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m

			// var atterenceResponce = this.state.atterenceResponce;
			// var atterenceResponce1 = {
			// 	flag: "bot",
			// 	type: "text",
			// 	message: res.data[0].value,
			// 	datetime:datetime
			// }
			//  atterenceResponce.push(atterenceResponce1);
			// this.setState({
			// 	atterenceResponce,
			// });
		console.log("atterenceResponceData....!!!!",res.data)
		})
		.catch(error => {
			console.log(error);
		});
	}else{
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m
		var atterenceResponce = this.state.atterenceResponce;
		var atterenceResponce1 = {
			flag: "bot",
			type: "text",
			message: "Please select file",
			datetime:datetime
		}
		 atterenceResponce.push(atterenceResponce1);
		this.setState({
			atterenceResponce,
		});
	}
		this.state.fileList =""
	}

	uploadFile1 = () =>{
		debugger
	
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '-' + dd + '-' + yyyy;

	 const data = new FormData()
	 if(this.state.fileList!=null && this.state.fileList!=undefined && this.state.fileList!=""){
	 data.append('file', this.state.fileList)
	 data.append('uploadfileloc',this.state.uploadfileloc);
	 data.append('date',today);
	 data.append('username',this.state.LoginData.username)

	 var data1 ={}
	 data1.user_Id = this.state.LoginData.username
	 data1.date = today
	 if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000"){
		data1.flag = "kapitxbot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8000"){
		data1.flag = "pension"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8003"){
		data1.flag = "telecombot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8002"){
		data1.flag = "hrbot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006"){
		data1.flag = "germanbot"
	 }
	 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014"){
		data1.flag = "farmerbot"
  }
 else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8008"){
	data1.flag = "hospitalbot"
  }
  else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013"){
	data1.flag = "hindibot"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004"){
	data1.flag = "interviewBot"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016"){
	data1.flag = "apricot"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018"){
	data1.flag = "tricontes"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021"){
	data1.flag = "germantricontes"
}
else if(this.state.port=="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017"){
	data1.flag = "doctorassistant"
}
document.getElementById("loader-wrapper1").style.visibility = "visible";
		axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NellaConsole-Services/uplaodDoc', data,{
		}).then(response => {
			document.getElementById("loader-wrapper1").style.visibility = "hidden";
			// this.onSubmitClick(response.data.path)
			data1.path = response.data.path
			data1.upload_file_name = response.data.upload_file_name
			return axios.post('http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/NellaConsole-Services/saveuploadedDoc',data1);
		}).then((res) => {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m

			// var atterenceResponce = this.state.atterenceResponce;
			// var atterenceResponce1 = {
			// 	flag: "bot",
			// 	type: "text",
			// 	message: res.data[0].value,
			// 	datetime:datetime
			// }
			//  atterenceResponce.push(atterenceResponce1);
			// this.setState({
			// 	atterenceResponce,
			// });
		console.log("atterenceResponceData....!!!!",res.data)
		})
		.catch(error => {
			console.log(error);
		});
	}else{
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m
		var atterenceResponce = this.state.atterenceResponce;
		// var atterenceResponce1 = {
		// 	flag: "bot",
		// 	type: "text",
		// 	message: "Please select file",
		// 	datetime:datetime
		// }
		//  atterenceResponce.push(atterenceResponce1);
		// this.setState({
		// 	atterenceResponce,
		// });
	}
		this.state.fileList =""
	}

	handleFileSelect1 = (e) =>{
		debugger
		const files = e.target.files[0] || e.dataTransfer.files[0];
		// const fileList = Object.keys(files).map(file => files[file]);
		this.state.fileList = files
    // this.setState({
    //   fileList: files
		// });
		console.log("fileList.......",this.state.fileList)
	var fileName = this.state.fileList.name
		var infoArea = document.getElementById( 'file-upload-filename1' );
		infoArea.textContent = fileName;
	}

	handleFileSelect = (e) =>{
		debugger
		const files = e.target.files[0] || e.dataTransfer.files[0];
		// const fileList = Object.keys(files).map(file => files[file]);
		this.state.fileList = files
    // this.setState({
    //   fileList: files
		// });
		console.log("fileList.......",this.state.fileList)
	var fileName = this.state.fileList.name
		var infoArea = document.getElementById( 'file-upload-filename' );
		infoArea.textContent = fileName;
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

	onNotificationClick =(replayTask,notificationMessage) =>{
		//alert(replayTask);
		var atterenceResponce = this.state.atterenceResponce;
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var datetime = h+":"+m
		var atterenceResponce1 = {
			flag: "",
			type: "text",
			message: notificationMessage,
			datetime: datetime
			//buttons: button1
		}
		atterenceResponce.push(atterenceResponce1);
		this.setState({
			atterenceResponce
		});
		this.onSubmitClick(replayTask);
	}

	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.sendAtteranceValue();
		}
	}

	speechToText=()=>{
		
		var speecgRec = true;
		this.setState({speecgRec})
	}
	
	handleAddShareholder=()=>{
		debugger
		var datavalue = this.state.intCardData
		var dataCard=[];
		for(let i=0; i<datavalue.length; i++){
			if(datavalue[i].button != undefined && datavalue[i].button.length>0){
				
					var inputvalue= document.getElementById("dropdownvalue"+[i]).value
					var data=datavalue[i];
					data.Error=''
					data.Value=inputvalue;
					dataCard.push(data);
				
			}else if(datavalue[i].Entity_categoty == "futuredate" || datavalue[i].Entity_categoty == "pastdate" || datavalue[i].Entity_categoty == "anydate"){
				var inputvalue= document.getElementsByClassName(datavalue[i].Entity_Name)[0].value
				var fulldate = inputvalue.split("-")
				var year = fulldate[0];
				var month = fulldate[1];
				var day = fulldate[2];

				var fulldate1 = day+"/"+month+"/"+year
				var data=datavalue[i];
					data.Error=''
					data.Value=fulldate1
					dataCard.push(data);
			}

		else{
			var inputvalue= document.getElementById(datavalue[i].Entity_Name).value
			var data=datavalue[i];
			data.Error=''
			data.Value=inputvalue;
			dataCard.push(data);
		}
		}
	this.state.header.IC_Entities = dataCard
   this.onSubmitClick("IC_Entities")
	}
  saveWord=(word)=>{
		
		console.log("onResult=====================================", word)
		this.setState({
			atteranceValue: word.transcript,
			speecgRec:false
		})
		this.sendAtteranceValue()
	}

	openMenu = () =>{
		debugger
		if(this.state.openMenu == true){
			this.setState({openMenu:false})
		}else{
		this.setState({openMenu:true})
		}
	}
	
	// taskbuttonsList = () => {
	// 	debugger
	// 	this.setState({taskbuttonsflag:true})
	// }
	render() {

		// const customIcons = {
		// 	categories: {
		// 	  recent: () => <img src='https://github.githubassets.com/images/icons/emoji/octocat.png' />,
		// 	  foods: () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"/></svg>,
		// 	  people: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M3 2l10 6-10 6z"></path></svg>
		// 	}
		//   }

		var categories = {
			people: {
			  title: 'People',
			  emoji: 'smile'
			},
			nature: {
			  title: 'Nature',
			  emoji: 'mouse'
			},
			food: {
			  title: 'Food & Drink',
			  emoji: 'burger'
			}
		  }
		  
		console.log("propsport",this.props)
		console.log("stateport",this.state.port)
		console.log("intCardData",this.state.intCardData)
		console.log("headerdar",this.state.header)
		console.log("taskbuttons",this.state.taskbuttons)
		console.log("fromdate",this.state.from_date)
		console.log("kapittxtype",this.state.kapittxtype)
debugger

// toggleFab();

//Fab click
			$('#prime').click(function() {
				toggleFab();
			});
			
			//Toggle chat and links
			function toggleFab() {
				$('.prime').toggleClass('is-active');
				$('#prime').toggleClass('is-float');
				$('.fab').toggleClass('is-visible');
				
			}
			
			// Ripple effect
			var target, ink, d, x, y;
			$(".fab").click(function(e) {
				target = $(this);
				//create .ink element if it doesn't exist
				if (target.find(".ink").length == 0)
				target.prepend("<span class='ink'></span>");
			
				ink = target.find(".ink");
				//incase of quick double clicks stop the previous animation
				ink.removeClass("animate");
			
				//set size of .ink
				if (!ink.height() && !ink.width()) {
				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
				d = Math.max(target.outerWidth(), target.outerHeight());
				ink.css({
					height: d,
					width: d
				});
				}
			
				//get click coordinates
				//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
				x = e.pageX - target.offset().left - ink.width() / 2;
				y = e.pageY - target.offset().top - ink.height() / 2;
			
				//set the position and add class .animate
				ink.css({
				top: y + 'px',
				left: x + 'px'
				}).addClass("animate");
			});
  
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
  // add a zero in front of numbers<10
	//	m = checkTime(m);
		var datetime = h+":"+m
		//s = checkTime(s);
		//$('.abc').scrollTop($('.abc')[0].scrollHeight);
		// var msgDiv = document.getElementById("atterenceResponce").scrollHeight;
		// msgDiv.scrollTop = msgDiv.scrollHeight;
		console.log("uploadfileloc....",this.state.uploadfileloc)
		console.log("Autocomplete++++++++++++",this.state.autocomplete)
		// const notification = this.state.notification.map((item) => {
		// 	return (
		// 		<button className="notification" onClick={this.onNotificationClick()}>{item.notificationMessage}</button>
		// 	);
		// });
// {this.state.importIcCardModel == true &&
// 		$(document).ready(function(){
// 			$("#target1").show();
// 		});
// 	}

		const notify = this.state.items.map((item,index) => {
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
								<div className="clash-card__level clash-card__level--barbarian">Notification</div>
								<div className="clash-card__unit-name">{item.notificationMessage}</div>
								{item.replay_task !=undefined && item.replay_task!= "" && item.replay_task!= null ?
								<div className="clash-card__unit-description">		
							<button type='button' id="" className="btn-outline" onClick={() => this.onNotificationClick(item.replay_task, item.notificationMessage)} >Select</button>
								</div>:""}
								<div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
									<div className="one-third">
										<div className="stat">{this.state.headers[5] != undefined ? this.state.headers[5].name : ""}<sup>{item.charges == undefined ? "" : "₹"}</sup></div>
										<div className="stat-value">{this.state.headers[5] != undefined ? item[this.state.headers[5].name] : ""}</div>
									</div>
									<div className="one-third">
										<div className="stat">{this.state.headers[7] != undefined ? this.state.headers[7].name : ""}</div>
										<div className="stat-value">{this.state.headers[7] != undefined ? item[this.state.headers[7].name] : ""}</div>
									</div>
									<div className="one-third no-border">
										<div className="stat">{this.state.headers[6] != undefined ? this.state.headers[6].name : ""}</div>
										<div className="stat-value">{this.state.headers[6] != undefined ? item[this.state.headers[6].name] : ""}</div>
									</div>
								</div>
							</div> {/* end clash-card barbarian*/}
						</div> {/* end wrapper */}

					</div> {/* end container */}

					<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
				</CarouselItem>
			);
		});
		
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
								<div className="clash-card__level clash-card__level--barbarian">{this.state.headers[0] != undefined ? this.state.headers[0].name : ""}:{this.state.headers[0] != undefined ? item[this.state.headers[0].name] : ""}</div>
								<div className="clash-card__unit-name">{this.state.headers[1] != undefined ? this.state.headers[1].name : ""}:<br/>{this.state.headers[1] != undefined ? item[this.state.headers[1].name] : ""}</div>
								<div className="clash-card__unit-description">
								{this.state.headers[2] != undefined ? this.state.headers[2].name : ""}:{this.state.headers[2] != undefined ? item[this.state.headers[2].name] : ""}
								{this.state.headers[3] != undefined ? this.state.headers[3].name : ""}:{this.state.headers[3] != undefined ? item[this.state.headers[3].name] : ""}&nbsp;&nbsp;&nbsp; 
								{this.state.headers[4] != undefined ? this.state.headers[4].name : ""} :{this.state.headers[4] != undefined ? item[this.state.headers[4].name] : ""}<br />
									<button type='button' id="" className="btn-outline" onClick={() => this.onselectPlan(item.identifier)} >Select</button> 
									{/* <button type='button' id="" className="btn-outline" onClick={() => this.onselectPlan(item[this.state.headers[0].name])} >Select</button> */}
								</div>
								<div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
									<div className="one-third">
										<div className="stat">{this.state.headers[5] != undefined ? this.state.headers[5].name : ""}<sup>{item.charges == undefined ? "" : "₹"}</sup></div>
										<div className="stat-value">{this.state.headers[5] != undefined ? item[this.state.headers[5].name] : ""}</div>
									</div>
									<div className="one-third">
										<div className="stat">{this.state.headers[7] != undefined ? this.state.headers[7].name : ""}</div>
										<div className="stat-value">{this.state.headers[7] != undefined ? item[this.state.headers[7].name] : ""}</div>
									</div>
									<div className="one-third no-border">
										<div className="stat">{this.state.headers[6] != undefined ? this.state.headers[6].name : ""}</div>
										<div className="stat-value">{this.state.headers[6] != undefined ? item[this.state.headers[6].name] : ""}</div>
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
console.log("value..............................................",value)
				return (
				
					<div className="d-flex justify-content-start mb-4">
					
					{ index == 0 || (this.state.atterenceResponce[index-1] != undefined && this.state.atterenceResponce[index-1].flag != "bot")?
					this.state.imagePath !=null && this.state.imagePath!='' ?
					<div className="img_cont_msg">
							<img src={this.state.imagePath} className="rounded-circle user_img_msg" alt="face" />
						</div>  :
						<div className="img_cont_msg">
						<img src={logo} className="rounded-circle user_img_msg" alt="face" />
					</div> : ""
					}
						<div className="msg_cotainer" key={'atterenceResponce' + index}>
							{value.type === "text" &&
								Parser(value.message)
							}<br />
							{value.type === "text" &&
								value.buttons}

						{/* {value.type=="fromdate" &&
						 <DatePicker
						 format="dd/MM/yyyy"
						 clearIcon={null}
						 onChange={this.onChange}
						 value={this.state.date}
					  />
					} */}

					{value.type=="date" &&
					<input type="date"  id={value.name} onChange={(e)=>this.onChange1(e)}></input>
					// 	 <DatePicker
					// 	 format="dd/MM/yyyy"
					// 	 clearIcon={null}
					// 	 onChange={this.onChange1}
					// 	 value={this.state.date1}
					//   />
					}
							{value.type === "video" &&
								// <video
								// 	className="controls-width"
								// 	controls
								// 	src={value.message}
								// >
								// </video>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										{/* <video width={260} height="100%" controls>
											<source src={value.message} type="video/mp4" />
										</video> */}
										<object width={260} height="100%"
                                    data={value.message}>
                                    </object>
										{/* <span className="msg_time_send">9:10 AM, Today</span> */}
									</div>
									{/* <div className="img_cont_msg">
										<img src="images/user-profile.png" className="rounded-circle user_img_msg" />
									</div> */}
								</div>
							}
								
								{/* {value.type === "uploadfile"  &&
								
								<div className="image-upload inline">
								<input type="file" id="file-upload" name="myFile" onChange={(e) => this.handleFileSelect(e)} />
								<label for="file-upload">
								<img src={logo3} className="uploadLogo"/></label>
								<label >Attach File</label>
								&nbsp;&nbsp;
								
								<input type="submit" id="file-upload1"  />
								<label for="file-upload1">
								<img src={logo4} className="uploadLogo" onClick={() => this.uploadFile()}/></label>
								<label >Upload</label>
								{/* <i className="fas fa-arrow-up" onClick={() => this.uploadFile()}/></label> */}
								{/* <div id="file-upload-filename"></div>
								</div> */}
							{/* } */}
							{value.type === "audio" && <audio controls src={value.message} />}
							{value.type === "document" &&
							 <div className="d-flex justify-content-end mb-4">
							 <div className="msg_cotainer_send">
								 <div className="pdf_chat">
									 <h4>{value.text}</h4>
									 {/* <span>00 MB</span> */}
									 <p><i className="fa fa-file" />File</p>
								 </div>
								 <a href={value.message} target="_blank">
								 <button className="file_btn">Download</button></a>
								 {/* <span className="msg_time_send">9:10 AM, Today</span> */}
							 </div>
							 {/* <div className="img_cont_msg">
								 <img src="img/user-profile.png" className="rounded-circle user_img_msg" />
							 </div> */}
						 </div>
								/* <a href={value.message} target="_blank">{value.displayMessage!=undefined?value.displayMessage:"Click Here to Download!"}</a> */
								// <FileViewer
								// 	fileType={value.type}
								// 	filePath={value.message} />
							}
							{value.type === "image" && <img className="controls-width imgWidth" src={value.message} />}
							{value.type === "list" && this.state.port != "http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:9000" 
							&& value.heading!=null && value.row != null 	&& value.heading!=undefined && value.row != undefined?
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
							{value.type === "slider" && value.items!=undefined && value.items.length>0 &&
								<Carousel
									activeIndex={this.state.activeIndex}
									next={this.next}
									previous={this.previous}
								>
									<CarouselIndicators items={value.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
									{
										value.items.map((item)=>{
										return(	<CarouselItem
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
														<div className="clash-card__level clash-card__level--barbarian">{value.headers[0] != undefined ? value.headers[0].name : ""}:{value.headers[0] != undefined ? item[value.headers[0].name] : ""}</div>
														<div className="clash-card__unit-name">{value.headers[1] != undefined ? value.headers[1].name : ""}:<br/>{value.headers[1] != undefined ? item[value.headers[1].name] : ""}</div>
														<div className="clash-card__unit-description">
														{value.headers[2] != undefined ? value.headers[2].name : ""}:{value.headers[2] != undefined ? item[value.headers[2].name] : ""}
														{value.headers[3] != undefined ? value.headers[3].name : ""}:{value.headers[3] != undefined ? item[value.headers[3].name] : ""}&nbsp;&nbsp;&nbsp; 
														{value.headers[4] != undefined ? value.headers[4].name : ""} :{value.headers[4] != undefined ? item[value.headers[4].name] : ""}<br />
															<button type='button' id="" className="btn-outline" onClick={() => this.onselectPlan(item.identifier)} >Select</button> 
															{/* <button type='button' id="" className="btn-outline" onClick={() => this.onselectPlan(item[this.state.headers[0].name])} >Select</button> */}
														</div>
														<div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
															<div className="one-third">
																<div className="stat">{value.headers[5] != undefined ? value.headers[5].name : ""}<sup>{item.charges == undefined ? "" : "₹"}</sup></div>
																<div className="stat-value">{value.headers[5] != undefined ? item[value.headers[5].name] : ""}</div>
															</div>
															<div className="one-third">
																<div className="stat">{value.headers[7] != undefined ? value.headers[7].name : ""}</div>
																<div className="stat-value">{value.headers[7] != undefined ? item[value.headers[7].name] : ""}</div>
															</div>
															<div className="one-third no-border">
																<div className="stat">{value.headers[6] != undefined ? value.headers[6].name : ""}</div>
																<div className="stat-value">{value.headers[6] != undefined ? item[value.headers[6].name] : ""}</div>
															</div>
														</div>
													</div> {/* end clash-card barbarian*/}
												</div> {/* end wrapper */}
						
											</div> {/* end container */}
						
											<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
										</CarouselItem>
										);
									})
								}
									<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
									<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
								</Carousel>

							}{value.type === "slider" && value.items!=undefined && value.items.length>0 &&
								value.buttons
							}
							
							<div id="displayMessage"></div>
							<span className="msg_time">{value.datetime}, Today</span>
						</div>
						
					</div>
				
				);
			} else {
				return (
					<div className="d-flex justify-content-end mb-4">
						<div className="msg_cotainer_send" key={'atterence' + index}>
						{/* {value.type=="fromdate" &&
						 <DatePicker
						 clearIcon={null}
						 onChange={this.onChange}
						 value={this.state.date}
					  />
					}

				    {value.type=="date" &&
						 <DatePicker
						 clearIcon={null}
						 onChange={this.onChange1}
						 value={this.state.date1}
					  />
					} */}

                      {value.type=="uploadfile" &&
						<div className="image-upload inline">
						<input type="file" id="file-upload" name="myFile" onChange={(e) => this.handleFileSelect(e)} />
						<label for="file-upload">
						<img src={logo3} className="uploadLogo"/></label>
						<label >Attach File</label>
						&nbsp;&nbsp;
						
						<input type="submit" id="file-upload1"  />
						<label for="file-upload1">
						<img src={logo4} className="uploadLogo" onClick={() => this.uploadFile()}/></label>
						<label >Upload</label>
						{/* <i className="fas fa-arrow-up" onClick={() => this.uploadFile()}/></label> */}
						<div id="file-upload-filename"></div>
						</div>
					  }
							{value.message}
							<br /><span className="msg_time">{value.datetime}, Today</span>
						</div>

						{/* {this.state.typingLoderFlag ?
							<div id="bubble">
								<div id="circleWrapper">
									<div className="circle" id="circle1"></div>
									<div className="circle" id="circle2"></div>
									<div className="circle" id="circle3"></div>
								</div>
							</div> : ""} */}
               {/* {this.state.imagePath !=null && this.state.imagePath!='' ?
						<div className="img_cont_msg">
							<img alt="face" src={this.state.imagePath} className="rounded-circle user_img_msg"></img>
						</div>: */}
						<div className="img_cont_msg">
						<img alt="face" src={logo1} className="rounded-circle user_img_msg"></img>
					</div>
					{/* } */}
					</div>
				);
			}
		});

		return (
			<div ref={this.myRef}>
				
			<div>
			<div className="login">
			<SockJsClient url='http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/chat-web-socket' topics={['/topic/agent']}
            onMessage={(msg) => { this.onAgentMessage(msg) }}
            ref={ (client) => { this.clientRef = client }} />
			<SockJsClient url='http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/chat-web-socket' topics={['/topic/agentInterfare']}
            onMessage={(msg) => { this.onAgentWantToTalk(msg) }}
            ref={ (client) => { this.clientRef = client }} />
			<SockJsClient url='http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8080/LiveAgent/chat-web-socket' topics={['/topic/notification']}
            onMessage={(msg) => { this.onNotificationBySocket(msg) }}
            ref={ (client) => { this.clientRef = client }} />	

			  {/* {this.state.importIcCardModel == true ?
   			 < IcCardPage importIcCardModel={this.importIcCardModel} cdata={this.state.intCardData} importFaqFile={this.importFaqFile}  closeModal = {this.closeModal}/>:"" 
    }		 */}

				<div className="chat1 hide">
					{/* <div className="row justify-content-center h-100"> */}
				
						{/* <div className="col-md-8 col-xl-6 chat"> */}
							<div className="card botcard">
							
								 <div id="loader-wrapper1">
		                          <div id="loader1"></div>
			                  </div>
								{this.state.headerColor != null && this.state.headerColor != "" ?
								<div style={{backgroundColor:this.state.headerColor}} className="card-header msg_head">
									<div className="d-flex bd-highlight">

										<div className="img_cont1">
											<img src={logo2} className="rounded-circle user_img1" alt="face" />
											<span className="online_icon" />
										</div>

										<div className="user_info">
											<span>{this.state.LoginData.username}</span>
										</div>
									</div>
									{this.state.kapittxtype == "kapittx" ?
									"":
									<div className="float-right floatdata">
										<i className="fa fa-times"  onClick={this.handleClose} ></i>
									</div>}
								</div>:
								<div style={{backgroundColor:"#63294f"}} className="card-header msg_head">
								<div className="d-flex bd-highlight">

									<div className="img_cont1">
										<img src={logo2} className="rounded-circle user_img1" alt="face" />
										<span className="online_icon" />
									</div>

									<div className="user_info">
										<span>{this.state.LoginData.username}</span>
									</div>
								</div>
								{this.state.kapittxtype == "kapittx" ?
							"":<div className="float-right floatdata">
								  <i className="fa fa-times"  onClick={this.handleClose} ></i>
								</div>}
							</div>}
						   {this.state.bodyColor != null && this.state.bodyColor != "" ?
								<div style={{backgroundColor:this.state.bodyColor }} className="card-body msg_card_body abc" id="atterenceResponce">
						    
								{this.state.mainFlag?
								<div>		
								{this.state.items.length>0 && this.state.items[0]!=undefined && this.state.items[0].notificationMessage!=undefined && this.state.items[0].notificationMessage!="" && this.state.items[0].notificationMessage!=null?
								<div className="d-flex justify-content-start mb-4">
									{this.state.imagePath !=null && this.state.imagePath!='' ?
									<div className="img_cont_msg">
										<img src={this.state.imagePath} className="rounded-circle user_img_msg" alt="face" />
									</div>  :
									<div className="img_cont_msg">
									<img src={logo} className="rounded-circle user_img_msg" alt="face" />
									</div>  }
										<div className="msg_cotainer" key={'atterenceResponce' + -1}>
											<Carousel
											activeIndex={this.state.activeIndex}
											next={this.next}
											previous={this.previous}
										>
											<CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
											 {notify} 
											<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
											<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
										</Carousel>
										</div></div>:""}
								{atterenceResponce}
								</div>:
								this.state.BotType =="tricontes" ?
							<div className="row">
							<div className="col-md-4 text-center">
								<div className="hr_btn">
									<button onClick={() =>this.tricontesBot()}>Tricontes Bot</button>
								</div>
							</div>
							<div className="col-md-8 text-center">
								<div className="hr_btn">
									<button onClick={() =>this.germantricontesBot()}>Tricontes Bot (German Language)</button>
								</div>
							</div>
						</div>:
						<div className="row">
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button id="kapitx-bot" onClick={() =>this.kapitxBot()}>Kapitx Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.pensionBot()}>Pension Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.telecomBot()}>Telecom Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.hrBot()}>HR Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.germanBot()}>German Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.hospitalBot()}>Hospital Bot </button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.womenBot()}>हिंदी बॉट</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.farmerBot()}>Farmer Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.interviewBot()}>Interview Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.apricotBot()}>Apricot Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.tricontesBot()}>Tricontes Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.germantricontesBot()}>Ger. Tricontes</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.doctorAssistant()}>Dr. Assistant</button>
							</div>
						</div>
					</div>
					}
					   {this.state.importIcCardModel == true &&
									   <div id="target1">
									     <b>  <h6 style={{color:"blue"}}> Interactive Card </h6></b>
										   <div className="float-right floatdata1">
                          <i className="fa fa-times"  onClick={()=>this.closeIcResponse()} ></i>
                  			 </div>         
							   <div className="shareholder">
											<div>
											   {this.state.intCardData.map((data,idx)=>(
												data.button != undefined && data.button.length!=0 ?
												<tr>
												{/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												<select title={data.Entity_Question} className="inputName" id={"dropdownvalue"+idx}>
												{data.button.map((buttons,index)=>(
                                              
												<option  value={buttons.title}>{buttons.title}</option>  
											
												))}<br/></select><br/><br/></tr>
												:data.Entity_categoty == "futuredate" || data.Entity_categoty == "pastdate" || data.Entity_categoty == "anydate" ?
												//  data.Entity_Name == "from_date" ?
												 <tr className="inputName" title={data.Entity_Question}>
													 {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												 <input type="date" name="bday" className={data.Entity_Name} onChange={(e)=>this.fromchangeDate(e)}></input>
												 <span className="errormesage">{data.Error}</span>
												 {/* <DatePicker
												  format="dd/MM/yyyy"
												 clearIcon={null}
											     onChange={this.fromchangeDate}
												 value={this.state.fromdatacardDate}
											  /> */}
											 
											  <br/><br/> </tr>:
											   data.Entity_categoty == "upload_doc" ?
											  <tr className="inputName" title={data.Entity_Question}>
												   {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												 <div className="image-upload inline">
													<input type="file" id={data.Entity_Name}  name="myFile" onChange={(e) => this.handleFileSelect1(e)} />
													<label for={data.Entity_Name}>
													<img src={logo3} className="uploadLogo"/></label>
													<label >Attach File</label>
													&nbsp;&nbsp;
													
													<input type="submit" id="file-upload1"  />
													<label for="file-upload1">
													<img src={logo4} className="uploadLogo" onClick={() => this.uploadFile1()}/></label>
													<label >Upload</label>
													{/* <i className="fas fa-arrow-up" onClick={() => this.uploadFile()}/></label> */}
													<div id="file-upload-filename1"></div>
													</div>
													<span className="errormesage">{data.Error}</span>
											  </tr>:
											  <tr>
												   {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												<input type="text" title={data.Entity_Question} className="inputName" id={data.Entity_Name} placeholder={data.Entity_Question} />
												<span className="errormesage">{data.Error}</span>
												<br/><br/></tr>
												))}
											</div>
											))}
										</div>
											<button style={{borderRadius:"10px"}} type="button" onClick={()=>this.handleAddShareholder()}
											className="medium">
											Submit
											</button>
									</div>
									
								}

                                {
									this.state.openMenu == true &&
									<div id="target2">
									{this.state.taskbuttons.map((item,index) => (
									<button type='button' style={{margin: "5px 5px 5px 5px"}} className="taskbuttons" onClick={() => this.onButtonClick(item.task,item.utterance)}>{item.title}</button>
								))}
								   </div>
								   

									}

					 { this.state.emojipicker == true && 
					     <div id="target3"> 
								 <Picker onSelect={this.handleClick} /> 
								 </div> 
							     } 
								  
								</div>:

								<div style={{backgroundColor: "#f1f1f1"}} className="card-body msg_card_body abc" id="atterenceResponce">
						
								{this.state.mainFlag?
								<div>		
								{this.state.items.length>0 && this.state.items[0]!=undefined && this.state.items[0].notificationMessage!=undefined && this.state.items[0].notificationMessage!="" && this.state.items[0].notificationMessage!=null?
								<div className="d-flex justify-content-start mb-4">
									{this.state.imagePath !=null && this.state.imagePath!='' ?
									<div className="img_cont_msg">
										<img src={this.state.imagePath } className="rounded-circle user_img_msg" alt="face" />
									</div>  :
									<div className="img_cont_msg">
									<img src={logo} className="rounded-circle user_img_msg" alt="face" />
									</div> }
										<div className="msg_cotainer" key={'atterenceResponce' + -1}>
											<Carousel
											activeIndex={this.state.activeIndex}
											next={this.next}
											previous={this.previous}
										>
											<CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
											 {notify} 
											<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
											<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
										</Carousel>
										</div></div>:""}
								{atterenceResponce}
								</div>:
								this.state.BotType =="tricontes" ?
							<div className="row">
							<div className="col-md-4 text-center">
								<div className="hr_btn">
									<button onClick={() =>this.tricontesBot()}>Tricontes Bot</button>
								</div>
							</div>
							<div className="col-md-8 text-center">
								<div className="hr_btn">
									<button onClick={() =>this.germantricontesBot()}>Tricontes Bot (German Language)</button>
								</div>
							</div>
						</div>:
						<div className="row">
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button id="kapitx-bot" onClick={() =>this.kapitxBot()}>Kapitx Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.pensionBot()}>Pension Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.telecomBot()}>Telecom Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.hrBot()}>HR Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.germanBot()}>German Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.hospitalBot()}>Hospital Bot </button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.womenBot()}>हिंदी बॉट</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.farmerBot()}>Farmer Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.interviewBot()}>Interview Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.apricotBot()}>Apricot Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.tricontesBot()}>Tricontes Bot</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.germantricontesBot()}>Ger. Tricontes</button>
							</div>
						</div>
						<div className="col-md-4 text-center">
							<div className="hr_btn">
								<button onClick={() =>this.doctorAssistant()}>Dr. Assistant</button>
							</div>
						</div>
					</div>
					}
					   {this.state.importIcCardModel == true &&
									   <div id="target1">
									     <b>  <h6 style={{color:"blue"}}> Interactive Card </h6></b>
										   <div className="float-right floatdata1">
                      <i className="fa fa-times"  onClick={()=>this.closeIcResponse()} ></i>
                  			 </div>
							   <div className="shareholder">
												<div >
			                                    {this.state.intCardData.map((data,idx)=>(
												data.button != undefined && data.button.length!=0 ?
												<tr>
											 {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												<select title={data.Entity_Question} className="inputName" id={"dropdownvalue"+idx}>
												{data.button.map((buttons,index)=>(
                                              
												<option  value={buttons.title}>{buttons.title}</option>  
											
												))}<br/></select><br/><br/></tr>
												:
												data.Entity_categoty == "futuredate" || data.Entity_categoty == "pastdate" || data.Entity_categoty == "anydate" ?
												//  data.Entity_Name == "from_date" ?
												 <tr className="inputName" title={data.Entity_Question}>
													 {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												 <input type="date" name="bday" className={data.Entity_Name} onChange={(e)=>this.fromchangeDate(e)}></input>
												 <span className="errormesage">{data.Error}</span>
											  <br/><br/>
											  </tr>:
											   data.Entity_categoty == "upload_doc" ?
											   <tr className="inputName" title={data.Entity_Question}>
												  <div className="image-upload inline">
												  {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
													 <input type="file" id={data.Entity_Name} name="myFile" onChange={(e) => this.handleFileSelect1(e)} />
													 <label for={data.Entity_Name}>
													 <img src={logo3} className="uploadLogo"/></label>
													 <label >Attach File</label>
													 &nbsp;&nbsp;
													 
													 <input type="submit" id="file-upload1"  />
													 <label for="file-upload1">
													 <img src={logo4} className="uploadLogo" onClick={() => this.uploadFile1()}/></label>
													 <label >Upload</label>
													 {/* <i className="fas fa-arrow-up" onClick={() => this.uploadFile()}/></label> */}
													 <div id="file-upload-filename1"></div>
													 </div>
													 <span className="errormesage">{data.Error}</span>
											   </tr>:
											  <tr>
												   {/* <i class="fa fa-info-circle" aria-hidden="true"></i> */}
												<input type="text" title={data.Entity_Question} className="inputName" id={data.Entity_Name} placeholder={data.Entity_Question} />
												<span className="errormesage">{data.Error}</span>
												<br/><br/>
												</tr>
												))}
										 </div>
										</div>
											<button style={{borderRadius:"10px"}} type="button" onClick={()=>this.handleAddShareholder()}
											className="medium">
											Submit
											</button>
									</div>
									
								}

                                {
									this.state.openMenu == true &&
									<div id="target2">
									{this.state.taskbuttons.map((item,index) => (
									<button type='button' style={{margin: "5px 5px 5px 5px"}} className="taskbuttons" onClick={() => this.onButtonClick(item.task,item.utterance)}>{item.title}</button>
								))}
								   </div>
								   

									}
                   {this.state.emojipicker == true && 
								 <div id="target3"> 
								<Picker onSelect ={this.handleClick} />
								</div>
							    }
																  
								</div>}
								<div ref={this.myRef}></div> 
								{/* <div style={{ float:"left", clear: "both" }}
										ref={(el) => { this.messagesEnd = el; }}>
								</div> */}
							{this.state.footerColor != null && this.state.footerColor != "" && this.state.mainFlag?
						
								<div style={{backgroundColor:this.state.footerColor}} className="card-footer cardfooter">
									<div className="input-group">	
									<div className="input-group-append" >
											<span className="input-group-text attach_btn" title="Menu" onClick={()=>this.openMenu()}><i className="fa fa-bars" /></span>
									</div> 	
									{/* <i onClick={this.handleEmojiPicker} className="far fa-smile"></i> */}
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
											<button className="input-group-text" onClick={() => this.speechToText()}> <i className="fas fa-microphone" />
											</button>
											{this.state.speecgRec == true?
											<SpeechRecognizer 
													//onNotAvailable={() => alert('not available in your browser')} 
													onResult={this.saveWord} 
													onTempResult={(res) => console.log("onTempResult", res)}
													onError={(error) => console.log("error", error)}
												/> :""}
										</div>
									</div>
								</div>:
								this.state.mainFlag ?
								<div className="card-footer cardfooter">
								<div className="input-group">	
								<div className="input-group-append" >
										<span className="input-group-text attach_btn" title="Menu" onClick={()=>this.openMenu()}><i className="fa fa-bars" /></span>
								</div>
								{/* <i onClick={this.handleEmojiPicker}  className="far fa-smile"></i> */}
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
										<button className="input-group-text" onClick={() => this.speechToText()}> <i className="fas fa-microphone" />
										</button>
										{this.state.speecgRec == true?
										<SpeechRecognizer 
												//onNotAvailable={() => alert('not available in your browser')} 
												onResult={this.saveWord} 
												onTempResult={(res) => console.log("onTempResult", res)}
												onError={(error) => console.log("error", error)}
											/> :""}
									</div>
								</div>
							</div>:""}
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
	MainBotKap
);