<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;
  $locId = str_replace('"', '', $locId);

  $locale = mysqli_query($connection, "SELECT * FROM locales WHERE loc_id = $locId");
  while( $l = mysqli_fetch_assoc($locale) ) {
    $arr[] = $l;
  }
  echo json_encode($arr);
}