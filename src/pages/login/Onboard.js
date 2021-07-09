import './Onboard.css'
import art from '../../assets/art.png';

function Onboard() {
    return (
        <div className="login">
            <img src={art} alt="" className="art" />
            <div className="popup">
                <div className="title">we're almost there</div>
                <p className="sub-title">We need just a few more things to improve our <span style={{ color: '#9A3FCB' }}>search result.</span></p>
                <form action='' className="details">
                    <div className="dual">
                        <input type="text" placeholder="pick a username" className="username" />
                    </div>
                    <div className="dual">
                        <input type="text" placeholder="city" className="city" />
                        <input type="text" placeholder="state" className="state" />
                    </div>
                    <div className="dual"><input type="text" placeholder="profession" className="profession" /></div>
                    <div className="dual"><input type="text" placeholder="bio" className="bio" /></div>

                </form>
                <div className="login-button">continue</div>
                <div className="tc">By signing in you agree to our <span style={{ color: '#9A3FCB' }}>terms and conditions.</span></div>
            </div>
        </div>
    );
}

export default Onboard;