import { useLocation } from 'react-router-dom';
import profileStyles from './profile.module.css';

function Profile() {
  const location = useLocation();
  console.log(location.profileDetails);
  const profileDetails = location.profileDetails;
  const links = profileDetails.accounts;

  return (
    <div className={profileStyles.parentDiv}>
      <img src={profileDetails.dpUrl} alt="" className={profileStyles.dp} />
      <div className={profileStyles.nAdd}>
        <p className={profileStyles.name}>{profileDetails.name}</p>
        <p className={profileStyles.address}>
          {`${profileDetails.city}, ${profileDetails.state}`}
        </p>
      </div>
      <div className={profileStyles.platform}>
        {Object.keys(links).map((platform) => (
          <p>{platform}</p>
        ))}
      </div>
      <div className={profileStyles.platformResult}>
        {Object.keys(links).map((platform) => (
          <p className={profileStyles.linkText}>
            <a
              href={` ${links[platform]}`}
              target="_blank" rel="noreferrer"
            >{` ${links[platform]}`}</a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Profile;
