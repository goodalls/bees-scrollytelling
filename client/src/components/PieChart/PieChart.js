import React, { Component } from 'react';
import '../../assets/variables.scss';
import './PieChart.css';

class PieChart extends Component {
  constructor() {
    super();
    this.state = {
      class: '',
      degree: 0,
      percent: 10
    }
  }

  componentDidMount = () => {
    this.updateChart();
  }

  updateChart = () => {
    const degree = 360*this.state.percent/100;
    if(this.state.percent > 50) {
      this.setState({ class: 'gt-50', degree })
    } else {
      this.setState({ class: '', degree })
    }
  }

  changePercent = async (e) => {
    await this.setState({ [e.target.name]: e.target.value })
    this.updateChart();
    this.props.updateImpactPercent(this.state.percent);
  }

  render() {
    return (
      <div className='pie-chart-cont'>
        <div className={`progress-pie-chart ${ this.state.class }`} 
             data-percent={ this.state.percent }>
          <div className='ppc-progress'>
            <div className='ppc-progress-fill' 
                 style={{transform: `rotate(${this.state.degree}deg)`}}></div>
          </div>
          <div className='ppc-percents'>
            <div className='pcc-percents-wrapper'>
              <span>{ this.state.percent }%</span>
            </div>
          </div>
        </div>

        <div>
          <label>Enter a Percentage</label>
          <input 
            name='percent' 
            type='number' 
            placeholder='Percent' 
            step='5' 
            min='0' 
            max='100'
            value={ this.state.percent }
            onChange={ this.changePercent }
          />
        </div>
      </div>
    )
  }
}

export default PieChart;