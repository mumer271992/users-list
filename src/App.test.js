import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('app renders without crash', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.length).toEqual(1);
});
