<?php

$connection = mysqli_connect(
    $config['db']['server'],
    $config['db']['username'],
    $config['db']['password'],
    $config['db']['name']
);

if (!$connection) {
    echo 'Не удалось подключиться к БД<br>';
    echo mysqli_connect_error();
    die();
}

mysqli_query($connection,'SET NAMES UTF8');