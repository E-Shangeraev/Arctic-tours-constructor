<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $tourId = $post->tourId;
  $tourId = str_replace('"', '', $tourId);

  $route = mysqli_query($connection, "SELECT id, tour_id, name, text, coords_x, coords_y FROM points WHERE tour_id = $tourId");
  $images = mysqli_query($connection, "SELECT image FROM points WHERE tour_id = $tourId");
  while( $r = mysqli_fetch_assoc($route) ) {
    while($img = mysqli_fetch_assoc($images)) {
      $r['image'] = base64_encode($img['image']);
      $arr[] = $r;
      break;
    }
  }
  echo json_encode($arr);
}