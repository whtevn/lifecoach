'use strict';


lifeCoach.controller("NewActivityCtl", function($scope, $http, ActivityMgt){
  $scope.activities = ActivityMgt.activities;

  $scope.addActivity = function(data){
    var activity = ActivityMgt.newActivity(this.activity);

    ActivityMgt.activities[activity.id] = activity;

    localStorage[activity.id] = JSON.stringify(activity.displayCopy);

    $http.post("/api/activity/").
      success(function(){
      }).
      error(function(){
      })

    this.activity = null;
  }

});

lifeCoach.controller("ActivityTestCtl", function($scope, ActivityMgt){
  $scope.activities = ActivityMgt.activities;
})

lifeCoach.controller("ActivityDisplayCtl", function($scope, $http, ActivityMgt){
  $scope.activities = ActivityMgt.activities;

  $scope.saveEdit = function(activity){
    localStorage[activity.id] = JSON.stringify(activity.commitEdit().displayCopy);
    $http.put("/api/activity/"+activity.id).
      success(function(){
      }).
      error(function(){
      })
  }

  $scope.cancelEdit = function(activity){
    activity.cancelEdit();
  }

  $scope.openForEdit = function(activity){
    activity.openForEdit();
  }

  $scope.completeBy = function(activity, percent){
    activity.completeBy(percent);
    $scope.saveEdit(activity);
  }

  $scope.deleteActivity = function(activity){
    ActivityMgt.remove(activity);
    delete localStorage[activity.id];
  }

  for(activity in localStorage){
    var activity = ActivityMgt.newActivity(JSON.parse(localStorage[activity]));
    ActivityMgt.activities[activity.id] = activity;
  };
});
