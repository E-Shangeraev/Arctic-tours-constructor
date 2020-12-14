<?php
function tpl_render($tpl, $vars) {
  if (file_exists('includes/'.$tpl)) {
      ob_start();
      extract($vars);
      require ('includes/'.$tpl);
      return ob_get_clean();
  }
  return ob_get_clean();
}