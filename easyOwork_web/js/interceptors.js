/**
 * Created by Nose on 2016/9/12.
 */
var interceptors = angular.module('qiyi.interceptors',[]);
interceptors.factory('HttpInterceptor', ["$q","$rootScope","LocalStorage",'noseService','AppConfig',function ($q,$rootScope,LocalStorage,noseService,AppConfig){
    return {
        'request': function(config) {
        	if(config.url == AppConfig.OSS_BUCKET_URL)
        		return config;
            $rootScope.loading = true;
            // request your $rootscope messaging should be here?
            if(config.data){
                var userinfo=LocalStorage.getObject('userinfo');
                config.data['header']={
                    requestId:noseService.randomWord(false, 32),
                    timeStamp:noseService.getNowFormatDate(),
                    applicationId:'ezKompany-work',
                    ip:'127.0.0.1',
                    "tokenId":userinfo.tokenId,
                    "entId":userinfo.entId
                }
            }
            return config;
        },
        'requestError': function(rejection) {
            // request error your $rootscope messagin should be here?
            $rootScope.loading = false;
            return $q.reject(rejection);
        },

        'response': function(response) {
            $rootScope.loading = false;
            if(typeof(response.data)=='object'){
                var sts=response.data.body.status;
                //if((sts.erroCode)){
                if((sts.erroCode=="ErrorCode.common.0002" || sts.erroCode=="ErrorCode.common.0004")){
                    $rootScope.$state.go('login');
                    LocalStorage.setObject('userinfo',"");
                    LocalStorage.setObject('companyinfo',"");
                    //return $q.reject(response);
                }
            }
            // response your $rootscope messagin should be here?
            return response;
        },
        'responseError': function(rejection) {
            var data = rejection.data;
            $rootScope.loading = false;
            //debugger;
/*            if(rejection.status ==401 || data["code"] == "401"){
                $rootScope.$state.nopms;

                if ($rootScope.$state.nopms){
                    alert("你还没有登录哦，请登录再试!");
                    //notify({ message: '无权访问，请登录再试!', classes: 'alert-info', templateUrl:'modules/common/prompt.html',prompt:true});
                    $rootScope.$state.nopms=0;
                }
                $rootScope.$state.go('login');
                return $q.reject(rejection);
            }*/
            // response error your $rootscope messagin should be here?
            return $q.reject(rejection);
        }
    };
}]);

interceptors.config(function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
});
