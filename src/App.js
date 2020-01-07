import React, { Component } from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import RoutingHolder from '../src/routingHolder';
import './App.css';
import Header from'./components/header';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header history={history} />
        <RoutingHolder history={history} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uiUtils: state.utilsReducer,
});

export default connect(mapStateToProps)(
  App,
);