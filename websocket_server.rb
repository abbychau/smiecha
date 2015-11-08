#coding: utf-8
require 'em-websocket'

Process.daemon(nochdir=true) if ARGV[0] == "-D"
connections = Array.new

EventMachine::WebSocket.start(:host => "echatto.herokuapp.com", :port => 51234) do |ws|
  ws.onopen {
    ws.send "server: ws connected"
    connections.push(ws) unless connections.index(ws)
  }
  ws.onmessage { |msg|
    puts "received "+msg
    ws.send msg if msg =~ /^mess\:/  #to myself
    connections.each {|con|
      con.send(msg) unless con == ws
    }
  }
  ws.onclose{puts "server: ws closed"}
end
