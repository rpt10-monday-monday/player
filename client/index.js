import Player from './components/player.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay)

ReactDOM.render(<Player />, document.getElementById('Player'));