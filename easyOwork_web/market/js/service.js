/**
 * Created by Nose on 2016/8/30.
 */
var app=angular.module('market.service',[]);

app.factory('commonService',[function(){
    return {
        /*
         ** randomWord 产生任意长度随机字母数字组合
         ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
         * 生成3-32位随机串：randomWord(true, 3, 32)
         * 生成43位随机串：randomWord(false, 43)
         */
        randomWord:function (randomFlag, min, max){
            var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            // 随机产生
            if(randomFlag){
                range = Math.round(Math.random() * (max-min)) + min;
            }
            for(var i=0; i<range; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;
        },
        //获取当前时间yyyymmddhhmmss
        getNowFormatDate:function () {
            var date = new Date();
            var seperator1 = "";//"-";
            var seperator2 = "";//':'
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + "" + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        },
        //日期加减天数 yyyy-MM-dd
        addDays:function (date, days) {
        	var dateTemp = dateTemp.split("-");  
            var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式    
            var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);  
            var rDate = new Date(millSeconds);  
            var year = rDate.getFullYear();  
            var month = rDate.getMonth() + 1;  
            if (month < 10) month = "0" + month;  
            var date = rDate.getDate();  
            if (date < 10) date = "0" + date;  
            return (year + "-" + month + "-" + date);
        },
        //判断是什么登录类型
        judgeloginClass:function(obj){
            var newObj=[];
            if (obj) {
                var mobileRegexp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                var emailsRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
                var idRegexp= /^\d+(\.\d+)?$/;
                if(mobileRegexp.test(obj)){
                    newObj[0]='MOBILE';
                }else if(emailsRegexp.test(obj)){
                    newObj[0]='EMAIL';
                }else if(idRegexp.test(obj)){
                    newObj[0]='ID';
                }else{
                    newObj[0]='NAME';
                }
                var typearr=['','','',''];
                if(newObj=='EMAIL'){
                    typearr[0]=obj
                }else if(newObj=='MOBILE'){
                    typearr[1]=obj
                }else if(newObj='ID'){
                    typearr[2]=obj
                }else{
                    typearr[3]=obj
                }
                newObj[1]=typearr;
            }
            return newObj;
        }
    }
}]);

app.factory('MsgService',['$rootScope','notify',function($rootScope,notify){
    return{
        tomsg:function(msg){
           var newmsg = (msg==''|| msg==undefined)?'提交成功！':msg;
           notify({ message: newmsg, classes: 'orange iconfont icon-one', templateUrl:'market/view/prompt.html' ,prompt:true});
        }
    }
}]);

/*
app.factory('Common', ['$q','$modal',
    function ($q,$modal) {
        return {
            openConfirmWindow: function(modalTitle,modalContent,modalInstance) {
                var deferred = $q.defer();
                var confirmModal = $modal.open({
                    backdrop: 'static',
                    templateUrl : 'template/modal/confirmModelTemplate.html',  // 指向确认框模板
                    controller : ConfirmCtrl,// 初始化模态控制器
                    //windowClass: "confirmModal",// 自定义modal上级div的class
                    size : 'sm', //大小配置
                    resolve : {
                        data : function(){
                            return {modalContent: modalContent,modalTitle: modalTitle};//surgeonSug: $scope.surgeonSug,
                        }
                    }
                });
                function ConfirmCtrl($scope,$modalInstance,data){
                    $scope.iconbox=data.modalTitle;
                    $scope.content=data.modalContent;
                    $scope.ok = function() {
                        $modalInstance.close();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }


                // 处理modal关闭后返回的数据
                confirmModal.result.then(function() {
                    if(!!modalInstance) {
                        modalInstance.dismiss('cancel');
                    }
                    deferred.resolve();
                },function(){
                });
                return deferred.promise;
            }
        }
    }]);
*/



