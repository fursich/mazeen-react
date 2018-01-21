class Api::V1::MazeController < ApplicationController
  include CalculateMinCost

  def new
    respond_to do |format|
      format.json {
        render json: Forms::MazeForm.new.attributes.slice(*maze_attributes)
      }
    end
  end

  def solve
    cost_algorithm = params[:algorithm]&.to_sym || :minimum_distance

    maze = Forms::MazeForm.new(
      maze: params.fetch(:data)[:maze], **size_params
    ).to_hash

    respond_to do |format|
      path = path_with_min_cost(maze, from: maze_start, to: maze_goal, size: size, algorithm: cost_algorithm)

      format.json {
        render json: {maze: path}
      }
    end
  end


  private

  def size_params
    params.require(:data).permit(:height, :width).to_h.symbolize_keys
  end

  def maze_attributes
    %i(maze width height)
  end

  def size
    size_params[:height].to_i * size_params[:width].to_i
  end

  def maze_start
    [0,0]
  end

  def maze_goal
    [size_params[:height].to_i - 1, size_params[:width].to_i - 1]
  end
end
