'use strict';

lifeCoach.service("ActivityMgt", function(){
  var ActivityMgt = {};
  ActivityMgt.activities = {};

  ActivityMgt.newActivity = function(activityData){
    var completeBy = ActivityMgt.completeBy;
    var activity = {
      id: (activityData.id || "activity_"+Math.floor((Math.random()*1000)+1)+'-'+Math.floor((Math.random()*1000)+1)),

      isBeingEdited: false,

      displayCopy: angular.extend({ completed: 0, createdAt: new Date(), lastUpdated: null, dirty: true}, activityData),

      completeBy:  function(percent){
        completeBy(this.displayCopy, percent);
      },

      openForEdit: function(){
        this.editCopy = angular.extend({}, this.displayCopy);
        this.isBeingEdited = true;
      },

      closeEditing: function(){
        this.isBeingEdited = false;
        this.editCopy = null;
      },

      commitEdit: function(){
        this.displayCopy.lastUpdated = new Date();
        this.editCopy = angular.extend(this.displayCopy, this.editCopy);
        this.closeEditing();
        return this;
      },

      cancelEdit: function(){
        this.closeEditing();
      },

      completions: []
    };

    activity.displayCopy.id = activity.id;

    return(activity);
  }

  ActivityMgt.remove = function(activity){
    delete this.activities[activity.id];  
  }

  ActivityMgt.mergeIn = function(activities){
    angular.forEach(activities, function(activity){
      if(!activities[activity.id] || (activity.lastUpdated && activity.lastUpdated > activities[activity.id].lastUpdated)){
        angular.extend(activities[activity.id], activity);
      }
    });
  }

  // held outside to make a completeness plugin
  ActivityMgt.completeBy = function(activity, percent){
    ((activity.completed += percent) >= 1) && (activity.completed = 1);
  }

  return ActivityMgt;
});

