import React from 'react';

import './Track.css';

function Track(props) {
  const addTrack = () => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(props.track);
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
          width={250}
          height={80}
          // frameBorder="0"
          allowTransparency="true"
          allow="encripted media"
          title="preview"
        />{' '}
      </div>
      {renderAction()}
    </div>
  );
}

export default Track;
