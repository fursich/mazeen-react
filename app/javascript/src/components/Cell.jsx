import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/main/cell'

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.isStart || this.props.isGoal) { return }
    this.props.onCellClick(this.props.id)
  }

  render() {
    const cell = styleByCellType(this.props.cellType, this.props.isStart, this.props.isGoal)
    return(
      <td className={`${cell} ${styles.cell}`} onClick={this.handleClick} ></td>
    )
  }
}

function styleByCellType(cellType, isStart, isGoal) {
  if(isStart) {
    return(styles.start);
  } else if(isGoal) {
    return(styles.goal);
  } else {
    return(styles[cellType] || styles.space);
  }
}
