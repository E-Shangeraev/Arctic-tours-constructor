<?php
  require_once 'config.php';

  if (isset($_POST['param'])) {
    $post = json_decode($_POST['param']);
    $for = $post->for;

    if ($for === 'ready') {
      $table = 'routes';
    }
    if ($for === 'constructor') {
      $table = 'locales';
    }
    $table = str_replace('\'', '', $table);

    $territory = mysqli_query($connection, "SELECT territory FROM $table");
    while( $t = mysqli_fetch_assoc($territory) ) {
      $arr[] = $t;
    }
    echo json_encode($arr);
  }
?>


