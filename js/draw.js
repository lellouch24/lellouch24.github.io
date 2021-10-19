
function initDrew() { 
    //Setting options for the Drawing Tool. In our case, enabling Polygon shape.
    drawingManager.setOptions({
        drawingMode : google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl : true,
        drawingControlOptions : {
            position : google.maps.ControlPosition.TOP_CENTER,
            drawingModes : [ 
                google.maps.drawing.OverlayType.RECTANGLE,
                google.maps.drawing.OverlayType.CIRCLE,
             ]
        },
        rectangleOptions : {
            strokeColor : '#6c6c6c',
            strokeWeight : 3.5,
            fillColor : '#926239',
            fillOpacity : 0.6,
            editable: false,
            draggable: false
        }   
    });
    // Loading the drawing Tool in the Map.
   
  
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
      drawingManager.setMap(null);
      drew= e.overlay; 
      var bounds =drew.getBounds();
      getMarkersByBOunds(bounds);
    });
   
  } 
  function getMarkersByBOunds(bounds){
      var ctr = 0;
      $("#select-list li").remove();
      for(let i = 0; i < markers.length; i++){
        if(bounds.contains(markers[i].getPosition())){ 
          var li = "<li>"+markers[i].title +"</li>"
          $("#select-list").append(li);
          ctr ++;
        }
      }
      if($("#selected-div").is(":hidden")){
        $("#selected-div").slideToggle();
      }
      if(ctr == 0){
        var li = "<li>There are no restaurant in the area</li>"
        $("#select-list").append(li);
      }
  }
  
  function draw(){
    if(drew != null)
    {
      drew.setMap(null);
    }
    drawingManager.setMap(map);
  }