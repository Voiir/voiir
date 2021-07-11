import React, {useState} from 'react';
import { Component } from 'react';
import './App.css';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Onboard from './pages/login/Onboard';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../src/secret/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor() {
    super();
  
    this.state = {
      isLoginDialog: false
    };
  }

  render() {
    this.setState = this.setState.bind(this);

    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
      <Navbar state={this.state} setLoginDialog={this.setState} signOut={signOut} user={user}></Navbar>
      <Homepage></Homepage>
      <Footer></Footer>
      {this.state.isLoginDialog && !user && <Login state={this.state} googleLogin={signInWithGoogle} user={user} setLoginDialog={this.setState}></Login>}
      {this.state.isLoginDialog && user && <Onboard state={this.state} setLoginDialog={this.setState}></Onboard> }
    </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
