import React, { Component } from 'react';
import honeycomb1 from '../../assets/honeycomb1.png';
import nicotine2 from '../../assets/nicotine2.png';
import nicotine1 from '../../assets/nicotine1.png';
import honeycomb from '../../assets/honeycomb.png';
import { Parallax } from 'react-scroll-parallax';
import downArrow from '../../assets/down-arrow.svg';
import bee from '../../assets/bee-problem.png';
import flowers from '../../assets/flowers.png';
import almond from '../../assets/almond.png';
import PieChart from '../PieChart/PieChart';
import PropTypes from 'prop-types';
import './Problems.css';

export default class Problems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      answered: false
    }
  }

  updateImpactPercent = percent => {
    this.setState({ percent });
  }

  handleSubmit = async e => {
    this.props.startScroll(e);
    await this.setState({ 
      economy: `${this.state.monetary}${this.state.unit}`,
      answered: true
    });
    this.postData();
  }

  postData = async () => {
    const postBody = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        users_id: this.props.currentUserId,
        user_answer: this.state.percent,
        question: 'What percent of bee colonies do beekeepers lose every year?'
      })
    }
    await fetch('/api/v1/answers', postBody);
  }

  problemQuestion = () => {
    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <h2>Bees are in trouble</h2>
        <label htmlFor='problem' className='question-descr'>What percent of bee colonies do beekeepers lose every year?</label>
        <PieChart updateImpactPercent={ this.updateImpactPercent } />
          {
            this.state.answered 
            ? <div className='arrow-cont'><img src={ downArrow } alt='scroll' className='hover-arrow' /></div>
            : <button type='submit'>Guess</button>
          }
      </form>
    );
  };

  pesticidesArticle = () => {
    return (
      <article className='problems-article'>
        <div className='neonics-cont1'> 
          <h1>Neonicotinoides confuse bees and make it difficult for bees to find their way back to their hive</h1>
          <div className='fixed-pesticides'></div>
          <p>They are also very addictive (like nicotine)</p>
          <Parallax offsetYMax={50} offsetYMin={-100}>
            <div className='nicotine-cont'>
              <img src={ nicotine1 } className='nicotine' id='nicotine1' alt='nicotine'/>
              <img src={ nicotine2 } className='nicotine' id='nicotine2' alt='nicotine'/>
            </div>
          </Parallax>
        </div>
        <div className='neonics-cont2'>
          <p>Bees will seek out plants that have been sprayed with neonicotinoides</p>
          <p>Meaning each time they visit sprayed plants, they have a greater chance of not finding home</p>
        </div>
        <Parallax offsetYMax={50} offsetYMin={-50} className='honeycomb-parallax'>
          <div className='honeycomb-cont'>
            <img src={ honeycomb } id='honeycomb' alt='honeycomb'/>
            <img src={ bee } id='bee' alt='bee'/>
            <img src={ honeycomb } id='honeycomb1' alt='honeycomb'/>
           </div>
        </Parallax>
      </article>
    );
  };

  monocultureArticle = () => {
    return (
      <article className='problems-article monoculture'>
        <h1>Large fields of one plant, like you see in today's agriculture, can cause harm to bee colonies</h1>
        <div className='fixed-monocropping'></div>
        <p>Bees become stressed out feeding on the same plant because they do not receive a nutrient-rich diet</p>
        <p>In fact, nearly 20 percent of the beekeepers who pollinated almonds lost 50 percent or more of their colonies</p>
        <p>Also, fields of one plant often cause more problems with weeds and pests,</p>
        <p>enhancing the need for pesticides and harming the pollinating bees</p>
        <Parallax offsetYMax={50} offsetYMin={-50} >
          <img src={ almond } className='almond' alt='almond'/>
        </Parallax>
      </article>
    );
  };

  climateChangeArticle = () => {
    return (
      <article className='problems-article'>
        <h1>Climate change create warmer temperatures</h1>
        <p>Higher temperatures effect many aspects of the honey bee way</p>
        <p>A warmer climate promotes the growth of pests in bee hives</p>
        <p>Making bees more suseptible to colony collapse disorder and parasites</p>
        <p>Also, climate change causes plants to flower earlier, disrupting the bee's natural schedule</p>
        <div id='flowers-cont'>
        <Parallax offsetYMax={50} offsetYMin={-50} >
          <img src={ flowers } className='flowers' alt='flowers' />
        </Parallax>
        </div>
      </article>
    );
  };

  render() {
    return (
      <div className='Problems'>
        { this.problemQuestion() }
        { this.pesticidesArticle() }
        { this.monocultureArticle() }
        { this.climateChangeArticle() }
      </div>
    );
  }   
};

Problems.propTypes = {
  questionsEnabled: PropTypes.bool.isRequired,
  startScroll: PropTypes.func.isRequired,
  currentUserId: PropTypes.number
}