import React from 'react';

import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props) {
  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input onChange={handleNameChange} defaultValue={'New Playlist'} />
      <Tracklist
        track={props.PlaylistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className="Playlist-save" onClick={props.onSave}>
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;
