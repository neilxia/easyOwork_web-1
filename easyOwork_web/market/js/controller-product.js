/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.product',[]);
app.controller('productCtrl',['$rootScope','$scope',function($rootScope,$scope){
	
	
	$scope.viewFunction = function(functionId){
		$("#"+$scope.currentFunction).fadeOut();
		$("#"+functionId).fadeIn();
		$scope.currentFunction = functionId;
	}
	
}]);
