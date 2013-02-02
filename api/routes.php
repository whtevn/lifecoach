<?php

  require '../vendor/vendor/autoload.php'; 

  $app = new \Slim\Slim(array(
    'debug' => true
  ));

  $activity = new ActivityCtl();

  $app->post('/activity', $activity->create);
  $app->put('/activity/:id', $activity->update);
  $app->get('/activity/:id', $activity->get);

  $app->run();

  class ActivityCtl {
    public function create(){
     header("Content-Type: application/json");
     echo json_encode(array());
     exit;
    }

    public function update(){
     header("Content-Type: application/json");
     echo json_encode(array());
     exit;
    }

    public function get(){
     header("Content-Type: application/json");
     echo json_encode(array());
     exit;
    }
  }


?>
