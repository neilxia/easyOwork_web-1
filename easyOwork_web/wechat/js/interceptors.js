/**
 * Created by Nose on 2016/9/12.
 */
var interceptors = angular.module('wechat.interceptors',[]);
interceptors.factory('HttpInterceptor', ["$q","$rootScope","LocalStorage",'noseService','AppConfig',function ($q,$rootScope,LocalStorage,noseService,AppConfig){
    return {
        'request': function(config) {
        	if(config.url == AppConfig.OSS_BUCKET_URL)
        		return config;
            $rootScope.loading = true;
            // request your $rootscope messaging should be here?
            if(config.data){
                var openId=LocalStorage.getOpenId();
                config.data['header']={
                    requestId:noseService.randomWord(false, 32),
                    timeStamp:noseService.getNowFormatDate(),
                    applicationId:'ezKompany-work',
                    ip:'127.0.0.1',
                    "openId":openId
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
        	$rootScope.loading = true;
            return response;
        },
        'responseError': function(rejection) {
            $rootScope.loading = false;
            return $q.reject(rejection);
        }
    };
}]);

interceptors.config(function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
});
