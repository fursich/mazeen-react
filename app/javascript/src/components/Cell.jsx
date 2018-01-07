import React from 'react'
import ReactDOM from 'react-dom'

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
    const cell = displayCell(this.props.cellType, this.props.isStart, this.props.isGoal)
    return(
      <td className={"cell"} onClick={this.handleClick} >{cell}</td>
    )
  }
}

function displayCell(cellType, isStart, isGoal) {
  if(isStart) {
    return('◯');
  } else if(isGoal) {
    return('◎');
  } else {
    return(cellType || '□');
  }
}
