<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $tourId = $post->tourId;
  $tourId = str_replace('"', '', $tourId);

  $route = mysqli_query($connection, "SELECT * FROM points WHERE tour_id = $tourId");
  while( $r = mysqli_fetch_assoc($route) ) {
    echo json_encode($r);
  }
}