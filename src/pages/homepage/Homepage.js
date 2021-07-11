import homepageStyles from './Homepage.module.css';
import searchIcon from '../../assets/search.svg';

function Homepage(){
    return (
        <div className={homepageStyles.homepage}>
          <div className={homepageStyles.searchBar}>
        <div className={homepageStyles.tagLine}>
          <p style={{fontSize: '32px'}}>Yellow <span style={{color: '#9B72AA'}}>pages</span> of the 21st century.</p>
        </div>
        <form action>
          <input type="text" className={homepageStyles.searchHint} placeholder="whom are you looking for?" />
          <button type="submit" className={homepageStyles.button}>
            <img src={searchIcon}></img>
          </button>
        </form>
      </div>
        </div>
    );
}

export default Homepage;