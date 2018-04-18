import React from 'react';
import PieChart from './PieChart';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';

describe("PieChart", () => {
  let wrapper;
  let updateImpactPercent = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<PieChart updateImpactPercent={updateImpactPercent} />);
  });

  it('matches the Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has default state', () => {
    wrapper = shallow(<PieChart updateImpactPercent={updateImpactPercent} />, { disableLifecycleMethods: true });

    expect(wrapper.instance().state).toEqual(mockData.pieChartDefaultState);
  });


  describe('updateChart', async () => {

    it('updates state with class gt-50 if the percent is above 50', async() => {
      await wrapper.instance().setState({ percent: 80 });
      await wrapper.instance().updateChart();

      expect(wrapper.instance().state.class).toEqual('gt-50');
      expect(wrapper.instance().state.degree).toEqual(288);
    });

    it('updates state with class if the percent is less than 50', async() => {
      await wrapper.instance().updateChart();

      expect(wrapper.instance().state.class).toEqual('');
      expect(wrapper.instance().state.degree).toEqual(36);
    });
  });

  describe('changePercent', () => {
    it('updates state with the event name and target', async() => {
      wrapper.instance().updateChart = jest.fn();
      await wrapper.instance().changePercent(mockData.percentEvent);
      
      expect(wrapper.instance().state.percent).toEqual(55);
    });

    it('calls updateChart', async() => {
      wrapper.instance().updateChart = jest.fn();
      await wrapper.instance().changePercent(mockData.percentEvent);

      expect(wrapper.instance().updateChart).toHaveBeenCalled();
    });

    it('calls updateImpactPercent', async() => {
      await wrapper.instance().changePercent(mockData.percentEvent);

      expect(updateImpactPercent).toHaveBeenCalledWith(55);
    })
  });
})