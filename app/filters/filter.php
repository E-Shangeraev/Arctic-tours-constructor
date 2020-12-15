<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $territory = $post->territory;
  $types = $post->types;
  $season = $post->season;
  $complexity = $post->complexity;
  $priceMin = $post->priceMin;
  $priceMax = $post->priceMax;

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

  if ($season !== 'Не выбрано') {
    $season = "$season = '1'";
    $season = str_replace('"', '', $season);
  } else {
    $season = "summer = '1' OR autumn = '1' OR winter = '1' OR spring = '1'";
    $season = str_replace('"', '', $season);
  }

  if ($complexity === '0') {
    $complexity = "complexity = '1' OR complexity = '2' OR complexity = '3'";
    $complexity = str_replace('"', '', $complexity);
  } else {
    $complexity = "complexity = '$complexity'";
    $complexity = str_replace('"', '', $complexity);
  }

  $routes = mysqli_query($connection, "SELECT * FROM routes WHERE ($territory) AND ($types) AND ($season) AND ($complexity) AND price > $priceMin AND price < $priceMax");
    while( $route = mysqli_fetch_assoc($routes) ) {
      $arr[] = $route;
    }
  echo json_encode($arr);
}