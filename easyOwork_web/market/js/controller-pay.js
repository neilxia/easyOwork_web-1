/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.pay',[]);
app.controller('payCtrl',['$rootScope','$scope',function($rootScope,$scope){
	
	$scope.done = function(){
		$rootScope.$state.go('price');
	}
	$scope.continue = function(){
		$rootScope.$state.go('buy');
	}
	$scope.cancel = function(){
		$rootScope.$state.go('buy');
	}
	$scope.confirm = function(){
		$rootScope.$state.go('pay');
	}
	
}]);
