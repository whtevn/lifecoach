'use strict';

lifeCoach.controller("ActivityTestCtl", function($scope, ActivityMgt, ContextMgt, API_ROOT){
  $scope.activities = ActivityMgt.activities;
})

lifeCoach.controller("ActivityDisplayCtl", function($scope, $http, ActivityMgt, ContextMgt, API_ROOT){
  $scope.activities = ActivityMgt.activities;

  $scope.saveEdit = function(activity){
    localStorage[activity.id] = JSON.stringify(activity.commitEdit().displayCopy);
    $http.put(API_ROOT+"/activity/"+activity.id, activity.displayCopy).
      success(function(data){
        ActivityMgt.mergeIn(data);
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

  var activity,
      context
  for(var key in localStorage){
    if(key.match("^activity_")){
      activity = ActivityMgt.newActivity(JSON.parse(localStorage[key]));
      ActivityMgt.activities[activity.id] = activity;
    }else{
      context = ContextMgt.newContext(JSON.parse(localStorage[key]));
      ContextMgt.contexts[context.id] = context;
    }
  };

  console.log(ContextMgt.contexts);
  console.log(ActivityMgt.activities);
});

