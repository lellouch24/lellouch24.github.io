var DATA_SPECIALTIES =[];
//format 
// {
//     placeID: placeID,
//     specialties: [{ specialty: name , price: 123}}]
//}

var DATA_VISITORS =[];
//format 
// {
//     placeID: placeID,
//     visitors: [{ date: '2021-10-19',price: 59, foods: specialtySelected, satisfied: (-1,0,1) }]
//}

var visitors_Data = [
    {date: '2021-10-17', price: 190, foods: 'Kare Kare', satisfied: '1'},
    {date: '2021-10-17', price: 205, foods: 'Sinigang', satisfied: '1'},
    {date: '2021-10-17', price: 190, foods: 'Kare Kare', satisfied: '1'},
    {date: '2021-10-17', price: 150, foods: 'Adobo', satisfied: '1'},
    {date: '2021-10-18', price: 190, foods: 'Kare Kare', satisfied: '1'},
    {date: '2021-10-18', price: 190, foods: 'Kare Kare', satisfied: '1'},
    {date: '2021-10-19', price: 150, foods: 'Adobo', satisfied: '0' },
    {date: '2021-10-19', price: 205, foods: 'Sinigang', satisfied: '-1'},
]
var specialtiesData = [
    {specialty: "Adobo", price: 150 },
    {specialty: "Sinigang", price: 205 },
    {specialty: "Kare Kare", price: 190 }
];
function addDatatoPlace(placeID){
    //Add visitors data
    var getVisitorData = getVisitDataByPlaceID(placeID);
    var specialty = checkifPlaceHasSpecialty(placeID);
    DATA_VISITORS[getVisitorData.index].visitors=visitors_Data;
    DATA_SPECIALTIES[specialty.index].specialties=specialtiesData;

}