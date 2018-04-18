/* eslint-disable */
import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header startScroll={jest.fn()}
                              questionsEnabled={true}
                              saveUser={jest.fn()} />, { disableLifecycleMethods: true });
    global.window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({})
      })
    })
  })

  it('matches the Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has default state', () => {

    expect(wrapper.instance().state).toEqual(mockData.headerDefaultState);
  });

  describe('componentDidMount', () => {
    it('calls handleCurrentLocation', () => {
      wrapper.instance().handleCurrentLocation = jest.fn();

      expect(wrapper.instance().handleCurrentLocation).not.toHaveBeenCalled();

      wrapper.instance().componentDidMount();

      expect(wrapper.instance().handleCurrentLocation).toHaveBeenCalled();
    });
  });

  describe('shouldComponentUpdate', () => {
    it('returns false if the location of the nextState passed in is different from current location in state', () => {
      expect(wrapper.instance().shouldComponentUpdate({}, {blah: 'blah'})).toEqual(false);
    });

    it('returns true if the location of the nextState passed in matches current location in state', () => {
      const currentState = wrapper.instance().state;

      expect(wrapper.instance().shouldComponentUpdate({}, currentState)).toEqual(true);
    });
  });

  describe('handleCurrentLocation', () => {
    beforeEach(() => {
      const mockGeo = {
        getCurrentPosition: jest.fn().mockImplementation(() => {
          return wrapper.instance().setState({ location: {latitude: 4, longitude: 5}})
        }) 
      }

      global.navigator.geolocation = mockGeo;
    });

    it('calls getCurrentPosition on the geolocation object on the navigator object', async () => {
      await wrapper.instance().handleCurrentLocation();

      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it('sets State with current location', async () => {
      await wrapper.instance().handleCurrentLocation();

      expect(wrapper.instance().state.location).toEqual({"latitude": 4, "longitude": 5});
    });
  });

  describe('handleSubmit', () => {
    let event;
    beforeEach(() => {
      event = {
          preventDefault: jest.fn()
      };
      wrapper.instance().setState({concern: 'yes', age: '12'});  
    })

    it('calls preventDefault on event passed in', () => {
      wrapper.instance().handleSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('calls startScroll with event and 1634 if concern and age have values in state', () => {
      wrapper.instance().handleSubmit(event);

      expect(wrapper.instance().props.startScroll).toHaveBeenCalledWith(event, 1634);
    });

    it('calls postToDB', async () => {
      wrapper.instance().postToDB = jest.fn();

      await wrapper.instance().handleSubmit(event);

      expect(wrapper.instance().postToDB).toHaveBeenCalled();
    });
  });

  describe('postToDB', () => {
    it('calls saveUser with userId', async () => {
      global.window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ id: 5})
        })
      })
      wrapper.instance().setState({concern: 'yes', age: '12', location: 'here'});

      await wrapper.instance().postToDB();

      expect(wrapper.instance().props.saveUser).toHaveBeenCalledWith(5);
    });
  });

  describe('handleChange', () => {

    it('sets state with name and value of target of event passed in', () => {
      wrapper.instance().handleChange(mockData.event);
      
      expect(wrapper.instance().state.Jeff).toEqual('websocket');
    });
  });
});