import React, { Component } from 'react';
import './Statistics.css';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await this.getStatistics();
  }

  getStatistics = async () => {
    const output = await fetch('/api/v1/answers');
    const rawResponse = await output.json();
    const statsWithoutAverage = this.cleanStatistics(rawResponse);
    const response = this.getAverages(statsWithoutAverage);
    await this.setState({ response })
  }

  cleanStatistics = (response) => {
    return response.reduce( (answers, questionObj, index) => {
      if (!answers[questionObj.question]) {
        answers[questionObj.question] = { count: {}, sum: 0 };
      }

      //handle count
      if (!answers[questionObj.question].count[questionObj.user_answer]) {
        answers[questionObj.question].count[questionObj.user_answer] = 0;
      }

      answers[questionObj.question].count[questionObj.user_answer]++;

      //handle sum
      if (questionObj.user_answer.split('_').length === 1) {
        answers[questionObj.question].sum += parseInt(questionObj.user_answer, 10);
      } else {
        const splitArray = questionObj.user_answer.split('_')
        let number = parseInt(splitArray[0], 10);
        splitArray[1] === 'million' ? number *= 1000000 : number *= 1000000000;
        answers[questionObj.question].sum += number;
      }

      return answers
    }, {})
  }

  getAverages = (response) => {
    Object.keys(response).forEach(key => {
      const counts = Object.values(response[key].count);
      const totalCount = counts.reduce((totalCount, number) => {return totalCount += number}, 0);
      response[key].average = response[key].sum / totalCount
    });
    return response
  }

  displayStatistics = () => {
    const response = this.state.response;
    if (response) {
      return Object.keys(response).map( (key, index) => {
        if (response[key].average > 1000000) {
          const monetary = (response[key].average / 1000000000) > 0 ? 'billion' : 'million'
          const number = [...response[key].average.toString()];
          const fullNumber = `${number[0]}${number[1]}${number[2]} ${monetary}`
          return (
            <div className='answer'>
              <p>{ fullNumber }</p>
            </div>
          )
        }
      return (
        <div key={index} className='statistics-card'>
          <h4>{key}</h4>
            <hr/>
          <h6>Average Answer: {response[key].average}</h6>
        </div>
      )
      })
    }
  }

  render = () => {
    return (
      <div className='Statistics'>
        <h2>Whats the buzz on how people are answering?</h2>
        { this.displayStatistics() }
      </div>
    )
  }
}

export default Statistics;
