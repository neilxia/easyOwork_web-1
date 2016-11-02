/**
 * Created by Nose on 2016/8/30.
 */
var config = angular.module('qiyi.config',[]);
config.factory('AppConfig',function(){
    return {
        BASE_URL:'http://120.76.96.199:8080/'
        //BASE_URL:'http://192.168.2.190:9091/'
        //BASE_URL:'http://192.168.2.201:9090/'
    }
});