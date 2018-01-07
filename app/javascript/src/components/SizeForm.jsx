import React from 'react'
import ReactDOM from 'react-dom'
import NumberField from './NumberField'

const MIN_RANGE = 5
const MAX_RANGE = 15

export default class SizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWidthChange  = this.handleWidthChange.bind(this);
  }

  handleHeightChange(number) {
    this.props.onHeightChange(number)
  }

  handleWidthChange(number) {
    this.props.onWidthChange(number)
  }

  render() {
    return(
      <div>
        高さ
        <NumberField
          number={this.props.height}
          minRange={MIN_RANGE}
          maxRange={MAX_RANGE}
          onNumberChange={this.handleHeightChange}
        />

        幅
        <NumberField
          number={this.props.width}
          minRange={MIN_RANGE}
          maxRange={MAX_RANGE}
          onNumberChange={this.handleWidthChange}
        />
      </div>
    );
  }
}
