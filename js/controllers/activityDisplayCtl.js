'use strict';

lifeCoach.controller("ActivityDisplayCtl", function($scope, $http, ActivityMgt, ContextMgt, API_ROOT){

  $scope.showNoContext = true;
  $scope.activities = function(){
    return _.toArray(ActivityMgt.activities);
  }
  $scope.contexts = function(){
    return _.toArray(ContextMgt.contexts);
  }

  $scope.contextHasActivities = function(context){
    return _.indexOf(ActivityMgt.activeContexts(), context.id) > -1;
  }

  $scope.inActiveContext = function(activity){
    var contextId; 
    var activeContexts = _.map(ContextMgt.contexts, function(context){
      if(context.displayCopy.isShowing){
        contextId = context.id;
      }else{
        contextId = null;
      }
      return contextId;
    });
    var activityContexts = _.map(activity.contexts, function(context){
      return context.id;
    });

    // show if
    // has no contexts
    //  activityContexts.length == 0
    // yes to showNoContext
    //  $scope.showNoContext

    // has contexts
    //  activity.contexts.length != 0
    // that are active
    //  (_.intersection(activeContexts, activityContexts).length != 0)
    return (
            ((activityContexts.length == 0) &&
              $scope.showNoContext) ||
            (activity.contexts.length != 0) &&
              (_.intersection(activeContexts, activityContexts).length != 0)
            )

  }


  $scope.saveEdit = function(activity){
    localStorage[activity.id] = JSON.stringify(activity.commitEdit().displayCopy);

    ContextMgt.mergeIn(ContextMgt.contextify(activity.displayCopy.contextList));

    angular.forEach(activity.contexts, function(context){
      localStorage[context.id] = JSON.stringify(context);
    });

    /*$http.put(API_ROOT+"/activity/"+activity.id, activity.displayCopy).
      success(function(data){
        ActivityMgt.mergeIn(data);
      }).
      error(function(){
      })*/
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

});

