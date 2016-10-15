$(document).ready(function() {
    $("#go").on('click', search);
    $("#search_box").on('keyup',search);
    $("html").on('click',function(){
        $("#suggestions_box").hide();
    });
});

function populate_search () {
    var search_options = [];
    var data = movies["movies"];
    for(var i = 0; i < data.length; i++)
        search_options[i] = "<b>" + data[i]["title"] + "</b>" + "(" + data[i]["year"] + ")" + ", Starring: " + data[i]["starring"];
    return search_options;
}

/*The previous function uses the JSON movies variable located the movies.js file
  to populate the search bar for real-time suggestions*/

function search () {
    var movie_titles = populate_search();
    var html = "";
    var value = $("#search_box").val(); // gets the value of the search bar
    var show = false;
    
    for(var i = 0; i< movie_titles.length;i++){
        var start = movie_titles[i].toLowerCase().search(value.toLowerCase().trim());
        if (start != -1){
            html += "<div class='sub_suggestions' data-item='" + movie_titles[i] + "' >";
            html += movie_titles[i].substring(0,start) + "<b>" + movie_titles[i].substring(start, start+value.length) + "</b>"
                    + movie_titles[i].substring(start+value.length, movie_titles[i].length);
            html += "</div>";
            show = true;
        }
    }
    if(show){
        $("#suggestions_box").html(html); //inserts html code
        $("#suggestions_box").children(".sub_suggestions").on('click', function(){
            var item = $(this).attr('data-item');
            $("#search_box").val(item);
            $("#suggestions_box").hide();
    });
    
        $("#suggestions_box").show();
    }
    else
        $("#suggestions_box").hide();
    
}