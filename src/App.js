import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import SingIn from './Components/SingIn';
import AirportList from './Components/AirportList';
import Route from 'react-router-dom/Route';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <SingIn 
          />
          <Route path="/home" exact strict render={
            () => {
              return ( <h1>Welcome About</h1>);
            }
          }/>
          <AirportList/>
        </div>
      </Router>

    // <Router>
    //   <Route render={({ location }) => (
    //       <Switch location={location}>
    //         <NavBar />
    //         <Route exact path='/' component={Home} />
    //         <Route path='/login' component={Login} />
    //         <Route path='/signup' component={SignUp} />
    //         <Route path='/profile' component={Profile} />
    //       </Switch>
    //   )}>
    //   </Route>
    // </Router>
      
    );
  }
}

export default App;
