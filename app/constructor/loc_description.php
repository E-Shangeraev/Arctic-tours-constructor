<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;
  $locId = str_replace('"', '', $locId);

  $description = mysqli_query($connection, "SELECT id, loc_id, title, intro, description, `fact-1`, `fact-2`, `fact-3`, `fact-4`, territory, transport, lodging FROM locales_description WHERE loc_id = $locId");
  $images = mysqli_query($connection, "SELECT image, `img-1`, `img-2`, `img-3`, `img-4` FROM locales_description WHERE loc_id = $locId");

  while( $desc = mysqli_fetch_assoc($description) ) {
    while($img = mysqli_fetch_assoc($images)) {
      $desc['image'] = base64_encode($img['image']);
      $desc['img-1'] = base64_encode($img['img-1']);
      $desc['img-2'] = base64_encode($img['img-2']);
      $desc['img-3'] = base64_encode($img['img-3']);
      $desc['img-4'] = base64_encode($img['img-4']);
      echo json_encode($desc);
      break;
    }
  }
  
}