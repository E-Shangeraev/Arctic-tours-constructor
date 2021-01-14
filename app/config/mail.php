<?php
  if (isset($_POST['param'])) {
    $post = json_decode($_POST['param']);
    $name = $post->name;
    $phone = $post->phone;
    $types = $post->types;
    $territory = $post->territory;
    $season = $post->season;
    $complexity = $post->complexity;
    $timeOfTour = $post->timeOfTour;
    $groupFrom = $post->groupFrom;
    $groupTo = $post->groupTo;
    $price = $post->price;

    if ($post->selectedTour) {
      $selectedTour = $post->selectedTour;
      $rowTitle = 'Название готового тура';
    }
    if ($post->constructorTour) {
      $selectedTour = $post->constructorTour;
      $rowTitle = 'Сконструированный тур';
    }
    
    if (!empty($types)) {
      foreach($types as $key => $type) {
        if ($type === 'helicopter') {
          $type = 'Вертолетный';
        }
        if ($type === 'cruise') {
          $type = 'Круизный';
        }
        if ($type === 'hiking') {
          $type = 'Пеший';
        }
        if ($type === 'other') {
          $type = 'Другой';
        }
        array_splice($types, $key, 1, $type);
      }

      $types = implode(", ", $types);
      $types = str_replace('"', '', $types);
    } else {
      $types = "Не выбрано";
      $types = str_replace('"', '', $types);
    }

    if ($complexity === '0') {
      $complexity = 'Любая';
    }
    if ($complexity === '1') {
      $complexity = 'Низкая';
    }
    if ($complexity === '2') {
      $complexity = 'Средняя';
    }
    if ($complexity === '3') {
      $complexity = 'Высокая';
    }

    if ($season === 'summer') {
      $season = 'Лето';
    }
    if ($season === 'autumn') {
      $season = 'Осень';
    }
    if ($season === 'winter') {
      $season = 'Зима';
    }
    if ($season === 'spring') {
      $season = 'Весна';
    }

    $to = 'eldar@mygang.ru';
    $subject = 'Обратная связь с сайта';
    $message = 
    '<table style="border-collapse: collapse;>
      <tr">
        <td style="border: 1px solid #cccccc;"><b>Имя: </b></td>
        <td style="border: 1px solid #cccccc;">' .$name .'</td>
      </tr> 
      <tr>
        <td style="border: 1px solid #cccccc;"><b>Телефон: </b></td>
        <td style="border: 1px solid #cccccc;">' . $phone . '</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc;"><b>' . $rowTitle . ': </b></td>
        <td style="border: 1px solid #cccccc;">' . $selectedTour . '</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc;"><b>Время проведения тура: </b></td>
        <td style="border: 1px solid #cccccc;">' . $timeOfTour . '</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc;"><b>Размер группы от: </b></td>
        <td style="border: 1px solid #cccccc;">' . $groupFrom . ' чел. </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc;"><b>Размер группы до: </b></td>
        <td style="border: 1px solid #cccccc;">' . $groupTo . ' чел. </td>
      </tr>
      <tr>
        <td style="border: 1px solid #cccccc;"><b>Итоговая стоимость: </b></td>
        <td style="border: 1px solid #cccccc;">' . $price . ' рублей с человека </td>
      </tr>
    </table>';
    
    $header = "From: visit-arctic-russia.ru\r\n" ."Content-type: text/html; charset=utf-8\r\n" ."X-Mailer: PHP mail script";
    echo json_encode($post);
  
    mail("$to", "$subject", "$message", "$header");
  }
?>
