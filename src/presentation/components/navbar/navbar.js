import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../../routes/route-paths';
import navbarStyles from './navbar.module.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
function Navbar(){
  const isUserLoggedIn=useSelector(state => state.loginReducer.isUserLoggedIn);
  const name=useSelector(state => state.userReducer.name);

  
  return(
    <div className={navbarStyles.navbar}>
    <p className={navbarStyles.logo}>
      <Link to={HOME_PAGE_ROUTE}>
        vo<span style={{color: '#9A3FCB'}}>ii</span>r
      </Link>
    </p>
    {!isUserLoggedIn && <Link className={navbarStyles.aboutLegal} to={LOGIN_PAGE_ROUTE}>Login</Link>}    
    {isUserLoggedIn && <Link className={navbarStyles.aboutLegal}>{name.split(' ')[0]}</Link>}

    <a className={navbarStyles.termsLegal} href="#">Switch</a>
  </div>
);
  
}

export default Navbar;