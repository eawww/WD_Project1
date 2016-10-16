$(document).ready(function(){
    $("#grid_button").attr('src','icons/grid_pressed.jpg');
    //initial_gridification();
    $("#grid_button").attr('src','icons/grid_pressed.jpg');
    $("#list_button").attr('src','icons/list.jpg');
    var data = movies["movies"];
    var template = $("#grid-template").html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(data);
    $("#movie_display").html(html);
        
    $("#grid_button").on('click', function(){
        $("#grid_button").attr('src','icons/grid_pressed.jpg');
        $("#list_button").attr('src','icons/list.jpg');
        var data = movies["movies"];
        var template = $("#grid-template").html();
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(data);
        $("#movie_display").html(html);
    });
    
    $("#list_button").on('click', function(){
        $("#grid_button").attr('src','icons/grid.jpg');
        $("#list_button").attr('src','icons/list_pressed.jpg');
        var data = movies["movies"];
        var template = $("#list-template").html();
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(data);
        $("#movie_display").html(html);
    });
});

function grid_button_clicked(){
    
}

function list_button_clicked(){

}

