import React, { useState } from 'react';

import './Track.css';

function SearchBar(props) {
  const addTrack = (event) => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(state.track);
  };

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          {' '}
          -{' '}
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={addTrack}>
        {' '}
        +{' '}
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
        {/* connecting to sportify stream using frame to show small embeded window */}
        <iframe
          src={'https://open.spotify.com/embed/track/' + props.track.id}
          width={300}
          height={80}
          frameborder="0"
          allowTransparency="true"
          allow="encripted media"
          title="preview"
        />{' '}
      </div>
      {renderAction}
    </div>
  );
}

export default SearchBar;
