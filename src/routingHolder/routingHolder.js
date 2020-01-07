import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../containers/dashboard';
import Login from '../containers/login/login';
import LandingPage from '../containers/landingPage/landingPage';
import MainBot from '../containers/botMainPage/mainBot';
import LiveAgent from '../containers/liveAgent/liveAgent';
import LiveAgentBot from '../containers/LiveAgentBot/liveAgentBot';
import CustomDiagram from '../containers/flowChart/flowChart';
import TaskMapping from '../containers/taskMapping';
import TricontesLogin from '../containers/login/tricontes';
 import MainBotKap from '../containers/botKapittx/mainBotKap'

class RoutingHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    console.log('inside routing Holder.');	
    return (<div>
      <Router history={this.props.history}>
        <Switch>
          <Route exact={true} path='/' render={() => <Login history={this.props.history}/>} />
          <Route path='/login' render={() => <Login history={this.props.history}/>} />
          <Route path='/landingPage'  render={() => <LandingPage history={this.props.history}/>} />
          <Route path='/mainBot'  render={() => <MainBot history={this.props.history}/>} />
          <Route path='/dashboard'  render={() => <Dashboard history={this.props.history}/>} />
          <Route path='/liveAgent'  render={() => <LiveAgent history={this.props.history}/>} />
          <Route path='/liveAgentBot'  render={() => <LiveAgentBot history={this.props.history}/>} />
          <Route path='/flowChart'  render={() => <CustomDiagram history={this.props.history}/>} />
          <Route path='/taskMapping'  render={() => <TaskMapping history={this.props.history}/>} />
          <Route path='/tricontes'  render={() => <TricontesLogin history={this.props.history}/>} />
           <Route path='/mainBotKapitx'  render={() => <MainBotKap history={this.props.history}/>} /> 
        </Switch>
      </Router>
    </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
  RoutingHolder,
);
