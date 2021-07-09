import './Homepage.css';

function Homepage(){
    return (
        <div className="search-bar">
        <div className="tag-line">
          <p style={{fontSize: '32px'}}>Yellow <span style={{color: '#9B72AA'}}>pages</span> of the 21st century.</p>
        </div>
        <form action>
          <input type="text" className="search-hint" placeholder="whom are you looking for?" />
          <button type="submit" className="button"> <i className="fa fa-search" /> </button>
        </form>
      </div>
    );
}

export default Homepage;