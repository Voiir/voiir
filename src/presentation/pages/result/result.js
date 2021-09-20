import Card from './card';
import ResultStyles from './result.module.css';
import searchIcon from '../../../assets/search.svg';

function Result(props){

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
      <div>
        <div className={ResultStyles.searchBar}>
        <form action>
          <input type="text" className={ResultStyles.searchHint} id='searchBarID' placeholder="whom are you looking for?" />
          <button type="submit" className={ResultStyles.button}  onClick={(e) => {getResults(e)}}>
            <img src={searchIcon}></img>
          </button>
        </form>
      </div>
        <div className={ResultStyles.masterPad}>
          {props.state.resultData.result.map((iter)=>(
            <Card name={iter.name} city={iter.city} state={iter.state} dpUrl={iter.dpUrl}></Card>
        ))}
      </div>
      </div>
    );
}

export default Result;