# coding: utf-8

# Usage
# $ sudo bundle exec shotgun main.rb -p 80 -o 172.16.230.57

require 'sinatra'
require 'erb'
require 'haml'
require 'em-websocket'

set :bind, '172.16.230.57'
set :port, 80
set :public_dir, './public/'

get '/' do
	haml :index
end
