$(document).ready(init);

function init() {
    $("#logout-link").on("click", logout);
    $("#find-car").on("click", search);
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
        }
    });
}
