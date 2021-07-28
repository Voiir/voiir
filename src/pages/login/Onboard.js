import onboardStyles from './Onboard.module.css'
import art from '../../assets/art.png';
import {useRef} from 'react';
import {fetch} from 'whatwg-fetch';


function Onboard(props) {
    const usernameInput=useRef();
    const cityInput=useRef();
    const stateInput=useRef();
    const professionInput=useRef();
    const bioInput=useRef();
    let dict={};

    function toggle(){
        props.setLoginDialog({isLoginDialog: !props.state.isLoginDialog});
      }

      function onSubmit(event){
          event.preventDefault();

          dict['emailId']=props.user.email;
          dict['name']=props.user.displayName;
          dict['dpUrl']=props.user.photoURL;
          dict['username']=usernameInput.current.value;
          dict['city']=cityInput.current.value;
          dict['state']=stateInput.current.value;
          dict['profession']=professionInput.current.value;

          console.log(dict);

          fetch("http://voiir.herokuapp.com/api/setUser/",{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify(dict)
          }).then(()=>{
            console.log('data');
          });
      }
    return (
        <div>
            <div className={onboardStyles.backdrop}></div>
        <div className={onboardStyles.onboard}>
            <img src={art} alt="" className={onboardStyles.art} />
            <div className={onboardStyles.popup}>
            <a className={onboardStyles.cross} onClick={toggle} href="#">x</a>
                <div className={onboardStyles.title}>we're almost there</div>
                <p className={onboardStyles.subTitle}>We need just a few more things to improve our <span style={{ color: '#9A3FCB' }}>search result.</span></p>
                
                <form action='' onSubmit={onSubmit} className={onboardStyles.details}>
                    <div className={onboardStyles.dual}>
                        <input type="text" ref={usernameInput} placeholder="pick a username" className={onboardStyles.username}/>
                    </div>
                    <div className={onboardStyles.dual}>
                        <input type="text" ref={cityInput} placeholder="city" className={onboardStyles.city} />
                        <input type="text" ref={stateInput} placeholder="state" className={onboardStyles.state} />
                    </div>
                    <div className={onboardStyles.dual}>
                    <div className="dual"><input type="text" ref={professionInput} placeholder="profession" className={onboardStyles.profession} /></div>

                    </div>
                    <div className={onboardStyles.dual}>
                    <div className="dual"><input type="text" ref={bioInput} placeholder="bio" className={onboardStyles.bio} /></div>
                    </div>
                </form>
                
                <div onClick={onSubmit} className={onboardStyles.loginButton} >continue</div>
                <div className={onboardStyles.tc}>By signing in you agree to our <span style={{ color: '#9A3FCB' }}>terms and conditions.</span></div>
            </div>
        </div>
        </div>
    );
}

export default Onboard;