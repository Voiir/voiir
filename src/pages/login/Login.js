import loginStyles from './Login.module.css'
import art from '../../assets/art.png';
import logo from '../../assets/logo.svg';
import './Login.module.css'

function Login(){
    return(
            <div className={loginStyles.login}>
        <img src={art} alt="" className={loginStyles.art} />
        <div className={loginStyles.popup}>
          <p className={loginStyles.title}>welcome to voiir</p>
          <p className={loginStyles.subTitle}>The <span style={{color: '#9A3FCB'}}>yellow</span> pages of the 21st century</p>
          <img src={logo} alt="" className={loginStyles.logo} />
          <div className={loginStyles.loginButton}>login with google</div>
          <div className={loginStyles.tc}>By signing in you agree to our <span style={{color: '#9A3FCB'}}>terms and conditions</span></div>
        </div>
      </div>
    );
}

export default Login;