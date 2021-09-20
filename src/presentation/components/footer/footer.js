import footerStyles from './footer.module.css';

function Footer(){
    return(
        <div className={footerStyles.footer}>
        <p className={footerStyles.copyright}>
          © 2021 Voiir. All rights reserved.
        </p>
        <p className={footerStyles.aboutLegal} href="#">About</p>
        <p className={footerStyles.termsLegal} href="#">Terms</p>
      </div>
    );
}

export default Footer;