import React from 'react';
import Controls from './controls.jsx';
// import AudioPlayer from 'react-player';
import axios from 'axios';
import styled from 'styled-components';
import './player.css';
import AudioPlayer from 'react-audio-player';
// const mp3 = require('../files/CUE2_StereoMix_TC00014402.mp3');
const test = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'


const StyledAudioPlayer = styled(AudioPlayer)`
  color: palevioletred;
  font-weight: bold;
  width: 100%;
  height: 50%;
  float: bottom;
  padding-left: 200px;
`
const Wrapper = styled.section`
  width: 100%;
  height: 50px;
  padding: 4em;
  background: #282828;
  color: #fff;
  position: fixed;
  top: 50px;
`
const Track = styled.h3`
  float: top;
  padding: 4em;
  background: #282828;
  font-family: 'Noto Sans', sans-serif;
  color: #fff;
  position:fixed;
  width: 100%;
  height: 40px;
`
const Artist = styled.h4`
  float: left;
  padding: 4em;
  background: #282828;
  font-family: 'Noto Sans', sans-serif;
  color: #fff;
  display: inline-block;
`


export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songURL: '',
      songTitle: '',
      songArtist: ''
    }
  }
  componentDidMount() {
    this.getCurrentSong();
  }

  getCurrentSong() {
    axios.get('http://localhost:3002/song')
    .then((res) => {
      let songURL = res.data[0].songURL;
      let songTitle = res.data[0].title;
      let songArtist = res.data[0].artist;
      this.setState({
        songURL: songURL,
        songTitle: songTitle,
        songArtist: songArtist
      })

    })
      .catch((err) => {
        console.log('There was an error getting', err)
      })
  }

  render() {
    return (
      <Track>
        {this.state.songTitle}
        <br />
        {this.state.songArtist}
        <Controls className="controls" song={test}/>

      </Track>









    )
  }
}

