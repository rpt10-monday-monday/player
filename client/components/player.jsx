import React from 'react';
import Controls from './controls.jsx';
import AudioPlayer from 'react-h5-audio-player';

import styled from 'styled-components';
import './controls.css';


const io = require('socket.io-client');

let port = process.env.PORT || 3002;

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
  margin: 10px;
`
const Track = styled.p`
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

const socket = io(`http://audioplayer-dev.us-east-2.elasticbeanstalk.com/`, {transports: ['websocket']});
// const socket = io();



const registerHandler = (onMsgReceived) => {
  socket.on('message', onMsgReceived);
  socket.emit('register', onMsgReceived);
}

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songURL: '',
      songTitle: '',
      songArtist: ''
    }
    this.updateClient = this.updateClient.bind(this);
    this.onMsgReceived = this.onMsgReceived.bind(this);
  }
  componentDidMount() {
    registerHandler(this.onMsgReceived);
  }

  onMsgReceived(data) {
    if (data) {
      this.updateClient(data);
    }

  }
  updateClient(msg) {

      this.setState({
        songURL: msg.file_url,
        songTitle: msg.name,
        songArtist: msg.artist
      })

    console.log('this is the msg inside handleData', this.state)
  }

  render() {

    return (
      <Wrapper>
      <div className="row">
      <div className="col-sm-3">
        <h2>{this.state.songTitle}</h2>
        <h3>{this.state.songArtist}</h3>
      </div>
      <div className="col-lg-9">
        <StyledAudioPlayer
          src={this.state.songURL}
          autoPlay
        />
      </div>
      </div>
      </Wrapper>

    )
  }
}
