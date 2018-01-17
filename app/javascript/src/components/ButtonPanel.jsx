import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'

export default class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSolveButtonClick  = this.handleSolveButtonClick.bind(this);
    this.handleRedrawButtonClick = this.handleRedrawButtonClick.bind(this);
  }

  handleSolveButtonClick() {
    this.props.onSolveButtonClick();
  }

  handleRedrawButtonClick() {
    this.props.onRedrawButtonClick();
  }

  render() {
    return(
      <div className='buttonPanel' >
        <Button text='solve' onButtonClick={this.handleSolveButtonClick} />
        <Button text='redraw' onButtonClick={this.handleRedrawButtonClick} />
      </div>
    );
  }
}
