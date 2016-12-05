$(document).ready(init);

function init() {
    $("#returned-cars").on("click", returned_cars);
}

function returned_cars(){
    $.ajax({
        method: "GET",
        url: "server/returned.php",
        dataType: "json",
        data: {search: $("#find-car-input").val()},
        success: function(data){
            var returned_template=$("#returned-car-template").html();
            var html_maker=new htmlMaker(returned_template);
            var html=html_maker.getHTML(data);
            $("#returned_cars").html(html);
        }
    });
}

