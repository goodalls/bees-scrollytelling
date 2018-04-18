import React from 'react';
import Help from './Help';
import { shallow } from 'enzyme';

describe('Help', () => {
  it('matches the Snapshot', () => {
    const wrapper = shallow(<Help />);
    expect(wrapper).toMatchSnapshot();
  });
});