import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  UPDATE_PAGE_ROUTE,
} from '../../routes/route-paths';
import navbarStyles from './navbar.module.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { loginActions, userActions } from '../../../domain/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../data/data-source/remote/apiCall';
import { USER_EXISTS } from '../../../data/data-source/remote/apiList';

function Navbar() {
  const clientID = process.env.REACT_APP_clientID;

  const isUserLoggedIn = useSelector(
    (state) => state.loginReducer.isUserLoggedIn
  );
  const name = useSelector((state) => state.userReducer.name);
  const dispatch = useDispatch();
  function LoginHandler(user) {
    console.log(user);
    dispatch(loginActions.userLoggedIn());
    dispatch(userActions.initUser(user));
    console.log(user.profileObj.email);
    var res = postRequest(
      USER_EXISTS,
      { emailId: user.profileObj.email },
      user.tokenObj.access_token
    );
    console.log(res);
    // if (!doesUserExist)
    //   history.push(ONBOARDING_PAGE_ROUTE);
    // else
    //   history.push(HOME_PAGE_ROUTE);
  }

  function error() {}

  return (
    <div className={navbarStyles.navbar}>
      <p className={navbarStyles.logo}>
        <Link to={HOME_PAGE_ROUTE}>
          vo<span style={{ color: '#9A3FCB' }}>ii</span>r
        </Link>
      </p>
      {!isUserLoggedIn && (
        <Link className={navbarStyles.aboutLegal} to={LOGIN_PAGE_ROUTE}>
          Login
        </Link>
      )}
      {isUserLoggedIn && (
        <Link className={navbarStyles.aboutLegal} to={UPDATE_PAGE_ROUTE}>
          {name.split(' ')[0]}
        </Link>
      )}

      <a
        className={navbarStyles.termsLegal}
        href="https://github.com/voiir/voiir"
        target="_blank" rel="noreferrer"
      >
        Github
      </a>
      <GoogleLogin
        clientId={clientID}
        icon=""
        buttonText=""
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        onSuccess={LoginHandler}
        onFailure={error}
      />
    </div>
  );
}

export default Navbar;
