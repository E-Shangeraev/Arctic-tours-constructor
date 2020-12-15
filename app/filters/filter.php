<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $territory = $post->territory;
  $types = $post->types;

  $arr = [];

  if ($territory !== 'Не выбрано') {
    $territory = "territory = '$territory'";
    $territory = str_replace('"', '', $territory);
  }
  if ($territory === 'Не выбрано') {
    $territory = "territory = 'Плато Путорана' OR territory = 'Озеро Лама' OR territory = 'Озеро Хантайское' OR territory = 'Пос. Снежногорск' OR territory = 'Город Дудинка'";
    $territory = str_replace('"', '', $territory);
  }

  if (!empty($types)) {
    $types = implode(" = '1' OR ", $types) . " = '1'";
    $types = str_replace('"', '', $types);
  } else {
    $types = "helicopter = '1' OR cruise = '1' OR hiking = '1' OR other = '1'";
    $types = str_replace('"', '', $types);
  }

  $routes = mysqli_query($connection, "SELECT * FROM routes WHERE ($territory) AND ($types) AND price > 30000 AND price < 1000000");
    while( $route = mysqli_fetch_assoc($routes) ) {
      $arr[] = $route;
    }
    echo json_encode($arr);
}