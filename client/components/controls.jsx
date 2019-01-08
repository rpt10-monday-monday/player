import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
// console.log(FontAwesomeIcon)

import styled from 'styled-components';

const PlayInfo = styled.div`
  display: inline-block;
  padding: 10px;
  margin-left: 20px;
  align: center;
`

export default class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: false,

    }
  }

  componentWillReceiveProps() {
    this.setState({
      play: true
    })

  }

  componentDidMount() {
    // console.log(this.audio.duration)
  }

  playSong() {
    if (this.state.play) {
      this.setState({
        play: false
      });
      this.audio.pause();
    }
    else {
      this.setState({
        play: true
      });
      this.audio.play();

    }
  }

  render() {
    return(
      <PlayInfo>
        <audio src={this.props.song}
              ref={(audio) => { this.audio = audio}}

              autoPlay={true}
        />
        <div onClick={this.playSong.bind(this)}><FontAwesomeIcon icon={!this.state.play ? faPlayCircle : faPauseCircle}/></div>
      </PlayInfo>


    )
  }
}