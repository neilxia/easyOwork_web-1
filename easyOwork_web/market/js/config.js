/**
 * Created by Nose on 2016/8/30.
 */
var config = angular.module('market.config',[]);
config.factory('AppConfig',function(){
    return {
        BASE_URL:'http://localhost:8080/',
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

    };

}]);