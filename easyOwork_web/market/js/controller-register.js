/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.register',[]);
app.controller('registerCtrl',['$rootScope','$scope','$http','commonService','AppConfig','MsgService','$location','LocalStorage','$cookieStore',function($rootScope,$scope,$http,commonService,AppConfig,MsgService,$location,LocalStorage,$cookieStore){
	
	$scope.init = function(){
		$scope.form = {
				user:"",
				registerPassword:"",
				verificationCode:"",
				repeatPassword:"",
				verificationCode:""
		}
	}

	$scope.cancel = function(){
		$rootScope.$state.go('product');
	}
	
	$scope.validateUser = function(){
		var value = $scope.form.user
		if(value==''){
			$scope.userError = '请输入手机号码或电子邮箱';
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
	$scope.validateName = function(){
		var value = $scope.form.name
		if(value==''){
			$scope.nameError = '请输入企业名称';
			return false
		}else if(value.length>60){
			$scope.nameError = '企业名称长度最大60个字符';
			return false
		}
		else{
			var nameRegexp = /^[a-zA-Z0-9\u4e00-\u9fa5\\(\\)\\-]+$/;
	        var validity = nameRegexp.test(value);
	        if(!validity){
	        	$scope.nameError = '企业名称含有非法字符';
	        	return false;
	        }
	        else
	        	$scope.nameError = '';
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
		var value = $scope.form.registerPassword;
		if(value==''){
			$scope.passwordError = '密码为必填项';
			return false
		}
		else $scope.passwordError = '';
		return true;
	}
	$scope.validateRepeatPassword = function(){
		var value = $scope.form.repeatPassword;
		if(value==''){
			$scope.repeatPasswordError = '密码为必填项';
			return false
		}
		else $scope.repeatPasswordError = '';
		return true;
	}
	$scope.complete = function(){
		if($scope.validateUser() && $scope.validateName() && $scope.validateVerificationCode() && $scope.validatePassword() && $scope.validateRepeatPassword() && $scope.validatePasswordEqual()){
			$rootScope.loading = true;
			$scope.register();
		}
	}
	$scope.validatePasswordEqual = function(){
		if($scope.form.registerPassword != $scope.form.repeatPassword){
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
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
            if(sts.statusCode==0){
            	$scope.goReset();
            }else{
                MsgService.tomsg(sts.errorDesc);
            }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(sts.errorDesc);
        });
    };
  //校验验证码
    $scope.register=function(){
    	
        var typearr=commonService.judgeloginClass($scope.form.user);
        $scope.body = {
            registerEmail:typearr[1][0],
            registerMobileNo:typearr[1][1],
            registerMobileCountryCode:'86',
            verificationCode:$scope.form.verificationCode,
            name:$scope.form.name,
            registerPassword:$scope.form.registerPassword
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
			
		var promise = $http.post(AppConfig.BASE_URL+'work/rest/registerCompany',$scope.requestInfo);
        promise.success(function(data, status, headers, config){
        	$rootScope.loading = false;
            var sts=data.body.status;
            if(sts.statusCode==0){
            	//$rootScope.$state.go('login');
            	window.location.href="/c-"+data.body.data.shortEnglishName+"?firstTimeAccess=true";
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
