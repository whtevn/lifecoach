'use strict';

if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,'');
  }
}

var lifeCoach = angular.module("lifeCoach", []);

lifeCoach.value('API_ROOT', "/~evanshort/lifecoach/api/routes.php");

