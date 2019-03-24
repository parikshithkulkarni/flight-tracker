import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import SingIn from './Components/SingIn';
import { Redirect } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <SingIn 
        />
      </div>
    );
  }
}

export default App;
