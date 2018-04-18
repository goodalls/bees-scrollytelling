import React from 'react';
import { shallow } from 'enzyme';
import BeeFacts from './BeeFacts';
import mockData from '../../__mocks__/mockData';

describe('BeeFacts', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BeeFacts startScroll={jest.fn()}
                                questionsEnabled={true}
                                currentUserId={2} />)
  })

  it('matches the Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has default state', () => {
    expect(wrapper.instance().state).toEqual({beeSpecies: '', answered: false});
  });

  describe('handleChange', () => {
    const event = mockData.event;

    it('sets state with name and value of event passed in', () => {
      wrapper.instance().handleChange(event);

      expect(wrapper.instance().state.Jeff).toEqual('websocket');
    });
  });

  describe('handleSubmit', () => {
    global.window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({})
      })
    })

    it('calls startScroll with event passed in and 11255', () => {
      wrapper.instance().handleSubmit(mockData.event);

      expect(wrapper.instance().props.startScroll).toHaveBeenCalledWith(mockData.event, 11255);
    });

    it('calls fetch with /api/v1/answers and the post body', () => {
      wrapper.instance().setState({beeSpecies: 'rusty'})
      wrapper.instance().handleSubmit(mockData.event);

      expect(window.fetch).toHaveBeenCalledWith('/api/v1/answers', mockData.beeFactsPost);
    });
  });
});