lifeCoach.service("DataStore", function(localStorage){
  var DataStore = {};

  DataStore.serverCopy = {};

  DataStore.localCopy = {};

  DataStore.keep = function(name, obj){
    angular.extend(this.localCopy[name], obj);
    // write to datastore
  }

  DataStore.loadFromLocal = function(){
    angular.extend(this.localCopy, JSON.parse(localStorage));
  }

  DataStore.writeToLocal = function(values, key){
    if(typeof key != 'undefined'){
      localstorage[key] = angular.extend(this.localCopy[key]); 
    }
  }

  console.log(localStorage);
  return DataStore;
});

