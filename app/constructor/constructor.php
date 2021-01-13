<?php
require_once '../config/config.php';

if (isset($_POST['param'])) {
  $post = json_decode($_POST['param']);
  $locId = $post->locId;

  foreach($locId as $id) {
    $id = str_replace('"', '', $id);

    $locale = mysqli_query($connection, "SELECT id, loc_id, title, intro, `subtitle-1`, `subtitle-2`, `desc-1`, `desc-2`, description, `fact-1`, `fact-2`, `fact-3`, `fact-4`, territory, `transport-1`, `transport-2`, `lodging-1`, `lodging-2` FROM locales_description WHERE loc_id = $id");
    $images = mysqli_query($connection, "SELECT image, `img-1`, `img-2`, `img-3`, `img-4`, `transport-img-1`, `transport-img-2`, `lodging-img-1`, `lodging-img-2` FROM locales_description WHERE loc_id = $id");

    while( $l = mysqli_fetch_assoc($locale) ) {
      while($img = mysqli_fetch_assoc($images)) {
        $l['image'] = base64_encode($img['image']);
        $l['img-1'] = base64_encode($img['img-1']);
        $l['img-2'] = base64_encode($img['img-2']);
        $l['img-3'] = base64_encode($img['img-3']);
        $l['img-4'] = base64_encode($img['img-4']);
        $l['transport-img-1'] = base64_encode($img['transport-img-1']);
        $l['transport-img-2'] = base64_encode($img['transport-img-2']);
        $l['lodging-img-1'] = base64_encode($img['lodging-img-1']);
        $l['lodging-img-2'] = base64_encode($img['lodging-img-2']);
        $arr[] = $l;
        // echo json_encode($desc);
      }
      
    }
  }
  echo json_encode($arr);
}