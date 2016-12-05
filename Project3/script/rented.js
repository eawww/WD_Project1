$(document).ready(init);

function init() {
    $("#rented-cars").on("click", rented_cars);
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


