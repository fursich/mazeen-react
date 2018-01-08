import React from 'react'
import ReactDOM from 'react-dom'
import NumberField from './NumberField'
import styles from '../../styles/main/cell'

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
      <div className={styles.panel} >
        <div className={styles.box} >
          <span>高さ</span>
          <NumberField
            number={this.props.height}
            minRange={MIN_RANGE}
            maxRange={MAX_RANGE}
            onNumberChange={this.handleHeightChange}
          />
        </div>
        <div className={styles.box} >
          <span>幅</span>
          <NumberField
            number={this.props.width}
            minRange={MIN_RANGE}
            maxRange={MAX_RANGE}
            onNumberChange={this.handleWidthChange}
          />
        </div>
      </div>
    );
  }
}
