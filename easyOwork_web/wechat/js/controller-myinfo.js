/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.myinfo',[]);
app.controller('myInfoCtrl',['$rootScope','$scope','LocalStorage','employeesService','MsgService',function($rootScope,$scope,LocalStorage,employeesService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryWechatEmployeeFun();
	}
	function inquiryWechatEmployeeFun(){
        $scope.options={
        };
        var promise = employeesService.inquiryWechatEmployee({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
            if(sts.statusCode==0){
                var datalist=data.body.data.userList;
                for(d in datalist){
                    datalist[d].checked = false;
                }
                $scope.datalist=datalist;
            }else{
                MsgService.tomsg(data.body.status.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
    };
    
}]);
