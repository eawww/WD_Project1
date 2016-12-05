<?php

include "sanitization.php";
require_once 'connection.php';
$connection = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
if(!$connection)
    die("Unable to connect to MySQL: " . mysqli_connect_errno ());
session_start();
$return = "fail"; //the value that is returned to Ajax

if (is_session_active()){
    $_SESSION['start'] = time(); //reset the session start time
    $userID = $_SESSION["username"]; //get userid from session variable
    $query = "SELECT car.Picture_type, car.Picture, carspecs.Make, carspecs.Model, carspecs.YearMade, carspecs.Size, rental.ID, rental.rentDate FROM rental JOIN car ON rental.carID = car.ID JOIN carspecs ON car.CarSpecsID = carspecs.ID WHERE rental.CustomerID = '$userID' AND rental.status = 1";
    $result = mysqli_query($connection,$query);
    $array = array();
    while($row = mysqli_fetch_assoc($result)){
        $picture = 'data:' . $row['Picture_type'] . ';base64,' . base64_encode($row['Picture']);
        $resultrow = array('picture'=>$picture,
            'make'=>$row['Make'],'model'=>$row['Model'],
            'year'=>$row['YearMade'],'size'=>$row['Size'],'rental_ID'=>$row['ID'],
            'rent_date'=>$row['rentDate']);
        $array[]=$resultrow;
    }
    echo json_encode($array);
}
else {
    echo "session not active.";
}




function is_session_active() {
    return isset($_SESSION) && count($_SESSION) > 0 && time() < $_SESSION['start']+60*10;
}
?>

