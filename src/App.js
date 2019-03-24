import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import SingIn from './Components/SingIn';
import AirportList from './Components/AirportList';
import Route from 'react-router-dom/Route';
import { BrowserRouter, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter >
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={SingIn} />
            <Route exact path="/home" component={AirportList} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
