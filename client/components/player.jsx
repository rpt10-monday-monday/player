import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
const mp3 = require('../files/CUE2_StereoMix_TC00014402.mp3');

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songID: '',
      songURL: ''
    }
  }
  componentDidMount() {
    this.postSong();
    this.getCurrentSong();
  }

  postSong() {
    let body = {
      songID: 1
    }

    axios.post('/song', body)
      .then((res) => {
        console.log(`${res} was posted`)
      })
      .catch((err) => {
        console.log(`There was an error posting ${err}`)
      })
  }

  getCurrentSong() {
    axios.get('http://localhost:3002/song')
      .then((res) => {
        console.log(`${res} is the response`)
      })
      .catch((err) => {
        console.log(`There was an error getting ${err}`)
      })

  }

  render() {
    return (
      <div>
      {/* put buttons here for testing each song */}
        <ReactAudioPlayer
          src={mp3}
          autoPlay={true}
          controls
          onPlay={e => this.getCurrentSong(e)}
          onPause={e => this.getCurrentSong(e)}
        />
      </div>
    )
  }
}

