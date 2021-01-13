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
    $availableTerritory = mysqli_query($connection, "SELECT territory FROM locales");
    while( $available = mysqli_fetch_assoc($availableTerritory)) {
      $t[] = 'territory = \'' . $available['territory'];
    }
    $territory = implode("' OR ", $t) . "'";
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

  $locales = mysqli_query($connection, "SELECT id, loc_id, `name`, price, complexity, summer, autumn, winter, spring, helicopter, cruise, hiking, other, territory, preview_text, coords_x, coords_y FROM locales WHERE ($territory) AND ($types) AND ($season) AND ($complexity) AND price >= $priceMin AND price <= $priceMax");
  $images = mysqli_query($connection, "SELECT image FROM locales WHERE ($territory) AND ($types) AND ($season) AND ($complexity) AND price >= $priceMin AND price <= $priceMax");

  while( $loc = mysqli_fetch_assoc($locales) ) {
    while($img = mysqli_fetch_assoc($images)) {
      $loc['image'] = base64_encode($img['image']);
      $arr[] = $loc;
      break;
    }
    // $arr[] = $loc;
  }
  
  echo json_encode($arr);
}