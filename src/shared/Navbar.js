import navbarStyles from './Navbar.module.css';
function Navbar(){
  return(
    <div className={navbarStyles.navbar}>
    <p className={navbarStyles.logo}>
      vo<span style={{color: '#9A3FCB'}}>ii</span>r
    </p>
    <p className={navbarStyles.aboutLegal} href="#">Login</p>
    <p className={navbarStyles.termsLegal} href="#">Saved</p>
  </div>
);
  
}

export default Navbar;