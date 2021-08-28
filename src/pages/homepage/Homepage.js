import homepageStyles from './Homepage.module.css';
import searchIcon from '../../assets/search.svg';

function Homepage(){
  
function getResults(){
  var search = document.getElementById("searchBarID").value;
  console.log(search);
  fetch("https://voiir.herokuapp.com/api/userSearch/",{
        method:'post',
        headers:{'Content-Type': 'application/json',},
        body:JSON.stringify({'name':search})
    }).then(function(body){
      console.log('in here');
      return body.text(); // <--- THIS PART WAS MISSING
    }).then(function(data) {
      console.log(data);
      
    });

}

    return (
        <div className={homepageStyles.homepage}>
          <div className={homepageStyles.searchBar}>
        <div className={homepageStyles.tagLine}>
          <p style={{fontSize: '32px'}}>Yellow <span style={{color: '#9B72AA'}}>pages</span> of the 21st century.</p>
        </div>
        <form action>
          <input type="text" className={homepageStyles.searchHint} id='searchBarID' placeholder="whom are you looking for?" />
          <button type="submit" className={homepageStyles.button}  onClick={getResults}>
            <img src={searchIcon}></img>
          </button>
        </form>
      </div>
        </div>
    );
}

export default Homepage;