import React, { useState } from 'react';

import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const search = () => {
    props.onSearch(term);
  };

  const handleEnter = (event) => {
    //event.keyCode is deprecated, so I used event.code
    if (event.code === 'Enter') {
      search();
    }
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter song, album or artist"
        onChange={handleTermChange}
        onKeyUp={handleEnter}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
