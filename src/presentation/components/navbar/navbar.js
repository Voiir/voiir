import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../../routes/route-paths';
import navbarStyles from './navbar.module.css';
import {Link} from 'react-router-dom';
function Navbar(){
  
  return(
    <div className={navbarStyles.navbar}>
    <p className={navbarStyles.logo}>
      <Link to={HOME_PAGE_ROUTE}>
        vo<span style={{color: '#9A3FCB'}}>ii</span>r
      </Link>
    </p>
    <Link className={navbarStyles.aboutLegal} to={LOGIN_PAGE_ROUTE}>Login</Link>
    <a className={navbarStyles.termsLegal} href="#">Signup</a>
  </div>
);
  
}

export default Navbar;