$(document).ready(init);

function init() {
    $("#rented-cars").on("click", rented_cars);
}

function rented_cars() {
    $("#search_results").html("Pig pig pig pig pig");
    $.ajax({
        method: "GET",
        url: "server/rented.php",
        dataType: "json",
        data: {search: $("#find-car-input").val()},
        success: function(data){
            var rented_template=$("#rented-template").html();
            var html_maker=new htmlMaker(rented_template);
            var html=html_maker.getHTML(data);
            $("#search_results").html(data);
        }
    });
}


