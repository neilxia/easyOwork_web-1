/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.buy', []);
app.controller('buyCtrl', [
		'$rootScope',
		'$scope',
		'LocalStorage',
		'commonService',
		'$http',
		'AppConfig',
		'MsgService',
		'$cookieStore',
		function($rootScope, $scope, LocalStorage,commonService,$http,AppConfig,MsgService,$cookieStore) {

			$scope.init = function() {
				var userinfo = LocalStorage.getObject("userinfo");
				if (userinfo == undefined || userinfo.entId == undefined)
					$rootScope.$state.go('login', {
						redirect_url : '/buy'
					});
				$scope.form = {
					'entId' : userinfo.entId,
					'entName' : userinfo.entName,
					'name' : userinfo.name,
					'userCount' : userinfo.userCount,
					'period' : null,
					'total' : 0
				};
				if($scope.form.userCount > 50)
					$scope.form.productType = "成熟型";
				else if($scope.form.userCount < 20)
					$scope.form.productType = "创业型";
				else
					$scope.form.productType = "发展型";
				
			}
			$scope.cancel = function() {
				$rootScope.$state.go('price');
			}
			$scope.pay = function() {
				if ($scope.validatePeriod()){
					var userinfo = LocalStorage.getObject("userinfo");
					$scope.orderRequestInfo = {
							header : {
								"requestId" : commonService.randomWord(false, 32),
								"timeStamp" : commonService.getNowFormatDate(),
								"applicationId" : "ezKompany-market",
								"ip" : "127.0.0.1",
								"entId": userinfo.entId,
								"tokenId":userinfo.tokenId
							},
							body : {
								"userDTO":{
									"id":userinfo.id,
									"personalEmail":userinfo.personalEmail,
									"personalPhone":userinfo.personalPhone,
									"personalPhoneCountryCode":userinfo.personalPhoneCountryCode
								},
								"serviceDTO":{
									"type":"PLATFORM",
									"name":$scope.form.productType
								},
								"count":$scope.form.period,
								"amount":$scope.form.total
							}
						}
						$rootScope.loading = true;
						var promise = $http.post(AppConfig.BASE_URL
								+ 'work/rest/createOrder', $scope.orderRequestInfo);
						promise.success(function(data, status, headers, config) {
							$rootScope.loading = false;
							var sts = data.body.status;
							if (sts.statusCode == 0) {
								$scope.order = data.body.data;
								$rootScope.$state.go('pay',{order:$scope.order.orderNumber});
							} else {
								MsgService.tomsg(sts.errorDesc);
							}
						});
						promise.error(function(data, status, headers, config) {
							$rootScope.loading = false;
							MsgService.tomsg('创建订单失败');
						});
				}
					
			}
			$scope.calTotal = function() {
				if ($scope.form.period == null) {
					$scope.form.total = 0;
					return

				}
				var productType = $scope.form.productType;
				var period = $scope.form.period;
				if (productType == '创业型')
					$scope.form.total = 79 * period;
				else if (productType == '发展型')
					$scope.form.total = 109 * period;
				else if (productType == '成熟型')
					$scope.form.total = 149 * period;
			}
			$scope.validatePeriod = function() {
				if ($scope.form.period == null) {
					$scope.periodError = '请选择购买时长';
					return false
				}
				return true;
			}
			$scope.period = [ {
				value : "1",
				label : "1月"
			}, {
				value : "2",
				label : "2月"
			}, {
				value : "3",
				label : "3月"
			}, {
				value : "4",
				label : "4月"
			}, {
				value : "5",
				label : "5月"
			}, {
				value : "6",
				label : "6月"
			}, {
				value : "7",
				label : "7月"
			}, {
				value : "8",
				label : "8月"
			}, {
				value : "9",
				label : "9月"
			}, {
				value : "10",
				label : "10月"
			}, {
				value : "11",
				label : "11月"
			}, {
				value : "12",
				label : "12月"
			} ];

		} ]);
