$(document).ready(function(){
    $("#visited-closer").click(function(){
        $(".visited-div").slideToggle();
    });
    $("#visited-form").submit(function(e){
        e.preventDefault();
        if($("#visited-meal").val() != null &&  $("#visited-satify").val() !=null){
            saveVisit(clickedPlaceID);
        }else{
            alert("Please fill up the inputs");
        }
    }) 
})

function visitPlace(){
    if($(".visited-div").is(":hidden")){
        $(".visited-div").fadeToggle();
    } 

    $("#visited-satify").val("init")
    addSpecialtyOption(clickedPlaceID);
}
function addSpecialtyOption(placeID){
    var specialties = getSpecialtiesbyPlaceID(placeID);
    $("#visited-meal option").remove();
    $("#visited-meal").append("<option disabled selected>-Select a meal-</option>");
    for(let i =0; i <  specialties.length;i++){
        var markup = "<option value='"+specialties[i].price+ "'>" + specialties[i].specialty + "</option>"
        $("#visited-meal").append(markup);
    }
}
function saveVisit(placeID){
    var visitorsData = getVisitDataByPlaceID(placeID);
    var data = { 
                date: DATE_TODAY,
                price: $("#visited-meal").val(), 
                foods: $("#visited-meal option:selected").html(), 
                satisfied: $("#visited-satify").val()
            }

    DATA_VISITORS[visitorsData.index].visitors.push(data);
    $(".visited-div").fadeToggle();
    alert("Visit saved!");
    if($("#res_det-div").is(":visible")){
        loadVisit(placeID);
    } 
}

function getVisitDataByPlaceID(placeID){
    var visitorsData;
    for(let i = 0; i < DATA_VISITORS.length;i++ ){
        if(placeID == DATA_VISITORS[i].placeID){
            visitorsData = {
                data: DATA_VISITORS[i],
                index: i
            };
            break;
        }
    } 
    return visitorsData;
}
