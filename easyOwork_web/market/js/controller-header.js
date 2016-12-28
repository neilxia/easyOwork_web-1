/**
 * Created by changqing on 2016/7/21.
 */
var app = angular.module('market.header',[]);
app.controller('headerCtrl',['$rootScope','$scope','LocalStorage','commonService','MsgService','$http','AppConfig','$cookieStore',function($rootScope,$scope,LocalStorage,commonService,MsgService,$http,AppConfig,$cookieStore){
	
	$scope.init = function(){
		$rootScope.Identity = $cookieStore.get("Identity");
	}
	
	$scope.logout = function(){
		$rootScope.Identity = null;
		$cookieStore.put("Identity",null);
		$rootScope.$state.go('product');
	}

	
}]);
