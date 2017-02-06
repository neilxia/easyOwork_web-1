/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('qiyi.permissions',[]);
//app.controller('myCtrl',myCtrl());
app.controller('permissionsCtrl',permissionsCtrl());
app.controller('permissionsaddCtrl',permissionsaddCtrl());
app.controller('permissionsviewCtrl',permissionsviewCtrl());
app.filter('cut', function () {
	  return function (value, wordwise, max, tail) {
		    if (!value) return '';

		    max = parseInt(max, 10);
		    if (!max) return value;
		    if (value.length <= max) return value;

		    value = value.substr(0, max);
		    if (wordwise) {
		      var lastspace = value.lastIndexOf(' ');
		      if (lastspace != -1) {
		        value = value.substr(0, lastspace);
		      }
		    }

		    return value + (tail || ' …');
		  };
		});