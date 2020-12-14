<?php
require_once '../config/config.php';

if (isset($_POST)) {
  $routes = mysqli_query($connection, "SELECT * FROM `routes`");
  while( $route = mysqli_fetch_assoc($routes) ) {
    $arr[] = $route;
  }
  echo json_encode($arr);
}