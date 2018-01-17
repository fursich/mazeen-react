import React from 'react'
import ReactDOM from 'react-dom'
import Cell from './Cell'
import styles from '../../styles/main/cell'

export default class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(position) {
    this.props.onCellClick(position);
  }

  render() {
    return(
      <table className={styles.table}>
        <CellTable
          row={this.props.row}
          col={this.props.col}
          maze={this.props.maze}
          start={[0,0]}
          goal={[this.props.row-1, this.props.col-1]}
          onCellClick={this.handleCellClick}
        />
      </table>
    )
  }
}

function CellTable(props) {
  let list = [];

  for( let i=0; i < props.row; i++ ) {
    list.push(
      <CellGroup
        row={i}
        col={props.col}
        cellType={props.maze[i] || []}
        start={props.start}
        goal={props.goal}
        onCellClick={props.onCellClick}
        key={i} />
    );
  }

  return(
    <tbody>
      {list}
    </tbody>
  )
}

function CellGroup(props) {
  let list = [];
  let cellType = '';

  for( let j=0; j < props.col; j++ ) {
    cellType = props.cellType[j]
    list.push(
      <Cell
        key={[props.row, j]}
        id={[props.row, j]}
        cellType={props.cellType[j]}
        isStart={props.row === props.start[0] && j === props.start[1]}
        isGoal={props.row === props.goal[0] && j === props.goal[1]}
        onCellClick={props.onCellClick} />
    );
  }

  return(
    <tr>
      {list}
    </tr>
  )
}
