/**
 * Created by Nose on 2016/8/30.
 */
var config = angular.module('qiyi.config',[]);
config.factory('AppConfig',function(){
    return {
        //BASE_URL:'http://localhost:8080/',
    	BASE_URL:'https://www.qinghuiyang.com/',
        //BASE_URL:'http://192.168.2.190:9091/',
        //BASE_URL:'http://192.168.2.201:9090/',
        OSS_BUCKET_URL:'https://qinghuiyang-easywork.oss-cn-shanghai.aliyuncs.com'
        //LOCALJSON_URL:''

    }
});
config.factory('LocalStorage',['$window',function($window){
    return {
        setParentId:function(patentId){
            $window.localStorage.parentId = patentId;
        },
        getParentId:function(){
            return $window.localStorage.parentId;
        },
        setToken:function(token){
            $window.localStorage.token = token;
        },
        getToken:function(){
            return $window.localStorage.token;
        },
        setPermissions:function(permissions){
            $window.localStorage.permissions = permissions;
        },
        getPermissions:function(){
            return $window.localStorage.permissions;
        },        //存储单个属性
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