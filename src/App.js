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
import About from './pages/about/About';

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
      isAbout:false,
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
      {/* {this.state.resultData.status==null && <Homepage state={this.state} setResultData={this.setState}></Homepage>} */}
      {this.state.resultData.status!=null && <Result state={this.state} setResultData={this.setState}></Result>}
      <Footer></Footer>
      {this.state.isLoading && <Loader className="Loader"></Loader>}
      {this.state.isLoginDialog && !user && <Login state={this.state} googleLogin={() => dual(this.setState)} user={user} setLoginDialog={this.setState}></Login>}
      {this.state.isLoginDialog && user && !this.state.doesUserExists && <Onboard state={this.state} user={user} setLoginDialog={this.setState}></Onboard> }
      <About></About>
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
