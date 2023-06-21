import { Buffer } from 'buffer';

let clientId = process.env.REACT_APP_CLIENT_ID;
let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const redirectUri = 'http://localhost:3000';
let accessToken;
let authCode;
let refreshToken;

const authCodeMatch = window.location.href.match(/code=([^&]*)/);
if (!authCodeMatch) {
  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
}

authCode = authCodeMatch[1];
window.history.pushState('Access Token', null, '/');
console.log('authCode:' + authCode);

window.setTimeout(() => (accessToken = ''), 3600 * 1000);

const Spotify = {
  async setAccessRefreshToken() {
    if (accessToken) {
      return accessToken;
    } else if (!accessToken && refreshToken) {
      Spotify.refreshTokens();
    }

    try {
      let url = 'https://accounts.spotify.com/api/token';

      let authOptions = {
        method: 'POST',
        body:
          'grant_type=authorization_code&code=' +
          authCode +
          '&redirect_uri=' +
          redirectUri,
        headers: {
          Authorization:
            'Basic ' +
            new Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      let response = await fetch(url, authOptions);
      let jsonResponse = await response.json();
      console.log({ jsonResponse });
      console.log('authCode: ' + authCode);

      refreshToken = jsonResponse.refresh_token;
      console.log('refreshToken: ' + refreshToken);
      return (accessToken = jsonResponse.access_token);
    } catch (err) {
      console.error(`Authorization Error: ${err}`);
    }
  },

  async refreshTokens() {
    try {
      let url = 'https://accounts.spotify.com/api/token';
      let authOptions = {
        method: 'POST',
        body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
        headers: {
          Authorization:
            'Basic ' +
            new Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      let response = await fetch(url, authOptions);
      let jsonResponse = await response.json();

      accessToken = jsonResponse.access_token;
    } catch (err) {
      console.error(`Authorization Error: ${err}`);
    }
  },

  async search(term) {
    try {
      await Spotify.setAccessRefreshToken();
      // console.log(accessToken);
      let response = await fetch(
        `https://api.spotify.com/v1/search?q=${term}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      let jsonResponse = await response.json();

      // console.log(jsonResponse);
      if (!jsonResponse.tracks) {
        return [];
      } else {
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      }
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
    }
  },

  async savePlaylist(name, trackUris) {
    try {
      if (!name || !trackUris.length) {
        return;
      }
      await Spotify.setAccessRefreshToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      console.log(headers);
      let userId;

      const response = await fetch('https://api.spotify.com/v1/me', {
        headers,
      });
      const jsonResponse = await response.json();
      userId = jsonResponse.id;
      console.log({ user_id: userId });
      const response_1 = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name }),
        }
      );
      const jsonResponse_1 = await response_1.json();
      console.log(jsonResponse_1);
      const playlistId = jsonResponse_1.id;
      return await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris }),
        }
      );
    } catch (err) {
      console.error(`Error Adding song to playlist: ${err}`);
    }
  },
};
// Spotify.getAccessToken();

export default Spotify;
