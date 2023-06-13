import React from 'react';

import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist(props) {
  return (
    <div className="Tracklist">
      {/* I used props.tracks?.map to check if props.tracks exists and maps only then over the array */}
      {props.tracks?.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            isRemoval={props.isRemoval}
            onRemove={props.onRemove}
          />
        );
      })}
    </div>
  );
}

export default Tracklist;
