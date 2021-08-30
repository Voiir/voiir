import homepageStyles from './Homepage.module.css';
import Soon from '../soon/Soon';
import searchIcon from '../../assets/search.svg';
import {useState} from 'react';

function Homepage(props){
  
  
function getResults(e){
  e.preventDefault();
  var search = document.getElementById("searchBarID").value;
  console.log(search);
  fetch("https://api-voiir.herokuapp.com/api/userSearch",{
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({'name':search})
    }).then(function(body){
      console.log('in here');
      return body.json(); // <--- THIS PART WAS MISSING
    }).then(function(data) {
      console.log(data);
      props.setResultData({resultData: {status:0,result:data}});
      // console.log(props.state.resultData);
    });

}

    return (
        <div className={homepageStyles.homepage}>
          <div className={homepageStyles.searchBar}>
        {/* <div className={homepageStyles.tagLine}>
          <p style={{fontSize: '32px'}}>Coming <span style={{color: '#9A3FCB'}}>soon.</span> Remember us.</p>
        </div> */}
        <Soon></Soon>
      </div>
        </div>
    );
}

export default Homepage;