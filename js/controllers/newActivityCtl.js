'use strict';

lifeCoach.controller("NewActivityCtl", function($scope, $http, ActivityMgt, ContextMgt, API_ROOT){
  $scope.activities = ActivityMgt.activities;

  $scope.addActivity = function(){
    var activity = ActivityMgt.newActivity(this.activity);

    activity.contexts = ContextMgt.contextify(activity.displayCopy.contextList);

    ContextMgt.mergeIn(activity.contexts);

    angular.forEach(activity.contexts, function(context){
      localStorage[context.id] = JSON.stringify(context.displayCopy);
    });

    ActivityMgt.activities[activity.id] = activity;

    localStorage[activity.id] = JSON.stringify(activity.displayCopy);

    $http.post(API_ROOT+"/activity/", activity.displayCopy).
      success(function(data){
        ActivityMgt.mergeIn(data);
      })

    this.activity = null;
  }

});

