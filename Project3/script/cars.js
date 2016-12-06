$(document).ready(init);

function init() {
    $("#logout-link").on("click", logout);
    $("#find-car").on("click", search);
    /*$(document).on("click", "div.car_rent", function(){
       var rent_ID = $(this).attr('id');
       rent(rent_ID);
    });*/
    //$(".car_rent").on("click", rent);
}




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
            $("div[class=car_rent]").on("click", function(){rent(this);});
        }
    });
}

function rent(rent_ID){
    var car_id=$(rent_ID).attr("id");
    $.ajax({
        method: "POST",
        url: "server/controller.php",
        dataType: "text",
        data: {rental_id: car_id},
        success: function (data){
            if($.trim(data) == "success"){
                alert("Car Successfully Rented!");
                search();
            }
            else
                alert("Somthing Went Wrong!");
        }
    });
}


