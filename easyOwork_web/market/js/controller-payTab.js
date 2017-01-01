/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.payTab',[]);
app.controller('payTabCtrl',['$rootScope','$scope','LocalStorage','commonService','$http','AppConfig','MsgService','$cookieStore','$modal','$window',function($rootScope,$scope,LocalStorage,commonService,$http,AppConfig,MsgService,$cookieStore,$modal,$window){
	$scope.init = function(){
		var order = LocalStorage.getObject("Order");
		pingpp.createPayment(order.charge, function(result, err){
		    console.log(result);
		    console.log(err.msg);
		    console.log(err.extra);
		    if (result == "success") {
		        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
		    	$rootScope.$state.go('complete');
		    } else if (result == "fail") {
		        // charge 不正确或者微信公众账号支付失败时会在此处返回
		    	$rootScope.$state.go('complete');
		    } else if (result == "cancel") {
		        // 微信公众账号支付取消支付
		    	$rootScope.$state.go('complete');
		    }
		});
	}
	
}]);
