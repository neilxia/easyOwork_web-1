/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.projecttask',[]);
app.controller('projectTaskListCtrl',['$rootScope','$scope','LocalStorage','projectService','MsgService',function($rootScope,$scope,LocalStorage,projectService,MsgService){
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
            var promise = projectService.inquiryWechatProjectTasks({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.tasklist=data.body.data.projectTasks;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	};
}]);
app.controller('projectTaskDetailCtrl',['$rootScope','$scope','LocalStorage','projectService','MsgService',function($rootScope,$scope,LocalStorage,projectService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		$scope.data = $rootScope.$stateParams.data;
	}
	$scope.updateTask = function(actionType){
		$scope.options={
			"actionType":actionType,
            "taskUuid":$scope.data.taskUuid
        };
		var promise = taskService.changeWechatTask({body:$scope.options});
        promise.success(function(data, status, headers, config){
        	var sts=data.body.status;
            if(sts.statusCode==0){
            	$rootScope.$state.go('tasklist',{'status':'已开始'});
            }else{
                MsgService.tomsg(data.body.status.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
        	MsgService.tomsg(data.body.status.errorDesc);
        });
	};
}]);
