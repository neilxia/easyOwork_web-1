/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('market.qrcode',[]);
app.controller('qrcodeCtrl',['$rootScope','$scope','LocalStorage','commonService','$http','AppConfig','MsgService','$cookieStore','$modal','$window',function($rootScope,$scope,LocalStorage,commonService,$http,AppConfig,MsgService,$cookieStore,$modal,$window){
	$scope.init = function(){
		var order = $cookieStore.get("Order");
		$('#code').html('');
		$('#code').qrcode(order.charge.credential.wx_pub_qr);
	}
	
}]);
