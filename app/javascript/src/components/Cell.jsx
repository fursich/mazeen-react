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
    const cellColor = styleByCellType(this.props.cellType, this.props.isStart, this.props.isGoal, this.props.isPath)
    const opacity = this.props.flash ? styles.flashedCell : null
    return(
      <td className={`${cellColor} ${styles.cell} ${opacity}`} onClick={this.handleClick} ></td>
    )
  }
}

function styleByCellType(cellType, isStart, isGoal, isPath) {
  if(isStart) {
    return(styles.start);
  } else if(isGoal) {
    return(styles.goal);
  } else if(isPath) {
    return(styles.path);
  } else {
    return(styles[cellType] || styles.space);
  }
}
