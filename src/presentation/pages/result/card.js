import { useHistory } from 'react-router-dom';
import { PROFILE_PAGE_ROUTE } from '../../routes/route-paths';
import ResultStyles from './result.module.css';
import arrow from '../../../assets/arrow.png';
import gmailImage from '../../../assets/gmail.svg';
import facebookImage from '../../../assets/facebook.svg';
import instagramImage from '../../../assets/instagram.svg';
import linkedinImage from '../../../assets/linkedin.svg';

function Card(props) {
  const navigator = useHistory();
  var iconArray = [];
  var connectedPlatforms = props.allDetails.connectedPlatform;
  console.log(props.allDetails.connectedPlatform, connectedPlatforms);
  for (var i = 0; i < connectedPlatforms.length; i++) {
    if (connectedPlatforms[i] == 'gmail')
      iconArray.push(
        <img className={ResultStyles.icons} src={gmailImage} alt="" />
      );
    else if (connectedPlatforms[i] == 'facebook')
      iconArray.push(
        <img className={ResultStyles.icons} src={facebookImage} alt="" />
      );
    else if (connectedPlatforms[i] == 'instagram')
      iconArray.push(
        <img className={ResultStyles.icons} src={instagramImage} alt="" />
      );
    else if (connectedPlatforms[i] == 'linkedin')
      iconArray.push(
        <img className={ResultStyles.icons} src={linkedinImage} alt="" />
      );
  }

  function handleCardClick() {
    navigator.push({
      pathname: PROFILE_PAGE_ROUTE,
      profileDetails: props.allDetails,
    });
  }
  return (
    <div className={ResultStyles.parent} onClick={handleCardClick}>
      <div className={ResultStyles.info}>
        <img
          src={props.dpUrl}
          alt=""
          width={100}
          height={100}
          className={ResultStyles.image}
        />
        <div className={ResultStyles.name_place}>
          <p className={ResultStyles.name}>{props.name}</p>
          <p className={ResultStyles.location}>
            {props.city}, {props.state}
          </p>
          <div className={ResultStyles.iconFlex}>{iconArray}</div>
        </div>
      </div>
      <button className={ResultStyles.butn}>
        <img src={arrow} height="15px" alt="" />
      </button>
    </div>
  );
}

export default Card;
