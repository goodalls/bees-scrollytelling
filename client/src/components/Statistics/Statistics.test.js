/* eslint-disable */
import React from 'react';
import Statistics from './Statistics';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';

describe('Statistics', () => {
  let wrapper;

  global.window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve([])
    });
  });

  beforeEach(() => {
    wrapper = shallow(<Statistics currentUserId={2} />)
  });

  it('matches the Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a default state of an empty object', () => {
    wrapper = shallow(<Statistics currentUserId={2} />, { disableLifecycleMethods: true })
    expect(wrapper.instance().state).toEqual({});
  });

  describe('getStatistics', () => {
    it('gets the statistics and updates state with compiled data', async () => {
      wrapper.instance().cleanStatistics = jest.fn();
      wrapper.instance().getAverages = () => 'response';

      await wrapper.instance().getStatistics();

      expect(wrapper.instance().state.response).toEqual('response')
    });
  });

  describe('cleanStatistics', () => {

    it('returns a cleaned statistics data object', () => {
      expect(wrapper.instance().cleanStatistics(mockData.rawStatistics)).toEqual(mockData.cleanedStatistics);
    });
  });

    it('returns a cleaned statistics data object with averages', () => {
      expect(wrapper.instance().getAverages(mockData.cleanedStatistics)).toEqual(mockData.cleanedAverageData);
    });
});