
$(document).ready(function(){
    $("#specialty-closer").click(function(){
        $(".specialty-div").fadeToggle();
    });
    $("#specialty-form").submit(function(e){
        e.preventDefault();
        var specialty = $("#specialty-name").val(); 
        var price = $("#specialty-price").val(); 
        AddSpecialty(clickedPlaceID,specialty,price);
        $(".specialty-div").fadeToggle();
        $("#specialty-name").val(""); 
        $("#specialty-price").val(""); 
        
        if($("#res_det-div").is(":visible")){
         loadSpecialty(clickedPlaceID);
        }
        alert("Specialty saved");
        
    });
})
//
function showSpecialtyModal(){
    if($(".specialty-div").is(":hidden")){
        $(".specialty-div").fadeToggle();
    }
}

function AddSpecialty(placeID,specialty,price){
    //get place specialty
    var specialtiesSaved = checkifPlaceHasSpecialty(placeID);
    //Format new specialty data 
    var specialtiesCreated = {
        specialty: specialty,
        price: price
    } 
    //Check if place already have specialties
    if(specialtiesSaved){
        //add specialty
        DATA_SPECIALTIES[specialtiesSaved.index].specialties.push(specialtiesCreated);
    }else{
        var newSpecialty = {
            placeID: placeID,
            specialties: [specialtiesCreated]
        }
        //add place to specialty
        DATA_SPECIALTIES.push(newSpecialty);
    } 
    addSpecialtyOption(placeID);
}

function checkifPlaceHasSpecialty(placeID){
    var specialtyData;
    for(let i = 0; i < DATA_SPECIALTIES.length;i++ ){
        if(placeID == DATA_SPECIALTIES[i].placeID){
            specialtyData = {
                data: DATA_SPECIALTIES[i],
                index: i
            };
            break;
        }
    }
    return specialtyData;
}

function getSpecialtiesbyPlaceID(placeID){
    var retSpecialties;
    for(let i = 0; i < DATA_SPECIALTIES.length;i++ ){
        if(placeID == DATA_SPECIALTIES[i].placeID){
            retSpecialties = DATA_SPECIALTIES[i].specialties
            break;
        }
    }
    return retSpecialties;
}