<?php
  require_once 'config.php';

  // if (isset($_POST['param'])) {
  //   $post = json_decode($_POST['param']);
  //   $images = mysqli_query($connection, "SELECT image FROM routes WHERE tour_id = 1");
  //   // $images = $wpdb->get_results( "SELECT image FROM routes WHERE tour_id = 1" );
  //   while( $img = mysqli_fetch_assoc($images) ) {
  //     $arr[] = base64_encode($img['image']);
  //   }
  //   echo json_encode($arr);
  // }

  function getImage($field, $table, $var, $id) {
    $images = mysqli_query($connection, "SELECT $field FROM $table WHERE $var = $id");
    while( $img = mysqli_fetch_assoc($images) ) {
      $arr[] = base64_encode($img['image']);
    }
    echo json_encode($arr);
  } 

  if (isset($_POST['param'])) {
    $post = json_decode($_POST['param']);
    $field = $post->field;
    $table = $post->table;
    $var = $post->var;
    $id = $post->id;
    
    getImage($field, $table, $var, $id);
  }
?>


