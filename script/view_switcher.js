//Eric Wilson and Michael Warnock
//CS490WD Web Development Project 1
//2016-10-17

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
        $("#movie_display").attr('class', 'grid');
        //should make into a function
        var template = $("#grid-template").html();
        make_html(template);
    });
    
    $("#list_button").on('click', function(){
        $("#grid_button").attr('src','icons/grid.jpg');
        $("#list_button").attr('src','icons/list_pressed.jpg');
        $("#movie_display").attr('class', 'list');
        var template = $("#list-template").html();
        make_html(template);
        $(".rating-stars").each(function(){
            if ($(this).html() === "1"){
            $(this).html("&#9733<span style=\"color:lightgray;\">&#9734&#9734&#9734&#9734</span>");
            }
            else if ($(this).html() === "2"){
                $(this).html("&#9733&#9733<span style=\"color:lightgray;\">&#9734&#9734&#9734</span>");
            }
            else if ($(this).html() === "3"){
                $(this).html("&#9733&#9733&#9733<span style=\"color:lightgray;\">&#9734&#9734</span>");
            }
            else if ($(this).html() === "4"){
                $(this).html("&#9733&#9733&#9733&#9733<span style=\"color:lightgray;\">&#9734</span>");
            }
            else if ($(this).html() === "5"){
                $(this).html("&#9733&#9733&#9733&#9733&#9733");
            }
        });
        
    });
});


