import React from 'react';
import Controls from './controls.jsx';
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import styled from 'styled-components';
import './controls.css';

// const mp3 = require('../files/CUE2_StereoMix_TC00014402.mp3');
const test = 'https://s3.us-east-2.amazonaws.com/rpt10-mondaymonday-songs/Dream.mp3'
const io = require('socket.io-client');



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

const socket = io.connect('http://localhost:3002');
const registerHandler = (onMsgReceived) => {
  socket.on('message', onMsgReceived);
  socket.emit('register', onMsgReceived);
}

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songURL: null,
      songTitle: null,
      songArtist: null
    }
    this.updateClient = this.updateClient.bind(this);
    this.onMsgReceived = this.onMsgReceived.bind(this);
  }
  componentDidMount() {
    registerHandler(this.onMsgReceived);
  }

  onMsgReceived(data) {
    this.updateClient(data);
  }
  updateClient(msg) {
    console.log('this is the msg inside handleData', msg)
    this.setState({
      songURL: msg.file_url,
      songTitle: msg.name,
      songArtist: msg.artist
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
          src={this.state.songURL}
          autoPlay
        />
      </Wrapper>

    )
  }
}
