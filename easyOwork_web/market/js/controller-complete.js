/**
 * Created by changqing on 2016/7/21.
 */
var app = angular.module('market.complete',[]);
app.controller('completeCtrl',['$rootScope','$scope','LocalStorage','commonService','MsgService','$http','AppConfig','$cookieStore',function($rootScope,$scope,LocalStorage,commonService,MsgService,$http,AppConfig,$cookieStore){
	
	$scope.init = function(){
		var userinfo = LocalStorage.getObject("userinfo");
		$scope.form = {
			'entId' : userinfo.entId,
			'entName' : userinfo.entName,
			'name' : userinfo.name
		}
		$scope.order = LocalStorage.getObject("Order");
		$scope.getOrderRequestInfo = {
				header : {
					"requestId" : commonService.randomWord(false, 32),
					"timeStamp" : commonService.getNowFormatDate(),
					"applicationId" : "ezKompany-market",
					"ip" : "127.0.0.1",
					"entId": userinfo.entId,
					"tokenId":userinfo.tokenId
				},
				body : $scope.order
			}
			var promise = $http.post(AppConfig.BASE_URL
					+ 'work/rest/inquiryCharge', $scope.getOrderRequestInfo);
			promise.success(function(data, status, headers, config) {
				var sts = data.body.status;
				if (sts.statusCode == 0) {
					var status = data.body.data.charge.paid;
					$scope.payStatus = status;
				} else {
					MsgService.tomsg("获取支付状态失败, 请联系管理员查看");
				}
			});
			promise.error(function(data, status, headers, config) {
				MsgService.tomsg('获取支付状态失败, 请联系管理员查看');
			});
	}
	
	$scope.done = function(){
		$rootScope.$state.go('price');
	}
	$scope.continue = function(){
		$rootScope.$state.go('buy');
	}
	$scope.repay = function(){
		$rootScope.$state.go('pay',{order:$scope.order.orderNumber});
	}

	
}]);
