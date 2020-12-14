<?php
require_once 'config/config.php';

if (isset($_POST)) {
  $territory = $_POST;
  // $t = $territory->territory;
  // $t = json_encode($t);
  echo 'Hello';
  var_dump($territory);
  // $routes = mysqli_query($connection, `SELECT * FROM routes WHERE territory = "{$t}"`);
  // while( $route = mysqli_fetch_assoc($routes) ) {
  //   $arr[] = $route;
  // }
  // echo json_encode($arr);
}