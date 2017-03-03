/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.task',[]);
app.controller('taskListCtrl',['$rootScope','$scope','LocalStorage','taskService','MsgService',function($rootScope,$scope,LocalStorage,taskService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryAssignedTasksFun();
		$scope.selectedStatus = $rootScope.$stateParams.status;
	}
	$scope.selectStatus = function(processStatus){
		$scope.selectedStatus = processStatus;
	}
	function inquiryAssignedTasksFun(){
            $scope.options={
            };
            var promise = taskService.inquiryWechatAssignedTasks({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.tasklist=data.body.data.tasks;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	};
}]);
app.controller('taskDetailCtrl',['$rootScope','$scope','LocalStorage','taskService','MsgService',function($rootScope,$scope,LocalStorage,taskService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		$scope.data = $rootScope.$stateParams.data;
	}
}]);
