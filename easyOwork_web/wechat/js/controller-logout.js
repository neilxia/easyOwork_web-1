/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.logout', []);
app.controller('logoutCtrl', [
		'$rootScope',
		'$scope',
		'$http',
		'commonService',
		'AppConfig',
		'MsgService',
		'$location',
		'LocalStorage',
		'$cookieStore',
		function($rootScope, $scope, $http, commonService, AppConfig,
				MsgService, $location, LocalStorage, $cookieStore) {

			$scope.logout = function() {
				$scope.requestInfo = {
					"body" : {
						"actionType" : "UNBIND"
					}
				}
				$rootScope.loading = true;
				var promise = $http.post(AppConfig.BASE_URL
						+ 'work/rest/bindWechat', $scope.requestInfo);
				promise.success(function(data, status, headers, config) {
					$rootScope.loading = false;
					var sts = data.body.status;
					if (sts.statusCode == 0) {
						LocalStorage.setOpenId(null);
						$rootScope.$state.go('login');
					} else {
						MsgService.tomsg(sts.errorDesc);
					}
				});
				promise.error(function(data, status, headers, config) {
				});

			}

		} ]);
