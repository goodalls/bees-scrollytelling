import React, { Component } from 'react';
import '../../assets/variables.scss';
import './SwitchButton.css';

class SwitchButton extends Component {
  constructor() {
    super();
    this.state = {
      checked: true
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked })
    this.props.toggleQuestionsEnabled();
  }

  render() {
    return (
      <div className="toggle">
        <input checked={ this.state.checked } 
               onChange={this.handleChange}
               type="checkbox" 
               id="toggle" />
        <label htmlFor="toggle">
          <h4>Questions</h4>
          <div>
            <p>On</p>
            <p>Off</p>
          </div>
        </label>
      </div>
    )
  }
}  

export default SwitchButton; 