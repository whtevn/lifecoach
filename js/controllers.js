
lifeCoach.controller("NewActivityCtl", function($scope, ActivityMgt){
  $scope.activities = ActivityMgt.activities;
  $scope.addActivity = function(data){
    ActivityMgt.newActivity(this.activity);
    this.activity = null;
  }
});

lifeCoach.controller("ActivityDisplayCtl", function($scope, ActivityMgt){
  $scope.activities = ActivityMgt.activities;
});
