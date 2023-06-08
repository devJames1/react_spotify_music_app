import React, { useState } from 'react';
import './App.css';

// Components of the app distributed and imported
import Playlist from '../PlayList/playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/searchResults';
import Spotify from '../util/Spotify';

function App() {
  // let [music, setMusic] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlName] = useState('New Playlist');
  // const [updatedPlaylistName, setUpPlName] = useState('');
  const [playlistTracks, setPlTracks] = useState([]);

  const search = async (term) => {
    try {
      searchResults = await Spotify.search(term);
      setSearchResults(searchResults);
    } catch (err) {
      console.log(`Error retrieving data: ${err}`);
    }
  };

  const addTrack = (track) => {
    let tracks = playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlTracks(tracks);
  };

  const removeTrack = (track) => {
    let tracks = playlistTracks;
    // why is this line here
    let trackSearch = searchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    // why is this line here
    trackSearch.unshift(track);
    setPlTracks(tracks);
  };

  const removeTrackSearch = (track) => {
    let tracks = searchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    setSearchResults(tracks);
  };

  const doThese = (track) => {
    addTrack(track);
    removeTrackSearch(track);
  };

  const updatePlaylistName = (name) => {
    setPlName(name);
  };

  const savePlaylist = async () => {
    const trackUrls = playlistTracks.map((track) => track.url);
    try {
      //Spotify method savePlaylist
      await Spotify.savePlaylist(playlistName, trackUrls);
      setPlName('New Playlist');
      setPlTracks([]);
    } catch (err) {
      console.log(`Error saving playlist: ${err}`);
    }
  };

  return (
    <div>
      <h1>
        <a href="http://localhost:3000">Musicplus</a>
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App.playlist">
          <SearchResults searchResults={searchResults} onAdd={doThese} />
          <Playlist
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
