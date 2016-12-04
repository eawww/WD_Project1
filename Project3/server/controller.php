<?php
include "sanitization.php";
session_start(); //start the session
$result = "";
//only process the data if there a request was made and the session is active
if (isset($_POST['type']) && is_session_active()) {
    // session_regenerate_id(); //regenerate the session to prevent fixation
    $_SESSION['start'] = time(); //reset the session start time
    $request_type = sanitizeMYSQL($connection, $_POST['type']);
    switch ($request_type) { //check the request type
        /*case "info":
            $result = get_info($connection);
            break;
        case "courses":
            $result = get_courses($connection);
            break;*/
        case "logout":
            logout();
            $result= "success";
            break;
    }
    echo $result;
}
if (isset($_POST['search']) && is_session_active()) {
    $_SESSION['start'] = time();
    $search_params = sanitizeMYSQL($connection, $_POST['search']);
    $result = get_cars($search_params, $connection);
    echo $result;
}


function is_session_active() {
    return isset($_SESSION) && count($_SESSION) > 0 && time() < $_SESSION['start'] + 60 * 5; //check if it has been 5 minutes
}


//Function to search database for available rental cars based on parameters.
function get_cars($search_params, $connection){
    $final = array();
    $final["search_results"] = array();
    $search_exploded = explode(" ", $search_params);
    $x = 0;
    $query = "SELECT car.picture_type, car.picture, carspecs.Make, carspecs.Model, carspecs.YearMade, car.Color, carspecs.size, car.ID"
            . "FROM car INNER JOIN carspecs ON car.carSpecsID = carspecs.ID ";
    foreach($search_exploded as $search_each){
        
        if ($x == 0){
            $query .= "WHERE (carspecs.Make LIKE '%$search_each%' OR carspecs.model LIKE '%$search_each%' OR carspecs.YearMade LIKE '%$search_each%'"
            . "OR carspecs.size LIKE '%$search_each%' OR car.Color LIKE '%$search_each%' ";
        }
        else{
            $query .= "OR carspecs.Make LIKE '%$search_each%' OR carspecs.model LIKE '%$search_each%' OR carspecs.YearMade LIKE '%$search_each%'"
            . "OR carspecs.size LIKE '%$search_each%' OR car.Color LIKE '%$search_each%'";
        }
        $x++;
    }
    
    $query .= ") AND car.status=1;";
    $result = mysqli_query($connection, $query);
    //CHECK IF QUERY IS WORKING!!!
    if (!$result)
        return json_encode($array);
    else{
        $row_count = mysqli_num_rows($result);
        for($i = 0; $i < $row_count; $i++){
            $row = mysqli_fetch_array($result);
            $array = array();
            $array["picture"] = 'data:' . $row["Picture_type"] . ';base64,' . base64_encode($row["Picture"]);
            $array["make"] = $row["Make"];
            $array["model"] = $row["Model"];
            $array["year"] = $row["YearMade"];
            $array["color"] = $row["Color"];
            $array["size"] = $row["Size"];
            $array["ID"] = $row["ID"];
            $final["search_results"][] = $array;
        }
    }
    return json_encode($final);
}


function logout() {
    // Unset all of the session variables.
    $_SESSION = array();
// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]
        );
    }
// Finally, destroy the session.
    session_destroy();
}
?>
