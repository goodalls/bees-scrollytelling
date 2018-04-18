import React, { Component } from 'react';
import fruitArrangement from '../../assets/raspberryStarfruit.png';
import wheatCropped from '../../assets/wheat-cropped.png';
import blackberry from '../../assets/blackberry.png';
import wordCloud from '../../assets/wordcloud.png';
import raspberry from '../../assets/raspberry.png';
import { Parallax } from 'react-scroll-parallax';
import cucumber from '../../assets/cucumber.png';
import acerola from '../../assets/acerola.png';
import orange from '../../assets/orange.png';
import cherry from '../../assets/cherry.png';
import banana from '../../assets/banana.png';
import PieChart from '../PieChart/PieChart';
import peach from '../../assets/Peach.png';
import apple from '../../assets/apple.png';
import coins from '../../assets/falling-coins.png';
import downArrow from '../../assets/down-arrow.svg';
import PropTypes from 'prop-types';
import './Impact.css';

class Impact extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      percent: 0,
      unit: 'million',
      monetary: '',
      economy: '',
      answeredpercent: false,
      answeredeconomy: false
    }
  }

  static contextTypes = {
    parallaxController: PropTypes.object
  };

  handleSubmit = async (e, scrollStop, answer, question) => {
    this.props.startScroll(e, scrollStop);
    await this.setState({
     economy: `${this.state.monetary}_${this.state.unit}`,
     [`answered${answer}`]: true
    });
    const postBody = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        users_id: this.props.currentUserId,
        user_answer: this.state[answer],
        question: question
      })
    }
    await fetch('/api/v1/answers', postBody);
  }

  updateImpactPercent = percent => {
    this.setState({ percent });
  }

  handleChangeEcon = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLoad = () => {
    this.context.parallaxController.update();
  };


  displayDietQuestion = () => {
    return (
      <form onSubmit={(e) => this.handleSubmit(e, 4260, 'percent', 'What percentage of your diet do you think is provided by bees?')} 
            className='diet-form'>
        <div className='question-cont'>
          <h2 id='food-h2'>Let's talk about food...</h2>
          <img src={ fruitArrangement } alt='fruit arrangement'
               className='fruit-arrangement' />
          <Parallax offsetYMax={ 900 }
                    slowerScrollRate={ true }>
            <img src={ orange } alt='orange' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-1' />
            <img src={ apple } alt='apple' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-2' />
            <img src={ acerola } alt='acerola' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-3' />
            <img src={ banana } alt='banana' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-4' />
            <img src={ blackberry } alt='blackberry' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-5' />
            <img src={ cherry } alt='cherry' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-6' />
            <img src={ cucumber } alt='cucumber' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-7' />
            <img src={ peach } alt='peach' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-8' />
            <img src={ raspberry } alt='raspberry' 
                 onLoad={this.handleLoad}
                 className='raining-fruit rain-9' />
          </Parallax>
        </div>
        <label htmlFor='diet' 
               className='question-descr'>What percentage of your diet do you think is provided by bees?</label>
        <PieChart updateImpactPercent={ this.updateImpactPercent } />
        {
          this.state.answeredpercent 
          ? <div className='arrow-cont'><img src={ downArrow } alt='scroll' className='hover-arrow' /></div>
          : <button type='submit'>Guess</button>
        }
      </form>
    );
  }

  displayDietArticle = () => {
    return (
      <article className='diet-article'>
        <div className='diet-article-volume'>
          <h1 id='diet-header'>In your daily diet,</h1>
          <h1>30% of food you eat is pollinated by bees</h1>
          <p>The other 70% consists of wheat, rice and corn, all which are wind pollinated</p>
          <div className='wind-foods-cont'>
            <Parallax offsetYMax={50} offsetYMin={-100} >
              <div className='wheat-cont'>
                <img src={ wheatCropped } className='wheat' id='wheat1' alt='wheat grass'/>
                <img src={ wheatCropped } className='wheat' id='wheat2' alt='wheat grass'/>
                <img src={ wheatCropped } className='wheat' id='wheat3' alt='wheat grass'/>
                <img src={ wheatCropped } className='wheat' id='wheat4' alt='wheat grass'/>
              </div>
            </Parallax>
          </div>
        </div>
        <h1>60% of the diversity of food you eat is pollinated by bees</h1>
        <p>This is because most fruits and vegetables are animal pollinated, including chocolate, coffee, tea, and avocados</p>
          <div className='foods-cont'>
            <img src={wordCloud} alt='all the fruits' className='word-cloud' />
          </div>
      </article>
    );
  }

  displayEconomicQuestion = () => {
    return (
      <form onSubmit={(e) => this.handleSubmit(e, 6085, 'economy', 'How much do bees contribute to the economy, anually?')}
            className='economic-questions'>
        <h2>What about the Economy?</h2>
        <label htmlFor='economic' 
               className='question-descr'>How much does bee pollination contribute to the economy, anually?</label>
        <div>
          <select name='monetary' onChange={ (e) => this.handleChangeEcon(e) }>
            <option value='1' >1</option>
            <option value='100'>100</option>
            <option value='200'>200</option>
            <option value='300'>300</option>
            <option value='400'>400</option>
            <option value='500'>500</option>
            <option value='600'>600</option>
            <option value='700'>700</option>
            <option value='800'>800</option>
            <option value='900'>900</option>
          </select>
          <select name='unit' onChange={ (e) => this.handleChangeEcon(e) }>
            <option value='million'>million</option>
            <option value='billion'>billion</option>
          </select>
        </div>
        {
          this.state.answeredeconomy
          ? <div className='arrow-cont'><img src={ downArrow } alt='scroll' className='hover-arrow' /></div>
          : <button type='submit'>Guess</button>
        }
        <Parallax offsetYMax={50} offsetYMin={-50} className='coins-parallax'>
          <img src={ coins } alt='falling coins' id='coins' />
        </Parallax>
      </form>
    );
  }

  displayEconomicArticle = () => {
    return (
      <article className='economic-article'>
        <h1>The honeybee pollination services are valued to be just above $20 billion in the United States. World wide, that number rises to $217 billion. </h1>
        {
          this.props.displayGraphCover &&
          <Parallax offsetYMax={1300}
                    slowerScrollRate={true}>
          <div className='graph-cover'>
          </div>
        </Parallax>
      }
        <div className='econ-graph-wrap'>
          <div className='us-econ-growth'>
          <p>US: 20 Billion</p>
          </div>
          <div className='world-econ-growth'>
          <p>World: 217 Billion</p>
          </div>
        </div>
      </article>
    );
  }

  render() {
    return (
      <div className='Impact' >
        { this.displayDietQuestion() }
        { this.displayDietArticle() }
        { this.displayEconomicQuestion() }
        { this.displayEconomicArticle() }
      </div>
    );
  }
}

Impact.propTypes = {
  startScroll: PropTypes.func.isRequired,
  questionsEnabled: PropTypes.bool.isRequired,
  currentUserId: PropTypes.number
}

export default Impact;