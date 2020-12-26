<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;

  foreach($locId as $id) {
    $id = str_replace('"', '', $id);

    $locale = mysqli_query($connection, "SELECT * FROM locales_description WHERE loc_id = $id");
    while( $l = mysqli_fetch_assoc($locale) ) {
      $arr[] = $l;
    }
  }
  echo json_encode($arr);
}