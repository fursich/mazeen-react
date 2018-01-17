class Api::V1::MazeController < ApplicationController
  def new
    respond_to do |format|
      format.json { render json: {maze: INITIAL_MAZE, width: INITIAL_WIDTH, height: INITIAL_HEIGHT} }
    end
  end

  def solve
    respond_to do |format|
      format.json { render json: {maze: NEW_MAZE} }
    end
  end

  INITIAL_MAZE = [['space', 'block', 'block'],['block', 'space', 'block']]
  INITIAL_WIDTH = 10
  INITIAL_HEIGHT = 10
  NEW_MAZE = [['space', 'block', 'space', 'block'],['space', 'space', 'space', 'block']]

end
