/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.findpwd',[]);
app.controller('findpwdCtrl',['$rootScope','$scope','$http','commonService','AppConfig','MsgService','$location','LocalStorage','$cookieStore',function($rootScope,$scope,$http,commonService,AppConfig,MsgService,$location,LocalStorage,$cookieStore){
	
	$scope.init = function(){
		$scope.verifyStep = true;
		$scope.resetStep = false;
		$scope.form = {
				user:"",
				password:"",
				repeatPassword:"",
				verificationCode:""
		}
	}
	$scope.verify = function(){
		if($scope.validateUser() && $scope.validateVerificationCode()){
			$scope.verifyMSG();
		}
	}
	$scope.cancel = function(){
		$rootScope.$state.go('product');
	}
	
	$scope.goReset = function(){
		$scope.verifyStep = false;
		$scope.resetStep = true;
	}
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
	
	$scope.validateVerificationCode = function(){
		var value = $scope.form.verificationCode
		if(value==''){
			$scope.verificationError = '验证码为必填项';
			return false
		}
		else{
			var verifyRegexp = /^[0-9]{6}$/;
	        var validity = verifyRegexp.test(value);
	        if(!validity){
	        	$scope.verificationError = '验证码为6位数字';
	        	return false;
	        }
	        else
	        	$scope.verificationError = '';
		}
		return true;
	}
	
	$scope.validatePassword = function(){
		$scope.repeatPasswordError = '';
		var value = $scope.form.password;
		if(value==''){
			$scope.passwordError = '密码为必填项';
			return false
		}
		else $scope.passwordError = '';
		return true;
	}
	$scope.validateRepeatPassword = function(){
		$scope.repeatPasswordError = '';
		var value = $scope.form.repeatPassword;
		if(value==''){
			$scope.repeatPasswordError = '密码为必填项';
			return false
		}
		else $scope.repeatPasswordError = '';
		return true;
	}
	$scope.complete = function(){
		if($scope.validatePassword() && $scope.validateRepeatPassword() && $scope.validatePasswordEqual()){
			$scope.resetPassword();
		}
	}
	$scope.validatePasswordEqual = function(){
		if($scope.form.password != $scope.form.repeatPassword){
			$scope.repeatPasswordError = '两次输入密码不一致';
			return false;
		}
		else $scope.repeatPasswordError = '';
		return true;
	}
	
	//发送验证码
    $scope.sendMSG=function(){
        if(!$scope.form.user){return;}
        var typearr=commonService.judgeloginClass($scope.form.user);
        $scope.body = {
            type:typearr[0],
            email:typearr[1][0],
            mobileNo:typearr[1][1],
            mobileCountryCode:'86'
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
			
		var promise = $http.post(AppConfig.BASE_URL+'work/rest/sendVerificationCode',$scope.requestInfo);
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
            if(sts.statusCode==0){
                //MsgService.tomsg();
            }else{
                MsgService.tomsg(sts.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(sts.errorDesc);
        });
    };
	//校验验证码
    $scope.verifyMSG=function(){
        if(!$scope.form.user){return;}
        var typearr=commonService.judgeloginClass($scope.form.user);
        $scope.body = {
            type:typearr[0],
            email:typearr[1][0],
            mobileNo:typearr[1][1],
            mobileCountryCode:'86',
            verificationCode:$scope.form.verificationCode
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
			
		var promise = $http.post(AppConfig.BASE_URL+'work/rest/verifyCode',$scope.requestInfo);
        $rootScope.loading = true;
        promise.success(function(data, status, headers, config){
        	$rootScope.loading = false;
            var sts=data.body.status;
            if(sts.statusCode==0){
            	$scope.goReset();
            }else{
                MsgService.tomsg(sts.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
        	$rootScope.loading = false;
            MsgService.tomsg(sts.errorDesc);
        });
    };
  //校验验证码
    $scope.resetPassword=function(){
        if(!$scope.form.user){return;}
        var typearr=commonService.judgeloginClass($scope.form.user);
        $scope.body = {
            type:typearr[0],
            personalEmail:typearr[1][0],
            personalPhone:typearr[1][1],
            personalPhoneCountryCode:'86',
            verificationCode:$scope.form.verificationCode,
            newPassword:$scope.form.password
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
		var promise = $http.post(AppConfig.BASE_URL+'work/rest/resetPassword',$scope.requestInfo);
        promise.success(function(data, status, headers, config){
        	$rootScope.loading = false;
            var sts=data.body.status;
            if(sts.statusCode==0){
            	MsgService.tomsg('重置密码成功');
            	$rootScope.$state.go('login');
            }else{
                MsgService.tomsg(sts.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
        	$rootScope.loading = false;
            MsgService.tomsg(sts.errorDesc);
        });
    };
	
}]);
