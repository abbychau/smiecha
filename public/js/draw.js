window.addEventListener("load", function(){
  var drawParams = {
    drawFlag : false,
    oldX     : 0,
    oldY     : 0,
    colorList : {
      "black"   : "rgba(0,0,0,1)",
      "blue"    : "rgba(0,0,255,1)",
      "red"     : "rgba(255,0,0,1)",
      "magenta" : "rgba(255,0,255,1)",
      "green"   : "rgba(0,255,0,1)",
      "cyan"    : "rgba(0,255,255,1)",
      "yellow"  : "rgba(255,255,0,1)",
      "white"   : "rgba(255,255,255,1)"
    },
    penColor  : "rgba(255,0,0,1)",
    brushSize : 1
  }

  var body = document.getElementById("body");
  var can = document.getElementById("myCanvas");
  var context = can.getContext("2d");

  body.addEventListener("mousemove", function draw(e){
    if (!drawParams.drawFlag) return;
    var rect = can.getBoundingClientRect();  
    var x = e.clientX - rect.left;
    console.log([e.clientX, rect.left, e.clientX - rect.left]);
    var y = e.clientY - rect.top;
    context.strokeStyle = drawParams.penColor;
    context.lineWidth   = drawParams.brushSize;
    context.lineJoin= "round";
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(drawParams.oldX, drawParams.oldY);
    context.lineTo(x, y);
    ws.send([drawParams.oldX, drawParams.oldY, x, y, drawParams.brushSize, drawParams.penColor]);
    context.stroke();
    context.closePath();
    drawParams.oldX = x;
    drawParams.oldY = y;
  }, true);

  body.addEventListener("mousedown", function(e){
    var rect = can.getBoundingClientRect();  
    drawParams.drawFlag = true;
    drawParams.oldX = e.clientX - rect.left;
    drawParams.oldY = e.clientY - rect.top;
  }, false);

  body.addEventListener("mouseup", function(){
    drawParams.drawFlag = false;
  }, false);

  $("#slider").slider({
    min: 1,
    max: 100, // ブラシの最大サイズ
    value : 1,  // 最初のブラシサイズ
    slide : function(evt, ui){
      drawParams.brushSize = ui.value;
    }
  });

  $("#flat").spectrum({
    flat: true,
    showInput: false,
    showInitial: true,
    showAlpha: true,
    color: "rgba(0, 0, 0, 0.99)",
    move: function(color){
      drawParams.penColor = color.toRgbString();
    }
  });

}, true);
  
function saveData(){
  var can = document.getElementById("myCanvas");
  Canvas2Image.saveAsPNG(can);    // PNG形式で保存
}

