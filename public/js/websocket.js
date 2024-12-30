$(function(){
  ws = new WebSocket("ws://127.0.0.1:51234");
  var can = document.getElementById("myCanvas");
  var context = can.getContext("2d");

  ws.onmessage = function(evt) {
    if(evt.data.match(/^mess\:/)){
      s = evt.data.substr("mess:", "");
      $("#msg").prepend("<p>"+ evt.data +"</p>");
    }else{
      v = evt.data.split(",")
      console.log(v);
      context.strokeStyle = v[5] + ',' + v[6] + ',' + v[7] + ',' + v[8];
      context.lineWidth = v[4];
      context.lineJoin= "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(v[0], v[1]);
      context.lineTo(v[2], v[3]);
      context.stroke();
      context.closePath();
    }
  };

  ws.onclose = function() {
    console.log("client: ws closed")
  };

  ws.onopen = function() {
    ws.send("client: ws connected");
  };

  $("#input").keypress(function(e){
    if(e.keyCode ==13){
      var val = ''
      val = 'mess:' + $("#input").val()
      ws.send(val)
      $("#input").val("")
    }
  });
});
