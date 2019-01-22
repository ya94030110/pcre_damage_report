<?php
require_once "../database.php";
if(isset($_POST['player'], $_POST['day'], $_POST['battle'], $_POST['round'], $_POST['boss'], $_POST['damage'], $_POST['compensate'])) {  //checking the request
  // calling database.php function to establish the connection to MySQL server
  $conn = connectDatabase();
  // print the data for debug
  // echo $_POST['data'];
  $player = $_POST['player'];
  $day = $_POST['day'];
  $battle = $_POST['battle'];
  $round = $_POST['round'];
  $boss = $_POST['boss'];
  $damage = $_POST['damage'];
  $compensate = $_POST['compensate'];
  $result = sendDamage(
    $player,
    $day,
    $battle,
    $round,
    $boss,
    $damage,
    $compensate,
    $conn
  );
  $discription = mysqli_error($conn);
  $ret = [
    'discription' => $discription
  ];
  exit(json_encode($ret));
}
?>