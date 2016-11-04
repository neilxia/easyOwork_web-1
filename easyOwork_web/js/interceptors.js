/**
 * Created by Nose on 2016/9/12.
 */
var interceptors = angular.module('townPc.interceptors',[]);
interceptors.factory('HttpInterceptor', ["$q","$rootScope","LocalStorage",'noseService',function ($q,$rootScope,LocalStorage,noseService){
    return {
        'request': function(config) {
            $rootScope.loading = true;
            // request your $rootscope messaging should be here?
            var thisheader={
                requestId:noseService.randomWord(false, 32),
                timeStamp:noseService.getNowFormatDate,
                applicationId:'ezKompany-work',
                ip:'192.168.1.1',
                "tokenId":"I0tGIIjMlyAXxs0ojhCJ4b7mHk3xzqSo",
                "entId":"00000006"
                //accessToken:LocalStorage.getToken()
            }
            debugger;
            config.headers=thisheader;
            //config.headers["accessToken"] =  LocalStorage.getToken();
/*            config.headers = config.headers || {};
            if($cookies.get('token')){
                config.headers.authorization = 'Bearer ' + $cookies.get('token');
                //config.headers["accessToken"] =  LocalStorage.getToken();
            }*/
/*            var token = LocalStorage.getToken();
            if(token){
                var url = config.url;
                if(url.indexOf("html") <0 ){
                    if(url.indexOf("?") <0){
                        config.url = config.url +'?accessToken='+token;
                    }else{
                        config.url = config.url +'&accessToken='+token;
                    }
                }
            }*/
            return config;
        },
        'requestError': function(rejection) {
            // request error your $rootscope messagin should be here?
            $rootScope.loading = false;
            return $q.reject(rejection);
        },

        'response': function(response) {
            $rootScope.loading = false;
            // response your $rootscope messagin should be here?
            return response;
        },
        'responseError': function(rejection) {
            var data = rejection.data;
            $rootScope.loading = false;
            if(rejection.status ==401 || data["code"] == "401"){
                $rootScope.$state.nopms;

                if ($rootScope.$state.nopms){
                    alert("你还没有登录哦，请登录再试!");
                    //notify({ message: '无权访问，请登录再试!', classes: 'alert-info', templateUrl:'modules/common/prompt.html',prompt:true});
                    $rootScope.$state.nopms=0;
                }
                $rootScope.$state.go('login');
                return $q.reject(rejection);
            }
            // response error your $rootscope messagin should be here?
            return $q.reject(rejection);
        }
    };
}]);

interceptors.config(function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
});