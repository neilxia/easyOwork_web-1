/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.login',[]);
app.controller('loginCtrl',['$rootScope','$scope','$http','commonService','AppConfig','MsgService','$location','LocalStorage','$cookieStore',function($rootScope,$scope,$http,commonService,AppConfig,MsgService,$location,LocalStorage,$cookieStore){
	
	var redirect_url = $rootScope.$stateParams.redirect_url;
	
	$scope.form = {
			user:'',
			password:''
	}
	
	$scope.init = function(){
		$scope.userError = '';
		$scope.isUserValid=false;
		$scope.passwordError = '';
		$scope.isPasswordValid = false;
		$scope.openId = $rootScope.$stateParams.openid;
	}
	
	$scope.validateUser = function(){
		var value = $scope.form.user
		if(value==''){
			$scope.userError = '用户为必填项';
			$scope.isUserValid=false;
			return;
		}
		else{
			var mobileRegexp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	        var emailsRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
	        var validity = (mobileRegexp.test(value) || emailsRegexp.test(value));
	        if(!validity){
	        	$scope.userError = '请输入正确的电话号码或电子邮件';
	        	$scope.isUserValid=false;
	        	return;
	        }
	        else
	        	$scope.userError = '';
		}
		$scope.isUserValid=true;
	}
	
	$scope.validatePassword = function(){
		var value = $scope.form.password
		if(value==''){
			$scope.passwordError = '密码为必填项';
			$scope.isPasswordValid = false;
		}
		else $scope.passwordError = '';
		$scope.isPasswordValid = true;
	}
	
	$scope.login = function(){
		if($scope.isUserValid && $scope.isPasswordValid){
			var typearr=commonService.judgeloginClass($scope.form.user);
	        $scope.body={
	            "actionType":"BIND",
	            "personalEmail":typearr[1][0],
	            "personalPhoneCountryCode":"86",
	            "personalPhone":typearr[1][1],
	            "password":$scope.form.password,
	            "openId":$scope.openId
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
			$rootScope.loading = true;
			var promise = $http.post(AppConfig.BASE_URL+'work/rest/bindWechat',$scope.requestInfo);
			promise.success(function(data, status, headers, config){
				$rootScope.loading = false;
	            var sts=data.body.status;
	            if(sts.statusCode==0){
	            	//将用户信息放入LocalStorage
	            	LocalStorage.setOpenId($scope.openId);
	            	$rootScope.$state.go('main');
	            }else{
	                MsgService.tomsg(sts.errorDesc);
	            }
	        });
			promise.error(function(data, status, headers, config){
				$rootScope.loading = false;
				MsgService.tomsg('登录失败, 请稍后重试');
	        });
		
		}
	}
	
	
}]);
