import onboardStyles from './Onboard.module.css'
import art from '../../assets/art.png';

function Onboard(props) {
    function toggle(){
        props.setLoginDialog({isLoginDialog: !props.state.isLoginDialog});
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
                <form action='' className={onboardStyles.details}>
                    <div className={onboardStyles.dual}>
                        <input type="text" placeholder="pick a username" className={onboardStyles.username}/>
                    </div>
                    <div className={onboardStyles.dual}>
                        <input type="text" placeholder="city" className={onboardStyles.city} />
                        <input type="text" placeholder="state" className={onboardStyles.state} />
                    </div>
                    <div className={onboardStyles.dual}>
                    <div className="dual"><input type="text" placeholder="profession" className={onboardStyles.profession} /></div>

                    </div>
                    <div className={onboardStyles.dual}>
                    <div className="dual"><input type="text" placeholder="bio" className={onboardStyles.bio} /></div>
                    </div>
                </form>
                <div className={onboardStyles.loginButton}>continue</div>
                <div className={onboardStyles.tc}>By signing in you agree to our <span style={{ color: '#9A3FCB' }}>terms and conditions.</span></div>
            </div>
        </div>
        </div>
    );
}

export default Onboard;