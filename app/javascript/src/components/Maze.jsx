import React from 'react'
import ReactDOM from 'react-dom'
import Cell from './Cell'

export default class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: INITIAL_MAZE
    }
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(position) {
    let maze = this.state.maze;
    const row = position[0];
    const col = position[1];

    this.setState({
      maze: flipCell(maze, row, col)
    })
  }

  render() {
    return(
      <table>
        <CellTable
          row={this.props.row}
          col={this.props.col}
          maze={this.state.maze}
          start={[0,0]}
          goal={[this.props.row-1, this.props.col-1]}
          onCellClick={this.handleCellClick}
        />
      </table>
    )
  }
}

function flipCell(maze, row, col) {
  if (!maze[row]) {
    maze[row] = new Array();
  }

  switch (maze[row][col] || '□') {
    case '■':
      maze[row][col] = '□';
      break;
    case '□':
      maze[row][col] = '■';
      break;
  }

  return(maze);
}

const INITIAL_MAZE = [[null, null, '■'],['■', null, '■']]

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
