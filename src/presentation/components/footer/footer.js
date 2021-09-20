import { ABOUT_PAGE_ROUTE, TERMS_PAGE_ROUTE } from '../../routes/route-paths';
import { Link } from 'react-router-dom';
import footerStyles from './footer.module.css';

function Footer(){
    return(
        <div className={footerStyles.footer}>
        <p className={footerStyles.copyright}>
          © 2021 Voiir. All rights reserved.
        </p>
        <Link className={footerStyles.aboutLegal} to={ABOUT_PAGE_ROUTE}>About</Link>
        <Link className={footerStyles.termsLegal} to={TERMS_PAGE_ROUTE}>Terms</Link>
      </div>
    );
}

export default Footer;