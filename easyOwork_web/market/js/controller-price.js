/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.price',[]);
app.controller('priceCtrl',['$rootScope','$scope','LocalStorage',function($rootScope,$scope,LocalStorage){
	
	$scope.buy = function(type){
		var Identity = LocalStorage.getObject("Identity");
		if(Identity == undefined || Identity.entId == undefined)
			$rootScope.$state.go('login',{redirect_url:'/buy'});
		//如果过期也需要重新登录
		else{
			$rootScope.$state.go('buy');
		}
	}
	
}]);
