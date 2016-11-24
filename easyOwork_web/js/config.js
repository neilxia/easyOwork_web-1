/**
 * Created by Nose on 2016/8/30.
 */
var config = angular.module('qiyi.config',[]);
config.factory('AppConfig',function(){
    return {
        BASE_URL:'http://120.76.96.199:8080/',
        //BASE_URL:'http://192.168.2.190:9091/',
        //BASE_URL:'http://192.168.2.201:9090/',
        OSS_BUCKET_URL:'http://qinghuiyang-easywork.oss-cn-shanghai.aliyuncs.com'
        
    }
});
config.factory('LocalStorage',['$window',function($window){
    return {
        setParentId:function(patentId){
            $window.sessionStorage.parentId = patentId;
        },
        getParentId:function(){
            return $window.sessionStorage.parentId;
        },
        setToken:function(token){
            $window.sessionStorage.token = token;
        },
        getToken:function(){
            return $window.sessionStorage.token;
        },
        setPermissions:function(permissions){
            $window.sessionStorage.permissions = permissions;
        },
        getPermissions:function(){
            return $window.sessionStorage.permissions;
        },        //存储单个属性
        set :function(key,value){
            $window.sessionStorage[key]=value;
        },        //读取单个属性
        get:function(key,defaultValue){
            return  $window.sessionStorage[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        setObject:function(key,value){
            $window.sessionStorage[key]=JSON.stringify(value);
        },        //读取对象
        getObject: function (key) {
            return JSON.parse($window.sessionStorage[key] || '{}');
        }

        /*
         //存储单个属性
         set :function(key,value){
         $window.localStorage[key]=value;
         },        //读取单个属性
         get:function(key,defaultValue){
         return  $window.localStorage[key] || defaultValue;
         },        //存储对象，以JSON格式存储
         setObject:function(key,value){
         $window.localStorage[key]=JSON.stringify(value);
         },        //读取对象
         getObject: function (key) {
         return JSON.parse($window.localStorage[key] || '{}');
         }
         */
    };

}]);