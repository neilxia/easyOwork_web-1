/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.login',[]);
app.controller('loginCtrl',['$rootScope','$scope','$http','commonService','AppConfig','MsgService','$location','LocalStorage','$cookieStore',function($rootScope,$scope,$http,commonService,AppConfig,MsgService,$location,LocalStorage,$cookieStore){
	
	var redirect_url = $rootScope.$stateParams.redirect_url;
	
	$scope.form = {
			user:'',
			password:''
	}
	
	$scope.userError = '';
	$scope.passwordError = '';
	
	$scope.validateUser = function(){
		var value = $scope.form.user
		if(value==''){
			$scope.userError = '用户为必填项';
			return false
		}
		else{
			var mobileRegexp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	        var emailsRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
	        var validity = (mobileRegexp.test(value) || emailsRegexp.test(value));
	        if(!validity){
	        	$scope.userError = '请输入正确的电话号码或电子邮件';
	        	return false;
	        }
	        else
	        	$scope.userError = '';
		}
		return true;
	}
	
	$scope.validatePassword = function(){
		var value = $scope.form.password
		if(value==''){
			$scope.passwordError = '密码为必填项';
			return false
		}
		else $scope.passwordError = '';
		return true;
	}
	
	$scope.login = function(){
		var isUserValid = $scope.validateUser();
		var isPasswordValid = $scope.validatePassword();
		if(isUserValid && isPasswordValid){
			var typearr=commonService.judgeloginClass($scope.form.user);
	        $scope.body={
	            "type":typearr[0],
	            "id":typearr[1][2],
	            "personalEmail":typearr[1][0],
	            "personalPhoneCountryCode":"86",
	            "personalPhone":typearr[1][1],
	            "password":$scope.form.password
	        };
			$scope.requestInfo = {
				header:{
					"requestId":commonService.randomWord(false,32),
					"timeStamp":commonService.getNowFormatDate(),
					"applicationId":"ezKompany-market",
					"ip":"127.0.0.1"
				},
				body:$scope.body
			}
			
			var promise = $http.post(AppConfig.BASE_URL+'work/rest/marketLogin',$scope.requestInfo);
			promise.success(function(data, status, headers, config){
	            var sts=data.body.status;
	            if(sts.statusCode==0){
	            	var Identity = data.body.data;
	            	Identity.tokenId = data.header.tokenId;
	            	//LocalStorage.setObject("Identity",Identity);
	            	$cookieStore.put("Identity",Identity);
	            	$rootScope.Identity = Identity;
	                if(redirect_url != undefined && redirect_url != ''){
	                	$location.url(redirect_url);
	                }else{
	                	$rootScope.$state.go('product');
	                }
	            }else{
	                MsgService.tomsg(sts.errorDesc);
	            }
	        });
			promise.error(function(data, status, headers, config){
				MsgService.tomsg('登录失败, 请稍后重试');
	        });
		
		}
	}
	
	
}]);
