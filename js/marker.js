
function getRestaurants(results, status) { 

    types = results.map(item => item.types);
    types = formTypes(types); 
  
    const infoWindow = new google.maps.InfoWindow();
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var randomPrice = Math.floor(Math.random() * (300 - 150 + 1) + 150);
        AddSpecialty(results[i].place_id,"Cebu Specialty",randomPrice);
        DATA_VISITORS.push({
          placeID: results[i].place_id,
          visitors: []
        });
        createMarker(results[i],infoWindow);
      }
      var radomIndex =  Math.floor(Math.random() * (results.length-1 - 1 + 1) + 1);
      console.log("Add defined data to " + results[radomIndex].name);
      addDatatoPlace(results[radomIndex].place_id) //Add defined data to place;
      //loadStatistic("ChIJD1y1B0yfqTMRx8D4vO1rDZk");
    }
  }
  
function formTypes(types){
  var returnTypes=[]; 
  for(let i =0; i < types.length; i++){
    for(let x = 0; x < types[i].length; x++){
     if(!returnTypes.includes(types[i][x])){
      var append = "<li><input id='"+types[i][x]+"' type='checkbox' value='"+types[i][x]+ "'/>"
      +" <label  for='"+types[i][x]+"'> "+types[i][x]+"</label> <li>"
      $("#resaurant-type").append(append);
      
      $("#" + types[i][x]).click(function(){ 
         $("#resaurant-type li input[type='checkbox']:not(#"+types[i][x]+")").prop("checked",false);
          var isChecked = $(this).is(":checked");
          var type = $(this).val();
          toggleMarkers(type,isChecked);
      });
       returnTypes.push(types[i][x]);
     }
    }
   } 
   return returnTypes;
}


function createMarker(results,infoWindow){
    const image = {
        url: results.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
        types: results.types
      }; 

      var marker =  new google.maps.Marker({
        icon: image,
        position: results.geometry.location,
        map,
        title: results.name 
    }); 

  marker.setMap(map);  
  markers.push(marker);
  marker.addListener("click", () => {
    clickedPlaceID = results.place_id ;
    infoWindow.close(); 
    infoWindow.setPosition(results.geometry.location);
    var isOpen;  
    var ll = results.geometry.location.lat() + "," + results.geometry.location.lng()
    try{ isOpen = results.opening_hours.open_now ; }catch{}
   
    var business = ((isOpen) ? "<span style='color:green'>Open</span>" : "<span style='color:red'>Closed</span>"); 
    
    var addSpecialty =  "<button href='#' style='text-decoration:none;margin-top:10px'"
      +" onclick='showResDetails(\""+ results.name + "\")' >Show More Details</button>";

    var visited =  "<button href='#' style='text-decoration:none;margin-top:10px'"
      +" onclick='visitPlace()'  >I visited this place</button>";

    var divButton = "<div class='markeradd-info' style='width:100%'>"
    +"<div style='width:50%;float:left'>"+ addSpecialty +"</div>"
    +"<div style='width:50%;float:right'>"+visited +"</div>"
    +"</div>";
  
    var content = results.name+ "<br/>" + business + "<br/>"
    + "<span>"+results.formatted_address+"</span><br />"
    + "<a href='#' onclick='showDirection(\""+ ll + "\")'>Show Direction</a><br/>"
    + divButton; 
    infoWindow.setContent(content);
    infoWindow.open(marker.getMap(), marker);
  });
}
 
function showDirection(restaurant){
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(map);
    if (navigator.geolocation) {
      currentPosition =  navigator.geolocation.getCurrentPosition(
        function (position){ 
          var currLocation =  position.coords.latitude + "," + position.coords.longitude;
            var request = {
              origin:currLocation,
              destination: restaurant, 
              travelMode: "DRIVING"
          };
          directionsService.route(request, function(response, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(response);
            }
          });
        }
      );
    } 
  
  }
  
function toggleMarkers(type,checked){
    if(checked){
      for(let i = 0; i < markers.length; i++){
        if(markers[i].icon.types.includes(type)){
          markers[i].setMap(map); 
        }else{
          markers[i].setMap(null); 
        }
      }
    }else{
      setAllMap(map);
    }
}


function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
  }


function addSpecialty(){
  var ans = confirm("Add specialty?");
  
}