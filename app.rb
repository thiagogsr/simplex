require 'sinatra'

Dir[File.expand_path('../helpers/*.rb', __FILE__)].each { |f| require f }
Dir[File.expand_path('../models/*.rb', __FILE__)].each { |f| require f }

helpers do
  include Helpers::SubscriptHelper
end

get '/' do
  erb :index
end

post '/calculate' do
  variables_count = params['variables'].size
  restrictions_count = params['restrictions'].size

  restrictions = []
  params['restrictions'].values.each_with_index do |item, index|
    restriction = Restriction.new
    restriction.value = item.pop.to_r
    restriction.incognita = "f#{subscript_for(index)}"
    restriction.variables = item.map(&:to_r)
    restriction.extra_variables = Array.new(restrictions_count) { |f| f.eql?(index) ? 1 : 0 }
    restrictions << restriction
  end

  z = Restriction.new.tap do |formule|
    formule.incognita = '- Z'
    formule.variables = params['variables'].map(&:to_r)
    formule.extra_variables = Array.new(restrictions_count) { 0 }
    formule.value = 0
  end

  @simplex = Simplex.new(restrictions, z, variables_count, restrictions_count)

  erb :result
end
