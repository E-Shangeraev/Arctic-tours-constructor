<?php
  require_once 'config.php';

  if (isset($_POST['param'])) {
    $post = json_decode($_POST['param']);
    $images = mysqli_query($connection, "SELECT image FROM routes WHERE tour_id = 1");
    while( $img = mysqli_fetch_assoc($images) ) {
      $arr[] = base64_encode($img['image']);
    }
    echo json_encode($arr);
  } 
?>
