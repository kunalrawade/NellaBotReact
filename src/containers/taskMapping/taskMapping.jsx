import React from 'react';
import './taskMapping.scss';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import queryString from 'query-string'
  // import Select from 'react-select';
import Alert from 'react-s-alert';
import swal from 'sweetalert';
import 'react-s-alert/dist/s-alert-default.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { fi } from 'date-fns/esm/locale';
import {applicationContextPath} from '../botMainPage/api'
class TaskMapping extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          taskId: '',
          display_taskid: 1,
          taskName: '',
          attributes: [],
          entity: [],
          decisionMaking: [],
          recommendations: [],
          multimedia:[]
        }
      ],
      dataTrain :{
        trainingValue :""
      },
      multimediaData:[],
      trainArray: [],
      show: [],
      count:[],
      showEntityAction: [],
      showDecision : [],
      showEntityDecision : [],
      trainModalFlag: false,
      updateModalFlag :false,
      updateTrainModalFlag : false,
      botname:'',
      nameOfTask :'',
      entityData:[],
      selectedEntity:'',
      taskList:[],
      tableDataList:[],
      actionUrlList:[],
      preActionUrlList:[],
      validationUrlList:[],
      checkDataUrlList:[],
      recomendUrlList:[],
      collectionUrlList:[],
      showTaskultimedia:[],
      showEntityMultimedia:[],
      trainedCollection:false,
      showtrainedCollection:[],
      trainedCollectionValue:[],
      trainedCollectionValue1:[],
      trainedCollectionTaskId:'',
      trainedCollectionEntityId:''
    };
  }

  componentDidMount(){
    
    var botData ={};
    botData.botname = queryString.parse(this.props.history.location.search).botType
    this.setState({botname:botData.botname})
    this.getEntity(botData.botname)
    this.getTaskList(botData.botname)
    console.log("botnamne",this.state.botname)
     this.getTaskData(botData.botname)
     this.getBotApi(botData.botname)
    
  }

  getBotApi = (botData) => {
    
    var botApi = {}
    botApi.flag = botData
    axios.post(applicationContextPath+':8080/NellaConsole-Services/getBotApi', botApi, {
    }).then(response => {
      var entity = {
        "title": "--Select--",
        "api":"",
        "action_type":"--Select--"
      }
      response.data.unshift(entity);
  
     for(let i= 0; i<response.data.length;i++){

       if(response.data[i].action_type == "Action_Url" || response.data[i].action_type =="--Select--"){
        var actionUrl = this.state.actionUrlList
          actionUrl.push(response.data[i])
         this.setState(actionUrl)
       }

       if(response.data[i].action_type == "validation_url" || response.data[i].action_type =="--Select--"){
        var validationUrl = this.state.validationUrlList
        validationUrl.push(response.data[i])
        this.setState(validationUrl)
      }

      if(response.data[i].action_type == "pre_action_url" || response.data[i].action_type =="--Select--"){
        var preActionUrl = this.state.preActionUrlList
        preActionUrl.push(response.data[i])
        this.setState(preActionUrl)
      }

      if(response.data[i].action_type == "check_data_url" || response.data[i].action_type =="--Select--"){
        var checkDataUrl = this.state.checkDataUrlList
        checkDataUrl.push(response.data[i])
        this.setState(checkDataUrl)
      }

      if(response.data[i].action_type == "recomend_url" || response.data[i].action_type =="--Select--"){
        var recomendUrl = this.state.recomendUrlList
        recomendUrl.push(response.data[i])
        this.setState(recomendUrl)
      }

      if(response.data[i].action_type == "collection_url" || response.data[i].action_type =="--Select--"){
        var collectionUrl = this.state.collectionUrlList
        collectionUrl.push(response.data[i])
        this.setState(collectionUrl)
      }
     }
    }).catch(error => {
      console.log(error);
    });

  }
  getTaskData = (botData) =>{
    
    var taskData = {}
    let port ={}

    if(botData=="hrbot")
    {
      port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq"
    }
    else if(botData=="telecombot")
    {
      port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:8003/faq"
    }
    else if(botData=="pension")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8000/faq"
    }
    else if(botData=="germanbot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq"
    }
    else if(botData=="kapitxbot")
    {
      port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq"
    }
    else if(botData=="farmerbot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq"
    }
    else if(botData=="hospitalbot")
    {
      port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8008/faq"
    }
    else if(botData=="hindibot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq"
    }
    else if(botData=="apricot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq"
    }
    else if(botData=="tricontes")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq"
    }
    else if(botData=="germantricontes")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq"
    }
    else if(botData=="doctorassistant")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq"
    }
    else if(botData=="interview")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq"
    }
    else if(botData=="nellinfotech")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8022/faq"
    }
    else if(botData=="salesforce")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8023/faq"
    }
    axios.post(port+'/getworkflow/', taskData, {
    }).then(response => {
     this.setState({tasks:response.data.task})
    }).catch(error => {
      console.log(error);
    });

  }


  getEntity = (botData) =>{
    
    var taskData = {}
    let port ={}

    if(botData=="hrbot")
    {
      port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq"
    }
    else if(botData=="telecombot")
    {
      port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:8003/faq"
    }
    else if(botData=="pension")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8000/faq"
    }
    else if(botData=="germanbot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq"
    }
    else if(botData=="kapitxbot")
    {
      port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq"
    }
    else if(botData=="farmerbot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq"
    }
    else if(botData=="hospitalbot")
    {
      port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8008/faq"
    }
    else if(botData=="hindibot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq"
    }
    else if(botData=="apricot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq"
    }
    else if(botData=="tricontes")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq"
    }
    else if(botData=="germantricontes")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq"
    }
    else if(botData=="doctorassistant")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq"
    }
    else if(botData=="interview")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq"
    }
    else if(botData=="nellinfotech")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8022/faq"
    }
    else if(botData=="salesforce")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8023/faq"
    }
    axios.post(port+'/get_regex/', taskData, {
    }).then(response => {
 
      var entity = {
        "entity_id": 0,
        "entity_name":"--Select--"
      }
      response.data.unshift(entity);
     this.setState({entityData:response.data})
    }).catch(error => {
      console.log(error);
    });

  }


 getTaskList = (botData) =>{
  
    var taskData = {}
    let port ={}

    if(botData=="hrbot")
    {
      port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq"
    }
    else if(botData=="telecombot")
    {
      port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:8003/faq"
    }
    else if(botData=="pension")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8000/faq"
    }
    else if(botData=="germanbot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq"
    }
    else if(botData=="kapitxbot")
    {
      port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq"
    }
    else if(botData=="farmerbot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq"
    }
    else if(botData=="hospitalbot")
    {
      port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8008/faq"
    }
    else if(botData=="hindibot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq"
    }
    else if(botData=="apricot")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq"
    }
    else if(botData=="tricontes")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq"
    }
    else if(botData=="germantricontes")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq"
    }
    else if(botData=="doctorassistant")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq"
    }
    else if(botData=="interview")
    {
      port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq"
    }
    else if(botData=="nellinfotech")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8022/faq"
    }
    else if(botData=="salesforce")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8023/faq"
    }
    axios.post(port+'/get_task/', taskData, {
    }).then(response => {
 
      var entity = {
        "entity_name": "",
        "entity_name":"--Select--"
      }
      response.data.unshift(entity);
     this.setState({taskList:response.data})
    }).catch(error => {
      console.log(error);
    });

  }

  addNewTask = () => {
    
    const taskId =  (this.state.tasks != null && this.state.tasks.length > 0) ? this.state.tasks[this.state.tasks.length - 1].display_taskid + 1 : 1;
    const task = {
      taskId: '',
      display_taskid:taskId,
      taskName: '',
      attributes: [],
      entity: [],
      decisionMaking: [],
      recommendations: [],
      multimedia:[]
    
    }
    this.state.tasks.push(task);
    this.setState({ tasks: this.state.tasks })
  }

  removeTask = (i) => {
    
    if ( this.state.tasks != null && this.state.tasks.length > 1) {
      this.state.tasks.splice(i, 1);
    }
    this.setState({ tasks: this.state.tasks })
  }

  addNewEntity = (display_taskid, display_entityid, flag) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (flag === 'remove') {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              task.entity.splice(j, 1);
            }
          }
        } else {
          const entityId = (task.entity != null && task.entity.length > 0) ? task.entity[task.entity.length - 1].display_entityid + 1 : 1;
          const entity = {
            entityId: '',
            display_entityid: entityId,
            entityName: '',
            attributes: [],
            decisionMaking: [],
            recommendations: [],
            multimedia:[]
          }
          task.entity.push(entity);
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  addNewAction = (display_taskid, display_entityid, close) => {
    
    const recommendation = {
      recommendationId: '',
      display_recommendid:1,
      recommendationName: '',
      attributes: [],
    }
    let show = this.state.show;
    let showEntityAction = this.state.showEntityAction;
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (close) {
                task.entity[j].recommendations = [];
                show = [];
                showEntityAction = [];
              }
              else if(task.entity[j].recommendations == null){
                let len=(task.entity[j].recommendations == null)?1:task.entity[j].recommendations.length+1;
                task.entity[j].recommendations = []
                recommendation.display_recommendid=len;
                task.entity[j].recommendations.push(recommendation);
                show = [];
                showEntityAction.push(display_entityid)
              }
               else {
                let len=task.entity[j].recommendations.length==0?1:task.entity[j].recommendations.length+1;
                recommendation.display_recommendid=len;
                task.entity[j].recommendations.push(recommendation);
                show = [];
                showEntityAction.push(display_entityid)
              }
            }
          }
        } else {
          if (close) {
            task.recommendations = [];
            show = [];
            showEntityAction = [];
          }else if(task.recommendations == null) {
            let len= (task.recommendations == null)?1:task.recommendations.length+1;
            task.recommendations = []
            recommendation.display_recommendid=len;
            task.recommendations.push(recommendation);
            show.push(display_taskid);
            showEntityAction = [];
          }
           else {
            let len= (task.recommendations.length==0)?1:task.recommendations.length+1;
            recommendation.display_recommendid=len;
            task.recommendations.push(recommendation);
            show.push(display_taskid);
            showEntityAction = [];
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks, show, showEntityAction });
  }


  addNewAction2 = (display_taskid, display_entityid, close) => {
    
    const multimedia = []
    let showTaskultimedia = this.state.showTaskultimedia;
    let showEntityMultimedia = this.state.showEntityMultimedia;
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (close) {
                task.entity[j].multimedia = [];
                showTaskultimedia = [];
                showEntityMultimedia=[];
              }
               else {
                // task.entity[j].multimedia.push(multimedia);
                showTaskultimedia = [];
                showEntityMultimedia.push(display_entityid)
              }
            }
          }
        } else {
          if (close) {
            task.multimedia = [];
            showTaskultimedia = [];
            showEntityMultimedia = [];
          }
           else {
            // task.multimedia.push(multimedia);
            showTaskultimedia.push(display_taskid);
            showEntityMultimedia = [];
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks, showTaskultimedia, showEntityMultimedia });
  }
 

  handleTrainedCollectionModal = (display_taskid, display_entityid, close) =>{
       this.setState({trainedCollection:true})
  }
  addNewAction1 = (display_taskid, display_entityid, close) => {
    
    const decisionMaking = {
      decisionMakingId: '',
      display_resultid:1,
      decisionMakingName: '',
      attributes: [],
    }
    let showDecision = this.state.showDecision;
    let showEntityDecision = this.state.showEntityDecision;
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (close) {
                task.entity[j].decisionMaking = [];
                showDecision = [];
                showEntityDecision = [];
              }else if(task.entity[j].decisionMaking == null){
                let len= (task.entity[j].decisionMaking == null || task.entity[j].decisionMaking.length==0)?1:task.entity[j].decisionMaking.length+1;
                task.entity[j].decisionMaking = []
                decisionMaking.display_resultid=len;
                task.entity[j].decisionMaking.push(decisionMaking);
                showDecision = [];
                showEntityDecision.push(display_entityid)
              }
               else {
                let len=task.entity[j].decisionMaking.length==0?1:task.entity[j].decisionMaking.length+1;
                decisionMaking.display_resultid=len;
                task.entity[j].decisionMaking.push(decisionMaking);
                showDecision = [];
                showEntityDecision.push(display_entityid)
              }
            }
          }
        } else {
          if (close) {
            task.decisionMaking = [];
            showDecision = [];
            showEntityDecision = [];
          } else if(task.decisionMaking == null) {
            let len=(task.decisionMaking == null || task.decisionMaking.length==0)?1:task.decisionMaking.length+1;
            task.decisionMaking = []
            decisionMaking.display_resultid=len;
            task.decisionMaking.push(decisionMaking);
            showDecision.push(display_taskid);
            showEntityDecision = [];
          }
           else {
            let len=task.decisionMaking.length==0?1:task.decisionMaking.length+1;
            decisionMaking.display_resultid=len;
            task.decisionMaking.push(decisionMaking);
            showDecision.push(display_taskid);
            showEntityDecision = [];
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks, showDecision, showEntityDecision });
  }

  getFieldValue = (display_taskid, display_entityid, fieldName, e) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (fieldName === 'task') {
          task.taskName = e.target.value;
        } else if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (fieldName === 'entity')
                task.entity[j].entityName = e.target.value;
              if (fieldName === 'decisionMaking')
                task.entity[j].decisionMaking.decisionMakingName = e.target.value;
            }
          }
        } else if (fieldName === 'decisionMaking') {
          task.decisionMaking.decisionMakingName = e.target.value;
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  addTaskAttributes = (display_taskid, flag) => {
    
    const attributes = [
      {
      'key': 'Intent_Name',
      'value': '',
      'name' : 'Intent Name',
      'tooltip' :'Name Of The Intent'
    },
    {
      'key': 'Task_Name',
      'value': '',
      'name' : 'Task Name',
      'tooltip' :'Name Of The Task'
    },
    {
      'key': 'Action_Url',
      'value': '',
      'name' : 'Action Url',
      'tooltip' :'Action URL To Be Invoked'
    },
    {
      'key': 'check_data_url',
      'value': '',
      'name' : 'Check Data Url',
      'tooltip' :'Check Data URL'
    },{
      'key': 'post_action',
      'value': '',
      'name' : 'Post Action Task',
      'tooltip' :'Task To Be Called After Action URL'
    },
    {
      'key': 'feed_back_flag',
      'value': '',
      'name' : 'Feedback Flag',
      'tooltip' :'Do You Need Feedback For This Task'
    },
    {
      'key': 'combined_resp_flag',
      'value': '',
      'name' : 'Combined Response',
      'tooltip' :'To You Want To Show Combined Response From Action URL & Task Called After The Action URL'
    },];

    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].display_taskid == display_taskid) {
        if (flag == 'add') {
          this.state.tasks[i].attributes = attributes;
        } else {
          this.state.tasks[i].attributes = [];
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  addEntityAttribute = (display_taskid, display_entityid, flag) => {
    
   const attributes = [
    {
      'key': 'Entity_Name',
      'value': '',
      'name' : 'Entity Name',
      'tooltip' :'Name Of The Entity'
    },
    {
      'key': 'Entity_Question',
      'value': '',
      'name' : 'Entity Question',
      'tooltip' :'Question To Be Asked'
    },
    {
      'key': 'Entity_alternet_qustion',
      'value': '',
      'name' : 'Entity Alternet Qustion',
      'tooltip' :'Alternate Ways To Ask Same Question'
    },
    {
      'key': 'Entity_Sequence',
      'value': '',
      'name' : 'Entity Sequence',
      'tooltip' :'Sequence Of The Question To Be Asked'
    },
    {
      'key': 'task_redirect',
      'value': '',
      'name' : 'Task Decision',
      'tooltip' :'Do You Want To Redirect Task Based On Entity Value?'
    }, {
      'key': 'pre_text',
      'value': '',
      'name' : 'Pre Text (Static)',
      'tooltip' :'Task To Be Appended For The Question'
    }, {
      'key': 'pre_action_url',
      'value': '',
      'name' : 'Pre Text (Dynamic)',
      'tooltip' :'URL Of The Dynamic Content To Be Added Before Question'
    }, 
    // {
    //   'key': 'interview_url',
    //   'value': '',
    //   'name' : 'Interview Url'
    // }, 
    {
      'key': 'cache_flag',
      'value': '',
      'name' : 'Cache Flag',
      'tooltip' :'Do You Want To Temporarily Cache The Entity Value'
    }, {
      'key': 'value_collection_name',
      'value': '',
      'name' : 'Trained Collection For Entity',
      'tooltip' :'Name Of The Trained Collection For The Entity Data'
    },{
      'key': 'collection_url',
      'value': '',
      'name' : 'Dynamic Collection For Entity',
      'tooltip' :'URL For The Dynamic Collection For The Entity Data'
    },{
      'key': 'validation_url',
      'value': '',
      'name' : 'Validation URL',
      'tooltip' :'URL To Validate Entity Data'
    },{
      'key': 'upload_file',
      'value': '',
      'name' : 'Upload Location',
      'tooltip' :'Location Of The Uploaded File'

    },{
      'key': 'upload_flag',
      'value': '',
      'name' : 'Upload Flag',
      'tooltip' :'Do This Entity Require File To Be Uploaded'
    },{
      'key': 'Entity_Id',
      'value': '',
      'name' : 'Entity Datatype',
      'tooltip' :'Datatype Of The Entity'
    }
  ];
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].display_taskid == display_taskid) {
        for (let j = 0; j < this.state.tasks[i].entity.length; j++) {
          if (this.state.tasks[i].entity[j].display_entityid == display_entityid) {
            if (flag === 'add') {
              this.state.tasks[i].entity[j].attributes = attributes;
            } else {
              this.state.tasks[i].entity[j].attributes = [];
            }
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });

  }

  addDecisionMakingAttribute = (display_taskid, display_entityid, index, flag) => {
      
    const attributes = [{
      'key': 'keyof',
      'value': '',
      'name' : 'Decision Key',
      'tooltip' :'Decision Key'
    },
    {
      'key': 'redirectTo',
      'value': '',
      'name' : 'Redirect Task',
      'tooltip' :'Name Of The Task To Be Redirected To'
    },
    {
      'key': 'repeat_task',
      'value': '',
      'name' : 'Clear Earlier Task',
      'tooltip' :'Clear Earlier Responses To The Task (Yes/No)'
    }];

    for (let i = 0; i < this.state.tasks.length; i++) {
      let task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (flag === 'add') {
                task.entity[j].decisionMaking[index].attributes = attributes;
              } else {
                task.entity[j].decisionMaking[index].attributes = [];
              }
            }
          }
        } else {
          if (flag === 'add') {
            task.decisionMaking[index].attributes = attributes;
          } else {
            task.decisionMaking[index].attributes = [];
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }


  
  addRecommendationAttributes = (display_taskid, display_entityid, index, flag) => {
    
    const attributes = [{
      'key': 'task',
      'value': '',
      'name' : 'Task To Be Invoked',
      'tooltip' :'Task To Be Invoked On The Recommend'
    },
    {
      'key': 'link',
      'value': '',
      'name' : 'Link',
      'tooltip' :'Link To Be Attached With Recommendation Title'
    },
    {
      'key': 'utterance',
      'value': '',
      'name' : 'Utterance',
      'tooltip' :'Utterance To Be Submited On Click Of Recommendation'
    },
    {
      'key': 'recomend_flag',
      'value': '',
      'name' : 'Recommend Flag',
      'tooltip' : 'Recommend Flag'
    },
    // {
    // 'key': 'image',
    // 'value': '',
    // 'name' : 'Dynamic Image URL',
    // 'tooltip' : 'Dynamic Image URL'
    // },
    {
      'key': 'recomend_url',
      'value': '',
      'name' : 'Dynamic Recommend URL',
      'tooltip' : 'Dynamic Recommend URL'
    }
   ];

    for (let i = 0; i < this.state.tasks.length; i++) {
      let task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (flag === 'add') {
                task.entity[j].recommendations[index].attributes = attributes;
              } else {
                task.entity[j].recommendations[index].attributes = [];
              }
            }
          }
        } else {
          if (flag === 'add') {
            task.recommendations[index].attributes = attributes;
          } else {
            task.recommendations[index].attributes = [];
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }


  
  addRecommendation = (display_taskid, display_entityid, index, flag) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      let task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (flag === 'add') {
                const id = (task.entity[j].recommendations!= null &&  task.entity[j].recommendations.length > 0) ?
                  task.entity[j].recommendations[task.entity[j].recommendations.length - 1].display_recommendid + 1 : 1;
                task.entity[j].recommendations.push({
                  recommendationId: '',
                  display_recommendid:id,
                  recommendationName: '',
                  attributes: [],
                });
              } else {
                task.entity[j].recommendations.splice(index, 1);
                for(let i=0;i<task.entity[j].recommendations.length;i++){
                    task.entity[j].recommendations[i].display_recommendid=i+1;
                }
              }
            }
          }
        } else {
          if (flag === 'add') {
            const id =  (task.recommendations != null && task.recommendations.length > 0 )?
              task.recommendations[task.recommendations.length - 1].display_recommendid + 1 : 1;
            task.recommendations.push({
              recommendationId: '',
              display_recommendid:id,
              recommendationName: '',
              attributes: [],
            });
          } else {
            task.recommendations.splice(index, 1);
            for(let i=0;i<task.recommendations.length;i++){
              task.recommendations[i].display_recommendid=i+1;
          }
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  
  addNewDecisionMaking = (display_taskid, display_entityid, index, flag) => {
    
  const decisionMaking = {
    decisionMakingId: '',
    display_resultid:1,
    decisionMakingName: '',
    attributes: []
  }
  for (let i = 0; i < this.state.tasks.length; i++) {
    const task = this.state.tasks[i];
    if (task.display_taskid == display_taskid) {
      if (display_entityid) {
        for (let j = 0; j < task.entity.length; j++) {
          if (task.entity[j].display_entityid === display_entityid) {
            if (flag == 'add') {
              let len=task.entity[j].decisionMaking.length==0?1:task.entity[j].decisionMaking.length+1;
              decisionMaking.display_resultid=len;
              task.entity[j].decisionMaking.push(decisionMaking);
            } 
            else {
                task.entity[j].decisionMaking.splice(index, 1);
                for(let i=0;i<task.entity[j].decisionMaking.length;i++){
                    task.entity[j].decisionMaking[i].display_resultid=i+1;
                }
            }
          }
        }
      } else {
        if (flag == 'add') {
          let len=task.decisionMaking.length==0?1:task.decisionMaking.length+1;
          decisionMaking.display_resultid=len;
          task.decisionMaking.push(decisionMaking);
        }
         else {
            task.decisionMaking.splice(index, 1);
            for(let i=0;i<task.decisionMaking.length;i++){
              task.decisionMaking[i].display_resultid=i+1;
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }
}


  addDecision = (display_taskid, display_entityid, index, flag) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      let task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (flag === 'add') {
                const id =  (task.entity[j].decisionMaking != null && task.entity[j].decisionMaking.length > 0 )?
                  task.entity[j].decisionMaking[task.entity[j].decisionMaking.length - 1].display_resultid + 1 : 1;
                task.entity[j].decisionMaking.push({
                  decisionMakingId: '',
                  display_resultid:id,
                  decisionMakingName: '',
                  attributes: [],
                });
              } else {
                task.entity[j].decisionMaking.splice(index, 1);
                for(let i=0;i<task.entity[j].decisionMaking.length;i++){
                    task.entity[j].decisionMaking[i].display_resultid=i+1;
                }
              }
            }
          }
        } else {
          if (flag === 'add') {
            const id =  (task.decisionMaking != null && task.decisionMaking.length > 0) ?
              task.decisionMaking[task.decisionMaking.length - 1].display_resultid + 1 : 1;
            task.decisionMaking.push({
              decisionMakingId: '',
              display_resultid:id,
              decisionMakingName: '',
              attributes: [],
            });
          } else {
            task.decisionMaking.splice(index, 1);
            for(let i=0;i<task.decisionMaking.length;i++){
              task.decisionMaking[i].display_resultid=i+1;
          }
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  handleEntityChange = (e) =>{
    
    this.setState({selectedEntity:e.value})
  }

//   tableList = ( display_taskid, display_entityid, attributes, flag) =>{
//     let optionTemplate = this.state.entityData.map(value => (
//       <option value={value.entity_id}>{value.entity_name}</option>
//     ));

//     let optionTemplate1 = this.state.taskList.map(value => (
//       <option value={value.entity_id}>{value.entity_name}</option>
//     ));

    
//     this.state.tableDataList.push("");
//     let data;
//     let finalList=[];
//     for(let i=0;i<attributes.length;i++){
//       if(i%2==0){
//         this.state.tableDataList.push(data);
//         data="";
//       }
//       if(i==0 && attributes[i].key=="redirectTo"){
//         data+=<td><select className="inputName1"  value = {attributes[i].value} onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[i].key, e)}> {optionTemplate}</select> </td>;
//       }else if(i==0 && attributes[i].key!="redirectTo" && attributes[i].key!="Entity_Id") {
//         data+=<td><input type="text" className="inputName" value={attributes[i].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[i].key, e)}></input></td>;
//       }else {
//         data+=<td><select className="inputName1" value = {attributes[i].value} onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[i].key, e)}>{optionTemplate1} </select> </td>;
//       }
//       if(i==attributes.length-1){
//         if(data!="")
//           this.state.tableDataList.push(data);
//       }
//     }
//     for(let i=0;i<this.state.tableDataList.length;i++){
//       finalList.push(<tr className="trdata" key={i}>{this.state.tableDataList[i]}</tr>);
//     }
//     console.log("finalList",finalList)
// return finalList
  
//   }
attributesTable = (display_taskid, display_entityid, attributes, flag) => {
  

  // const entityList = this.state.entityData.map((value) => {
  //   let entityListObj = {}
  //   entityListObj.value = value.entity_id;
  //   entityListObj.label = value.entity_name;
  //   return entityListObj
  // })

  let optionTemplate = this.state.entityData.map(value => (
    <option value={value.entity_id}>{value.entity_name}</option>
  ));

  let optionTemplate1 = this.state.taskList.map(value => (
    <option value={value.entity_id}>{value.entity_name}</option>
  ));

  let optionTemplate3 = this.state.taskList.map(value => (
    <option value={value.entity_name}>{value.entity_name}</option>
  ));

  let validationUrlList = this.state.validationUrlList.map((value) => (
    <option value={value.api}>{value.title}</option>
  ));

  let preActionUrlList = this.state.preActionUrlList.map((value) => (
    <option value={value.api}>{value.title}</option>
  ));

  let collectionUrlList = this.state.collectionUrlList.map((value) => (
    <option value={value.api}>{value.title}</option>
  ));

  return (
    <table>
      <tbody>
      {/* {this.tableList(display_taskid, display_entityid, attributes, flag)}   */}
      <tr>
      {attributes.length-1  >=  0  &&
      <td className="inputlabel" title={attributes[0].tooltip}>{attributes[0].name}</td>}
      {
          attributes.length-1  >=  0  &&
          (attributes[0].key == "validation_url") ?
            <td><select
                  className="inputName1"
                  value = {attributes[0].value}
                  onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)}>
                   {validationUrlList}
            </select>
          </td>:
            attributes.length-1  >=  0  &&
            (attributes[0].key == "pre_action_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[0].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)}>
                     {preActionUrlList}
              </select>
            </td>:
             attributes.length-1  >=  0  &&
             (attributes[0].key == "collection_url") ?
               <td><select
                     className="inputName1"
                     value = {attributes[0].value}
                     onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)}>
                      {collectionUrlList}
               </select>
             </td>:
              attributes.length-1  >=  0  &&
        ( attributes[0].key == "value_collection_name")
                ?
                <td><input type="text" className="inputName inputcollection" value={attributes[0].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)} readOnly></input>
                <span><i className="fa fa-tt" title="Trained Collection"   onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[0].key, attributes[0].value,e)}></i></span>
                </td>:
        attributes.length-1  >=  0  &&
        ( attributes[0].key != "Entity_Id" &&  attributes[0].key != "redirectTo" &&
                 attributes[0].key != "feed_back_flag" && attributes[0].key != "combined_resp_flag" && attributes[0].key != "task_redirect" && attributes[0].key != "cache_flag"
                 && attributes[0].key != "upload_flag" && attributes[0].key != "repeat_task" && attributes[0].key != "recomend_flag" && attributes[0].key != "post_action" 
                 && attributes[0].key !="validation_url" && attributes[0].key !=  "pre_action_url" && attributes[0].key != "collection_url")
                ?
                <td><input type="text" className="inputName" value={attributes[0].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)}></input></td>
             :attributes.length-1  >=  0  &&
            ( attributes[0].key != "redirectTo" && attributes[0].key != "feed_back_flag" && attributes[0].key != "combined_resp_flag" && attributes[0].key != "task_redirect" && attributes[0].key != "cache_flag"
              && attributes[0].key != "upload_flag" && attributes[0].key != "repeat_task" && attributes[0].key != "recomend_flag" && attributes[0].key != "post_action"
              && attributes[0].key !="validation_url" && attributes[0].key !=  "pre_action_url" && attributes[0].key != "collection_url")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[0].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  0  &&
                (attributes[0].key == "feed_back_flag" || attributes[0].key == "combined_resp_flag" || attributes[0].key == "task_redirect" || attributes[0].key == "cache_flag"
                || attributes[0].key == "upload_flag" || attributes[0].key == "repeat_task" || attributes[0].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[0].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  0  &&
              (attributes[0].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[0].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >=  0  &&
                <td><select
                    className="inputName1"
                    value = {attributes[0].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[0].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
         {attributes.length-1  >=  1  && 
         <td className="inputlabel" title={attributes[1].tooltip}>{attributes[1].name}</td>}
         { 
            attributes.length-1  >=  1  &&
            (attributes[1].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[1].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  1  &&
              (attributes[1].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[1].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
                attributes.length-1  >=  1  &&
                ( attributes[1].key == "value_collection_name")
                        ?
                        <td><input type="text" className="inputName inputcollection" value={attributes[1].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}></input>
                        <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[1].key,attributes[1].value ,e)}></i></span>
                        </td>:
               attributes.length-1  >=  1  &&
               (attributes[1].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[1].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
           attributes.length-1  >=  1 &&
           (attributes[1].key != "Entity_Id" &&  attributes[1].key != "redirectTo" &&
                 attributes[1].key != "feed_back_flag" && attributes[1].key != "combined_resp_flag" && attributes[1].key != "task_redirect" && attributes[1].key != "cache_flag"
                 && attributes[1].key != "upload_flag" && attributes[1].key != "repeat_task" && attributes[1].key != "recomend_flag" && attributes[1].key != "post_action"
                 && attributes[1].key !="validation_url" && attributes[1].key !=  "pre_action_url" && attributes[1].key != "collection_url")
                ?
                <td><input type="text" className="inputName" value={attributes[1].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}></input></td>
             :
             attributes.length-1  >=  1 &&
             (attributes[1].key != "redirectTo" && attributes[1].key != "feed_back_flag" && attributes[1].key != "combined_resp_flag" && attributes[1].key != "task_redirect" && attributes[1].key != "cache_flag"
              && attributes[1].key != "upload_flag" && attributes[1].key != "repeat_task" && attributes[1].key != "recomend_flag" && attributes[1].key != "post_action"
              && attributes[1].key !="validation_url" && attributes[1].key !=  "pre_action_url" && attributes[1].key != "collection_url" ) ? 
              <td><select
                    className="inputName1"
                    value = {attributes[1].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
                attributes.length-1  >=  1 &&
                (attributes[1].key == "feed_back_flag" || attributes[1].key == "combined_resp_flag" || attributes[1].key == "task_redirect" || attributes[1].key == "cache_flag"
                || attributes[1].key == "upload_flag" || attributes[1].key == "repeat_task" || attributes[1].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[1].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  1 &&
              (attributes[1].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[1].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >= 1 &&
                <td><select
                    className="inputName1"
                    value = {attributes[1].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[1].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
    </tr>

    <tr>
      { attributes.length-1  >=  2 &&
      <td className="inputlabel" title={attributes[2].tooltip}>{attributes[2].name}</td>}
         { attributes.length-1  >=  2  &&
            (attributes[2].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[2].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  2  &&
              (attributes[2].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[2].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
                attributes.length-1  >=  2  &&
                ( attributes[2].key == "value_collection_name")
                        ?
                        <td><input type="text" className="inputName inputcollection" value={attributes[2].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}></input>
                        <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[2].key, attributes[2].value,e)}></i></span>
                        </td>:
               attributes.length-1  >=  2  &&
               (attributes[2].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[2].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
            attributes.length-1  >=  2 &&
           (attributes[2].key != "Entity_Id" &&  attributes[2].key != "redirectTo" &&
                 attributes[2].key != "feed_back_flag" && attributes[2].key != "combined_resp_flag" && attributes[2].key != "task_redirect" && attributes[2].key != "cache_flag"
                 && attributes[2].key != "upload_flag" && attributes[2].key != "repeat_task" && attributes[2].key != "recomend_flag" && attributes[2].key != "post_action"
                 && attributes[2].key !="validation_url" && attributes[2].key !=  "pre_action_url" && attributes[2].key != "collection_url")
                ?
                <td><input type="text" className="inputName" value={attributes[2].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}></input></td>
             : attributes.length-1  >=  2 &&
             (attributes[2].key != "redirectTo" && attributes[2].key != "feed_back_flag" && attributes[2].key != "combined_resp_flag" && attributes[2].key != "task_redirect" && attributes[2].key != "cache_flag"
              && attributes[2].key != "upload_flag" && attributes[2].key != "repeat_task" && attributes[2].key != "recomend_flag" && attributes[2].key != "post_action"
              && attributes[2].key !="validation_url" && attributes[2].key !=  "pre_action_url" && attributes[2].key != "collection_url")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[2].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)} >
                   {optionTemplate}
                   </select>
               </td>: attributes.length-1  >=  2 &&
                (attributes[2].key == "feed_back_flag" || attributes[2].key == "combined_resp_flag" || attributes[2].key == "task_redirect" || attributes[2].key == "cache_flag"
                || attributes[2].key == "upload_flag" || attributes[2].key == "repeat_task" || attributes[2].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[2].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  2 &&
              (attributes[2].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[2].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >=  2 &&
                <td><select
                    className="inputName1"
                    value = {attributes[2].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[2].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
         {attributes.length-1  >=  3 &&
         <td className="inputlabel" title={attributes[3].tooltip}>{attributes[3].name}</td>}
         { attributes.length-1  >=  3  &&
            (attributes[3].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[3].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  3  &&
              (attributes[3].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[3].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
                attributes.length-1  >=  3  &&
                ( attributes[3].key == "value_collection_name")
                        ?
                        <td><input type="text" className="inputName inputcollection" value={attributes[3].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}></input>
                        <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[3].key,attributes[3].value, e)}></i></span>
                        </td>:
               attributes.length-1  >=  3  &&
               (attributes[3].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[3].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
           attributes.length-1  >=  3 &&
          ( attributes[3].key != "Entity_Id" &&  attributes[3].key != "redirectTo" &&
                 attributes[3].key != "feed_back_flag" && attributes[3].key != "combined_resp_flag" && attributes[3].key != "task_redirect" && attributes[3].key != "cache_flag"
                 && attributes[3].key != "upload_flag" && attributes[3].key != "repeat_task" && attributes[3].key != "recomend_flag" && attributes[3].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[3].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}></input></td>
             :attributes.length-1  >=  3 &&
             (attributes[3].key != "redirectTo" && attributes[3].key != "feed_back_flag" && attributes[3].key != "combined_resp_flag" && attributes[3].key != "task_redirect" && attributes[3].key != "cache_flag"
              && attributes[3].key != "upload_flag" && attributes[3].key != "repeat_task" && attributes[3].key != "recomend_flag" && attributes[3].key != "post_action" ) ? 
              <td><select
                    className="inputName1"
                    value = {attributes[3].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  3 &&
                (attributes[3].key == "feed_back_flag" || attributes[3].key == "combined_resp_flag" || attributes[3].key == "task_redirect" || attributes[3].key == "cache_flag"
                || attributes[3].key == "upload_flag" || attributes[3].key == "repeat_task" || attributes[3].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[3].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  3 &&
              (attributes[3].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[3].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
                attributes.length-1  >=  3 &&
                <td><select
                    className="inputName1"
                    value = {attributes[3].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[3].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
      </tr>

      <tr>
     { attributes.length-1  >=  4 &&
      <td className="inputlabel" title={attributes[4].tooltip}>{attributes[4].name}</td>}
         { 
            attributes.length-1  >=  4  &&
            (attributes[4].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[4].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  4  &&
              (attributes[4].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[4].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
                attributes.length-1  >=  4  &&
                ( attributes[4].key == "value_collection_name")
                        ?
                        <td><input type="text" className="inputName inputcollection" value={attributes[4].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}></input>
                        <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[4].key,attributes[4].value, e)}></i></span>
                        </td>:
               attributes.length-1  >=  4  &&
               (attributes[4].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[4].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
            attributes.length-1  >=  4 &&
           (attributes[4].key != "Entity_Id" &&  attributes[4].key != "redirectTo" &&
                 attributes[4].key != "feed_back_flag" && attributes[4].key != "combined_resp_flag" && attributes[4].key != "task_redirect" && attributes[4].key != "cache_flag"
                 && attributes[4].key != "upload_flag" && attributes[4].key != "repeat_task" && attributes[4].key != "recomend_flag" && attributes[4].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[4].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}></input></td>
             :  attributes.length-1  >=  4 &&
             (attributes[4].key != "redirectTo" && attributes[4].key != "feed_back_flag" && attributes[4].key != "combined_resp_flag" && attributes[4].key != "task_redirect" && attributes[4].key != "cache_flag"
              && attributes[4].key != "upload_flag" && attributes[2].key != "repeat_task" && attributes[4].key != "recomend_flag" && attributes[4].key != "post_action" ) ? 
              <td><select
                    className="inputName1"
                    value = {attributes[4].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
                 attributes.length-1  >=  4 &&
                (attributes[4].key == "feed_back_flag" || attributes[4].key == "combined_resp_flag" || attributes[4].key == "task_redirect" || attributes[4].key == "cache_flag"
                || attributes[4].key == "upload_flag" || attributes[4].key == "repeat_task" || attributes[4].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[4].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
               attributes.length-1  >=  4 &&
              (attributes[4].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[4].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
               attributes.length-1  >=  4 &&
                <td><select
                    className="inputName1"
                    value = {attributes[4].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[4].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
         {attributes.length-1  >=  5 &&
         <td className="inputlabel" title={attributes[5].tooltip}>{attributes[5].name}</td>}
         { 
           attributes.length-1  >=  5  &&
            (attributes[5].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[5].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  5  &&
              (attributes[5].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[5].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
               attributes.length-1  >=  5  &&
               (attributes[5].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[5].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
                 attributes.length-1  >=  5  &&
                 ( attributes[5].key == "value_collection_name")
                         ?
                         <td><input type="text" className="inputName inputcollection" value={attributes[5].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}></input>
                         <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[5].key,attributes[5].value, e)}></i></span>
                         </td>:
           attributes.length-1  >=  5 &&
           (attributes[5].key != "Entity_Id" &&  attributes[5].key != "redirectTo" &&
                 attributes[5].key != "feed_back_flag" && attributes[5].key != "combined_resp_flag" && attributes[5].key != "task_redirect" && attributes[5].key != "cache_flag"
                 && attributes[5].key != "upload_flag" && attributes[5].key != "repeat_task" && attributes[5].key != "recomend_flag" && attributes[5].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[5].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}></input></td>
             :
             attributes.length-1  >=  5 &&
             (attributes[5].key != "redirectTo" && attributes[5].key != "feed_back_flag" && attributes[5].key != "combined_resp_flag" && attributes[5].key != "task_redirect" && attributes[5].key != "cache_flag"
              && attributes[5].key != "upload_flag" && attributes[5].key != "repeat_task" && attributes[5].key != "recomend_flag" && attributes[5].key != "post_action")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[5].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  5 &&
                (attributes[5].key == "feed_back_flag" || attributes[5].key == "combined_resp_flag" || attributes[5].key == "task_redirect" || attributes[5].key == "cache_flag"
                || attributes[5].key == "upload_flag" || attributes[5].key == "repeat_task" || attributes[5].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[5].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  5 &&
              (attributes[5].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[5].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
               attributes.length-1  >=  5 &&
                <td><select
                    className="inputName1"
                    value = {attributes[5].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[5].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
      </tr>

      <tr>
        {attributes.length-1  >=  6 &&
      <td className="inputlabel" title={attributes[6].tooltip}>{attributes[6].name}</td>}
         { attributes.length-1  >=  6  &&
            (attributes[6].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[6].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  6  &&
              (attributes[6].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[6].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
               attributes.length-1  >=  6  &&
               (attributes[6].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[6].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
                 attributes.length-1  >=  6  &&
                 ( attributes[6].key == "value_collection_name")
                         ?
                         <td><input type="text" className="inputName inputcollection" value={attributes[6].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}></input>
                         <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[6].key,attributes[6].value ,e)}></i></span>
                         </td>:
           attributes.length-1  >=  6 &&
           (attributes[6].key != "Entity_Id" &&  attributes[6].key != "redirectTo" &&
                 attributes[6].key != "feed_back_flag" && attributes[6].key != "combined_resp_flag" && attributes[6].key != "task_redirect" && attributes[6].key != "cache_flag"
                 && attributes[6].key != "upload_flag" && attributes[6].key != "repeat_task" && attributes[6].key != "recomend_flag" && attributes[6].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[6].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}></input></td>
             :
             attributes.length-1  >=  6 &&
             (attributes[6].key != "redirectTo" && attributes[6].key != "feed_back_flag" && attributes[6].key != "combined_resp_flag" && attributes[6].key != "task_redirect" && attributes[6].key != "cache_flag"
              && attributes[6].key != "upload_flag" && attributes[6].key != "repeat_task" && attributes[6].key != "recomend_flag" && attributes[6].key != "post_action")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[6].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  6 &&
                (attributes[6].key == "feed_back_flag" || attributes[6].key == "combined_resp_flag" || attributes[6].key == "task_redirect" || attributes[6].key == "cache_flag"
                || attributes[6].key == "upload_flag" || attributes[6].key == "repeat_task" || attributes[6].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[6].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  6 &&
              (attributes[6].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[6].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >=  6 &&
                <td><select
                    className="inputName1"
                    value = {attributes[6].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[6].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
         {attributes.length-1  >=  7 &&
         <td className="inputlabel" title={attributes[7].tooltip}>{attributes[7].name}</td>}
         { attributes.length-1  >=  7  &&
            (attributes[7].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[7].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  7  &&
              (attributes[7].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[7].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
               attributes.length-1  >=  7  &&
               (attributes[7].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[7].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
                 attributes.length-1  >=  7  &&
                 ( attributes[7].key == "value_collection_name")
                         ?
                         <td><input type="text" className="inputName inputcollection" value={attributes[7].value}  readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}></input>
                         <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[7].key, attributes[7].value,e)}></i></span>
                         </td>:
           attributes.length-1  >=  7 &&
           (attributes[7].key != "Entity_Id" &&  attributes[7].key != "redirectTo" &&
                 attributes[7].key != "feed_back_flag" && attributes[7].key != "combined_resp_flag" && attributes[7].key != "task_redirect" && attributes[7].key != "cache_flag"
                 && attributes[7].key != "upload_flag" && attributes[7].key != "repeat_task" && attributes[7].key != "recomend_flag" && attributes[7].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[7].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}></input></td>
             :
             attributes.length-1  >=  7 &&
             (attributes[7].key != "redirectTo" && attributes[7].key != "feed_back_flag" && attributes[7].key != "combined_resp_flag" && attributes[7].key != "task_redirect" && attributes[7].key != "cache_flag"
              && attributes[7].key != "upload_flag" && attributes[7].key != "repeat_task" && attributes[7].key != "recomend_flag" && attributes[7].key != "post_action")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[7].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  7 &&
               (attributes[7].key == "feed_back_flag" || attributes[7].key == "combined_resp_flag" || attributes[7].key == "task_redirect" || attributes[7].key == "cache_flag"
                || attributes[7].key == "upload_flag" || attributes[7].key == "repeat_task" || attributes[7].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[7].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  7 &&
              (attributes[7].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[7].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
               attributes.length-1  >=  7 &&
                <td><select
                    className="inputName1"
                    value = {attributes[7].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[7].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
      </tr>

      <tr>
      {attributes.length-1  >=  8 &&
      <td className="inputlabel" title={attributes[8].tooltip}>{attributes[8].name}</td>}
         { 
            attributes.length-1  >=  8  &&
            (attributes[8].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[8].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  8  &&
              (attributes[8].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[8].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
               attributes.length-1  >=  8  &&
               (attributes[8].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[8].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
                 attributes.length-1  >=  8  &&
                 ( attributes[8].key == "value_collection_name")
                         ?
                         <td><input type="text" className="inputName inputcollection" value={attributes[8].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}></input>
                         <span><i className="fa fa-tt" title="Trained Collection"   onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[8].key,attributes[8].value, e)}></i></span>
                         </td>:
           attributes.length-1  >=  8 &&
           (attributes[8].key != "Entity_Id" &&  attributes[8].key != "redirectTo" &&
                 attributes[8].key != "feed_back_flag" && attributes[8].key != "combined_resp_flag" && attributes[8].key != "task_redirect" && attributes[8].key != "cache_flag"
                 && attributes[8].key != "upload_flag" && attributes[8].key != "repeat_task" && attributes[8].key != "recomend_flag" && attributes[8].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[8].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}></input></td>
             :
             attributes.length-1  >=  8 &&
             (attributes[8].key != "redirectTo" && attributes[8].key != "feed_back_flag" && attributes[8].key != "combined_resp_flag" && attributes[8].key != "task_redirect" && attributes[8].key != "cache_flag"
              && attributes[8].key != "upload_flag" && attributes[8].key != "repeat_task" && attributes[8].key != "recomend_flag" && attributes[8].key != "post_action")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[8].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
                attributes.length-1  >=  8 &&
                (attributes[8].key == "feed_back_flag" || attributes[8].key == "combined_resp_flag" || attributes[8].key == "task_redirect" || attributes[8].key == "cache_flag"
                || attributes[8].key == "upload_flag" || attributes[8].key == "repeat_task" || attributes[8].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[8].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
              attributes.length-1  >=  8 &&
              (attributes[8].key == "post_action" )?
                <td><select
                      className="inputName1"
                      value = {attributes[8].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >=  8 &&
                <td><select
                    className="inputName1"
                    value = {attributes[8].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[8].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
         { attributes.length-1  >=  9 &&
         <td className="inputlabel" title={attributes[9].tooltip}>{attributes[9].name}</td>}
         
         { attributes.length-1  >=  9  &&
            (attributes[9].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[9].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  9  &&
              (attributes[9].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[9].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
                attributes.length-1  >=  9  &&
                ( attributes[9].key == "value_collection_name")
                        ?
                        <td><input type="text" className="inputName inputcollection" value={attributes[9].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}></input>
                        <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[9].key,attributes[9].value, e)}></i></span>
                        </td>:
               attributes.length-1  >=  9  &&
               (attributes[9].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[9].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
            attributes.length-1  >=  9 &&
           (attributes[9].key != "Entity_Id" &&  attributes[9].key != "redirectTo" &&
                 attributes[9].key != "feed_back_flag" && attributes[9].key != "combined_resp_flag" && attributes[9].key != "task_redirect" && attributes[9].key != "cache_flag"
                 && attributes[9].key != "upload_flag" && attributes[9].key != "repeat_task" && attributes[9].key != "recomend_flag" && attributes[9].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[9].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}></input></td>
             :
             attributes.length-1  >=  9 &&
             (attributes[9].key != "redirectTo" && attributes[9].key != "feed_back_flag" && attributes[9].key != "combined_resp_flag" && attributes[9].key != "task_redirect" && attributes[9].key != "cache_flag"
              && attributes[9].key != "upload_flag" && attributes[9].key != "repeat_task" && attributes[9].key != "recomend_flag" && attributes[9].key != "post_action")  ? 
              <td><select
                    className="inputName1"
                    value = {attributes[9].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
                attributes.length-1  >=  9 &&
                (attributes[9].key == "feed_back_flag" || attributes[9].key == "combined_resp_flag" || attributes[9].key == "task_redirect" || attributes[9].key == "cache_flag"
                || attributes[9].key == "upload_flag" || attributes[9].key == "repeat_task" || attributes[9].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[9].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
              attributes.length-1  >=  9 &&
             ( attributes[9].key == "post_action" )?
                <td><select
                      className="inputName1"
                      value = {attributes[9].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >=  9 &&
                <td><select
                    className="inputName1"
                    value = {attributes[9].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[9].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
      </tr>

      <tr>
     { attributes.length-1  >=  10  &&
      <td className="inputlabel" title={attributes[10].tooltip}>{attributes[10].name}</td>}
       {
          attributes.length-1  >=  10  &&
          (attributes[10].key == "validation_url") ?
            <td><select
                  className="inputName1"
                  value = {attributes[10].value}
                  onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}>
                   {validationUrlList}
            </select>
          </td>:
            attributes.length-1  >=  10  &&
            (attributes[10].key == "pre_action_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[10].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}>
                     {preActionUrlList}
              </select>
            </td>:
              attributes.length-1  >=  10  &&
              ( attributes[10].key == "value_collection_name")
                      ?
                      <td><input type="text" className="inputName inputcollection" value={attributes[10].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}></input>
                      <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[10].key, attributes[10].value,e)}></i></span>
                      </td>:
             attributes.length-1  >=  10  &&
             (attributes[10].key == "collection_url") ?
               <td><select
                     className="inputName1"
                     value = {attributes[10].value}
                     onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}>
                      {collectionUrlList}
               </select>
             </td>:
           attributes.length-1  >=  10  &&
       (  attributes[10].key != "Entity_Id" &&  attributes[10].key != "redirectTo" &&
                 attributes[10].key != "feed_back_flag" && attributes[10].key != "combined_resp_flag" && attributes[10].key != "task_redirect" && attributes[10].key != "cache_flag"
                 && attributes[10].key != "upload_flag" && attributes[10].key != "repeat_task" && attributes[10].key != "recomend_flag" && attributes[10].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[10].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}></input></td>
             :
             attributes.length-1  >=  10  &&
            ( attributes[10].key != "redirectTo" && attributes[10].key != "feed_back_flag" && attributes[10].key != "combined_resp_flag" && attributes[10].key != "task_redirect" && attributes[10].key != "cache_flag"
              && attributes[10].key != "upload_flag" && attributes[10].key != "repeat_task" && attributes[10].key != "recomend_flag" && attributes[10].key != "post_action" ) ? 
              <td><select
                    className="inputName1"
                    value = {attributes[10].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
                attributes.length-1  >=  10  &&
               ( attributes[10].key == "feed_back_flag" || attributes[10].key == "combined_resp_flag" || attributes[10].key == "task_redirect" || attributes[10].key == "cache_flag"
                || attributes[10].key == "upload_flag" || attributes[10].key == "repeat_task" || attributes[10].key == "recomend_flag" )?
                <td><select
                className="inputName1"
                value = {attributes[10].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
              attributes.length-1  >=  10  &&
            (  attributes[10].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[10].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
               attributes.length-1  >=  10  &&
                <td><select
                    className="inputName1"
                    value = {attributes[10].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[10].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }

       { attributes.length-1 >= 11 &&
         <td className="inputlabel"  title={attributes[11].tooltip}>{attributes[11].name}</td>}
         {
            attributes.length-1  >=  11  &&
            (attributes[11].key == "validation_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[11].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}>
                     {validationUrlList}
              </select>
            </td>:
              attributes.length-1  >=  11  &&
              (attributes[11].key == "pre_action_url") ?
                <td><select
                      className="inputName1"
                      value = {attributes[11].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}>
                       {preActionUrlList}
                </select>
              </td>:
               attributes.length-1  >=  11  &&
               (attributes[11].key == "collection_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[11].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}>
                        {collectionUrlList}
                 </select>
               </td>:
                 attributes.length-1  >=  11  &&
                 ( attributes[11].key == "value_collection_name")
                         ?
                         <td><input type="text" className="inputName inputcollection" value={attributes[11].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}></input>
                         <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[11].key,attributes[11].value, e)}></i></span>
                         </td>:
         attributes.length-1  >=  11  &&
        (attributes[11].key != "Entity_Id" &&  attributes[11].key != "redirectTo" &&
                 attributes[11].key != "feed_back_flag" && attributes[11].key != "combined_resp_flag" && attributes[11].key != "task_redirect" && attributes[11].key != "cache_flag"
                 && attributes[11].key != "upload_flag" && attributes[11].key != "repeat_task" && attributes[11].key != "recomend_flag" && attributes[11].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[11].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}></input></td>
             :
             attributes.length-1  >=  11 &&
            ( attributes[11].key != "redirectTo" && attributes[11].key != "feed_back_flag" && attributes[11].key != "combined_resp_flag" && attributes[11].key != "task_redirect" && attributes[11].key != "cache_flag"
              && attributes[11].key != "upload_flag" && attributes[11].key != "repeat_task" && attributes[11].key != "recomend_flag" && attributes[11].key != "post_action"  )? 
              <td><select
                    className="inputName1"
                    value = {attributes[11].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  11  &&
               ( attributes[11].key == "feed_back_flag" || attributes[11].key == "combined_resp_flag" || attributes[11].key == "task_redirect" || attributes[11].key == "cache_flag"
                || attributes[11].key == "upload_flag" || attributes[11].key == "repeat_task" || attributes[11].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[11].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  11  &&
              (attributes[11].key == "post_action" )?
                <td><select
                      className="inputName1"
                      value = {attributes[11].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
              attributes.length-1  >=  11  &&
                <td><select
                    className="inputName1"
                    value = {attributes[11].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[11].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
      </tr>

      <tr>
      { attributes.length-1  >=  12 &&
       <td className="inputlabel" title={attributes[12].tooltip}>{attributes[12].name}</td>}
       {
          attributes.length-1  >=  12  &&
          (attributes[12].key == "validation_url") ?
            <td><select
                  className="inputName1"
                  value = {attributes[12].value}
                  onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}>
                   {validationUrlList}
            </select>
          </td>:
            attributes.length-1  >=  12  &&
            (attributes[12].key == "pre_action_url") ?
              <td><select
                    className="inputName1"
                    value = {attributes[12].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}>
                     {preActionUrlList}
              </select>
            </td>:
              attributes.length-1  >=  12  &&
              ( attributes[12].key == "value_collection_name")
                      ?
                      <td><input type="text" className="inputName inputcollection" value={attributes[12].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}></input>
                      <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[12].key,attributes[12].value, e)}></i></span>
                      </td>:
             attributes.length-1  >=  12  &&
             (attributes[12].key == "collection_url") ?
               <td><select
                     className="inputName1"
                     value = {attributes[12].value}
                     onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}>
                      {collectionUrlList}
               </select>
             </td>:
         attributes.length-1  >=  12  &&
         (attributes[12].key != "Entity_Id" &&  attributes[12].key != "redirectTo" &&
                 attributes[12].key != "feed_back_flag" && attributes[12].key != "combined_resp_flag" && attributes[12].key != "task_redirect" && attributes[12].key != "cache_flag"
                 && attributes[12].key != "upload_flag" && attributes[12].key != "repeat_task" && attributes[12].key != "recomend_flag" && attributes[12].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[12].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}></input></td>
             :
             attributes.length-1  >=  12  &&
             (attributes[12].key != "redirectTo" && attributes[12].key != "feed_back_flag" && attributes[12].key != "combined_resp_flag" && attributes[12].key != "task_redirect" && attributes[12].key != "cache_flag"
              && attributes[12].key != "upload_flag" && attributes[12].key != "repeat_task" && attributes[12].key != "recomend_flag" && attributes[12].key != "post_action" ) ? 
              <td><select
                    className="inputName1"
                    value = {attributes[12].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  12  &&
                (attributes[12].key == "feed_back_flag" || attributes[12].key == "combined_resp_flag" || attributes[12].key == "task_redirect" || attributes[12].key == "cache_flag"
                || attributes[12].key == "upload_flag" || attributes[12].key == "repeat_task" || attributes[12].key == "recomend_flag") ?
                <td><select
                className="inputName1"
                value = {attributes[12].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  12  &&
            (  attributes[12].key == "post_action") ?
                <td><select
                      className="inputName1"
                      value = {attributes[12].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
               attributes.length-1  >=  12  &&
                <td><select
                    className="inputName1"
                    value = {attributes[12].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[12].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         }
         { attributes.length-1  >=  13 &&
         <td className="inputlabel" title={attributes[13].tooltip}>{attributes[13].name}</td> }
          {
             attributes.length-1  >=  13  &&
             (attributes[13].key == "validation_url") ?
               <td><select
                     className="inputName1"
                     value = {attributes[13].value}
                     onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}>
                      {validationUrlList}
               </select>
             </td>:
               attributes.length-1  >=  13  &&
               (attributes[13].key == "pre_action_url") ?
                 <td><select
                       className="inputName1"
                       value = {attributes[13].value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}>
                        {preActionUrlList}
                 </select>
               </td>:
                attributes.length-1  >=  13  &&
                (attributes[13].key == "collection_url") ?
                  <td><select
                        className="inputName1"
                        value = {attributes[13].value}
                        onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}>
                         {collectionUrlList}
                  </select>
                </td>:
                  attributes.length-1  >=  13  &&
                  ( attributes[13].key == "value_collection_name")
                          ?
                          <td><input type="text" className="inputName inputcollection" value={attributes[13].value} readOnly onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}></input>
                          <span><i className="fa fa-tt" title="Trained Collection"  onClick={(e)=>this.showTrainedCollectionModal(display_taskid, display_entityid, flag, attributes[13].key, attributes[13].value, e)}></i></span>
                          </td>:
                attributes.length-1  >=  13 &&
         (attributes[13].key != "Entity_Id" &&  attributes[13].key != "redirectTo" &&
                 attributes[13].key != "feed_back_flag" && attributes[13].key != "combined_resp_flag" && attributes[13].key != "task_redirect" && attributes[13].key != "cache_flag"
                 && attributes[13].key != "upload_flag" && attributes[13].key != "repeat_task" && attributes[13].key != "recomend_flag" && attributes[13].key != "post_action")
                ?
                <td><input type="text" className="inputName" value={attributes[13].value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}></input></td>
             :
             attributes.length-1  >=  13 &&
            ( attributes[13].key != "redirectTo" && attributes[13].key != "feed_back_flag" && attributes[13].key != "combined_resp_flag" && attributes[13].key != "task_redirect" && attributes[13].key != "cache_flag"
              && attributes[13].key != "upload_flag" && attributes[13].key != "repeat_task" && attributes[13].key != "recomend_flag" && attributes[13].key != "post_action" ) ? 
              <td><select
                    className="inputName1"
                    value = {attributes[13].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)} >
                   {optionTemplate}
                   </select>
               </td>:
               attributes.length-1  >=  13 &&
                (attributes[13].key == "feed_back_flag" || attributes[13].key == "combined_resp_flag" || attributes[13].key == "task_redirect" || attributes[13].key == "cache_flag"
                || attributes[13].key == "upload_flag" || attributes[13].key == "repeat_task" || attributes[13].key == "recomend_flag" )?
                <td><select
                className="inputName1"
                value = {attributes[13].value}
                onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}>
                  <option selected value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
             </td>:
             attributes.length-1  >=  13 &&
              (attributes[13].key == "post_action" )?
                <td><select
                      className="inputName1"
                      value = {attributes[13].value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)}>
                       {optionTemplate3}
                </select>
              </td>:
               attributes.length-1  >=  13  &&
                <td><select
                    className="inputName1"
                    value = {attributes[13].value}
                    onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, attributes[13].key, e)} >
                    {optionTemplate1}
                   </select>
                </td>
         } 
      </tr>
      </tbody>
    </table>
  )
}


  attributesTable1 = (display_taskid, display_entityid, attributes, flag) => {
    

    // const entityList = this.state.entityData.map((value) => {
    //   let entityListObj = {}
    //   entityListObj.value = value.entity_id;
    //   entityListObj.label = value.entity_name;
    //   return entityListObj
    // })

    let optionTemplate = this.state.entityData.map(value => (
      <option value={value.entity_id}>{value.entity_name}</option>
    ));

    let optionTemplate1 = this.state.taskList.map(value => (
      <option value={value.entity_id}>{value.entity_name}</option>
    ));

    let optionTemplate3 = this.state.taskList.map(value => (
      <option value={value.entity_name}>{value.entity_name}</option>
    ));

   
    const actionUrlList1 = this.state.actionUrlList.map((value) => (
      <option value={value.api}>{value.title}</option>
    ));

    const checkDataUrlList = this.state.checkDataUrlList.map((value) => (
      <option value={value.api}>{value.title}</option>
    ));

    return (
      <table>
        <tbody>
        {/* {this.tableList(display_taskid, display_entityid, attributes, flag)}   */}

          {attributes.map((item, index) => {
       
                return (
                  item.key != "Intent_Name" && item.key != "Task_Name" ?
              <tr key={index} > 
              <td className="inputlabel" title={item.tooltip}>{item.name}</td>
                  {
                    item.key == "check_data_url" ?
                    <td><select
                        className="inputName1"
                        value = {item.value}
                        onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)}>
                         {checkDataUrlList}
                  </select>
                </td>:
                    item.key != "Entity_Id" &&  item.key != "redirectTo" &&
                   item.key != "feed_back_flag" && item.key != "combined_resp_flag" && item.key != "task_redirect" && item.key != "cache_flag"
                   && item.key != "upload_flag" && item.key != "repeat_task" && item.key != "recomend_flag" && item.key != "post_action" && item.key !="Action_Url"
                  ?
                  <td><input type="text" className="inputName" value={item.value} onChange={(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)}></input></td>
               :
                item.key != "redirectTo" && item.key != "feed_back_flag" && item.key != "combined_resp_flag" && item.key != "task_redirect" && item.key != "cache_flag"
                && item.key != "upload_flag" && item.key != "repeat_task" && item.key != "recomend_flag" && item.key != "post_action" && item.key !="Action_Url" ? 
                <td><select
                      className="inputName1"
                      value = {item.value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)} >
                     {optionTemplate}
                     </select>
                 </td>:
                  item.key == "feed_back_flag" || item.key == "combined_resp_flag" || item.key == "task_redirect" || item.key == "cache_flag"
                  || item.key == "upload_flag" || item.key == "repeat_task" || item.key == "recomend_flag" ?
                  <td><select
                  className="inputName1"
                  value = {item.value}
                  onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)}>
                    <option selected value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
               </td>:
                item.key == "post_action" ?
                  <td><select
                        className="inputName1"
                        value = {item.value}
                        onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)}>
                         {optionTemplate3}
                  </select>
                </td>:
                 item.key == "Action_Url" ?
                 <td><select
                       className="inputName1"
                       value={item.value}
                       onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)}>
                        {actionUrlList1}
                 </select>
                </td>:
                  <td><select
                      className="inputName1"
                      value = {item.value}
                      onChange = {(e) => this.getAttributeValue(display_taskid, display_entityid, flag, item.key, e)} >
                      {optionTemplate1}
                     </select>
                  </td>
                  }
              </tr> :""
               )
              
          })}
        </tbody>
      </table>
    )
  }

  getAttributeValue = (display_taskid, display_entityid, fieldName, key, e) => {
    
    // if(key == "Entity_Id"){
    // this.setState({ selectedEntity : e.label})
    // }

    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (fieldName === 'task') {
          for (let j = 0; j < task.attributes.length; j++) {
            if (task.attributes[j].key === key)
              task.attributes[j].value = e.target.value;
          }
        } else if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              if (fieldName === 'entity') {
                for (let k = 0; k < task.entity[j].attributes.length; k++) {
                   if (task.entity[j].attributes[k].key === key){

                    if(task.entity[j].attributes[k].key == "Entity_Id"){
                      task.entity[j].attributes[k].value = parseInt(e.target.value);
                    }else{
                    task.entity[j].attributes[k].value = e.target.value;
                    }
                   }
                }
              } else if (fieldName === 'decisionMaking') {
                for (let k = 0; k < task.entity[j].decisionMaking.attributes.length; k++) {
                  if (task.entity[j].decisionMaking.attributes[k].key === key)
                  if(task.entity[j].decisionMaking.attributes[k].key == "redirectTo"){
                    task.entity[j].decisionMaking.attributes[k].value = parseInt(e.target.value);
                  }else{
                    task.entity[j].decisionMaking.attributes[k].value = e.target.value;
                  }
                }
              }
            }
          }
        } else if (fieldName === 'decisionMaking') {
          for (let k = 0; k < task.decisionMaking.attributes.length; k++) {
            if (task.decisionMaking.attributes[k].key === key)
              task.decisionMaking.attributes[k].value = e.target.value;
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  getRecommendationValue = (display_taskid, display_entityid, index, e) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              task.entity[j].recommendations[index].recommendationName = e.target.value;
            }
          }
        } else {
          task.recommendations[index].recommendationName = e.target.value;
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }


   
  getDecisionValue = (display_taskid, display_entityid, index, e) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              task.entity[j].decisionMaking[index].decisionMakingName = e.target.value;
            }
          }
        } else {
          task.decisionMaking[index].decisionMakingName = e.target.value;
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  getRecommendationAttributeValue = (display_taskid, display_entityid, index, key, e) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              for (let k = 0; k < task.entity[j].recommendations[index].attributes.length; k++) {
                if (task.entity[j].recommendations[index].attributes[k].key === key)
                if(task.entity[j].recommendations[index].attributes[k].key == "task"){
                  task.entity[j].recommendations[index].attributes[k].value =  "#redirect-"+e.target.value;
                } else if(task.entity[j].recommendations[index].attributes[k].key == "image"){
                  task.entity[j].recommendations[index].attributes[k].value =  e.target.files;
                }
                else{
                  task.entity[j].recommendations[index].attributes[k].value =e.target.value;
                }
              }
            }
          }
        } else {
          for (let j = 0; j < task.recommendations[index].attributes.length; j++) {
            if (task.recommendations[index].attributes[j].key === key)
            if(task.recommendations[index].attributes[j].key === "image"){
              task.recommendations[index].attributes[j].value = e.target.files
            }else{
              task.recommendations[index].attributes[j].value = e.target.value;
            }
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  getDecisionAttributeValue = (display_taskid, display_entityid, index, key, e) => {
    
    for (let i = 0; i < this.state.tasks.length; i++) {
      const task = this.state.tasks[i];
      if (task.display_taskid == display_taskid) {
        if (display_entityid) {
          for (let j = 0; j < task.entity.length; j++) {
            if (task.entity[j].display_entityid == display_entityid) {
              for (let k = 0; k < task.entity[j].decisionMaking[index].attributes.length; k++) {
                if (task.entity[j].decisionMaking[index].attributes[k].key === key){
                  task.entity[j].decisionMaking[index].attributes[k].value = e.target.value;
                }
              }
            }
          }
        } else {
          for (let j = 0; j < task.decisionMaking[index].attributes.length; j++) {
            if (task.decisionMaking[index].attributes[j].key === key){
              task.decisionMaking[index].attributes[j].value = e.target.value;
            }
          }
        }
      }
    }
    this.setState({ tasks: this.state.tasks });
  }

  taskMappingData = () => {
    
    var taskMappingData = {};
var port ={}
    if(this.state.botname=="hrbot")
  {
    port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq"
  }
  else if(this.state.botname=="telecombot")
  {
    port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:8003/faq"
  }
  else if(this.state.botname=="pension")
  {
    port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8000/faq"
  }
  else if(this.state.botname=="germanbot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq"
  }
  else if(this.state.botname=="kapitxbot")
  {
    port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq"
  }
  else if(this.state.botname=="farmerbot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq"
  }
  else if(this.state.botname=="hospitalbot")
  {
    port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8008/faq"
  }
  else if(this.state.botname=="hindibot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq"
  }
  else if(this.state.botname=="apricot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq"
  }
  else if(this.state.botname=="tricontes")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq"
  }
  else if(this.state.botname=="germantricontes")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq"
  }
  else if(this.state.botname=="doctorassistant")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq"
  }
  else if(this.state.botname=="interview")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq"
  }
  else if(this.state.botname=="nellinfotech")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8022/faq"
    }
    else if(this.state.botname=="salesforce")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8023/faq"
    }

  var lastData = this.state.tasks.slice(-1)
  if(lastData[0].taskName == undefined || lastData[0].taskName == ""){
   swal("Task Name Should Not Be Blank");
   return
  }else{
    for(let i=0; i<this.state.tasks.length-1; i++){
      if(this.state.tasks[i].taskName == lastData[0].taskName){
       swal("Task Name Should Not Be Duplicate");
       return
      }
    }
  }
 
//   if(lastData[0].entity.length>0){
//   for(let a=0; a<lastData[0].entity.length; a++){
//       for(let c=0; c<lastData[0].entity[a].attributes.length; c++){
//         if(lastData[0].entity[a].attributes[c].key == "Entity_Question"){
//           if(lastData[0].entity[a].attributes[c].value==null || lastData[0].entity[a].attributes[c].value=="" || lastData[0].entity[a].attributes[c].value==undefined ){
//             swal("Entity Question Should Not Be Blank");
//             return
//           }
//         }else if(lastData[0].entity[a].attributes[c].key == "Entity_Sequence"){
//           if(lastData[0].entity[a].attributes[c].value==null || lastData[0].entity[a].attributes[c].value=="" || lastData[0].entity[a].attributes[c].value==undefined ){
//             swal("Entity Sequence Should Not Be Blank");
//             return
//           }
//         }
//     }
//   }
// }

for(let a=0; a<this.state.tasks.length; a++){
  for(let b=0; b<this.state.tasks[a].entity.length; b++){
    for(let c=0; c<this.state.tasks[a].entity[b].attributes.length; c++){
      // if(this.state.tasks[a].entity[b].attributes[c].key == "Entity_Question"){
      //   if(this.state.tasks[a].entity[b].attributes[c].value==null || this.state.tasks[a].entity[b].attributes[c].value=="" || this.state.tasks[a].entity[b].attributes[c].value==undefined ){
      //     swal("Entity Question Should Not Be Blank");
      //     return
      //   }
      // }
      // else 
      if(this.state.tasks[a].entity[b].attributes[c].key == "Entity_Sequence"){
        if(this.state.tasks[a].entity[b].attributes[c].value==null || this.state.tasks[a].entity[b].attributes[c].value=="" || this.state.tasks[a].entity[b].attributes[c].value==undefined ){
          swal("Entity Sequence Should Not Be Blank");
          return
        }
      }
    }
  }
}

  // if(lastData[0].entity.length>0){
  //   for(let p=0; p<lastData[0].entity.length; p++){
  //       for(let q=0; q<lastData[0].entity[p].decisionMaking.length; q++){
  //         for(let r=0; r<lastData[0].entity[p].decisionMaking[q].attributes.length; r++){
  //           if(lastData[0].entity[p].decisionMaking[q].attributes[r].key == "keyof"){
  //            if(lastData[0].entity[p].decisionMaking[q].attributes[r].value == ""){
  //              swal("Decision Key Should Not Be Blank");
  //              return
  //            }
  //           } else if(lastData[0].entity[p].decisionMaking[q].attributes[r].key == "redirectTo"){
  //             if(lastData[0].entity[p].decisionMaking[q].attributes[r].value == ""){
  //               swal("Select Task On Which You Want To Redirect");
  //               return
  //             }
  //           }
  //         }
  //       }
  //     }
  //   } 

  for(let a=0; a<this.state.tasks.length; a++){
    for(let b=0; b<this.state.tasks[a].entity.length; b++){
      for(let c=0; c<this.state.tasks[a].entity[b].decisionMaking.length; c++){
           for(let j=0; j<this.state.tasks[a].entity[b].decisionMaking[c].attributes.length; j++){
            if(this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].key == "keyof"){
              if(this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].value == "" || this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].value == null || this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].value == undefined){
              swal("Decision Key Should Not Be Blank");
              return
              }
            } else if(this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].key == "redirectTo"){
              if(this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].value == "" || this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].value == null || this.state.tasks[a].entity[b].decisionMaking[c].attributes[j].value == undefined){
              swal("Select Task On Which You Want To Redirect");
              return
              }
            }
          }
        }
      }
    }

    taskMappingData.ui_data = this.state.tasks
    console.log("JSON",this.state.tasks);
    document.getElementById("loader-wrapper").style.visibility = "visible";
    axios.post(port+'/workflow/', taskMappingData, {
    }).then(response => {
    console.log("data...",response.data)
    document.getElementById("loader-wrapper").style.visibility = "hidden";
    if(response.data[0] == "data uploaded"){
      Alert.success("Task Saved Successfully",{position:'top'});
    }
this.getEntity(this.state.botname)
this.getTaskList(this.state.botname)
this.getTaskData(this.state.botname)
    }).catch(error => {
      console.log(error);
    });
   
  }

  handleModal = (display_taskid, display_entityid) => {
    
    // var lastData = this.state.tasks.slice(-1)
    // if(lastData[0].recommendations.length>0){
    //   for(let i=0; i<lastData[0].recommendations.length; i++ ){
    //      if(lastData[0].recommendations[i].recommendationName==null || lastData[0].recommendations[i].recommendationName=="" || lastData[0].recommendations[i].recommendationName==undefined ){
    //        swal("Recommendation Title Should Not Be Blank");
    //        return
    //      }
    //      for(let j=0; j<lastData[0].recommendations[i].attributes.length; j++){
    //        if(lastData[0].recommendations[i].attributes[j].key == "utterance"){
    //          if(lastData[0].recommendations[i].attributes[j].value == "" || lastData[0].recommendations[i].attributes[j].value == null || lastData[0].recommendations[i].attributes[j].value == undefined){
    //          swal("Recommendation Utterance Should Not Be Blank");
    //          return
    //          }
    //        }
    //      }
    //   }
    // }

    for(let a=0; a<this.state.tasks.length; a++){
      for(let b=0; b<this.state.tasks[a].recommendations.length; b++){
        if(!display_entityid){
        if(this.state.tasks[a].display_taskid == display_taskid){
          if(this.state.tasks[a].recommendations[b].recommendationName==null || this.state.tasks[a].recommendations[b].recommendationName=="" || this.state.tasks[a].recommendations[b].recommendationName==undefined ){
              swal("Recommendation Title Should Not Be Blank");
              return
             }
             for(let j=0; j<this.state.tasks[a].recommendations[b].attributes.length; j++){
              if(this.state.tasks[a].recommendations[b].attributes[j].key == "utterance"){
                if(this.state.tasks[a].recommendations[b].attributes[j].value == "" || this.state.tasks[a].recommendations[b].attributes[j].value == null || this.state.tasks[a].recommendations[b].attributes[j].value == undefined){
                swal("Recommendation Utterance Should Not Be Blank");
                return
                }
              }
            }
          }
        }
      }
    }
    // if(lastData[0].entity.length>0){
    //  for(let p=0; p<lastData[0].entity.length; p++){
    //    if(lastData[0].entity[p].display_entityid == display_entityid ){
    //      for(let q=0; q<lastData[0].entity[p].recommendations.length; q++){
    //        if(lastData[0].entity[p].recommendations[q].recommendationName == "" || lastData[0].entity[p].recommendations[q].recommendationName == null || lastData[0].entity[p].recommendations[q].recommendationName == undefined){
    //         swal("Recommendation Title Should Not Be Blank");
    //         return
    //        }
    //        for(let r=0; r<lastData[0].entity[p].recommendations[q].attributes.length; r++){
    //          if(lastData[0].entity[p].recommendations[q].attributes[r].key == "utterance"){
    //           if(lastData[0].entity[p].recommendations[q].attributes[r].value == ""){
    //             swal("Recommendation Utterance Should Not Be Blank");
    //             return
    //           }
    //          }
    //        }
    //      }
    //    }
    //   }
    //  }

    for(let a=0; a<this.state.tasks.length; a++){
      for(let b=0; b<this.state.tasks[a].entity.length; b++){
        if(this.state.tasks[a].entity[b].display_entityid == display_entityid){
        for(let c=0; c<this.state.tasks[a].entity[b].recommendations.length; c++){
          if(this.state.tasks[a].entity[b].recommendations[c].recommendationName=="" || this.state.tasks[a].entity[b].recommendations[c].recommendationName==null || this.state.tasks[a].entity[b].recommendations[c].recommendationName==undefined){
              swal("Recommendation Title Should Not Be Blank");
              return
             }
             for(let j=0; j<this.state.tasks[a].entity[b].recommendations[c].attributes.length; j++){
              if(this.state.tasks[a].entity[b].recommendations[c].attributes[j].key == "utterance"){
                if(this.state.tasks[a].entity[b].recommendations[c].attributes[j].value == "" || this.state.tasks[a].entity[b].recommendations[c].attributes[j].value == null || this.state.tasks[a].entity[b].recommendations[c].attributes[j].value == undefined){
                swal("Recommendation Utterance Should Not Be Blank");
                return
                }
              }
            }
          }
        }
      }
    }

    let show = this.state.show;
    let showEntityAction = this.state.showEntityAction;
    if (display_entityid) {
      if (showEntityAction.includes(display_entityid)) {
        showEntityAction = [];
      } else {
        showEntityAction.push(display_entityid);
      }
      this.setState({ showEntityAction });
    } else {
      if (show.includes(display_taskid)) {
        show = [];
      } else {
        show.push(display_taskid);
      }
      this.setState({ show });
    }
  }

  handleMulitimediaModal = (display_taskid, display_entityid, taskName, entityName) => {
    
    const data = new FormData();
    for(let i = 0; i< this.state.multimediaData.length; i++) {
      data.append("multiPartFileList",this.state.multimediaData[i])
  }
   
  data.append("taskName",taskName)
  if(entityName == null){
    data.append("entityName",null)
  }else{
  data.append("entityName",entityName)
  }
  data.append("taskId",display_taskid)
  data.append("entityId",display_entityid)
    data.append("botType",this.state.botname)
    document.getElementById("loader-wrapper").style.visibility = "visible";
    axios.post(applicationContextPath+':8080/NellaConsole-Services/uplaodTaskDoc', data, {
    }).then(response => {
console.log("uploadedFileData",response.data)
document.getElementById("loader-wrapper").style.visibility = "hidden";
      for(let j=0; j<response.data.length; j++){
        if(display_entityid){
          if(response.data[j].taskid == display_taskid && response.data[j].entityid == display_entityid ){
            for(let i=0; i<this.state.tasks.length; i++){
              for(let k=0 ; k<this.state.tasks[i].entity.length; k++){
                if((this.state.tasks[i].taskId == response.data[j].taskid || this.state.tasks[i].display_taskid == display_taskid)
                &&(this.state.tasks[i].entity[k].entityId == display_entityid || this.state.tasks[i].entity[k].display_entityid == display_entityid)){
                  var taskdata1 = {
                    "filepath": response.data[j].filename,
                    "type": response.data[j].type
                  }
                  this.state.tasks[i].entity[k].multimedia.push(taskdata1)
                  this.setState({multimediaData:[]})
                 }
              }
             
            }
          }
          }
   else if(response.data[j].taskid == display_taskid || response.data[j].display_taskid == display_taskid){
          for(let i=0; i<this.state.tasks.length; i++){
         if(this.state.tasks[i].taskId == response.data[j].taskid || this.state.tasks[i].display_taskid == response.data[j].taskid ){
          
           var taskdata1 = {
             "filepath": response.data[j].filename,
             "type": response.data[j].type
           }
          this.state.tasks[i].multimedia.push(taskdata1)
          this.setState({multimediaData:[]})
         }
          }
        }
      
    }
    }).catch(error => {
      console.log(error);
    });

    

    let showTaskultimedia = this.state.showTaskultimedia;
    let showEntityMultimedia = this.state.showEntityMultimedia;
    if (display_entityid) {
      if (showEntityMultimedia.includes(display_entityid)) {
        showEntityMultimedia = [];
      } else {
        showEntityMultimedia.push(display_entityid);
      }
      this.setState({ showEntityMultimedia });
    } else {
      if (showTaskultimedia.includes(display_taskid)) {
        showTaskultimedia = [];
      } else {
        showTaskultimedia.push(display_taskid);
      }
      this.setState({ showTaskultimedia });
      console.log("updatestasks", this.state.tasks)
    }
  }

  showTrainModal1 = (taskName) =>{

    this.setState({trainModalFlag:true,nameOfTask: taskName})
  }

  handleTrainUpdateModal1 = (taskName) => {
    
    var data = {};
    var sss= taskName
    if(sss == null || sss == "" || sss == undefined){
      swal("Please Enter Task Name..");
      return
    }
    data.taskName = taskName
    var port ={}
    if(this.state.botname=="hrbot")
  {
    port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq"
  }
  else if(this.state.botname=="telecombot")
  {
    port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:8003/faq"
  }
  else if(this.state.botname=="pension")
  {
    port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8000/faq"
  }
  else if(this.state.botname=="germanbot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq"
  }
  else if(this.state.botname=="kapitxbot")
  {
    port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq"
  }
  else if(this.state.botname=="farmerbot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq"
  }
  else if(this.state.botname=="hospitalbot")
  {
    port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8008/faq"
  }
  else if(this.state.botname=="hindibot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq"
  }
  else if(this.state.botname=="apricot")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq"
  }
  else if(this.state.botname=="tricontes")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq"
  }
  else if(this.state.botname=="germantricontes")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq"
  }
  else if(this.state.botname=="doctorassistant")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq"
  }
  else if(this.state.botname=="interview")
  {
    port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq"
  }
  else if(this.state.botname=="nellinfotech")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8022/faq"
    }
    else if(this.state.botname=="salesforce")
    {
      port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8023/faq"
    }
    console.log("tttt",data)
    axios.post(port+'/get_traindata/', data, {
    }).then(response => {
      console.log("updateGetData",response.data)
      var count = this.state.count;
      if(response.data.trainList.length<= 0){
        count.push(1);
        this.setState({count : count})
      }
      else{
      this.setState({count : response.data.trainList})
      }
      this.setState({updateModalFlag:response.data.train_list_flag ,updateTrainModalFlag:true})
    }).catch(error => {
    });
    this.setState({updateTrainModalFlag:true,nameOfTask: taskName })
  }

  closeTrainingModal = () => {
    
    this.setState({updateTrainModalFlag :false ,count : []})
  }

  saveNewTrainingData = (task) =>
  {
    
    var data = {};
    var questionCount =[];
    var newArray = [];
    var trainList = [];
    questionCount= this.state.count;
    var nameOfTask = this.state.nameOfTask;
    if(this.state.updateModalFlag != true){
   if(this.state.dataTrain.trainingValue != null && this.state.dataTrain.trainingValue!= ""){
    var qqq = document.getElementById("trainingValue").value
  
    trainList.push(qqq)
   }
  }
  for(var i = 0 ;i<questionCount.length ; i++){
    var ppp = document.getElementById("trainingValue" + i).value;
    trainList.push(ppp)
  }
  console.log("newArray",newArray)
  data.taskName = this.state.nameOfTask
  data.trainList = trainList
  var port ={}
  if(this.state.botname=="hrbot")
{
  port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8002/faq"
}
else if(this.state.botname=="telecombot")
{
  port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:8003/faq"
}
else if(this.state.botname=="pension")
{
  port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8000/faq"
}
else if(this.state.botname=="germanbot")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8006/faq"
}
else if(this.state.botname=="kapitxbot")
{
  port ="http://ec2-3-19-215-125.us-east-2.compute.amazonaws.com:9000/faq"
}
else if(this.state.botname=="farmerbot")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8014/faq"
}
else if(this.state.botname=="hospitalbot")
{
  port ="http://ec2-18-219-146-105.us-east-2.compute.amazonaws.com:8008/faq"
}
else if(this.state.botname=="hindibot")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8013/faq"
}
else if(this.state.botname=="apricot")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8016/faq"
}
else if(this.state.botname=="tricontes")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8018/faq"
}
else if(this.state.botname=="germantricontes")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8021/faq"
}
else if(this.state.botname=="doctorassistant")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8017/faq"
}
else if(this.state.botname=="interview")
{
  port ="http://ec2-18-188-243-169.us-east-2.compute.amazonaws.com:8004/faq"
}
else if(this.state.botname=="nellinfotech")
{
  port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8022/faq"
}
else if(this.state.botname=="salesforce")
{
   port ="http://ec2-18-218-142-38.us-east-2.compute.amazonaws.com:8023/faq"
}
  console.log("dataaaa",data)
  axios.post(port+'/save_traindata/', data, {
  }).then(response => {
    this.setState({updateTrainModalFlag :false ,count :[]})
  swal("Training Data Added SucessFully And It Will Affect After The Restart Of Sever");
  
  }).catch(error => {
  });


  }

  updateField =(e) => {
     
    var newArray = [];
    var dataTrain=this.state.dataTrain;
    dataTrain[e.target.id] = e.target.value;
    this.setState({dataTrain})
  
  }

  getTrainValue =( index,e) => {
    
    var count=this.state.count;
    count[index] = e.target.value;
    this.setState({count:count})
  
    console.log("aaaa",count)

  }

  getTrainedCollectionValue = (index,e) =>{
debugger
var trainedCollectionValue=this.state.trainedCollectionValue;
trainedCollectionValue[index] = e.target.value;
this.setState({trainedCollectionValue:trainedCollectionValue})
  }

  showUpdateTrainModal = (task) =>{

    console.log("counttttt",this.state.count)
if(this.state.updateModalFlag == true ){
  if(task.taskName == this.state.nameOfTask){
    const inputData = this.state.count.map((value,index) =>{
        return(
          
          <div>
          <input type="text" className="inputName5" placeholder="Enter Traing Data"  id={'trainingValue'+index} 
               value ={value!=1?value:""} title="Train Data" onChange={(e) => this.getTrainValue(index, e) } height='40px'  margin-bottom= '20px' ></input>  
               <br></br>
        </div>  
        )
    
    })

    const add = this.state.count.map((value,index) =>{
      return(
        <div className="plusSymbol">
          {this.state.count.length - 1 == index ?
        <span  onClick ={() => this.addNewTrainingData(index,task,'add')}>
                            <i
                              className="fa fa-plus-circle"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              margin-bottom="15px"
                              title="Add Training Data">
                            </i>
                          </span>: 
                          <span onClick ={() => this.addNewTrainingData(index,task,'remove')}>
                        <i
                          className="fa fa-minus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Recommendation">
                        </i>
                      </span>
          }
                          </div>
      )
  
  })
    
    
        return (
         task.taskName == this.state.nameOfTask && 
          <Modal show = {this.state.updateTrainModalFlag == true}
          hide ={this.state.updateTrainModalFlag == false} >
            <Modal.Header>
              <Modal.Title>Update Task Training</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <>
                    <Row>
                      <Col md={9}>
                        {inputData}
                      </Col>
                      <Col md={3}>
                
                      {add}
                        
                      </Col>
    
                    </Row><br />
                  </>
             
          
            </Modal.Body>
            <Modal.Footer>
            <Button className="float-left" variant="primary" onClick ={ () => this.closeTrainingModal()} >
                Clear
              </Button>
              <Button className="float-right" variant="success" onClick={() => this.saveNewTrainingData(task)} >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        );
    
}
  }
else{
  if(task.taskName == this.state.nameOfTask){
  const inputData = this.state.count.map((value,index) =>{
      return(
        
        <div>
        <input type="text" className="inputName5" placeholder="Enter Traing Data"  id={'trainingValue'+index} 
          title="Train Data" margin-bottom= '20px'  value ={value!=1?value:""}   onChange={(e) => this.getTrainValue(index, e) } height='40px' ></input>

      </div>  
      )
  
  })

  const add = this.state.count.map((value,index) =>{
    return(
      <div className="plusSymbol">
        {this.state.count.length - 1 == index ?
      <span  onClick ={() => this.addNewTrainingData(index,task,'add')}>
                          <i
                            className="fa fa-plus-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            margin-bottom="15px"
                            title="Add Training Data">
                          </i>
                        </span>: 
                        <span onClick ={() => this.addNewTrainingData(index,task,'remove')}>
                      <i
                        className="fa fa-minus-circle"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Remove Recommendation">
                      </i>
                    </span>
        }
                        </div>
    )

})
  
      return (
       task.taskName == this.state.nameOfTask && 
        <Modal show = {this.state.updateTrainModalFlag != false}
        hide ={this.state.updateTrainModalFlag == false} >
          <Modal.Header>
            <Modal.Title>Add Task Training</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <>
                  <Row>
                    <Col md={9}>
                    {/* <div>
        <input type="text" className="inputName5" placeholder="Enter Traing Data" 
          title="Train Data" id= "trainingValue"   value={this.state.dataTrain.trainingValue} onChange={(e) => this.updateField(e)}  ></input>
      </div>  */}
                      {inputData}
                    </Col>
                    <Col md={3}>
                    {/* <div className="plusSymbol">
                        <span  onClick ={() => this.addNewTrainingData(0,task,'add')}>
                          <i
                            className="fa fa-plus-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Add Training Data">
                          </i>
                        </span>
                      </div> */}
                        {add}
                    </Col>
  
                  </Row><br />
                </>
           
        
          </Modal.Body>
          <Modal.Footer>
          <Button className="float-left" variant="primary" onClick ={ () => this.closeTrainingModal()} >
              Clear
            </Button>
            <Button className="float-right" variant="success" onClick={() => this.saveNewTrainingData(task)} >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      );
      }
    }  
  }

  showTrainedCollectionModal1 =(task,entity)=> {
  debugger

if(task.display_taskid == this.state.trainedCollectionTaskId && entity.display_entityid == this.state.trainedCollectionEntityId){
    const inputData = this.state.trainedCollectionValue.map((value,index) =>{
      return(
        
        <div>
        <input type="text" className="inputName5" placeholder="Enter Trained Collection Data"  id={index} 
          title="Train Data" margin-bottom= '20px' value={value!=1?value:""} onChange={(e) => this.getTrainedCollectionValue(index, e) } height='40px'></input>

      </div>  
      )
  
  })



  const add = this.state.trainedCollectionValue.map((value,idx) =>{
    return(
      <div className="plusSymbol">
        {this.state.trainedCollectionValue.length - 1 == idx ?
      <span  onClick ={() => this.addNewTrainedCollection(idx,'add')}>
                          <i
                            className="fa fa-plus-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            margin-bottom="15px"
                            title="Add Training Data">
                          </i>
                        </span>: 
                        <span onClick ={() => this.addNewTrainedCollection(idx,'remove')}>
                      <i
                        className="fa fa-minus-circle"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Remove Recommendation">
                      </i>
                    </span>
        }
                        </div>
    )

})

    return (
      <Modal show = {this.state.trainedCollection == true}
      hiide ={()=>this.showTrainedCollectionModal2()} >
        <Modal.Header>
          <Modal.Title>Trained Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <>
                <Row>
                  <Col md={9}>
                    {inputData}
                  </Col>
                  <Col md={3}> 
                    {add}
                  </Col>       
              </Row><br/>
              </>
         
      
        </Modal.Body>
        <Modal.Footer>
        <Button className="float-left" variant="primary" onClick ={ () => this.showTrainedCollectionModal2()} >
            Close
          </Button>
          <Button className="float-right" variant="success" onClick={()=>this.saveTrainedCollectionData()} >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  }
  saveTrainedCollectionData = ()=>{
    debugger
      for(let i=0; i<this.state.tasks.length;i++){
        if(this.state.tasks[i].display_taskid == this.state.trainedCollectionTaskId){
        for(let j=0;j<this.state.tasks[i].entity.length;j++){
          if(this.state.tasks[i].entity[j].display_entityid == this.state.trainedCollectionEntityId){
          for(let k=0;k<this.state.tasks[i].entity[j].attributes.length;k++){
            if(this.state.tasks[i].entity[j].attributes[k].key == "value_collection_name" ){
              var trainedValues = this.state.trainedCollectionValue.toString();
                this.state.tasks[i].entity[j].attributes[k].value = trainedValues
           }
          }
         }
        }
       }
      }
      this.setState({tasks:this.state.tasks,trainedCollection:false})
  }

  showTrainedCollectionModal = (display_taskid, display_entityid, fieldName, key,value, e) =>{
    debugger

    var trainedCollectionValue1  = value.split(",")
    this.setState({trainedCollection:true,trainedCollectionValue:trainedCollectionValue1,trainedCollectionTaskId:display_taskid,trainedCollectionEntityId:display_entityid})
    }

    showTrainedCollectionModal2 = ()=>{
      this.setState({trainedCollection:false})
    }
    
  // addNewTrainingData =() =>
  //  {
  // 
  // var count = this.state.count ;
  // count.push(1);
  // this.setState({count:count})
  //  }

  addNewTrainedCollection = (index,flag)=>{
    var trainedCollectionValue = this.state.trainedCollectionValue;
       if (flag == 'add') {
        trainedCollectionValue.push(1);
     }
     else if(flag==="remove"){
      trainedCollectionValue.splice(index+1, 1);
        
     } 
     this.setState({trainedCollectionValue:trainedCollectionValue})
  }

  addNewTrainingData =(index,task,flag) =>
  {

   var count = this.state.count;
  let updateTrainModalFlag = this.state.updateTrainModalFlag
   console.log("updateTrainModalFlag",updateTrainModalFlag)
   if(this.state.nameOfTask === task.taskName){
     if (flag == 'add') {
       count.push(1);
   }
   if(flag==="remove"){
      count.splice(index, 1);
      
   }
  }
   this.setState({count:count})
  }


//   showTrainModal =(task) =>{

   
// if(this.state.updateModalFlag == false){
// const inputData = this.state.count.map((value,index) =>{
//     return(
      
//       <div>
//       <input type="text" className="inputName" placeholder="Enter Traing Data"  id={'trainingValue'+index} 
//         title="Train Data"   ></input>
//     </div>  
//     )

// })

//     return (
//      task.taskName == this.state.nameOfTask && 
//       <Modal show = {this.state.trainModalFlag =true}
//       hide ={this.state.trainModalFlag ==  false} >
//         <Modal.Header>
//           <Modal.Title>Add Task Training</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//               <>
//                 <Row>
//                   <Col md={9}>
//                   <div>
//       <input type="text" className="inputName" placeholder="Enter Traing Data" 
//         title="Train Data" id= "trainingValue"   ></input>
//     </div> 
//                     {inputData}
//                   </Col>
//                   <Col md={3}>
            
//                       <span  onClick ={() => this.addNewTrainingData( )}>
//                         <i
//                           className="fa fa-plus-circle"
//                           data-toggle="tooltip"
//                           data-placement="bottom"
//                           title="Add Training Data">
//                         </i>
//                       </span>
                    
//                   </Col>

//                 </Row><br />
//               </>
         
      
//         </Modal.Body>
//         <Modal.Footer>
//         <Button className="float-left" variant="primary" onClick ={ () => this.closeTrainingModal()} >
//             Clear
//           </Button>
//           <Button className="float-right" variant="success" onClick={() => this.saveNewTrainingData(task)} >
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     );
//     }
//   }

uploadFile = (display_taskid, display_entityid,e) => {

  for (let i = 0; i < this.state.tasks.length; i++) {
    const task = this.state.tasks[i];
   
    if (task.display_taskid == display_taskid) {
      if (display_entityid == '' || display_entityid == undefined) {
        const data = new FormData()
        data.append("file",e.target.files[0])
            // task.multimedia.push(data);
            var multimediaData1 = this.state.multimediaData
                  multimediaData1.push(e.target.files[0])
                  this.setState({multimediaData:multimediaData1});
      } 
      else if (display_entityid) {
        for (let j = 0; j < task.entity.length; j++) {
  
          if (task.entity[j].display_entityid == display_entityid) {
                    const data1 = new FormData()
            data1.append("file",e.target.files[0])
                //  task.entity[j].multimedia.push(data1)
                 var multimediaData1 = this.state.multimediaData
                 multimediaData1.push(e.target.files[0])
                 this.setState({multimediaData:multimediaData1});
          }
        }
      } 
    }
  }
  this.setState({ tasks: this.state.tasks });
}

showMultimediaModal = (task, entity) => {
    debugger
  let display_entityid = null;
  let entityName = null;
  let multimedia = {};
  if (entity) {
    display_entityid = entity.display_entityid;
    entityName = entity.entityName
    multimedia = entity.multimedia;
     if(multimedia.length>0){
      for(let i=0;i<multimedia.length;i++){
        if(multimedia[i].type=="image"){
          var parts = multimedia[i].filepath.split('/');
          var answer = parts[parts.length - 1]; 
        }
        if(multimedia[i].type=="audio"){
          var parts1 = multimedia[i].filepath.split('/');
          var answer1 = parts1[parts1.length - 1]; 
        }
        if(multimedia[i].type=="video"){
          var parts2 = multimedia[i].filepath.split('/');
          var answer2 = parts2[parts2.length - 1]; 
        }
        if(multimedia[i].type=="document"){
          var parts3 = multimedia[i].filepath.split('/');
          var answer3 = parts3[parts3.length - 1]; 
        }
      }
    }
  }else{
    multimedia= task.multimedia
    if(multimedia.length>0){
      for(let i=0;i<multimedia.length;i++){
        if(multimedia[i].type=="image"){
          var parts = multimedia[i].filepath.split('/');
          var answer = parts[parts.length - 1]; 
        }
        if(multimedia[i].type=="audio"){
          var parts1 = multimedia[i].filepath.split('/');
          var answer1 = parts1[parts1.length - 1]; 
        }
        if(multimedia[i].type=="video"){
          var parts2 = multimedia[i].filepath.split('/');
          var answer2 = parts2[parts2.length - 1]; 
        }
        if(multimedia[i].type=="document"){
          var parts3 = multimedia[i].filepath.split('/');
          var answer3 = parts3[parts3.length - 1]; 
        }
      }
    }
  }

  return (
    <Modal
      show={entity ? this.state.showEntityMultimedia.includes(display_entityid)
        : this.state.showTaskultimedia.includes(task.display_taskid)}
      onHide={() => this.handleMulitimediaModal(task.display_taskid, display_entityid)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add {entity ? 'Entity' : 'Task'} MultiMedia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display:"-webkit-inline-box"}}>
        Select Image file: <input type="file" className="uploadFile" accept="image/*" onChange= {(e)=>this.uploadFile(task.display_taskid, display_entityid ,e)} name="myFile"/>
        </div><span>{answer}</span>
        <br/><br/>
        <div style={{display:"-webkit-inline-box"}}>
        Select Audio file: <input type="file" className="uploadFile" accept="audio/*" onChange= {(e)=>this.uploadFile(task.display_taskid, display_entityid ,e)} name="myFile"/>
        </div><span>{answer1}</span>
        <br/><br/>
        <div style={{display:"-webkit-inline-box"}}>
        Select Video file: <input type="file" className="uploadFile" accept="video/*" onChange= {(e)=>this.uploadFile(task.display_taskid, display_entityid ,e)} name="myFile"/>
        </div><span>{answer2}</span>
        <br/><br/>
        <div style={{display:"-webkit-inline-box"}}>
        Select Text file: <input type="file" className="uploadFile"  onChange= {(e)=>this.uploadFile(task.display_taskid, display_entityid ,e)} name="myFile"/>
        </div><span>{answer3}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button className="float-left" variant="primary" onClick={() => this.addNewAction2(task.display_taskid, display_entityid, 'close')}>
          Clear
        </Button>
        <Button className="float-right" variant="success" onClick={() => this.handleMulitimediaModal(task.display_taskid, display_entityid, task.taskName, entityName)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

handleTrainedModal = (display_taskid,display_entityid) =>{

    let showEntityTrainedAction = this.state.showEntitytrainedCollection;
    if (display_entityid) {
      if (showEntityTrainedAction.includes(display_entityid)) {
        showEntityTrainedAction = [];
      } else {
        showEntityTrainedAction.push(display_entityid);
      }
      this.setState({ showEntityTrainedAction });
    }
}


  showModal = (task, entity) => {
    
    let display_entityid = null;
    let recommendations = {};
    if (entity) {
      display_entityid = entity.display_entityid;
      recommendations = entity.recommendations;
    }else{
      recommendations= task.recommendations
    }

    let optionTemplate = this.state.taskList.map(value => (
      <option value={value.entity_name}>{value.entity_name}</option>
    ));

    const recomendUrlList = this.state.recomendUrlList.map((value) => (
      <option value={value.api}>{value.title}</option>
    ));

    return (
      <Modal
        show={entity ? this.state.showEntityAction.includes(display_entityid)
          : this.state.show.includes(task.display_taskid)}
        onHide={() => this.handleModal(task.display_taskid, display_entityid)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {entity ? 'Entity' : 'Task'} Recommendation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(recommendations || []).map((recommendation, index) => {
            return (
              <>
                <Row>
                  <Col md={9}>
                    <div>
                      <input className="inputName" placeholder="Enter Recommendation Title" title="Recommendation Title" type="text" value={recommendation.recommendationName} onChange={(e) => this.getRecommendationValue(task.display_taskid, display_entityid, index, e)}></input>
                    </div>
                    <div>
                      {(recommendation.attributes != null && recommendation.attributes.length > 0 )&&
                        <Row>
                          <table>
                            <tbody>
                              {recommendation.attributes.map((item, i) => {
                                if(item.key != "image"){
                                var selectedValue = item.value.replace('#redirect-','');
                                }
                                return (
                                  <tr key={i}>
                                    <td className="inputlabel" title={item.tooltip}>{item.name}</td>
                                     {
                                        item.key == "image" ?
                                        <td><input type="file"
                                        className="uploadFile"
                                        // value = {item.value}
                                        onChange = {(e) => this.getRecommendationAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}>
                                    </input>
                                </td>:
                                       item.key == "recomend_url" ?
                                       <td><select
                                       className="inputName1"
                                       value = {item.value}
                                       onChange = {(e) => this.getRecommendationAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}>
                                        {recomendUrlList}
                                 </select>
                               </td>:
                                       item.key != "task" && item.key != "feed_back_flag" && item.key != "combined_resp_flag" && item.key != "task_redirect" && item.key != "cache_flag"
                                    && item.key != "upload_flag" && item.key != "repeat_task" && item.key != "recomend_flag" ?
                                    <td><input className="inputName" type="text" value={item.value} onChange={(e) => this.getRecommendationAttributeValue(task.display_taskid, display_entityid, index, item.key, e)}></input></td>:

                                    item.key == "feed_back_flag" || item.key == "combined_resp_flag" || item.key == "task_redirect" || item.key == "cache_flag"
                                    || item.key == "upload_flag" || item.key == "repeat_task" || item.key == "recomend_flag" ?
                                    <td><select
                                    className="inputName1"
                                    value = {item.value}
                                    onChange = {(e) => this.getRecommendationAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                                    >
                                    <option selected value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    </select>
                                    </td>:

                                     <td><select
                                          className="inputName"
                                          value = {selectedValue}
                                          onChange = {(e) => this.getRecommendationAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                                        >
                                      {optionTemplate}
                                      </select>

                                  </td>

                                   
                                }
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </Row>
                      }
                    </div>
                  </Col>
                  <Col md={3}>
                    { (recommendation.attributes != null && recommendation.attributes.length == 0) ?
                      <span onClick={() => this.addRecommendationAttributes(task.display_taskid, display_entityid, index, 'add')}>
                        <i
                          className="fa fa-chevron-circle-down"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Add Attributes">
                        </i>
                      </span>
                      :
                      <span onClick={() => this.addRecommendationAttributes(task.display_taskid, display_entityid, index, 'remove')}>
                        <i
                          className="fa fa-chevron-circle-up"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Attributes">
                        </i>
                      </span>
                    } &nbsp; &nbsp; &nbsp;
                 {( recommendations != null && recommendations.length - 1 == index) ?
                      <span onClick={() => this.addRecommendation(task.display_taskid, display_entityid, index, 'add')}>
                        <i
                          className="fa fa-plus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Add Recommendation">
                        </i>
                      </span>
                      :
                      <span onClick={() => this.addRecommendation(task.display_taskid, display_entityid, index+1, 'remove')}>
                        <i
                          className="fa fa-minus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Recommendation">
                        </i>
                      </span>
                    }
                  </Col>
                </Row><br />
              </>
            )
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button className="float-left" variant="primary" onClick={() => this.addNewAction(task.display_taskid, display_entityid, 'close')}>
            Clear
          </Button>
          <Button className="float-right" variant="success" onClick={() => this.handleModal(task.display_taskid, display_entityid)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }


  showDecisionEntity = (task,entity) =>{
    
    let display_entityid = null;
    let desisionMakingData = {};
    if (entity) {
              display_entityid = entity.display_entityid;
              desisionMakingData = entity.decisionMaking;
            }else{
                desisionMakingData= task.decisionMaking
            }
            let optionTemplate = this.state.taskList.map(value => (
                <option value={value.entity_name}>{value.entity_name}</option>
              ));
return(
     desisionMakingData != null && desisionMakingData.length >0 &&
        <Col sm={3}>
          <Card>
            <Card.Header>
              <Row>
                <Col md={9} >
                  <h5 className="pull-left">Decision Making</h5>
                </Col>
                <Col md={3}>
                    {entity ?
                      <i
                      className="fa fa-etsy pull-left"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Entity">
                    </i> :
                      <i
                      className="fa fa-text-width pull-left"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Entity">
                    </i>
                    
                }
                &nbsp;
                 <i
                    className="fa fa-times-circle pull-right"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Remove"
                    onClick={() => this.addNewDecisionMaking(task.display_taskid, display_entityid , null , 'remove')}>
                  </i>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
            {(desisionMakingData || []).map((decision, index) => {
                 return (
                    <>
              <Row>
                  <Col md={7}>
                    <div>
                      <input className="inputName" placeholder="Enter Decision Title" title="Decision Title" type="text" value={decision.decisionMakingName}  onChange={(e) => this.getDecisionValue(task.display_taskid, display_entityid, index, e)}></input>
                    </div>
                    <div>
                      { (decision.attributes != null && decision.attributes.length > 0 )&&
                        <Row>
                          <table>
                            <tbody>
                              {decision.attributes.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="inputlabel" title={item.tooltip}>{item.name}</td>
                                    {item.key == "redirectTo" ?
                                        <td><select
                                               className="inputvalue inputName1"
                                                value = {item.value}
                                                onChange = {(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                                            >
                                            {optionTemplate}
                                            </select>

                                        </td>:
                                         item.key == "feed_back_flag" || item.key == "combined_resp_flag" || item.key == "task_redirect" || item.key == "cache_flag"
                                         || item.key == "upload_flag" || item.key == "repeat_task" || item.key == "recomend_flag" ?
                                         <td><select
                                         className="inputName1"
                                         value = {item.value}
                                         onChange = {(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                                         >
                                         <option selected value="">Select</option>
                                         <option value="yes">Yes</option>
                                         <option value="no">No</option>
                                         </select>
                                         </td>:
                                    <td><input className="inputvalue inputName1" type="text" value={item.value} onChange={(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index, item.key, e)}></input></td>
                                }
                                  </tr>  
                                )
                              })}
                               <br/>
                            </tbody>
                          </table>
                        </Row>
                      }
                    </div>
                  </Col>
                <Col md={5}>
                  { (decision.attributes != null && decision.attributes.length == 0 )?
                    <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, display_entityid, index,'add')}>
                      <i
                        className="fa fa-chevron-circle-down"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Add Attribute">
                      </i>
                    </span>
                    :
                    <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, display_entityid, index, 'remove')}>
                      <i
                        className="fa fa-chevron-circle-up"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Remove Attribute">
                      </i>
                    </span>
                  } &nbsp; &nbsp; &nbsp;
                  {( desisionMakingData != null && desisionMakingData.length - 1 == index) ?
                       <span onClick={() => this.addNewDecisionMaking(task.display_taskid, display_entityid, index, 'add')}>
                         <i
                           className="fa fa-plus-circle"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Add Decision">
                         </i>
                       </span>
                       :
                       <span onClick={() => this.addNewDecisionMaking(task.display_taskid, display_entityid, index+1, 'remove')}>
                         <i
                           className="fa fa-minus-circle"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Remove Decision">
                         </i>
                       </span>
                     }
                </Col>

                {/* <Col md={3}>
                    {recommendation.attributes.length == 0 ?
                      <span onClick={() => this.addRecommendationAttributes()}>
                        <i
                          className="fa fa-plus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Add Attributes">
                        </i>
                      </span>
                      : 
                      <span onClick={() => this.addRecommendationAttributes()}>
                        <i
                          className="fa fa-minus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Attributes">
                        </i>
                      </span>
                 } 
                     &nbsp; &nbsp; &nbsp;
                 {(recommendations.length - 1 == index) ?
                      <span onClick={() => this.addRecommendation()}>
                        <i
                          className="fa fa-plus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Add Recommendation">
                        </i>
                      </span>
                       : 
                      <span onClick={() => this.addRecommendation()}>
                        <i
                          className="fa fa-minus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Recommendation">
                        </i>
                      </span>
                     }
                  </Col> */}
              </Row>
              {/* {entity.decisionMaking.attributes.length > 0 &&
                <Row>
                  {this.attributesTable(task.display_taskid, entity.display_entityid, entity.decisionMaking.attributes, 'decisionMaking')}
                </Row>
              } */}
              </>
                 )
            })}
            </Card.Body>
          </Card>
        </Col>)
}

showTaskDecision = (task,entity) =>{
  
  let display_entityid = null;
  let desisionMakingData = {};

  desisionMakingData = task.decisionMaking

          let optionTemplate = this.state.taskList.map(value => (
              <option value={value.entity_name}>{value.entity_name}</option>
            ));
return(
  desisionMakingData != null && desisionMakingData.length >0 &&
      <Col md={3}>
        <Card>
          <Card.Header>
            <Row>
              <Col md={9} >
                <h5 className="pull-left">Decision Making</h5>
              </Col>
              <Col md={3}>
                  {entity ?
                    <i
                    className="fa fa-etsy pull-left"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Entity">
                  </i> :
                    <i
                    className="fa fa-text-width pull-left"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Entity">
                  </i>
                  
              }
              &nbsp;
               <i
                  className="fa fa-times-circle pull-right"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Remove"
                  onClick={() => this.addNewDecisionMaking(task.display_taskid, display_entityid , null , 'remove')}>
                </i>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
          {(desisionMakingData || []).map((decision, index) => {
               return (
                  <>
            <Row>
                <Col md={7}>
                  <div>
                    <input className="inputName" placeholder="Enter Decision Title" title="Decision Title" type="text" value={decision.decisionMakingName}  onChange={(e) => this.getDecisionValue(task.display_taskid, display_entityid, index, e)}></input>
                  </div>
                  <div>
                    { (decision.attributes != null && decision.attributes.length > 0) &&
                      <Row>
                        <table>
                          <tbody>
                            {decision.attributes.map((item, i) => {
                              return (
                                <tr key={i}>
                                  <td className="inputlabel" title={item.tooltip}>{item.name}</td>
                                  {item.key == "redirectTo" ?
                                      <td><select
                                            className="inputvalue inputName1"
                                              value = {item.value}
                                              onChange = {(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                                          >
                                          {optionTemplate}
                                          </select>

                                      </td>:
                                       item.key == "feed_back_flag" || item.key == "combined_resp_flag" || item.key == "task_redirect" || item.key == "cache_flag"
                                       || item.key == "upload_flag" || item.key == "repeat_task" || item.key == "recomend_flag" ?
                                       <td><select
                                       className="inputName1"
                                       value = {item.value}
                                       onChange = {(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                                       >
                                       <option selected value="">Select</option>
                                       <option value="yes">Yes</option>
                                       <option value="no">No</option>
                                       </select>
                                       </td>:
                                  <td><input className="inputName1" type="text" value={item.value} onChange={(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index, item.key, e)}></input></td>
                              }
                                </tr>
                              )
                            })}
                            <br/>
                          </tbody>
                        </table>
                      </Row>
                    }
                  </div>
                </Col>
              <Col md={5}>
                { (decision.attributes != null && decision.attributes.length == 0 )?
                  <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, display_entityid, index,'add')}>
                    <i
                      className="fa fa-chevron-circle-down"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Add Attribute">
                    </i>
                  </span>
                  :
                  <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, display_entityid, index, 'remove')}>
                    <i
                      className="fa fa-chevron-circle-up"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Remove Attribute">
                    </i>
                  </span>
                } &nbsp; &nbsp; &nbsp;
                {(desisionMakingData != null && desisionMakingData.length - 1 == index) ?
                     <span onClick={() => this.addNewDecisionMaking(task.display_taskid, display_entityid, index, 'add')}>
                       <i
                         className="fa fa-plus-circle"
                         data-toggle="tooltip"
                         data-placement="bottom"
                         title="Add Decision">
                       </i>
                     </span>
                     :
                     <span onClick={() => this.addNewDecisionMaking(task.display_taskid, display_entityid, index, 'remove')}>
                       <i
                         className="fa fa-minus-circle"
                         data-toggle="tooltip"
                         data-placement="bottom"
                         title="Remove Decision">
                       </i>
                     </span>
                   }
              </Col>
            </Row>
            </>
               )
          })}
          </Card.Body>
        </Card>
      </Col>)
}
//   handleModal1 = (display_taskid, display_entityid) => {
// 
  
//     let showDecision = this.state.showDecision;
//     let showEntityDecision = this.state.showEntityDecision;
//     if (display_entityid) {
//       if (showEntityDecision.includes(display_entityid)) {
//         showEntityDecision = [];
//       } else {
//         showEntityDecision.push(display_entityid);
//       }
//       this.setState({ showEntityDecision });
//     } else {
//       if (showDecision.includes(display_taskid)) {
//         showDecision = [];
//       } else {
//         showDecision.push(display_taskid);
//       }
//       this.setState({ showDecision });
//     }
//   }

  handleModal1 = (display_taskid, display_entityid) => {
    
    // var lastData = this.state.tasks.slice(-1)
    // if(lastData[0].decisionMaking.length>0){
    //   for(let n=0; n<lastData[0].decisionMaking.length; n++ ){
    //      for(let j=0; j<lastData[0].decisionMaking[n].attributes.length; j++){
    //        if(lastData[0].decisionMaking[n].attributes[j].key == "keyof"){
    //         if(lastData[0].decisionMaking[n].attributes[j].value == "" || lastData[0].decisionMaking[n].attributes[j].value == null || lastData[0].decisionMaking[n].attributes[j].value == undefined){
    //           swal("Decision Key Should Not Be Blank");
    //           return
    //           }
    //        } else if(lastData[0].decisionMaking[n].attributes[j].key == "redirectTo"){
    //         if(lastData[0].decisionMaking[n].attributes[j].value == "" || lastData[0].decisionMaking[n].attributes[j].value == null || lastData[0].decisionMaking[n].attributes[j].value == undefined){
    //           swal("Redirect Task Must Be Selected");
    //           return
    //           }
    //        }
    //      }
    //   }
    // }

    for(let a=0; a<this.state.tasks.length; a++){
      for(let b=0; b<this.state.tasks[a].decisionMaking.length; b++){
        if(!display_entityid){
        if(this.state.tasks[a].display_taskid == display_taskid){
             for(let j=0; j<this.state.tasks[a].decisionMaking[b].attributes.length; j++){
              if(this.state.tasks[a].decisionMaking[b].attributes[j].key == "keyof"){
                if(this.state.tasks[a].decisionMaking[b].attributes[j].value == "" || this.state.tasks[a].decisionMaking[b].attributes[j].value == null || this.state.tasks[a].decisionMaking[b].attributes[j].value == undefined){
                swal("Decision Key Should Not Be Blank");
                return
                }    
              }else if(this.state.tasks[a].decisionMaking[b].attributes[j].key == "redirectTo"){
                if(this.state.tasks[a].decisionMaking[b].attributes[j].value == "" || this.state.tasks[a].decisionMaking[b].attributes[j].value == null || this.state.tasks[a].decisionMaking[b].attributes[j].value == undefined){
                swal("Redirect Task Must Be Selected");
                 return
                }
             }    
            }
          }
        }
      }
    }

    let showDecision = this.state.showDecision;
    let showEntityDecision = this.state.showEntityDecision;
    if (display_entityid) {
      if (showEntityDecision.includes(display_entityid)) {
        showEntityDecision = [];
      } else {
        showEntityDecision.push(display_entityid);
      }
      this.setState({ showEntityDecision });
    } else {
      if (showDecision.includes(display_taskid)) {
        showDecision = [];
      } else {
        showDecision.push(display_taskid);
      }
      this.setState({ showDecision });
    }
  }


  showModal1 = (task, entity) => {

    let display_entityid = null;
    let desisionMaking = {};
    if (entity) {
      display_entityid = entity.display_entityid;
      desisionMaking = entity.decisionMaking;
    }else{
      desisionMaking= task.decisionMaking
    }

    let optionTemplate = this.state.taskList.map(value => (
      <option value={value.entity_name}>{value.entity_name}</option>
    ));

    return (
      <Modal
        show={entity ? this.state.showEntityDecision.includes(display_entityid)
          : this.state.showDecision.includes(task.display_taskid)}
        onHide={() => this.handleModal1(task.display_taskid, display_entityid)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {entity ? 'Entity' : 'Task'} Decision Making</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(desisionMaking || []).map((decision, index) => {
            return (
              <>
                <Row>
                  <Col md={9}>
                    <div>
                      <input type="text" className="inputName" placeholder="Enter Decision Title" title="Decision Title" value={decision.decisionMakingName} onChange={(e) => this.getDecisionValue(task.display_taskid, display_entityid, index, e)}></input>
                    </div>
                    <div>
                      { (decision.attributes != null && decision.attributes.length > 0 )&&
                        <Row> 
                          <table>
                            <tbody>
                              {decision.attributes.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="inputlabel" title={item.tooltip}>{item.name}</td>

                              {item.key != "redirectTo" && item.key != "feed_back_flag" && item.key != "combined_resp_flag" && item.key != "task_redirect" && item.key != "cache_flag"
                               && item.key != "upload_flag" && item.key != "repeat_task" && item.key != "recomend_flag"?
                               <td><input  className="inputName" type="text" value={item.value} onChange={(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index, item.key, e)}></input></td>
                               :
                               item.key == "feed_back_flag" || item.key == "combined_resp_flag" || item.key == "task_redirect" || item.key == "cache_flag"
                               || item.key == "upload_flag" || item.key == "repeat_task" || item.key == "recomend_flag" ?
                               <td><select
                               className="inputvalue inputName1"
                               value = {item.value}
                               onChange = {(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index , item.key, e)}
                               >
                               <option selected value="">Select</option>
                               <option value="yes">Yes</option>
                               <option value="no">No</option>
                               </select>
                               </td>:
                                  <td><select
                                  className="inputvalue inputName1"
                                  value = {item.value}
                                  onChange = {(e) => this.getDecisionAttributeValue(task.display_taskid, display_entityid, index, item.key, e)}
                                          >
                                          {optionTemplate}
                                        </select>
                                  </td>
                                   
                                }
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </Row>
                      }
                    </div>
                  </Col>
                  <Col md={3}>
                    { decision.attributes != null && decision.attributes.length == 0 ?
                      <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, display_entityid, index, 'add')}>
                        <i
                          className="fa fa-plus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Add Attributes">
                        </i>
                      </span>
                      :
                      <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, display_entityid, index, 'remove')}>
                        <i
                          className="fa fa-minus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Attributes">
                        </i>
                      </span>
                    } &nbsp; &nbsp; &nbsp;
                 {( desisionMaking != null && desisionMaking.length - 1 == index) ?
                      <span onClick={() => this.addDecision(task.display_taskid, display_entityid, index, 'add')}>
                        <i
                          className="fa fa-plus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Add Decision">
                        </i>
                      </span>
                      :
                      <span onClick={() => this.addDecision(task.display_taskid, display_entityid, index+1, 'remove')}>
                        <i
                          className="fa fa-minus-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Remove Decision">
                        </i>
                      </span>
                    }
                  </Col>
                </Row><br />
              </>
            )
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button className="float-left" variant="primary" onClick={() => this.addNewAction1(task.display_taskid, display_entityid, 'close')}>
            Clear
          </Button>
          <Button className="float-right" variant="success" onClick={() => this.handleModal1(task.display_taskid, display_entityid)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    console.log("task",this.state.tasks)
    console.log("count",this.state.count)
    console.log("actionUrlList",this.state.actionUrlList)
    console.log("checkDataUrlList",this.state.checkDataUrlList)
    console.log("multimediaData",this.state.multimediaData)
    console.log("trainedCollection",this.state.trainedCollection)
    return (
     
      <main className="backgoundimage">
         <div id="loader-wrapper">
      <div id="loader"></div>
  </div>
        <section>
          <div className="taskMapping wrapper">
            <div className="container">
              <Row>
                <Col md={12}>
                  <button className="pull-left btn btn-success" onClick={()=>this.addNewTask()} style={{margin: "10px"}}>Add New Task</button>
                  <button type="button" className="pull-right btn btn-success" style={{margin: "10px", color:'white'}} onClick={()=>this.taskMappingData()}>Save</button>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {this.state.tasks.map((task, index) => {
                    return (
                      <>
                        <Accordion allowZeroExpanded={true}>
                          <AccordionItem>
                            <AccordionItemHeading>
                              <AccordionItemButton>
                                {task.taskName ? task.taskName : " Click Here To Add New Task"}
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <Row>
                                <Col md={3}>
                                  <Card>
                                    <Card.Header>
                                      <Row>
                                        <Col md={9} >
                                          <h5 className="pull-left">Task</h5>
                                        </Col>
                                        <Col md={3}>
                                          {( task.recommendations != null && task.recommendations.length > 0) &&
                                            <i
                                              className="fa fa-rr"
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Recommendation"
                                              onClick={() => this.handleModal(task.display_taskid, null)}>
                                            </i>
                                          }
                                            &nbsp;
                                          {( task.decisionMaking != null && task.decisionMaking.length > 0) &&
                                            <i
                                              className="fa fa-dd "
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Decision Making"
                                              onClick={() => this.handleModal1(task.display_taskid, null)}>
                                            </i>
                                          }   

                                             &nbsp;
                                             {/* {( task.multimedia != null && task.multimedia.length > 0) &&
                                            <i
                                              className="fa fa-mm "
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Multimedia"
                                              onClick={() => this.handleMulitimediaModal(task.display_taskid, null)}>
                                            </i>
                                          } */}
                                            {/* <i
                                              className="fa fa-tt "
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Training"
                                              onClick={() => this.handleTrainModal(task.display_taskid, null)}>
                                            </i> */}


                                            
                                          <i
                                            className="fa fa-times-circle"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Remove"
                                            onClick={() => this.removeTask(index)}>
                                          </i>
                                        </Col>
                                      </Row>
                                    </Card.Header>
                                    <Card.Body>
                                      <Row>
                                        <Col md={10} >
                                          <input type="text" className="inputName" placeholder="Enter Task Title" title="Task Title" value={task.taskName} onChange={(e) => this.getFieldValue(task.display_taskid, null, 'task', e)}></input>
                                        </Col>
                                        <Col md={2}>
                                          { (task.attributes != null && task.attributes.length > 0 )?
                                            <span onClick={() => this.addTaskAttributes(task.display_taskid, 'remove')}>
                                              <i
                                                className="fa fa-chevron-circle-up"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Remove Attribute">
                                              </i>
                                            </span>
                                            :
                                            <span onClick={() => this.addTaskAttributes(task.display_taskid, 'add')}>
                                              <i
                                                className="fa fa-chevron-circle-down"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Add Attribute">
                                              </i>
                                            </span>
                                          }
                                        </Col>
                                      </Row>
                                      { (task.attributes != null && task.attributes.length > 0) &&
                                        <Row>
                                          {this.attributesTable1(task.display_taskid, null, task.attributes, 'task')}
                                        </Row>
                                      }
                                    </Card.Body>
                                    <Card.Footer>
                                      <span onClick={() => this.addNewEntity(task.display_taskid, 'add')}>
                                        <i
                                          className="fa fa-e"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          title="Entity">
                                        </i>
                                      </span> &nbsp; &nbsp; &nbsp; 
                                      {!( task.decisionMaking != null && task.decisionMaking.length > 0) &&
                                      <span onClick={() => this.addNewAction1(task.display_taskid, null, null)}>
                                        <i
                                          className="fa fa-d"
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          title="Decision Making">
                                        </i>
                                      </span>
                                       } &nbsp; &nbsp; &nbsp;
                                     {!( task.recommendations !=null && task.recommendations.length > 0) &&
                                        <span onClick={() => this.addNewAction(task.display_taskid, null, null)}>
                                          <i
                                            className="fa fa-r"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Recommendation">
                                          </i>
                                        </span>} &nbsp; &nbsp; &nbsp;
                                     {( task.multimedia !=null && task.multimedia.length >= 0) &&
                                        <span onClick={() => this.addNewAction2(task.display_taskid, null, null)}>
                                          <i
                                            className="fa fa-m"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Multimedia">
                                          </i>
                                        </span>}


                                        &nbsp; &nbsp; &nbsp;
                                        {/* <span onClick={() => this.showTrainModal1(task.taskName,task.display_taskid)}>
                                          <i
                                            className="fa fa-t"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Training">
                                          </i>
                                        </span> */}
                                        

                                        &nbsp;
                                        <span onClick={() => this.handleTrainUpdateModal1(task.taskName)}>
                                          <i
                                            className="fa fa-t"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Training">
                                          </i>
                                        </span>
                                           
                                    </Card.Footer>
                                  </Card>
                                </Col>
                                {/* <Col md={6}> */}
                                  {task.entity.map((entity, index) => {
                                    return (
                                      <>
                                        {/* <Row> */}
                                          <Col sm={6}>
                                            <Card>
                                              <Card.Header>
                                                <Row>
                                                  <Col md={9} >
                                                    <h5 className="pull-left">Entity</h5>
                                                  </Col>
                                                  <Col md={3}>
                                                    {(  entity.recommendations != null && entity.recommendations.length > 0) &&
                                                      <i
                                                        className="fa fa-rr"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title="Recommendation"
                                                        onClick={() => this.handleModal(task.display_taskid, entity.display_entityid)}>
                                                      </i>
                                                    }
                                                     {/* {(  entity.multimedia != null && entity.multimedia.length > 0) &&
                                                      <i
                                                        className="fa fa-mm"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title="Multimedia"
                                                        onClick={() => this.handleMulitimediaModal(task.display_taskid, entity.display_entityid)}>
                                                      </i>
                                                    } */}
                                                    <i
                                                      className="fa fa-times-circle"
                                                      data-toggle="tooltip"
                                                      data-placement="bottom"
                                                      title="Remove"
                                                      onClick={() => this.addNewEntity(task.display_taskid, entity.display_entityid, 'remove')}>
                                                    </i>
                                                  </Col>
                                                </Row>
                                              </Card.Header>
                                              <Card.Body>
                                                <Row>
                                                  <Col md={10}>
                                                    <input className="inputName" type="text" placeholder="Enter Entity Title" title="Entity Title" value={entity.entityName} onChange={(e) => this.getFieldValue(task.display_taskid, entity.display_entityid, 'entity', e)}></input>
                                                  </Col>
                                                  <Col md={2}>
                                                    { (entity.attributes != null  && entity.attributes.length > 0) ?
                                                      <span onClick={() => this.addEntityAttribute(task.display_taskid, entity.display_entityid, 'remove')}>
                                                        <i
                                                          className="fa fa-chevron-circle-up"
                                                          data-toggle="tooltip"
                                                          data-placement="bottom"
                                                          title="Remove Attribute">
                                                        </i>
                                                      </span>
                                                      :
                                                      <span onClick={() => this.addEntityAttribute(task.display_taskid, entity.display_entityid, 'add')}>
                                                        <i
                                                          className="fa fa-chevron-circle-down"
                                                          data-toggle="tooltip"
                                                          data-placement="bottom"
                                                          title="Add Attribute">
                                                        </i>
                                                      </span>
                                                    }
                                                  </Col>
                                                </Row>
                                                {( entity.attributes != null  && entity.attributes.length > 0) &&
                                                  <Row>
                                                    {this.attributesTable(task.display_taskid, entity.display_entityid, entity.attributes, 'entity')}
                                                  </Row>
                                                }
                                              </Card.Body>
                                              <Card.Footer>
                                               {!( entity.decisionMaking != null && entity.decisionMaking.length >0) && 
                                                <span onClick={() => this.addNewAction1(task.display_taskid, entity.display_entityid, null, 'add')}>
                                                  <i
                                                    className="fa fa-d"
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title="Decision Making">
                                                  </i>
                                                </span> 
                                              }
                                                &nbsp; &nbsp; &nbsp;
                                                {!( entity.recommendations != null && entity.recommendations.length > 0) &&
                                                  <span onClick={() => this.addNewAction(task.display_taskid, entity.display_entityid, null)}>
                                                    <i
                                                      className="fa fa-r"
                                                      data-toggle="tooltip"
                                                      data-placement="bottom"
                                                      title="Recommendation">
                                                    </i>
                                                  </span>
                                                }
                                                   &nbsp; &nbsp; &nbsp;
                                               {( entity.multimedia != null && entity.multimedia.length >= 0) &&
                                                  <span onClick={() => this.addNewAction2(task.display_taskid, entity.display_entityid, null)}>
                                                    <i
                                                      className="fa fa-m"
                                                      data-toggle="tooltip"
                                                      data-placement="bottom"
                                                      title="Recommendation">
                                                    </i>
                                                  </span>
                                                }
                                         &nbsp;&nbsp; &nbsp;
                                        {/* <span onClick={() => this.addNewAction3(task.display_taskid, entity.display_entityid,null)}>
                                          <i
                                            className="fa fa-t"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Trained Collection">
                                          </i>
                                        </span> */}
                                         
                                              </Card.Footer>
                                            </Card>
                                          </Col>
                                          
                                          {this.showDecisionEntity(task,entity)}
                                          {this.showMultimediaModal(task,entity)}
                                           {this.showModal(task, entity)}
                                           {this.state.trainedCollection ==true &&
                                           this.showTrainedCollectionModal1(task,entity) }

                                          {entity.decisionMaking.display_resultid &&
                                            <Col md={6}>
                                              <Card>
                                                <Card.Header>
                                                  <Row>
                                                    <Col md={9} >
                                                      <h5 className="pull-left">Decision Making</h5>
                                                    </Col>
                                                    <Col md={3}>
                                                      <i
                                                        className="fa fa-etsy pull-left"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title="Entity">
                                                      </i>&nbsp;
                                                <i
                                                        className="fa fa-times-circle pull-right"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title="Remove"
                                                        onClick={() => this.addNewDecisionMaking(task.display_taskid, entity.display_entityid, 'remove')}>
                                                      </i>
                                                    </Col>
                                                  </Row>
                                                </Card.Header>
                                                <Card.Body>
                                                  <Row>
                                                    <Col md={10}>
                                                      <input type="text" value={entity.decisionMaking.decisionMakingName} onChange={(e) => this.getFieldValue(task.display_taskid, entity.display_entityid, 'decisionMaking', e)}></input>
                                                    </Col>
                                                    <Col md={2}>
                                                      {entity.decisionMaking.attributes.length > 0 ?
                                                        <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, entity.display_entityid, 'remove')}>
                                                          <i
                                                            className="fa fa-chevron-circle-up"
                                                            data-toggle="tooltip"
                                                            data-placement="bottom"
                                                            title="Remove Attribute">
                                                          </i>
                                                        </span>
                                                        :
                                                        <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, entity.display_entityid, 'add')}>
                                                          <i
                                                            className="fa fa-chevron-circle-down"
                                                            data-toggle="tooltip"
                                                            data-placement="bottom"
                                                            title="Add Attribute">
                                                          </i>
                                                        </span>
                                                      }
                                                    </Col>
                                                  </Row>
                                                  {entity.decisionMaking.attributes.length > 0 &&
                                                    <Row>
                                                      {this.attributesTable(task.display_taskid, entity.display_entityid, entity.decisionMaking.attributes, 'decisionMaking')}
                                                    </Row>
                                                  }
                                                </Card.Body>
                                              </Card>
                                            </Col>} 
                                        {/* </Row> */}
                                       
                                        {/* {this.showModal1(task,entity)} */}
                                      </>
                                    )
                                  })}
                                {/* </Col> */}
                                {/* <Col md={3}>
                                  {task.decisionMaking.display_resultid &&
                                    <Card>
                                      <Card.Header>
                                        <Row>
                                          <Col md={9} >
                                            <h5 className="pull-left">Decision Making</h5>
                                          </Col>
                                          <Col md={3}>
                                            <i
                                              className="fa fa-text-width pull-left"
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Task">
                                            </i>&nbsp;
                                      <i
                                              className="fa fa-times-circle pull-right"
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Remove"
                                              onClick={() => this.addNewDecisionMaking(task.display_taskid, null, 'remove')}>
                                            </i>
                                          </Col>
                                        </Row>
                                      </Card.Header>
                                      <Card.Body>
                                        <Row>
                                          <Col md={10}>
                                            <input type="text" value={task.decisionMaking.decisionMakingName} onChange={(e) => this.getFieldValue(task.display_taskid, null, 'decisionMaking', e)}></input>
                                          </Col>
                                          <Col md={2}>
                                            {task.decisionMaking.attributes.length > 0 ?
                                              <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, null, 'remove')}>
                                                <i
                                                  className="fa fa-chevron-circle-up"
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title="Remove Attribute">
                                                </i>
                                              </span>
                                              :
                                              <span onClick={() => this.addDecisionMakingAttribute(task.display_taskid, null, 'add')}>
                                                <i
                                                  className="fa fa-chevron-circle-down"
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title="Add Attribute">
                                                </i>
                                              </span>
                                            }
                                          </Col>
                                        </Row>
                                        {task.decisionMaking.attributes.length > 0 &&
                                          <Row>
                                            {this.attributesTable(task.display_taskid, null, task.decisionMaking.attributes, 'decisionMaking')}
                                          </Row>
                                        }
                                      </Card.Body>
                                    </Card>
                                  }
                                </Col> */}
                                   {/* {this.showTaskDecision(task)} */}
                              </Row>
                            
                            </AccordionItemPanel>
                          </AccordionItem>
                        </Accordion>
                        {this.showModal(task)}
                        {this.showMultimediaModal(task)}
                        {this.showModal1(task)}
                        {/* {this.state.trainModalFlag == true &&
                        this.showTrainModal(task)
                        } */}
                        {
                          this.state.updateTrainModalFlag == true &&
                          this.showUpdateTrainModal(task)
                          
                        }
                  {/* {this.showModal1(task)} */}
                      </>)
                  })}
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <button className="pull-left btn btn-success" onClick={()=>this.addNewTask()} style={{margin: "10px"}}>Add New Task</button>
                  <button type="button" className="pull-right btn btn-success" style={{margin: "10px", color:'white'}} onClick={()=>this.taskMappingData()}>Save</button>
                </Col>
              </Row>
            </div>
          </div>
          {/* <button type="button" className="btn btn-success" style={{margin: "10px"}} onClick={()=>this.taskMappingData()}>Save</button> */}
        </section>
      </main>
    );
  }
}

export default TaskMapping;