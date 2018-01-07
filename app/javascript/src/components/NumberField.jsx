import React from 'react'
import ReactDOM from 'react-dom'

export default class NumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { warning: '' }
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNumberChange(e) {
    const number = e.target.value

    if (number >= this.props.minRange && number <= this.props.maxRange) {
      this.setState( {
        warning: ''
      } );
      this.props.onNumberChange(number);
    } else {
      this.setState( {
        warning: `${this.props.minRange}-${this.props.maxRange}の間の数字を指定してください`
      } );
    }
  }

  render() {
    const value = this.props.number || this.props.minRange
    return(
      <form>
        <input type="number" value={value} onChange={this.handleNumberChange}/>
        {this.state.warning}
      </form>
    )
  }
}
