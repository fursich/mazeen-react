import React from 'react'
import ReactDOM from 'react-dom'

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.onButtonClick();
  }

  render() {
    return(
      <div className='button' >
        <button type='button' name='button' onClick={this.handleButtonClick} >
          {this.props.text}
        </button>
      </div>
    );
  }
}
