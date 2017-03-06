/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.main',[]);
app.controller('mainCtrl',['$rootScope','$scope','LocalStorage','employeesService','MsgService','$location',function($rootScope,$scope,LocalStorage,employeesService,MsgService,$location){
	$scope.init = function(){
		//LocalStorage.setOpenId('fdsklajflkdjslkafld');
		var openId=LocalStorage.getOpenId();
		var search = window.location.search;
		$scope.code = '';
		if(search != null && search.length>1){
			var searchArray = search.substr(1).split("&");
			if(searchArray != null && searchArray.length>0){
				for(var i=0; i<searchArray.length;i++){
					if(searchArray[i].indexOf("code=")==0){
						$scope.code = searchArray[i].substr(5);
					}
				}
			}
		}
		if(openId == null || openId == ''){
			$rootScope.$state.go('login',{'code':$scope.code});
			return;
		}
		$scope.taskInprogress = 0;
		$scope.taskNew = 0;
		$scope.projectTaskInprogress = 0;
		$scope.projectTaskNew = 0;
		$scope.handlingProcessCount = 0;
		$scope.createdProcessCount = 0;
		$scope.reportCount = 0;
		
		initWechatMain();
	}
	function initWechatMain(){
        $scope.options={
            
        };
        var promise = employeesService.initWechatMain({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
             if(sts.statusCode==0){
                $scope.announcements=data.body.data.announcements;
                $scope.reports=data.body.data.reports;
                $scope.tasks=data.body.data.tasks;
                $scope.projectTasks=data.body.data.projectTasks;
                $scope.createdProcesses=data.body.data.createdProcesses;
                $scope.handlingProcesses=data.body.data.handlingProcesses;
                
                angular.forEach($scope.handlingProcesses, function(obj1, key1) {
            		if(obj1.statusDesc=='审批中')
            			$scope.handlingProcessCount = $scope.handlingProcessCount +1;
            	});
                
                $scope.createdProcessCount = $scope.createdProcesses.length;
                
                angular.forEach($scope.tasks, function(obj1, key1) {
            		if(obj1.status=='已分配')
            			$scope.taskNew = $scope.taskNew +1;
            		else if(obj1.status=='已开始')
            			$scope.taskInprogress = $scope.taskInprogress +1;
            	});
                angular.forEach($scope.projectTasks, function(obj1, key1) {
            		if(obj1.status=='已分配')
            			$scope.projectTaskNew = $scope.projectTaskNew +1;
            		else if(obj1.status=='已开始')
            			$scope.projectTaskInprogress = $scope.projectTaskInprogress +1;
            	});
                $scope.reportCount = $scope.reports.length;
            	 
             }else{
            	 MsgService.tomsg(data.body.status.errorDesc);
             }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
    };
}]);
