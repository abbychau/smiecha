# coding: utf-8

# Usage
# $ sudo bundle exec shotgun main.rb -p 80 -o 127.0.0.1

require 'sinatra'
require 'erb'
require 'haml'
require 'em-websocket'

set :bind, '127.0.0.1'
set :port, 13333
set :public_dir, './public/'

get '/' do
	haml :index
end
