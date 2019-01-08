import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
// import '../../client/components/controls.css';

import Player from '../../client/components/player.jsx';

// describe('<Player />', () => {
//   describe('render()', () => {
//   test('renders the component', () => {
//     const wrapper = shallow(<Player />);
//     expect(wrapper).toMatchSnapshot();
//     })
//   })
// });
// describe('Player', () => {
//   test('it renders', () => {
//     const wrapper = shallow(<Player />)
//     expect(wrapper).toMatchSnapshot();
//     // expect(true).toBeTruthy();
//   })
// })

test('Player renders', () => {
  const wrapper = shallow(<Player />)
  expect(wrapper).toMatchSnapshot();
})