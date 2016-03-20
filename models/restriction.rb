class Restriction
  include Helpers::SubscriptHelper

  attr_accessor :incognita, :variables, :extra_variables, :value

  def all_variables
    @all_variables ||= variables + extra_variables
  end

  def formule
    @formule ||= variables.map.with_index do |v, index|
      "#{fraction_for(v)}x#{subscript_for(index)}"
    end.join(' + ')
  end
end
