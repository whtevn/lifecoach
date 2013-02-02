<?php

  require '../vendor/vendor/autoload.php'; 

  $app = new \Slim\Slim(array(
    'debug' => true
  ));

  $app->post('/activity/', function (){
   header("Content-Type: application/json");
   echo json_encode(array('id'=>'values'));
   exit;
  });

  $app->put('/activity/:id', function (){
   header("Content-Type: application/json");
   echo json_encode(array('id'=>'values'));
   exit;
  });

  $app->get('/activity/:id', function (){
   header("Content-Type: application/json");
   echo json_encode(array('id'=>'values'));
   exit;
  });

  $app->get('/activity/', function (){
   header("Content-Type: application/json");
   echo json_encode(array('id'=>'values'));
   exit;
  });

  $app->run();

?>
