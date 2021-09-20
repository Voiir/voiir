import navbarStyles from './navbar.module.css';
function Navbar(props){
  function toggle(){
    props.setLoginDialog({isLoginDialog: !props.state.isLoginDialog});

    // console.log('fncalled');
  }
  return(
    <div className={navbarStyles.navbar}>
    <p className={navbarStyles.logo}>
      <a href="" onclick="location.reload()">
        vo<span style={{color: '#9A3FCB'}}>ii</span>r
      </a>
    </p>
    {props.user && <a className={navbarStyles.aboutLegal} href="#" >{props.user.displayName.split(' ')[0]}</a>}
    {!props.user && <a className={navbarStyles.aboutLegal} href="#" onClick={toggle}>Login</a>}
    {props.user && <a className={navbarStyles.termsLegal} onClick={props.signOut} href="#">Logout</a>}
    {!props.user && <a className={navbarStyles.termsLegal} onClick={props.signOut} href="#">Signup</a>}
  </div>
);
  
}

export default Navbar;