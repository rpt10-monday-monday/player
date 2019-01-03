import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Player from '../../client/components/player.jsx';

describe('<Player />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Player />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    })
  })
})