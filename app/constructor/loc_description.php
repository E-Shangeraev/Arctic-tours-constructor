<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;
  $locId = str_replace('"', '', $locId);

  $description = mysqli_query($connection, "SELECT * FROM locales_description WHERE loc_id = $locId");
  while( $desc = mysqli_fetch_assoc($description) ) {
    echo json_encode($desc);
  }
}