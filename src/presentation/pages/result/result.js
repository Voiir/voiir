import Card from './card';
import ResultStyles from './result.module.css';
import searchIcon from '../../../assets/search.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PROFILE_PAGE_ROUTE } from '../../routes/route-paths';

function Result(props) {
  const location = useLocation();

  const queryString = location.state.queryString;
  const [resultData, setResultData] = useState({
    status: 0,
    result: [],
  });

  useEffect(() => {
    document.getElementById('searchBarID').value = queryString;
    getResults();
  }, []);

  async function getResults(e) {
    if (e != null) e.preventDefault();
    var search = document.getElementById('searchBarID').value;
    console.log(search);

    var res = await axios.post(
      'https://api-voiir.herokuapp.com/api/userSearch',
      {
        name: search,
      }
    );
    console.log(res.response);
    setResultData({ status: 0, result: res.data.response });
  }

  return (
    <div>
      <div className={ResultStyles.searchBar}>
        <form action>
          <input
            type="text"
            className={ResultStyles.searchHint}
            id="searchBarID"
            placeholder="whom are you looking for?"
          />
          <button
            type="submit"
            className={ResultStyles.button}
            onClick={(e) => {
              getResults(e);
            }}
          >
            <img src={searchIcon}></img>
          </button>
        </form>
      </div>
      <div className={ResultStyles.masterPad}>
        {resultData.result.map((iter) => (
          <Card
            allDetails={iter}
            name={iter.name}
            city={iter.city}
            state={iter.state}
            dpUrl={iter.dpUrl}
          ></Card>
        ))}
      </div>
    </div>
  );
}

export default Result;

