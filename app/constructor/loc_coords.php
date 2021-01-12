<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;
  $locId = str_replace('"', '', $locId);

  $locale = mysqli_query($connection, "SELECT id, loc_id, name, price, complexity, summer, autumn, winter, spring, helicopter, cruise, hiking, other, territory, preview_text, coords_x, coords_y FROM locales WHERE loc_id = $locId");
  $images = mysqli_query($connection, "SELECT image FROM locales WHERE loc_id = $locId");

  while( $l = mysqli_fetch_assoc($locale) ) {
    while($img = mysqli_fetch_assoc($images)) {
      $l['image'] = base64_encode($img['image']);
      $arr[] = $l;
    }
  }
  echo json_encode($arr);
}