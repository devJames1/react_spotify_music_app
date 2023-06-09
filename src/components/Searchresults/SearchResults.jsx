import React from 'react';

import '/SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults() {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={props.SearchResults} onAdd={props.onAdd} />
    </div>
  );
}

export default SearchResults;