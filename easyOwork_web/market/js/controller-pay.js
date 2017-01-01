/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.pay',[]);
app.controller('payCtrl',['$rootScope','$scope','LocalStorage','commonService','$http','AppConfig','MsgService','$cookieStore','$modal','$window',function($rootScope,$scope,LocalStorage,commonService,$http,AppConfig,MsgService,$cookieStore,$modal,$window){
	var userinfo = LocalStorage.getObject("userinfo");
	var orderNumber = $rootScope.$stateParams.order;
	$scope.init = function(){
		$scope.form = {
			'entId' : userinfo.entId,
			'entName' : userinfo.entName,
			'name' : userinfo.name,
			'payType':'alipay_pc_direct'
		}
		$scope.getOrderRequestInfo = {
				header : {
					"requestId" : commonService.randomWord(false, 32),
					"timeStamp" : commonService.getNowFormatDate(),
					"applicationId" : "ezKompany-market",
					"ip" : "127.0.0.1",
					"entId": userinfo.entId,
					"tokenId":userinfo.tokenId
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
					MsgService.tomsg("无法获取订单");
				}
			});
			promise.error(function(data, status, headers, config) {
				MsgService.tomsg('无法获取订单');
			});
	}
	$scope.cancel = function(){
		$scope.cancelOrderRequestInfo = {
				header : {
					"requestId" : commonService.randomWord(false, 32),
					"timeStamp" : commonService.getNowFormatDate(),
					"applicationId" : "ezKompany-market",
					"ip" : "127.0.0.1",
					"entId": userinfo.entId,
					"tokenId":userinfo.tokenId
				},
				body : {
					"orderNumber":orderNumber
				}
			}
			var promise = $http.post(AppConfig.BASE_URL
					+ 'work/rest/cancelOrder', $scope.cancelOrderRequestInfo);
			promise.success(function(data, status, headers, config) {
				var sts = data.body.status;
				if (sts.statusCode == 0) {
					$rootScope.$state.go('buy');
				} else {
					$rootScope.$state.go('buy');
				}
			});
			promise.error(function(data, status, headers, config) {
				$rootScope.$state.go('buy');
			});
		
	}
	$scope.confirm = function(){
		$scope.initPayRequestInfo = {
				header : {
					"requestId" : commonService.randomWord(false, 32),
					"timeStamp" : commonService.getNowFormatDate(),
					"applicationId" : "ezKompany-market",
					"ip" : "127.0.0.1",
					"entId": userinfo.entId,
					"tokenId":userinfo.tokenId
				},
				body : {
					"orderNumber":$scope.order.orderNumber,
					"amount":$scope.order.amount,
					"channel":$scope.form.payType,
					"successUrl":"http://127.0.0.1:80/index.html#/complete_outter",
					"cancelUrl":"http://127.0.0.1:80/index.html#/buy"
				}
			}
			$rootScope.loading = true;
			var promise = $http.post(AppConfig.BASE_URL
					+ 'work/rest/initPay', $scope.initPayRequestInfo);
			promise.success(function(data, status, headers, config) {
				$rootScope.loading = false;
				var sts = data.body.status;
				if (sts.statusCode == 0) {
					LocalStorage.setObject("Order",data.body.data);
					$scope.charge = data.body.data.charge;
					
					var modalInstance = $modal.open({
		                templateUrl: 'payPrompt.html',
		                size:'md',
		                backdrop: 'static',
		                controller: modalCtrl
		            });
					function modalCtrl ($scope, $modalInstance,$http,AppConfig,$cookieStore) {
						$scope.complete = function(){
							$modalInstance.dismiss('cancel');
							$rootScope.$state.go('complete');
						}
						$scope.selectPayType = function(){
							$modalInstance.dismiss('cancel');
						}
					}
					if($scope.form.payType == 'wx_pub_qr'){
						$window.open("/index.html#/qrcode");
					}
					else
						$window.open("/index.html#/payTab");
				} else {
					MsgService.tomsg(sts.errorDesc);
				}
			});
			promise.error(function(data, status, headers, config) {
				$rootScope.loading = false;
				MsgService.tomsg('无法获取订单');
			});
		$rootScope.$state.go('pay');
	}
	$scope.complete = function(){
		$rootScope.$state.go('complete',{order:$scope.order.orderNumber});
	}
	
}]);
