<?php
// require_once 'config/config.php';

// if ($_POST['param']) {
//   var_dump($_POST['param']);
//   echo '</br></br>';
// }

// if (isset($_POST)) {
//   $routes = mysqli_query($connection, "SELECT * FROM `routes`");
//   while( $route = mysqli_fetch_assoc($routes) ) {
//     $arr[] = $route;
//   }
//   // var_dump($_POST);
//   // echo '<br><br>';
//   echo json_encode($arr);
// }

// if ($_POST->territory) {
//   var_dump($_POST);

//   $routes = mysqli_query($connection, "SELECT * FROM `routes` WHERE `territory` = Плато Путорана");
//   while( $route = mysqli_fetch_assoc($routes) ) {
//     $arr[] = $route;
//   }
//   echo json_encode($arr);
// }

$types = ['helicopter', 'cruise'];

// if (!empty($types)) {
//   $types = "types = '" . implode("' OR types = '", $types) . "'";
// } else {
//   $types = "types = 'Вертолетные туры' OR types = 'Круизные туры' OR types = 'Пешие туры' OR types = 'Прочие туры'";
// }

if (!empty($types)) {
  $types = implode(" = '1' OR ", $types) . " = '1'";
} else {
  $types = "helicopter = '1' OR cruise = '1' OR hiking = '1' OR other = '1'";
}

echo "<h3>$types</h3>";