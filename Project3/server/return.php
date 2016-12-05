<?php
include "sanitization.php";
require_once 'connection.php';
$connection = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
if(!$connection)
    die("Unable to connect to MySQL: " . mysqli_connect_errno ());
session_start();

if (isset($_POST["rentID"])){
    $rentID = $_POST["rentID"];
    $userID = $_SESSION["username"];
    $query = "UPDATE rental r JOIN car c ON r.carID = c.ID SET r.status = 2, c.Status = 1, r.returnDate = NOW() WHERE r.ID = $rentID;";
}   $result = mysqli_query($connection,$query);
    if(!$result){
        echo "failure";
    }
    else{
        echo "success";
    }
?>

