/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.announcement',[]);
app.controller('announcementListCtrl',['$rootScope','$scope','LocalStorage','noticeService','MsgService',function($rootScope,$scope,LocalStorage,noticeService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		inquiryAnnouncementFun();
	}
	function inquiryAnnouncementFun(){
        var promise = noticeService.inquiryWechatAnnouncements({body:{}});
        promise.success(function(data, status, headers, config){
            //远程开启下面的
            var sts=data.body.status;
            if(sts.statusCode==0){
                $scope.inquiryAnnouncementsData=data.body.data.announcements;
            }else{
                MsgService.tomsg(sts.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            var sts=data.body.status;
            MsgService.tomsg(sts.errorDesc);
        });
    };
}]);
app.controller('announcementDetailCtrl',['$rootScope','$scope','LocalStorage','noticeService','MsgService',function($rootScope,$scope,LocalStorage,noticeService,MsgService){
	var openId=LocalStorage.getOpenId();
	if(openId == null || openId == ''){
		$rootScope.$state.go('login');
	}
	$scope.init = function(){
		var announcementUuid = $rootScope.$stateParams.data;
		$scope.options={
                "announcementUuid":announcementUuid	//流程编号
            };
		var promise = noticeService.inquiryWechatAnnouncement({body:$scope.options});
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
}]);
