<?php
  $to = 'gepards-98@mail.ru';
  $subject = 'Обратная связь с сайта';
  $message = 
  '<table style="border-collapse: collapse;>
    <tr">
      <td style="border: 1px solid #cccccc;"><b>Имя: </b></td>
      <td style="border: 1px solid #cccccc;">' .$_POST["name"] .'</td>
    </tr> 
    <tr>
      <td style="border: 1px solid #cccccc;"><b>Телефон: </b></td>
      <td style="border: 1px solid #cccccc;">' . $_POST["tel"] . '</td>
    </tr>
    <tr>
      <td style="border: 1px solid #cccccc;"><b>Комментарий: </b></td>
      <td style="border: 1px solid #cccccc;">' . $_POST["text"] . '</td>
    </tr>
  </table>';

  $header = "From: ivan@example.com\r\n" ."Content-type: text/html; charset=utf-8\r\n" ."X-Mailer: PHP mail script";
  echo var_dump($_POST);

  mail("$to", "$subject", "$message", "$header");
?>
