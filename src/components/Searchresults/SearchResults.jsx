import React from 'react';

import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';
//Main
function SearchResults(props) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist
        tracks={props.searchResults}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
      />
    </div>
  );
}

export default SearchResults;
