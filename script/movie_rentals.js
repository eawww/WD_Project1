//Eric Wilson and Michael Warnock
//CS490WD Web Development Project 1
//2016-10-17

$(document).ready(function() {
    $("#go").on('click', search_button);
    $("#search_box").on('keyup',live_search);
    $("html").on('click',function(){
        $("#suggestions_box").hide();
    });
    $("#sort_selector").on('change', sort);
});

//sorts data by year for initial display
var data = movies['movies'];
var sort_year = false;
var search_clicked = false;

data.sort(function(a,b) {
    if ( a.year < b.year )
        return -1;
    if ( a.year > b.year )
        return 1;
    return 0;
} );
var movie_titles = populate_search();

function sort(){
    
    //var select = $("#sort_selector");
    //var answer = select.options[select.selectedIndex].value;
    if(sort_year == true){
    sort_year = false;
    //sort data by year
    data.sort(function(a,b) {
        if ( a.year < b.year )
            return -1;
        if ( a.year > b.year )
            return 1;
        return 0;
} );
    }
    else{
    //sort data by rating
    sort_year = true;
    data.sort(function(a,b) {
        if ( a.rating < b.rating )
            return 1;
        if ( a.rating > b.rating )
            return -1;
        return 0;
} );    
    }
    movie_titles = populate_search();
    search_button();
    
}



function populate_search () {
    var search_options = [];
    for(var i = 0; i < data.length; i++)
        search_options[i] = data[i]["title"] + "(" + data[i]["year"] + ")" + ", Starring: " + data[i]["starring"];
    
    return search_options;
}

/*The previous function uses the JSON movies variable located the movies.js file
  to populate the search bar for real-time suggestions*/



function live_search () {
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

function search_button(){
    search_clicked = true;
    var template = $("#list-template").html();
    var temp = $("#movie_display").attr("class");
    if(temp == "grid")
        template = $("#grid-template").html();
    make_html(template);
}



function find_index(){
    /*Finds every occurence of the submitted text in the movie data and returns all
      movies' indicies that match */
    var index_array = "";
    var rgexp = new RegExp($("#search_box").val(), 'i');
    for(var i = 0; i < movie_titles.length; i++){
        if(rgexp.test(movie_titles[i]) || movie_titles[i] == $("#search_box").val())
            index_array += i;
        }
    return index_array;
}

function make_html(layout){
    var index = find_index();
    var html_maker = new htmlMaker(layout);
    var all_html = "";
    //var display_data = movies["movies"];
    if(search_clicked && index != ""){
            for(var j = 0; j < index.length; j++){
            var temp = index[j];
            var display_data = movies["movies"][temp];
            var html = html_maker.getHTML(display_data);
            all_html += html;
        }}
        else{
            var display_data = movies["movies"];
            all_html = html_maker.getHTML(display_data);
        }
        $("#movie_display").html(all_html);
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
}
    

    
        
