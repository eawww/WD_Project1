$(document).ready(function() {
    var x = populate_search();
});

function populate_search () {
    var search_options = [];
    var data = movies["movies"];
    for(var i = 0; i < data.length; i++)
        search_options[i] += data[i]["title"];
    return search_options;
}


/*The previous function uses the JSON movies variable located the movies.js file
  to populate the search bar for real-time suggestions*/