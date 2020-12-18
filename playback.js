//must include <script src="https://sdk.scdn.co/spotify-player.js"></script> in HTML file for this to work

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBHPsZKdrK9mIsfk8KPbOx4JDRSmLAVHKNjk3jfe1bnS8B24e4y-wO34QjZZoNtwJ42d-wqdSBRvK8FoG1kpDs1UWd24bL1MV3eGdQozlc19kJCVhX_HP4UEQ2fJCbMSvjMd6scA_BzxtcKsxaUHAbnPSHK6fkrlw';
  const player = new Spotify.Player({
    name: 'Browser',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
}