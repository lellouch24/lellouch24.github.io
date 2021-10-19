$(document).ready(function(){
    $("#res_det-closer").click(function(){
        $("#res_det-div").slideToggle();
    });
    $("#chart-closer").click(function(){
        $(".chart-div").slideToggle();
    })
    $("#res_det").click(function(){
        if($(".chart-div").is(":hidden")){
            $(".chart-div").fadeToggle();
        }
        loadStatistic(clickedPlaceID);
    })
})

function showResDetails(title){
    if($("#res_det-div").is(":hidden")){
        $("#res_det-div").slideToggle();
    }

    $("#res_det-header").html(title);
    //Get Visitor Data;
    loadVisit(clickedPlaceID);

    //Get Specialty Data;
    loadSpecialty(clickedPlaceID);
}

function loadVisit(placeID){
    var visitorsData =getVisitDataByPlaceID(placeID);

    var totalVisitors = visitorsData.data.visitors.length
    if(visitorsData){
        $("#res_det-visitor").html(totalVisitors);
    }else{
        $("#res_det-visitor").html(0);
    } 

    var satisfaction = visitorsData.data.visitors.reduce((a, b) => +a + +parseInt(b.satisfied), 0);
     
    var percentage = (satisfaction / parseInt(totalVisitors)) * 100;
    $("#res_det-neg").width("0%");
    $("#res_det-positive").width("0%");
    percentage = parseInt(percentage);
    if(percentage <0){
        percentage = percentage * -1;
        $("#res_det-neg").width(percentage + "%");
    }else{
        $("#res_det-positive").width(percentage + "%");
    }
}

function loadSpecialty(placeID){
    $("#res_det-specialty tbody tr").remove();
    var savedSpecialties = checkifPlaceHasSpecialty(placeID);
    var specialtyList = savedSpecialties.data.specialties;
    for(let i=0; i < specialtyList.length; i++){
        var markup = "<tr>"
            + "<td >" + specialtyList[i].specialty + "</td>"
            + "<td>" + specialtyList[i].price +  "</td>"
        + "</tr>"
        $("#res_det-specialty tbody").append(markup);
    }
} 

function getDistinctDates(data){
    var dates= [];
    for(let i=0; i<data.length; i++){
        if(!dates.includes(data[i].date)){
            dates.push(data[i].date);
        }
    }
    dates = dates.sort();
    return dates;
}

function getPricesByDate(data,dates){
    var prices = [];
    for(let i=0; i < dates.length; i++){
        var datesPrices = data.filter(obj => {
            return obj.date === dates[i];
        })
        var totalPrice = datesPrices.reduce((n, {price}) => n + price, 0);
        prices.push(totalPrice);
        // data.reduce((a, b) => +a + + b.price, 0);
    }
    return prices;
}

function getTotalCustomerByDate(data,dates){
    var customers = [];
    for(let i=0; i < dates.length; i++){
        var customersData = data.filter(obj => {
            return obj.date === dates[i];
        })
        customers.push(customersData.length);
        // data.reduce((a, b) => +a + + b.price, 0);
    }
    return customers;
}


function loadStatistic(PlaceID){
    
    var getVisitorData = getVisitDataByPlaceID(PlaceID);
    var visitorsArray= getVisitorData.data.visitors;
    var DistinctDates = getDistinctDates(visitorsArray);
    var prices = getPricesByDate(visitorsArray,DistinctDates)
    var dates = getTotalCustomerByDate(visitorsArray,DistinctDates)
    
    $('#myChart').remove(); // this is my <canvas> element
    $('#chart-container').append('<canvas id="myChart"><canvas>');

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {  
        type: 'line',
        data: {
            labels: DistinctDates,
            datasets: [{
                label: 'Total Revenue',
                data: prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            },
            // {
            //     label: 'Customer #',
            //     data: dates,
            //     backgroundColor: [
            //         'rgba(54, 162, 235, 0.2)',
            //     ],
            //     borderColor: [
            //         'rgba(54, 162, 235, 1)',
            //     ],
            //     borderWidth: 1
            // }
        ]   
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}