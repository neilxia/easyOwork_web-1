/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.staff',[]);
app.controller('staffListCtrl',['$rootScope','$scope','LocalStorage','employeesService','companyService','MsgService',function($rootScope,$scope,LocalStorage,employeesService,companyService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryWechatEmployeeFun();
		inquiryWechatCompanyOrgFun();
	}
	function inquiryWechatEmployeeFun(){
        $scope.options={
            "type":"ALL"
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
    function inquiryWechatCompanyOrgFun(){
        $scope.options={
            
        };
        var promise = companyService.inquiryWechatCompanyOrg({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var datas=data.body;
            if(datas.status.statusCode==0){


            }else{
                MsgService.tomsg(data.body.status.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
    };
}]);
