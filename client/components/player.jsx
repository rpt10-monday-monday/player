import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
const mp3 = require('../files/CUE2_StereoMix_TC00014402.mp3')
export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songID: '',
      songURL: ''
    }
  }
  getCurrentSong(e) {
    console.log(e)
  }

  render() {
    return (
      <div>
      {/* put buttons here for testing each song */}
        <ReactAudioPlayer
          src={mp3}
          controls
          onPlay={e => this.getCurrentSong(e)}
          onPause={e => this.getCurrentSong(e)}
        />
      </div>
    )
  }
}

