// definitely need to figure out how to make a module
// for this instance stuff
lifeCoach.service("ActivityMgt", function(localStorage){

  var ActivityMgt = {};
  ActivityMgt.activities = [];

  ActivityMgt.newActivity = function(activityData){
    // give activities a list of completions
    // activity.completions = [];
    // each time a completion rolls to 100%, a new completion with a 0% completed
    var completeBy = ActivityMgt.completeBy;
    var activity = {
      isBeingEdited: false,

      displayCopy: angular.extend({ completed: 0 }, activityData),

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

      saveEdit: function(){
        this.editCopy = angular.extend(this.displayCopy, this.editCopy);
        this.closeEditing();
      },

      cancelEdit: function(){
        this.closeEditing();
      },

      completions: []
    };

    ActivityMgt.activities.push(activity);
    ActivityMgt.saveActivities();
  }

  ActivityMgt.saveActivities = function(activities){
    DataStore.keep('activities', activities);
  }

  // held outside to make a completeness plugin
  ActivityMgt.completeBy = function(activity, percent){
    ((activity.completed += percent) >= 1) && (activity.completed = 1);
  }

  return ActivityMgt;
});

