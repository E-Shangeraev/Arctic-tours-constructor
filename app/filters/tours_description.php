<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $tourId = $post->tourId;
  $tourId = str_replace('"', '', $tourId);

  $description = mysqli_query($connection, "SELECT id, tour_id, title, intro, description, `action-1`, `action-2`, `action-3`, `action-4`, program_intro, residence, territory, subtitle, tent, hotel, price FROM routes_description WHERE tour_id = $tourId");
  $images = mysqli_query($connection, "SELECT image_1, image_2, `action-img-1`, `action-img-2`, `action-img-3`, `action-img-4` FROM routes_description WHERE tour_id = $tourId");

  while( $desc = mysqli_fetch_assoc($description) ) {
    while($img = mysqli_fetch_assoc($images)) {
      $desc['image_1'] = base64_encode($img['image_1']);
      $desc['image_2'] = base64_encode($img['image_2']);
      $desc['action-img-1'] = base64_encode($img['action-img-1']);
      $desc['action-img-2'] = base64_encode($img['action-img-2']);
      $desc['action-img-3'] = base64_encode($img['action-img-3']);
      $desc['action-img-4'] = base64_encode($img['action-img-4']);
      echo json_encode($desc);
    }
  }
}