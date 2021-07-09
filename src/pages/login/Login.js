import './Login.css'
import art from '../../assets/art.png';
import logo from '../../assets/logo.svg';

function Login(){
    return(
            <div className="login">
        <img src={art} alt="" className="art" />
        <div className="popup">
          <p className="title">welcome to voiir</p>
          <p className="sub-title">The <span style={{color: '#9A3FCB'}}>yellow</span> pages of the 21st century</p>
          <img src={logo} alt="" className="logo" />
          <div className="login-button">login with google</div>
          <div className="tc">By signing in you agree to our <span style={{color: '#9A3FCB'}}>terms and conditions</span></div>
        </div>
      </div>
    );
}

export default Login;