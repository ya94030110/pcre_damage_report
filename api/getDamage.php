<?php
require_once "../database.php";

// calling database.php function to establish the connection to MySQL server
if(isset($_GET['player']))
{
    // print the data for debug
    // echo $_POST['data'];
    $player = $_GET['player'];
    $result = getDamage(
        $player
    );
    exit($result);
}
?>