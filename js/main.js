var canvas = document.querySelector( "#myCanvas" );
canvas.setAttribute( "width", "900px" );
canvas.setAttribute( "height", "600px" );
canvas.style.backgroundColor = "black";

var context = canvas.getContext( "2d" );
var drawingPositionX = [];
var drawingPositionY = [];
var isDrawing = [];
var isDrawingDot = [];

var paint = false;
var isDot = false;

canvas.addEventListener( "mousedown", function( e ) {
  // Engage on painting
  paint = true;
  isDot = true;
  console.log( e );
  console.log( e.offsetX, e.offsetY );
  addDrawingPath( e.offsetX, e.offsetY, paint, isDot );
  draw();
} );

canvas.addEventListener( "mousemove", function( e ) {
  isDot = false;
  if( paint ) {
    addDrawingPath( e.offsetX, e.offsetY, paint, isDot );
    draw();
  }
  else {
    addDrawingPath( e.offsetX, e.offsetY, paint, isDot );
  }
} );

canvas.addEventListener( "mouseup", function( e ) {
  // No more painting
  paint = false;
  isDot = false;
} );

canvas.addEventListener( "mouseout", function( e ) {
  // No more painting
  paint = false;
  isDot = false;
} );

var addDrawingPath = function( positionX, positionY, isDrawingOnCanvas, isDot ) {
  drawingPositionX.push( positionX );
  drawingPositionY.push( positionY );
  isDrawing.push( isDrawingOnCanvas );
  isDrawingDot.push( isDot );
};

var draw = function() {
  // Just clear it
  context.clearRect( 0, 0, 400, 400 );

  context.strokeStyle = "#dcdcdc";
  context.lineJoin = "round";
  context.lineWidth = "5";

  context.beginPath(); // Start the path tracking

  for( var i = 0; i < isDrawing.length; i++ ) {
    if( isDrawing[ i ] && !isDrawingDot[ i ] ) {
      // Define the drawing path
      context.moveTo( drawingPositionX[ i - 1 ], drawingPositionY[ i - 1 ] );
      context.lineTo( drawingPositionX[ i ], drawingPositionY[ i ] );

      // Do the drawing
      context.stroke();
    } else if( isDrawingDot[ i ] ) {
      var pointX = drawingPositionX[ i ];
      var pointY = drawingPositionY[ i ];

      // Draw the dots!
      context.strokeRect( pointX, pointY, 1, 1 );
    }
  }

  context.closePath(); // End the path tracking
};
