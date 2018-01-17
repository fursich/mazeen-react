import React from 'react'
import ReactDOM from 'react-dom'
import Maze from './Maze'
import SizeForm from './SizeForm'
import ButtonPanel from './ButtonPanel'
import { fetchDefaultMaze, solveMaze } from 'src/modules/services/Solver'

export default class MazeApp extends React.Component {
  constructor() {
    super();
    this.state = {
      width: null,
      height: null,
      maze:   []
    }
    this.handleWidthChange  = this.handleWidthChange.bind(this)
    this.handleHeightChange = this.handleHeightChange.bind(this)
    this.handleCellClick    = this.handleCellClick.bind(this);
    this.handleSolveButtonClick  = this.handleSolveButtonClick.bind(this);
    this.handleRedrawButtonClick  = this.handleRedrawButtonClick.bind(this);
    this.handleFetchInitialMazeSuccess = this.handleFetchInitialMazeSuccess.bind(this)
    this.handleFetchInitialMazeFailure = this.handleFetchInitialMazeFailure.bind(this)
    this.handleSolveMazeSuccess = this.handleSolveMazeSuccess.bind(this);
    this.handleSolveMazeFailure = this.handleSolveMazeFailure.bind(this);
  }

  componentDidMount() {
    this.redraw();
  }

  handleRedrawButtonClick() {
    this.redraw();
  }

  handleSolveButtonClick() {
    solveMaze({
      height: this.state.height,
      width:  this.state.width,
      maze:   this.state.maze
    }).then(
      this.handleSolveMazeSuccess,
      this.handleSolveMazeFailure
    )

  }

  redraw() {
    fetchDefaultMaze().then(this.handleFetchInitialMazeSuccess, this.handleFetchInitialMazeFailure)
  }

  handleFetchInitialMazeSuccess(data) {
    console.log(data.maze);
    this.setState({
      width:  this.state.width  || data.width,
      height: this.state.height || data.height,
      maze:   data.maze
    })
  }

  handleFetchInitialMazeFailure(message) {
    console.log(message);
  }

  handleSolveMazeSuccess(data) {
    console.log(data.maze);
    // this.setState({
    //   maze: data.maze
    // })
  }

  handleSolveMazeFailure(message) {
    console.log(message);
  }

  handleHeightChange(height) {
    this.setState( {
      height: height
    } )
  }

  handleWidthChange(width) {
    this.setState( {
      width: width
    } )
  }

  handleCellClick(position) {
    let maze  = this.state.maze;
    const row = position[0];
    const col = position[1];

    this.setState({
      maze: flipCell(maze, row, col)
    })
  }

  render() {
    return(
      <div>
        <SizeForm
          width={this.state.width}
          height={this.state.height}
          onWidthChange={this.handleWidthChange}
          onHeightChange={this.handleHeightChange}
        />
        <Maze
          maze={this.state.maze}
          row={this.state.height}
          col={this.state.width}
          onCellClick={this.handleCellClick}
        />
        <ButtonPanel
          onSolveButtonClick={this.handleSolveButtonClick}
          onRedrawButtonClick={this.handleRedrawButtonClick}
        />
      </div>
    )
  }
}

function flipCell(maze, row, col) {
  if (!maze[row]) {
    maze[row] = new Array();
  }

  switch (maze[row][col] || 'space') {
    case 'block':
      maze[row][col] = 'space';
      break;
    case 'space':
      maze[row][col] = 'block';
      break;
  }

  return(maze);
}
