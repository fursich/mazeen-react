module Forms
  class MazeForm
    include Virtus.model

    INITIAL_MAZE = []
    INITIAL_WIDTH = 10
    INITIAL_HEIGHT = 10

    CELL_BLOCK = 'block'
    CELL_SPACE = 'space'

    attribute :maze,   Array,   default: INITIAL_MAZE
    attribute :height, Integer, default: INITIAL_HEIGHT
    attribute :width,  Integer, default: INITIAL_WIDTH

    def to_hash
      @height.times.each_with_object({}) do |row, result|
        @width.times do |col|
          cell = @maze.dig(row).try(:dig, col)
          result[[row, col]] = (cell == CELL_BLOCK) ? nil : 1
        end
      end
    end

  end
end
