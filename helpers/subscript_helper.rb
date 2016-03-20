module Helpers
  module SubscriptHelper
    def subscript_for(index)
      subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
      result = ''
      (index.to_i + 1).to_s.each_char do |i|
        result << subscript[i.to_i]
      end
      result
    end

    def fraction_for(rational)
      (rational.denominator.eql?(1) ? rational.numerator : rational).to_s
    end
  end
end
