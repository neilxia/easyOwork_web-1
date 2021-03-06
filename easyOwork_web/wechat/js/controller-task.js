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
		var taskUuid = $rootScope.$stateParams.data;
		$scope.options={
                "taskUuid":taskUuid	//任务编号
            };
		var promise = taskService.inquiryWechatTask({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
            if(sts.statusCode==0){
            	$scope.data = data.body.data;
            }else{
                MsgService.tomsg(data.body.status.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
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
