/**
 * Created by changqing on 2016/7/21.
 */
var app = angular.module('market.complete',[]);
app.controller('completeCtrl',['$rootScope','$scope','LocalStorage','commonService','MsgService','$http','AppConfig',function($rootScope,$scope,LocalStorage,commonService,MsgService,$http,AppConfig){
	
	$scope.init = function(){
		var Identity = LocalStorage.getObject("Identity");
		$scope.form = {
			'entId' : Identity.entId,
			'entName' : Identity.entName,
			'name' : Identity.name
		}
		var orderNumber = $rootScope.$stateParams.order;
		$scope.getOrderRequestInfo = {
				header : {
					"requestId" : commonService.randomWord(false, 32),
					"timeStamp" : commonService.getNowFormatDate(),
					"applicationId" : "ezKompany-market",
					"ip" : "127.0.0.1",
					"entId": Identity.entId,
					"tokenId":Identity.tokenId
				},
				body : {
					"orderNumber":orderNumber
				}
			}
			var promise = $http.post(AppConfig.BASE_URL
					+ 'work/rest/inquiryOrder', $scope.getOrderRequestInfo);
			promise.success(function(data, status, headers, config) {
				var sts = data.body.status;
				if (sts.statusCode == 0) {
					$scope.order = data.body.data.orders[0];
				} else {
					MsgService.tomsg("无法获取支付结果, 请联系管理员查看");
				}
			});
			promise.error(function(data, status, headers, config) {
				MsgService.tomsg('无法获取支付结果, 请联系管理员查看');
			});
	}
	
	$scope.done = function(){
		$rootScope.$state.go('price');
	}
	$scope.continue = function(){
		$rootScope.$state.go('buy');
	}

	
}]);
