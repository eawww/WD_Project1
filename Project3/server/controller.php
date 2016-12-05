<?php
include "sanitization.php";
session_start(); //start the session


if (isset($_POST['search']) && is_session_active()) {
    $_SESSION['start'] = time();
    $search_params = sanitizeMYSQL($connection, $_POST['search']);

    $search_exploded = explode(" ", $search_params);
    $x = 0;
    $query = "SELECT car.picture_type, car.picture, carspecs.Make, carspecs.Model, carspecs.YearMade, car.Color, carspecs.size, car.ID "
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
    $array = array();
    while($row = mysqli_fetch_assoc($result)){
        $picture = 'data:' . $row['picture_type'] . ';base64,' . base64_encode($row['picture']);
        $resultrow = array('picture'=>$picture,
            'make'=>$row['Make'], 'model'=>$row['Model'],
            'year'=>$row['YearMade'], 'size'=>$row['size'], 'color'=>$row['Color'],
            'ID'=>$row['ID']);
        $array[]=$resultrow;
    }
    echo json_encode($array);
}


if (isset($_POST['rental_id']) && is_session_active()){
    $_SESSION['start'] = time();
    $CarID = $_POST['rental_id'];
    $UserID = $_SESSION["username"];
    $CurDate = date("Y-m-d");
    //echo $CurDate;
    $query = "INSERT INTO rental(rentDate, returnDate, status, CustomerID, carID)"
            . "VALUES('$CurDate', NULL, 2, '$UserID', '$CarID');";
    $result = mysqli_query($connection,$query);
    if($result)
        echo "success";
    else
        echo "failure";
}


if (isset($_POST['type'])== "logout" && is_session_active()) {
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
    echo "success";
}


function is_session_active() {
    return isset($_SESSION) && count($_SESSION) > 0 && time() < $_SESSION['start'] + 60 * 5; //check if it has been 5 minutes
}

?>
