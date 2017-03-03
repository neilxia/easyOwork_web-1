/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.process',[]);
app.controller('myProcessListCtrl',['$rootScope','$scope','LocalStorage','processService','MsgService',function($rootScope,$scope,LocalStorage,processService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryHandlingProcessesFun();
	}
	function inquiryHandlingProcessesFun(){
        //查询审批
        $scope.options={
            
        };
        var promise = processService.inquiryWechatHandlingProcesses({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
             if(sts.statusCode==0){
                $scope.inquiryProcessesData=data.body.data.processes;
             }else{
             MsgService.tomsg(data.body.status.errorDesc);
             }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
    };
}]);
app.controller('createdProcessListCtrl',['$rootScope','$scope','LocalStorage','processService',function($rootScope,$scope,LocalStorage,processService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryHandlingProcessesFun();
		$scope.selectedStatus='审批中';
	}
	$scope.selectStatus = function(processStatus){
		$scope.selectedStatus = processStatus;
	}
	function inquiryHandlingProcessesFun(){
        //查询审批
        $scope.options={
            
        };
        var promise = processService.inquiryWechatCreatedProcesses({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
             if(sts.statusCode==0){
                $scope.inquiryProcessesData=data.body.data.processes;
             }else{
             MsgService.tomsg(data.body.status.errorDesc);
             }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
    };
}]);
app.controller('createdProcessDetailCtrl',['$rootScope','$scope','LocalStorage','processService',function($rootScope,$scope,LocalStorage,processService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		$scope.data = $rootScope.$stateParams.data;
	}
}]);
app.controller('myProcessDetailCtrl',['$rootScope','$scope','LocalStorage','processService',function($rootScope,$scope,LocalStorage,processService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		$scope.data = $rootScope.$stateParams.data;
	}
}]);
