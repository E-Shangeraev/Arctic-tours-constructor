<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $tourId = $post->tourId;
  $tourId = str_replace('"', '', $tourId);

  $description = mysqli_query($connection, "SELECT * FROM routes_description WHERE tour_id = $tourId");
  while( $desc = mysqli_fetch_assoc($description) ) {
    echo json_encode($desc);
  }
}