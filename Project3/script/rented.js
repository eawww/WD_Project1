$(document).ready(init);

function init() {
    $("#rented-cars").on("click", rented_cars);
    $(document).on("click", "div.return_car", function(){
       var rent_ID = $(this).attr('data-rental-id');
       return_car(rent_ID);
    });
}

function return_car(rent_ID){
    alert(rent_ID);
}

function rented_cars() {
    $.ajax({
        method: "POST",
        url: "server/rented.php",
        dataType: "json",
        data: {search: $("#find-car-input").val()},
        success: function(data){
            var rented_template=$("#rented-template").html();
            var html_maker=new htmlMaker(rented_template);
            var html=html_maker.getHTML(data);
            $("#rented_cars").html(html);
        }
    });
}


