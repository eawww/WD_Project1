$(document).ready(init);

function init() {
    $("#logout-link").on("click", logout);
    $("#find-car").on("click", search);
    //$(".car_rent").on("click", rent);
}


$(document).on("click", "div.car_rent", function(){
       var rent_ID = $(this).attr('ID');
       rent(rent_ID);
    });


function logout(){
    $.ajax({
        method: "POST",
        url: "server/controller.php",
        dataType: "text",
        data: {type: "logout"},
        success: function(data){
            if ($.trim(data)=="success") {
                window.location.assign("index.html");
            }
        }
    });
}

function search(){
    $.ajax({
        method: "POST",
        url: "server/controller.php",
        dataType: "json",
        data: {search: $("#find-car-input").val()},
        success: function(data){
            var cars_template=$("#find-car-template").html();
            var html_maker=new htmlMaker(cars_template);
            var html=html_maker.getHTML(data);
            $("#search_results").html(html);
        }
    });
}

function rent($rent_ID){
    $.ajax({
        method: "POST",
        url: "sever/controller.php",
        dataType: "text",
        data: {rental_id: $rent_ID},
        success: function (data){
            if(data == "success"){
                alert("Car Successfully Rented!");
            }
            else
                alert("Somthing Went Wrong!");
        }
    });
}


