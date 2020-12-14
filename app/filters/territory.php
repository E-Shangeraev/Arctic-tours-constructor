<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $territory = json_decode($_POST['param']);
  $t = $territory->territory;
  $routes = mysqli_query($connection, "SELECT * FROM routes WHERE territory = '$t'");
  while( $route = mysqli_fetch_assoc($routes) ) {
    $arr[] = $route;
  }
  echo json_encode($arr);
}