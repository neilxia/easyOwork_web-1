/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.main',[]);
app.controller('mainCtrl',['$rootScope','$scope','LocalStorage',function($rootScope,$scope,LocalStorage){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		
	}
}]);
