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
      maze:   [],
      locked: false,
      path:   [],
      flash:  false
    }
    this.handleWidthChange  = this.handleWidthChange.bind(this)
    this.handleHeightChange = this.handleHeightChange.bind(this)
    this.handleCellClick    = this.handleCellClick.bind(this);
    this.handleTableClick    = this.handleTableClick.bind(this);
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
      maze:   formatMazeData(this.state.maze, this.state.height, this.state.width)
    }).then(
      this.handleSolveMazeSuccess,
      this.handleSolveMazeFailure
    )

  }

  redraw() {
    this.setState({
      locked: false,
      flash:  false,
      path: []
    })
    fetchDefaultMaze().then(this.handleFetchInitialMazeSuccess, this.handleFetchInitialMazeFailure)
  }

  handleFetchInitialMazeSuccess(data) {
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
    if (data.maze) {
      this.setState({
        locked: true,
        path: data.maze
      })
    } else {
      this.setState({
        locked: true,
        flash:  true
      })
    };
  }

  handleSolveMazeFailure(message) {
    console.log(message);
  }

  handleHeightChange(height) {
    this.setState( {
      height: height,
      locked: false,
      path:   [],
    } )
  }

  handleWidthChange(width) {
    this.setState( {
      width: width,
      locked: false,
      path:   [],
    } )
  }

  handleCellClick(position) {
    let maze  = this.state.maze;
    const row = position[0];
    const col = position[1];

    // if (!this.state.locked) {
      this.setState({
        maze: flipCell(maze, row, col)
      })
    // }
  }

  handleTableClick(event) {
    console.log('table clicked');
    if (this.state.locked) {
      this.setState( {
        locked: false,
        flash:  false,
        path:   []
      } )
      event.stopPropagation();
    }
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
          onTableClick={this.handleTableClick}
          path={this.state.path}
          flash={this.state.flash}
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

function formatMazeData(maze, height, width) {
  let formattedMaze = new Array();
  for(let row=0; row<height; row++) {
    formattedMaze[row] = new Array();
    for(let col=0; col<width; col++) {
      formattedMaze[row][col] = (maze[row] && maze[row][col] === 'block') ? 'block' : 'space'
    }
  }
  return(formattedMaze)
}
