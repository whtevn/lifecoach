lifeCoach.controller("NewActivityCtl", function($scope, ActivityMgt){
  $scope.activities = ActivityMgt.activities;

  $scope.addActivity = function(data){
    var activity = ActivityMgt.newActivity(this.activity);

    ActivityMgt.activities.push(activity);

    localStorage[activity.id] = JSON.stringify(activity.displayCopy);

    activity.resource.save();

    this.activity = null;
  }

});

lifeCoach.controller("ActivityDisplayCtl", function($scope, ActivityMgt){
  $scope.activities = ActivityMgt.activities;

  $scope.saveEdit = function(activity){
    localStorage[activity.id] = JSON.stringify(activity.commitEdit().displayCopy);
    activity.resource.save();
  }

  $scope.cancelEdit = function(activity){
    activity.cancelEdit();
    console.log(activity);
  }

  $scope.openForEdit = function(activity){
    activity.openForEdit();
  }

  $scope.completeBy = function(activity, percent){
    activity.completeBy(percent);
    $scope.saveEdit(activity);
  }

  for(activity in localStorage){
    console.warn(JSON.parse(localStorage[activity]))
    var activity = ActivityMgt.newActivity(JSON.parse(localStorage[activity]));
    console.log(activity)
    ActivityMgt.activities.push(activity);
  };
});
