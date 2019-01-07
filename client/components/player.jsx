import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
const mp3 = require('../files/CUE2_StereoMix_TC00014402.mp3');

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songURL: ''
    }
  }
  componentDidMount() {
    this.getCurrentSong();
  }

  getCurrentSong() {
    axios.get('http://localhost:3002/song')
      .then((res) => {
        let songURL = res.data[0].songURL;
          this.setState({
            songURL: songURL
          })
      })
      .catch((err) => {
        console.log('There was an error getting', err)
      })
  }

  render() {
    return (
      <div>
      {/* put buttons here for testing each song */}
        <ReactAudioPlayer
          src={mp3}
          autoPlay
          controls
          onPlay={e => this.getCurrentSong(e)}
          onPause={e => this.getCurrentSong(e)}
        />
      </div>
    )
  }
}

