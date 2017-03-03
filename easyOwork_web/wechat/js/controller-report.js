/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.report',[]);
app.controller('reportListCtrl',['$rootScope','$scope','LocalStorage','reportService','MsgService',function($rootScope,$scope,LocalStorage,reportService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryAssignedReportsFun();
		$scope.selectedType = "日报";
	}
	$scope.selectType = function(reportType){
		$scope.selectedType = reportType;
	}
	function inquiryAssignedReportsFun(){
		$scope.options = {
				"type":"ALL"
			};
			var promise = reportService.inquiryWechatAssignedReports({
				body : $scope.options
			});
			promise.success(function(data, status, headers, config) {
				var sts = data.body.status;
				if (sts.statusCode == 0) {
					$scope.reportlist = data.body.data.reports;
				} else {
					MsgService.tomsg(data.body.status.errorDesc);
				}
			});
			promise.error(function(data, status, headers, config) {
				MsgService.tomsg(data.body.status.errorDesc);
			});
		};
}]);
app.controller('reportDetailCtrl',['$rootScope','$scope','LocalStorage','reportService','MsgService',function($rootScope,$scope,LocalStorage,reportService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		$scope.data = $rootScope.$stateParams.data;
	}
}]);