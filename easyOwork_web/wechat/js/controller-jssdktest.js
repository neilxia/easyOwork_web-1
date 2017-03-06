/**
 * Created by Dumin on 2016/7/21.
 */
var app = angular.module('wechat.jssdk',[]);
app.controller('jssdktestCtrl',['$rootScope','$scope','$http','commonService','AppConfig','MsgService','$location','LocalStorage','publicService',function($rootScope,$scope,$http,commonService,AppConfig,MsgService,$location,LocalStorage,publicService){
	
	function initWx(appId, timestamp, nonceStr, signature){
		/*wx.config({
			debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : 'wx7555b28340de435e', // 必填，公众号的唯一标识
			timestamp : 1488694013, // 必填，生成签名的时间戳
			nonceStr : 'dc0dfc17-7a50-438f-9a68-b6b26f3f5978', // 必填，生成签名的随机串
			signature : '95eb2e0e2dc296b43b4b1a55b522540e853a38e7',// 必填，签名，见附录1
			jsApiList : [ 'chooseImage' ,'getNetworkType','openLocation','getLocation']
			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});*/
		wx.config({
			debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : appId, // 必填，公众号的唯一标识
			timestamp : timestamp, // 必填，生成签名的时间戳
			nonceStr : nonceStr, // 必填，生成签名的随机串
			signature : signature,// 必填，签名，见附录1
			jsApiList : [ 'chooseImage' ,'getNetworkType','openLocation','getLocation']
			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(
				function() {
				// 判断网络方法	
				wx.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02,wgs84'
					success: function (res) 
					{
						var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						var speed = res.speed; // 速度，以米/每秒计
						var accuracy = res.accuracy; // 位置精度

						// 打开当前位置
						wx.openLocation({
						    latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
						    longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
						    name: '', // 位置名
						    address: '', // 地址详情说明
						    scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
						    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
						});
					}
				});

			// wx.ready 结束
			});
	}
	$scope.init = function(){
		var url = window.location.href;
		$scope.options={
	          "url":url 
        };
        var promise = publicService.getSignature({body:$scope.options});
        promise.success(function(data, status, headers, config){
            var sts=data.body.status;
             if(sts.statusCode==0){
                var signature = data.body.data.signature;
                var nonceStr = data.body.data.nonceStr; 
                var timestamp = data.body.data.timestamp;
                var appId = data.body.data.appId;
                initWx(appId, timestamp, nonceStr, signature);
             }else{
            	 MsgService.tomsg(data.body.status.errorDesc);
             }
        });
        promise.error(function(data, status, headers, config){
            MsgService.tomsg(data.body.status.errorDesc);
        });
	}
	
	
}]);
