'use strict';

lifeCoach.service("ContextMgt", function(){
  var ContextMgt = {};
  ContextMgt.contexts = {};

  ContextMgt.newContext = function(contextData){
    var context = {
      id: (contextData.id || "context_"+Math.floor((Math.random()*1000)+1)+'-'+Math.floor((Math.random()*1000)+1)),

      isBeingEdited: false,

      displayCopy: angular.extend({ createdAt: new Date(), lastUpdated: null, dirty: true}, contextData),


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
      }

    };

    context.displayCopy.id = context.id;

    return(context);
  }

  ContextMgt.remove = function(context){
    delete this.contexts[context.id];  
  }

  ContextMgt.mergeIn = function(contexts){
    // eventually will need to be merged in by name
    // currently keyed by name, so merges in automatically
    angular.extend(this.contexts, contexts);
  }

  ContextMgt.contextify = function(contexts, opts){
    contexts || (contexts = "");

    var contextList = {};

    var contextData,
        contextId,
        contextName;

    angular.forEach(contexts.split(","), function(context){
      context = context.replace(/^\s*@?|\s*$/g,'').trim();
      if(context.length > 0){
        contextData = ContextMgt.newContext({id: "@"+context, name: context});
        contextList[contextData.id] = ( (opts && opts.asDisplay) ? contextData.displayCopy : contextData );
      }
    });
    
    return contextList;
  }
    

  return ContextMgt;
});


