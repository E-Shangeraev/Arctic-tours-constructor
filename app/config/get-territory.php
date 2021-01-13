<?php
  require_once 'config.php';

  if (isset($_POST['param'])) {
    $post = json_decode($_POST['param']);

    $territory = mysqli_query($connection, "SELECT territory FROM locales");
    while( $t = mysqli_fetch_assoc($territory) ) {
      $arr[] = $t;
    }
    echo json_encode($arr);
  }
?>


