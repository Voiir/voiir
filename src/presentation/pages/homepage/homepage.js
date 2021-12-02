import homepageStyles from './homepage.module.css';
import searchIcon from '../../../assets/search.svg';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { RESULT_PAGE_ROUTE } from '../../routes/route-paths';

function Homepage(props) {
  const navigator = useHistory();

  async function getResults(e) {
    e.preventDefault();
    var search = document.getElementById('searchBarID').value;
    console.log(search);
    navigator.push({
      pathname: RESULT_PAGE_ROUTE,
      state: {
        queryString: search,
      },
    });
  }

  return (
    <div className={homepageStyles.homepage}>
      <div className={homepageStyles.searchBar}>
        <div className={homepageStyles.tagLine}>
          <p style={{ fontSize: '32px' }}>
            Yellow <span style={{ color: '#9B72AA' }}>pages</span> of the 21st
            century.
          </p>
        </div>
        <form action>
          <input
            type="text"
            className={homepageStyles.searchHint}
            id="searchBarID"
            placeholder="whom are you looking for?"
          />
          <button
            type="submit"
            className={homepageStyles.button}
            onClick={(e) => {
              getResults(e);
            }}
          >
            <img src={searchIcon}></img>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Homepage;
