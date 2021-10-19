
var map; 
var types = [];
var markers = new Array();
var userType;

var drawingManager;
var directionsService;
var directionsRenderer;
var drew;
var clickedPlaceID;
$(document).ready(function(){
  userType = getParameterByName("usertype");
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 10.3752126, lng: 123.8612509 },
    zoom: 12,
    zoomControl:false,
    mapId: '35bdfb427b78b903'
  });
  var cebu = new google.maps.LatLng(10.3752126,123.8612509);
  var request = { 
    location: cebu,
    placeId: "ChIJ_S3NjSWZqTMRBzXT2wwDNEw",   
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, getRestaurants);
  
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  drawingManager = new google.maps.drawing.DrawingManager();
  initDrew();
} 
