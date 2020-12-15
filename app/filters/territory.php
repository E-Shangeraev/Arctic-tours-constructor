<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $territory = $post->territory;
  $types = $post->types;

  if ($territory !== 'Не выбрано') {
    $arr = [];
    $routes = mysqli_query($connection, "SELECT * FROM routes WHERE territory = '$territory'");
    while( $route = mysqli_fetch_assoc($routes) ) {
      $arr[] = $route;
    }
    echo json_encode($arr);
  }
  
  if ($territory === 'Не выбрано') {
    $arr = [];
    $routes = mysqli_query($connection, "SELECT * FROM routes");
    while( $route = mysqli_fetch_assoc($routes) ) {
      $arr[] = $route;
    }
    echo json_encode($arr);
  }
  $arr = [];

  if ($types[0]) {
    foreach($types as $type) {
      if ($type === 'Вертолетные туры') {
        $routes = mysqli_query($connection, "SELECT * FROM routes WHERE helicopter = '1'");
        while( $route = mysqli_fetch_assoc($routes) ) {
          $arr[] = $route;
        }
        echo json_encode($arr);
      }
      if ($type === 'Круизные туры') {
        $routes = mysqli_query($connection, "SELECT * FROM routes WHERE cruise = '1'");
        while( $route = mysqli_fetch_assoc($routes) ) {
          $arr[] = $route;
        }
      }
      if ($type === 'Пешие туры') {
        $routes = mysqli_query($connection, "SELECT * FROM routes WHERE hiking = '1'");
        while( $route = mysqli_fetch_assoc($routes) ) {
          $arr[] = $route;
        }
      }
      if ($type === 'Прочие туры') {
        $routes = mysqli_query($connection, "SELECT * FROM routes WHERE other = '1'");
        while( $route = mysqli_fetch_assoc($routes) ) {
          $arr[] = $route;
        }
      }
    }
    echo json_encode($arr);
  }
  

}