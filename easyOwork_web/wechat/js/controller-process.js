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
app.controller('createdProcessListCtrl',['$rootScope','$scope','LocalStorage','processService','MsgService',function($rootScope,$scope,LocalStorage,processService,MsgService){
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
app.controller('createdProcessDetailCtrl',['$rootScope','$scope','LocalStorage','processService','Common','MsgService',function($rootScope,$scope,LocalStorage,processService,Common,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		var processUuid = $rootScope.$stateParams.data;
		$scope.options={
                "processUuid":processUuid	//流程编号
            };
		var promise = processService.inquiryWechatProcess({body:$scope.options});
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
	$scope.withdrawProcess=function(row){
            $scope.options={
                "actionType":"WITHDRAW"	,	//APPROVE, REJECT, WITHDRAW
                "processUuid":row.processUuid,	//流程编号
                "message":''	//批准拒绝时添加的信息
            };
            var promise = processService.changeWechatProcess({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	$rootScope.$state.go('createdprocesslist');
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
    };
}]);
app.controller('myProcessDetailCtrl',['$rootScope','$scope','LocalStorage','processService','Common','MsgService','$modal',function($rootScope,$scope,LocalStorage,processService,Common,MsgService,$modal){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		var processUuid = $rootScope.$stateParams.data;
		$scope.options={
                "processUuid":processUuid	//流程编号
            };
		var promise = processService.inquiryWechatProcess({body:$scope.options});
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
	$scope.updateProcess = function(actionType){
		$scope.data.actionType = actionType;
    	var modalInstance = $modal.open({
            templateUrl: 'addcomment.html',
            size:'sm',
            controller: modalCtrl,
            resolve:{
            	row: function () {
                    return $scope.data;
                }
            }
        });
    	function modalCtrl ($scope, $modalInstance,row) {
        	$scope.message = '';
            $scope.ok=function(){
            	$scope.options={
                    "actionType":row.actionType	,	//APPROVE, REJECT, WITHDRAW
                    "processUuid":row.processUuid,	//流程编号
                    "message":$scope.message
                };
                var promise = processService.changeWechatProcess({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                    	$modalInstance.close();
                    	$rootScope.$state.go('myprocesslist');
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
                
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    }
	$scope.changeProcess=function(row){
        $scope.options={
            "actionType":row.actionType	,	//APPROVE, REJECT, WITHDRAW
            "processUuid":row.processUuid,	//流程编号
            "message":row.message	//批准拒绝时添加的信息
        };
        var promise = processService.changeWechatProcess({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
            if(sts.statusCode==0){
            	$rootScope.$state.go('myprocesslist');
            }else{
                MsgService.tomsg(data.body.status.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
};
	
}]);
