$(document).ready(init);

function init() {
    $("#logout-link").on("click", logout);
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