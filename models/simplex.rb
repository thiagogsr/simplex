class Simplex
  include Helpers::SubscriptHelper

  attr_reader :restrictions, :z

  def initialize(restrictions, z, variables_count, restrictions_count)
    @restrictions = restrictions
    @z = z
    @variables_count = variables_count
    @restrictions_count = restrictions_count
  end

  def original_table
    @original_table ||= build_table
  end

  def steps
    @steps ||= perform
  end

  def variables
    @variables ||= begin
      variables_incognitas.map do |incognita|
        restriction = restrictions.find { |r| r.incognita.eql?(incognita) }
        [incognita, restriction ? restriction.value : 0]
      end.to_h
    end
  end

  private

  def perform
    [].tap do |steps|
      while @z.all_variables.any? { |variable| variable > 0 }
        step = Step.new

        step.join_value = @z.all_variables.max
        step.join_position = @z.all_variables.index(step.join_value)
        left_candidates = @restrictions.map do |t|
          begin
            [t.all_variables[step.join_position], (t.value / t.all_variables[step.join_position])]
          rescue ZeroDivisionError
            [0, 0]
          end
        end.to_h
        step.left_value = left_candidates.key(left_candidates.values.reject(&:zero?).min)
        step.left_position = left_candidates.keys.index(step.left_value)

        @restrictions.each_with_index do |restriction, index|
          if index.eql?(step.left_position)
            restriction.incognita = "x#{subscript_for(step.join_position)}"
            restriction.all_variables.map! { |value| value / step.left_value }
            restriction.value /= step.left_value
          else
            current_value = restriction.all_variables[step.join_position]
            restriction.all_variables.map!.with_index do |value, idx|
              value - (current_value * @restrictions[step.left_position].all_variables[idx])
            end
            restriction.value -= (current_value * @restrictions[step.left_position].value)
          end
        end

        @z.all_variables.map!.with_index do |value, index|
          value - (step.join_value * @restrictions[step.left_position].all_variables[index])
        end
        @z.value -= (step.join_value * @restrictions[step.left_position].value)

        step.table = build_table

        steps << step
      end
    end
  end

  def variables_incognitas
    @variables_incognitas ||= Array.new(@variables_count.to_i) { |i| "x#{subscript_for(i)}" }
  end

  def build_table
    [].tap do |new_table|
      restrictions_incognitas = Array.new(@restrictions_count.to_i) { |i| "f#{subscript_for(i)}" }

      new_table << [''] + variables_incognitas + restrictions_incognitas + ['b']
      @restrictions.each { |restriction| new_table << restriction.clone }
      new_table << @z.clone
    end
  end
end
