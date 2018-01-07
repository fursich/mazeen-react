import React from 'react'
import ReactDOM from 'react-dom'
import Maze from './Maze'
import SizeForm from './SizeForm'

export default class MazeApp extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 10,
      height: 10,
    }
    this.handleWidthChange  = this.handleWidthChange.bind(this)
    this.handleHeightChange = this.handleHeightChange.bind(this)
  }

  handleWidthChange(width) {
    this.setState( {
      width: width
    } )
  }

  handleHeightChange(height) {
    this.setState( {
      height: height
    } )
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
          row={this.state.height}
          col={this.state.width}
        />
      </div>
    )
  }
}
