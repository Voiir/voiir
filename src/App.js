import React, {useState} from 'react';
import { Component } from 'react';
import './App.css';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Onboard from './pages/login/Onboard';
import Loader from './shared/Loader';
import Result from './pages/result/Result'


import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../src/secret/firebaseConfig';
// import { response } from '../node_servers/app';

const firebaseApp = firebase.initializeApp(firebaseConfig);
class App extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoginDialog: false,
      doesUserExists:false,
      isLoading:false,
      resultData:{status:null,result:[]}
    };
    this.setState = this.setState.bind(this);
  }

  

  render() {
    // let ifUserExists=false;

    

    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;


    function dual(state){
      state({isLoading:true});
      signInWithGoogle().then(function(sone){
          console.log('signin complete');
          userExists(sone.user,state);
      });
    }

    function userExists(user,state){
  
        
        fetch("https://api-voiir.herokuapp.com/api/userExists/",{
        method:'post',
        headers:{'Content-Type': 'application/json',Accept:'text/plain'},
        body:JSON.stringify({'emailId':user.email})
    }).then(function(body){
      console.log('in here');
      return body.text(); // <--- THIS PART WAS MISSING
    }).then(function(data) {
      console.log(data);
      if(data=='true') state({doesUserExists:true});
      else state({doesUserExists:false});
      state({isLoading:false});
    });
      
    }

    return (
      <div className="App">
      <Navbar state={this.state} setLoginDialog={this.setState} signOut={signOut} user={user}></Navbar>
      
      <div>
        <meta charSet="utf-8" />
        <title>Site Yapım Aşamasında</title>
        <div class="divv" id="yazı">█ █ █ <span style={{color: 'white'}}>█ █ █ █ █ █ █ █ █ █ </span>31%
          <br />&gt; a search engine of humans&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <br />&gt; coming soon  <span id="imleç">█</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    
      <Footer></Footer>
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
