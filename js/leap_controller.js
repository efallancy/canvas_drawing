// Initialize the controller
var controller = new Leap.Controller( { enableGestures: true } );
controller.connect();

var isSpaceBarPress = false;

window.onkeypress = function( e ) {
  if( e.charCode === 32 ) {
    isSpaceBarPress = true;
  }
};

var translatePositionX = function( interactionBox, posX ) {
  var newPosX = 0;
  var canvasWidth = 900;

  // Computed in a way that the X-axis from Leap device
  //   then map it to the canvas
  newPosX = (
              (
                ( interactionBox.width / 2 ) + posX
              ) / interactionBox.width
            ) * canvasWidth

  return newPosX; // New position
};

var translatePositionY = function( posY ) {
  var startingAcceptedField = 50;
  var endingAcceptedField = 300;
  var canvasHeight = 600;

  var newPosY = ( posY / ( startingAcceptedField + endingAcceptedField ) ) * canvasHeight;
  newPosY = canvasHeight - newPosY
  return newPosY; // New position
}

controller.loop( function( frame ) {
  // if( isSpaceBarPress ) {
    console.log( frame );

    for( var i = 0; i < frame.hands.length; i++ ) {
      var hand = frame.hands[ i ];
      var interactionBox = frame.interactionBox; // Depth of field view

      if( hand.type === "right" || hand.type === "left" ) {
        console.log( "Hand", hand.type );
        console.log( "Pinch strength", hand.pinchStrength );
        console.log( "Grab strength", hand.grabStrength );

        console.log( "Index " + hand.type );
        console.log( "Extended", hand.indexFinger.extended );
        console.log( "Touch zone", hand.indexFinger.touchZone );
        console.log( "Touch distance", hand.indexFinger.touchDistance );

        console.log( "Tip position" );
        console.log( hand.indexFinger.tipPosition[ 0 ] ); // X
        console.log( hand.indexFinger.tipPosition[ 1 ] ); // Y
        console.log( hand.indexFinger.tipPosition[ 2 ] ); // Z

        // Relative position of index finger according to X, Y, Z
        var indexFingerX = hand.indexFinger.tipPosition[ 0 ];
        var indexFingerY = hand.indexFinger.tipPosition[ 1 ];
        var indexFingerZ = hand.indexFinger.tipPosition[ 2 ];

        if( hand.indexFinger.extended ) {
          addDrawingPath( translatePositionX( interactionBox, indexFingerX ),
                          translatePositionY( indexFingerY ),
                          true,
                          false );
          draw();
        } else {
          addDrawingPath( translatePositionX( interactionBox, indexFingerX ),
                          translatePositionY( indexFingerY ),
                          false,
                          false );
          draw();
        }

      } else {
        console.log( "Unknown" );
      }
    }

    // Just to make it able to log again - flag
    isSpaceBarPress = false;
  // }
} );

console.log( controller.connection );

controller.on( "ready", function() {
  console.log( "Service Version:", controller.connection.protocol.serviceVersion );
} );

controller.on( "connect", function() {
  console.log( "Connected using protocol:", controller.connection.opts.requestProtocolVersion );
});

controller.on('disconnect', function() {
  console.log("disconnect");
});

controller.on('focus', function() {
  console.log("focus");
});

controller.on('blur', function() {
  console.log("blur");
});

controller.on( "streamingStarted", function() {
  console.log( "Device connected" );
} );

controller.on( "streamingStopped", function() {
  console.log( "Device disconnected" );
  alert( "Where are you leap??!" );
} );
