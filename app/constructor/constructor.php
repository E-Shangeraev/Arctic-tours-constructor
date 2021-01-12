<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;

  foreach($locId as $id) {
    $id = str_replace('"', '', $id);

    $locale = mysqli_query($connection, "SELECT id, loc_id, title, intro, description, `fact-1`, `fact-2`, `fact-3`, `fact-4`, territory, transport, lodging FROM locales_description WHERE loc_id = $id");
    $images = mysqli_query($connection, "SELECT image, `img-1`, `img-2`, `img-3`, `img-4` FROM locales_description WHERE loc_id = $id");

    while( $l = mysqli_fetch_assoc($locale) ) {
      while($img = mysqli_fetch_assoc($images)) {
        $l['image'] = base64_encode($img['image']);
        $l['img-1'] = base64_encode($img['img-1']);
        $l['img-2'] = base64_encode($img['img-2']);
        $l['img-3'] = base64_encode($img['img-3']);
        $l['img-4'] = base64_encode($img['img-4']);
        $arr[] = $l;
        // echo json_encode($desc);
      }
      
    }
  }
  echo json_encode($arr);
}