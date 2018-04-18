import React, { Component } from 'react';
import { Parallax } from 'react-scroll-parallax';
import PropTypes from 'prop-types';
import downArrow from '../../assets/down-arrow.svg';
import './Header.css';


const ageRanges = [
  '13-19', '20-39', '40-59', '60-79', '79+'
];

const concernArr = [
  'Not at all concerned', 'A little concerned', 'Very concerned', 'Haven\'t thought about it'
];


class Header extends Component {
  constructor() {
    super();
    this.state = {
      concern: '',
      age: '',
      location: {},
      answered: false
    }
  }

  componentDidMount = () => {
    this.handleCurrentLocation();
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.location !== this.state.location) {
      return false;
    }
    return true;
  }

  handleCurrentLocation = async () => {
    if ('geolocation' in navigator) {
      try {
        await navigator.geolocation.getCurrentPosition(response => {  
          const { latitude, longitude } = response.coords;
          console.log('Location Set')
          this.setState({ location: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}})
        });
      } catch (error) {
        console.log('handleCurrentLocation error', error)
      }
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      if (this.state.concern && this.state.age) {
        this.props.startScroll(e, 1634);
        this.setState({ answered: true });
        await this.postToDB();
      }
    } catch (error) {
      console.log(error);
    }
  }

  postToDB = async () => {
    const postBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concern: this.state.concern,
        age: this.state.age,
        location: this.state.location   
      })
    }
    try{
      const idResponse = await fetch('api/v1/users', postBody);
      const id = await idResponse.json();
      this.props.saveUser(id.id)
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  radioOptions = optionsArr => {
    const name = optionsArr.length === 5 ? 'age' : 'concern';
    return optionsArr.map((range, i) => {
      return (
        <label htmlFor={`${name}${range}`} key={i}>{range}
          <input type="radio" id={`${name}${range}`}
                 name={ name } value={ range}
                 onChange={ this.handleChange } />
        </label>
      );
    });
  };

  render() {
    return (
      <div className='Header'>
        <div className='page-header-img'>
        </div>
        <header className='page-header'>
          <h1>Bees and Our Food</h1>
          <p>An interactive guide to how bees keep us well fed</p>
        </header>
        <form 
          className='user-info-form'
          onSubmit={ this.handleSubmit }
        >
          <h2>
            <Parallax 
              offsetYMax={85} 
              slowerScrollRate={true}  
              className='parallax-first'
            >
              First,
            </Parallax> 
            let's get to know you
          </h2>
          <div className='questions-cont'>
            <div>
            <h3 className='question-descr'>Select your age</h3>
              { this.radioOptions(ageRanges) }
            </div>
            <div id='concern'>
            <h3 className='question-descr'>How concerned are you about bees?</h3>
              { this.radioOptions(concernArr) }
            </div>
          </div>
          {
            this.state.answered 
            ? <div className='arrow-cont'><img src={ downArrow } alt='scroll' className='hover-arrow' /></div>
            : <button type='submit'>Guess</button>
          }
        </form>
      </div>
    );
  }
};

Header.propTypes = {
  startScroll: PropTypes.func.isRequired,
  questionsEnabled: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired
}

export default Header;