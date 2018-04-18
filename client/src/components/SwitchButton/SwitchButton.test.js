/* eslint-disable */
import React from 'react';
import SwitchButton from './SwitchButton';
import { shallow } from 'enzyme';

describe('SwitchButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SwitchButton toggleQuestionsEnabled={jest.fn()} />);
  })

  it('matches the Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has default state', () => {
    const expected = {
      checked: true
    };

    expect(wrapper.instance().state).toEqual(expected);
  });

  describe('handleChange', () => {
    it('toggles checked value in state', () => {
      wrapper.instance().handleChange();

      expect(wrapper.instance().state.checked).toEqual(false);

      wrapper.instance().handleChange();

      expect(wrapper.instance().state.checked).toEqual(true);
    });

    it('calls toggleQuestionsEnabled', () => {
      expect(wrapper.instance().props.toggleQuestionsEnabled).not.toHaveBeenCalled();

      wrapper.instance().handleChange();

      expect(wrapper.instance().props.toggleQuestionsEnabled).toHaveBeenCalled();
    })
  })
});

