'use strict';

lifeCoach.controller("NewActivityCtl", function($scope, $http, ActivityMgt, ContextMgt, API_ROOT){
  $scope.activities = ActivityMgt.activities;

  $scope.addActivity = function(){
    var activity = ActivityMgt.newActivity(this.activity);

    ContextMgt.mergeIn(ContextMgt.contextify(activity.displayCopy.contextList));

    angular.forEach(activity.contexts, function(context){
      localStorage[context.id] = JSON.stringify(context);
    });

    
    ActivityMgt.activities[activity.id] = activity; // currently taking the place of mergeIn

    localStorage[activity.id] = JSON.stringify(activity.displayCopy);

    $http.post(API_ROOT+"/activity/", activity.displayCopy).
      success(function(data){
        ActivityMgt.mergeIn(data); // currently does nothing
      })

    this.activity = null;
  }

});

