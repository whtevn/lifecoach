'use strict';


// definitely need to figure out how to make a module
// for this instance stuff
lifeCoach.service("ActivityMgt", function($resource){
  var ActivityMgt = {};
  ActivityMgt.activities = {};
  ActivityMgt.resource = $resource("/api/activity/");

  ActivityMgt.newActivity = function(activityData){
    var completeBy = ActivityMgt.completeBy;
    var activity = {
      id: (activityData.id || "activity_"+Math.floor((Math.random()*1000)+1)+'-'+Math.floor((Math.random()*1000)+1)),

      resource: $resource("/api/activity/:id", {"id": '@id'}),

      isBeingEdited: false,

      displayCopy: angular.extend({ completed: 0, createdAt: new Date(), lastUpdated: new Date()}, activityData),

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
    console.log(this.activities);  
    delete this.activities[activity.id];  
  }

  ActivityMgt.getActivities = function(){
    return this.activities
  }

  // held outside to make a completeness plugin
  ActivityMgt.completeBy = function(activity, percent){
    ((activity.completed += percent) >= 1) && (activity.completed = 1);
  }

  return ActivityMgt;
});

