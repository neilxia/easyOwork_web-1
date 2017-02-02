/**
 * Created by changqing on 2016/7/21.
 */
var app = angular.module('market.header',[]);
app.controller('headerCtrl',['$rootScope','$scope','LocalStorage','commonService','MsgService','$http','AppConfig','$cookieStore','$window',function($rootScope,$scope,LocalStorage,commonService,MsgService,$http,AppConfig,$cookieStore,$window){
	
	$scope.init = function(){
		$rootScope.userinfo = LocalStorage.getObject("userinfo");
	}
	
	$scope.openQiyiWork = function(){
		if($rootScope.userinfo==null||$rootScope.userinfo.name==null){
			$rootScope.$state.go('login');
		}else{
			$window.open("/ind.html#/index");
		}
	}
	
		$scope.logout=function(){
			$scope.requestInfo = {
					header:{
						"requestId":commonService.randomWord(false,32),
						"timeStamp":commonService.getNowFormatDate(),
						"applicationId":"ezKompany-market",
						"ip":"127.0.0.1",
						"tokenId":$rootScope.userinfo.tokenId,
						"entId":$rootScope.userinfo.entId
					},
					body:{}
				}
			$rootScope.loading = true;
			var promise = $http.post(AppConfig.BASE_URL+'work/rest/logout',$scope.requestInfo);
            promise.success(function(data, status, headers, config){
            	$rootScope.loading = false;
                var sts=data.body.status;
                if(sts.statusCode==0){
                	$rootScope.userinfo = null;
            		LocalStorage.setObject("userinfo",null);
            		$rootScope.$state.go('product');
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	$rootScope.loading = false;
            });
        }
		
}]);
