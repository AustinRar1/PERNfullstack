import React, { Component } from "react";
import APIURL from './helpers/enviroment.js';
import SiteBar from "./home/navbar";
import Auth from './auth/Auth';
import Splash from './home/splash';
import NavBar from './home/navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './style/main.css'
class App extends Component {

  constructor() {
    super();
    this.state = {
      sessionToken: ''
    }
  }
componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) { 
      this.setState({ sessionToken: token });
    }
}
setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
}

logout = () => {
  this.setState({
    sessionToken:''
  });
  localStorage.clear();
}
protectedViews = () => {
  if (this.state.sessionToken === localStorage.getItem('token')) {
    return (
      <Switch>
        <Route path='/' exact>
          <Splash sessionToken={this.state.sessionToken} />
        </Route>
      </Switch>
    )
  } else {
    return (
      <Route path="/auth" >
        <Auth setToken={this.setSessionState}/>
      </Route>
    )
  }
}

render() {
    return (
      <Router>
        <div>
          <NavBar clickLogout={this.logout} />
          {this.protectedViews()}
        </div>
      </Router>
    );
  }
}

export default App;