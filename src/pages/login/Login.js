import loginStyles from './Login.module.css'
import art from '../../assets/art.png';
import logo from '../../assets/logo.svg';
import './Login.module.css'

function Login(props){
  

  function toggle(){
    props.setLoginDialog({isLoginDialog: !props.state.isLoginDialog});
  }

  function stopLoading(){
    props.setLoginDialog({isLoading:false});
  }

    return(
      <div>
        <div className={loginStyles.backdrop}>
        <div className={loginStyles.login}>
        <img onLoad={stopLoading} src={art} alt="" className={loginStyles.art} />
        <div className={loginStyles.popup}>
        <a className={loginStyles.cross} onClick={toggle} href="#">x</a>
          <p className={loginStyles.title}>welcome to voiir</p>
          <p className={loginStyles.subTitle}>The <span style={{color: '#9A3FCB'}}>yellow</span> pages of the 21st century</p>
          <img src={logo} alt="" className={loginStyles.logo} />
          <div className={loginStyles.loginButton} onClick={props.googleLogin}>login with google</div>
          <div className={loginStyles.tc}>By signing in you agree to our <span style={{color: '#9A3FCB'}}>terms and conditions</span></div>
        </div>
      </div>
        </div>
      </div>
    );
}

export default Login;