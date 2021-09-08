import aboutStyles from './About.module.css';
import logo from '../../assets/logo.png';
function About() {
    return (
      <div>
        <div className={aboutStyles.heading}>
          <p style={{fontSize: '40px'}}>
            About <span style={{color: '#9B72AA', fontFamily: '"Chivo"', fontWeight: 'normal'}}>us</span>
          </p>
        </div>
        <div className={aboutStyles.flexParent}>
          <div className={aboutStyles.flexChild} style={{position:"relative",top: '0px'}}>
          <img className={aboutStyles.logo} src={logo} alt="Voiir logo"/>
          </div>
          <div className={aboutStyles.flexChild} style={{position: 'fixed', width: '670px', verticalAlign: 'middle', top: '170px'}}>
            <div className={aboutStyles.content}>
              <p>
                Voiir is a website that will house links to all social media platforms of individuals.
                With an option to search for people using their names and getting back a profile with 
                links to all their social media accounts. Putting it simply.
              </p>
            </div>
            <div className={aboutStyles.quote} style={{position: 'relative', top: '60px', textAlign: 'center'}}>
              <p>
                "A <span style={{color: '#9B72AA'}}>search engine</span> of humans"
              </p>
            </div>
          </div>
        </div>
        <div className={aboutStyles.names}>
          <p>Naman Anand | Himanshu Mishra | Koustav Ghosh | Ashutosh Chauhan | Kirti Kunj Bajpai</p>
        </div>
      </div>
    );
  }

  export default About;