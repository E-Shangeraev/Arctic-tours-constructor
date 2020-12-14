<?php
require_once 'config/config.php';

// if ($_POST) {
//   echo json_encode($_POST);
//   // $param = json_decode($_POST);
//   // echo json_encode($param);
//   exit();
// }

if (isset($_POST)) {
  $routes = mysqli_query($connection, "SELECT * FROM `routes`");
  while( $route = mysqli_fetch_assoc($routes) ) {
    echo json_encode($route);
  }
}