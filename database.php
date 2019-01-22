<?php
function connectDatabase() {
    return new mysqli('den1.mysql1.gear.host', 'pcre', 'Sd4A_25Ob9K-', 'pcre');
}

function sendDamage(
    $player,
    $day,
    $battle,
    $round,
    $boss,
    $damage,
    $compensate,
    $conn
){
    if($conn->connect_error) {
        if(!is_null($conn)){
            mysqli_close($conn);
        }
        return;
    }
    $sql=sprintf("SET SQL_SAFE_UPDATES=0;");
    $conn->query($sql);
    
    $sql=sprintf("DELETE FROM damage WHERE player='%d' AND day='%d' AND battle='%d' AND compensate='%d';",$player,$day,$battle,$compensate);
    $conn->query($sql);
    
    $sql=sprintf("SET SQL_SAFE_UPDATES=1;");
    $conn->query($sql);
    
    $sql=sprintf("INSERT into damage(player,day,battle,round,boss,damage,compensate) values('%d','%d','%d','%d','%d','%d','%d');",$player,$day,$battle,$round,$boss,$damage,$compensate);
    $conn->query($sql);
    
    $sql=sprintf("INSERT into damage_backup(player,day,battle,round,boss,damage,compensate) values('%d','%d','%d','%d','%d','%d','%d');",$player,$day,$battle,$round,$boss,$damage,$compensate);
    $conn->query($sql);
}
