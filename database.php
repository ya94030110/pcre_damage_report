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

function getDamage($player_id) {
    $mysqli = new mysqli('den1.mysql1.gear.host', 'pcre', 'Sd4A_25Ob9K-', 'pcre');
	if($mysqli->connect_error){
        debug_to_console("Connection failed: ".$mysqli->connect_error);
        $mysqli->close();
		return null;
    }
    
    $sql=sprintf("select day, battle, round, boss, damage, compensate  from damage where player='%d' order by day, battle, compensate + 0 ASC;", $player_id);
    // debug_to_console("sql:".$sql);
    $result = $mysqli->query($sql);
    if(!$result){
		debug_to_console("Failed to select captions data from caption table!" . mysqli_error($mysqli));
		$mysqli->close();
		return null;
	}
    $rows=mysqli_num_rows($result);
    // debug_to_console("returned rows:".$rows);
    if($rows!==0){
        $damage_data = [];
        while($row = $result->fetch_assoc()) {
            $damage_item = [
                'day' => $row['day'],
                'battle' => $row['battle'],
                'round' => $row['round'],
                'compensate' => $row['compensate'],
                'boss' => $row['boss'],
                'damage' => $row['damage']
            ];
            array_push($damage_data, $damage_item);    
        }

        $mysqli->close();

        return json_encode($damage_data);
    } else {
        return null;
    }

}

function debug_to_console( $data, $context = 'Debug in Console' ) {

    // Buffering to solve problems frameworks, like header() in this and not a solid return.
    ob_start();

    $output  = 'console.info( \'' . $context . ':\' );';
    $output .= 'console.log(' . json_encode( $data ) . ');';
    $output  = sprintf( '<script>%s</script>', $output );

    echo $output;
}
