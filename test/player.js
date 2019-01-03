import { shallow } from 'enzyme'
import Player from '../client/components/player.jsx';

describe ('Player component testing', () => {
  let wrapper;

  beforeEach(() => {wrapper = shallow(<Player />); });

  it('contains one audio div', () => {
    expect(wrapper)
  })
})
