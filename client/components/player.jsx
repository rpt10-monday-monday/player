import React from 'react';
import Controls from './controls.jsx';
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import styled from 'styled-components';
import './controls.css';
// const mp3 = require('../files/CUE2_StereoMix_TC00014402.mp3');
const test = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'


const StyledAudioPlayer = styled(AudioPlayer)`
  color: #b3b3b3;
  padding: 2em;
  background-color: #282828 !important;
  font-weight: bold;
  font-family: 'Noto Sans', sans-serif;
  display: inline-block;
`
const Wrapper = styled.section`
  width: 100%;

  background-color: #282828;
  color: #fff;
`
const Track = styled.div`
  font-family: 'Noto Sans', sans-serif;
  padding: 2em;
  color: #fff;
  position: fixed;
  display: inline-block;
`
const Artist = styled.div`
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
      this.setState({
        songURL: res.data[0].songURL,
        songTitle: res.data[0].title,
        songArtist: res.data[0].artist
      })

    })
      .catch((err) => {
        console.log('There was an error getting', err)
      })
  }

  render() {
    return (
      <Wrapper>
        <Track>
          {this.state.songTitle}
          <br />
          <Artist>
          {this.state.songArtist}
          </Artist>
        </Track>

        <StyledAudioPlayer
          src={test}
          autoPlay
        />
      </Wrapper>

    )
  }
}

