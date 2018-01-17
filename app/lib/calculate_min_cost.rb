
module CalculateMinCost
  include ScoutGenerator

  def path_with_min_cost(maze, from:, to:, size:, algorithm: :minimum_turns)
    return 0 if from == to
    cost_incremental = cost_strategy(algorithm)
    min_cost = {}
    scouts = [Scout.new(pos: from, &cost_incremental)]
    min_path = nil

    size.times do
      new_scouts = []
      scouts.each do |scout|
        if scout.reached_to?(to)
          min_path = scout.path + [scout.pos]
          next
        end
        dirs = scout.accessible_dir(maze, min_cost)
        dirs.each do |dir|
          new_scouts << scout.move_to(dir, min_cost, &cost_incremental)
        end
      end

      break if new_scouts.empty?
      scouts = new_scouts
    end
    min_path
  end

  def cost_strategy(algorithm)
    if algorithm == :minimum_turns
      -> (dir, last_dir) {dir == last_dir ? 0 : 1}
    elsif algorithm == :minimum_distance
      -> (dir, last_dir) {return 1}
    else
      raise NotImplementedError
    end
  end

end
