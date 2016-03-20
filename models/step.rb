class Step
  include Helpers::SubscriptHelper
  attr_accessor :join_value, :join_position, :left_value, :left_position, :table

  def join
    @join ||= "x#{subscript_for(join_position)}"
  end

  def left
    @left ||= "f#{subscript_for(left_position)}"
  end
end
