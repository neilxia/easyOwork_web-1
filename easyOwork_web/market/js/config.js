/**
 * Created by Nose on 2016/8/30.
 */
var config = angular.module('market.config',[]);
config.factory('AppConfig',function(){
    return {
        // BASE_URL:'https://www.qinghuiyang.com/',
        BASE_URL:'http://120.76.96.199/',

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

    };

}]);