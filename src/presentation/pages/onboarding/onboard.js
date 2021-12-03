import onboardStyles from './onboard.module.css';
import art from '../../../assets/art.png';
import { useRef } from 'react';
import { fetch } from 'whatwg-fetch';
import { HOME_PAGE_ROUTE } from '../../routes/route-paths';
import { Link, useHistory } from 'react-router-dom';
import { postRequest } from '../../../data/data-source/remote/apiCall';
import { useSelector } from 'react-redux';

function Onboard(props) {
  const history = useHistory();
  const usernameInput = useRef();
  const cityInput = useRef();
  const stateInput = useRef();
  const professionInput = useRef();
  const bioInput = useRef();
  let dict = {};

  const name = useSelector((state) => state.userReducer.name);
  const email = useSelector((state) => state.userReducer.email);
  const dp = useSelector((state) => state.userReducer.imageUrl);

  function toggle() {
    props.setLoginDialog({ isLoginDialog: !props.state.isLoginDialog });
  }

  async function onSubmit(event) {
    event.preventDefault();

    dict['emailId'] = email;
    dict['name'] = name;
    dict['dpUrl'] = dp;
    dict['username'] = usernameInput.current.value;
    dict['city'] = cityInput.current.value;
    dict['state'] = stateInput.current.value;
    dict['profession'] = professionInput.current.value;

    console.log(dict);
    var res = await postRequest('setUser', dict, '');

    console.log(res);
    history.push(HOME_PAGE_ROUTE);
  }
  return (
    <div>
      <div className={onboardStyles.backdrop}></div>
      <div className={onboardStyles.onboard}>
        <img src={art} alt="" className={onboardStyles.art} />
        <div className={onboardStyles.popup}>
          <Link className={onboardStyles.cross} to={HOME_PAGE_ROUTE}>
            x
          </Link>
          <div className={onboardStyles.title}>we're almost there</div>
          <p className={onboardStyles.subTitle}>
            We need just a few more things to improve our{' '}
            <span style={{ color: '#9A3FCB' }}>search result.</span>
          </p>

          <form action="" onSubmit={onSubmit} className={onboardStyles.details}>
            <div className={onboardStyles.dual}>
              <input
                type="text"
                ref={usernameInput}
                placeholder="pick a username"
                className={onboardStyles.username}
              />
            </div>
            <div className={onboardStyles.dual}>
              <input
                type="text"
                ref={cityInput}
                placeholder="city"
                className={onboardStyles.city}
              />
              <input
                type="text"
                ref={stateInput}
                placeholder="state"
                className={onboardStyles.state}
              />
            </div>
            <div className={onboardStyles.dual}>
              <div className="dual">
                <input
                  type="text"
                  ref={professionInput}
                  placeholder="profession"
                  className={onboardStyles.profession}
                />
              </div>
            </div>
            <div className={onboardStyles.dual}>
              <div className="dual">
                <input
                  type="text"
                  ref={bioInput}
                  placeholder="bio"
                  className={onboardStyles.bio}
                />
              </div>
            </div>
          </form>

          <div onClick={onSubmit} className={onboardStyles.loginButton}>
            continue
          </div>
          <div className={onboardStyles.tc}>
            By signing in you agree to our{' '}
            <span style={{ color: '#9A3FCB' }}>terms and conditions.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboard;

