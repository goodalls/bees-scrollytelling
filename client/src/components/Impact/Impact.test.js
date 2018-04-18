/* eslint-disable */
import React from 'react';
import Impact from './Impact';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';

describe('Impact', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Impact startScroll={jest.fn()}
                              questionsEnabled={true}
                              currentUserId={2} />);
  })

  it('matches the Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has default state', () => {
    expect(wrapper.instance().state).toEqual(mockData.impactDefaultState);
  });

  describe('handleSubmit', () => {
    global.window.fetch = jest.fn().mockImplementation( () => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({})
      })
    })

    it('calls startscroll with event and scrollstop passed in', () => {
      expect(wrapper.instance().props.startScroll).not.toHaveBeenCalled();

      wrapper.instance().handleSubmit({}, 800, 'yes', 'are plants great');

      expect(wrapper.instance().props.startScroll).toHaveBeenCalledWith({}, 800);
    });

    it('sets economy instate with current monetary and unit values from state', async () => {
      await wrapper.instance().setState({unit: 'lbs', monetary: '70'})
      await wrapper.instance().handleSubmit({}, 800, 'yes', 'are plants great');

      expect(wrapper.instance().state.economy).toEqual('70_lbs');
    });

    it('calls fetch with correct url and postbody', async () => {
      window.fetch.mockClear();
      expect(window.fetch).not.toHaveBeenCalled();

      await wrapper.instance().handleSubmit({}, 800, 'yes', 'are plants great');

      expect(window.fetch).toHaveBeenCalledWith("/api/v1/answers", mockData.impactFactsPost);
    });
  });

  describe('updateImpactPercent', () => {
    it('sets state with percent passed', () => {
      wrapper.instance().updateImpactPercent(70);

      expect(wrapper.instance().state.percent).toEqual(70);
    });
  });

  describe('handleChangeEcon', () => {
    it('sets state with name and value of event target passed in', () => {
      wrapper.instance().handleChangeEcon(mockData.event);

      expect(wrapper.instance().state.Jeff).toEqual('websocket');
    });
  });
});

