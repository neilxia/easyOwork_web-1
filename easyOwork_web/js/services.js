/**
 * Created by Nose on 2016/8/30.
 */
var app=angular.module('qiyi.services',[]);

app.factory('noseService',[function(){
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
app.factory('errorService',['notify',function(notify){
    return{
        msg:function(data){
            var status=data.body.status;
            notify({ message: status.errorDesc, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
            if((status.erroCode=="ErrorCode.login.0004")){
                $rootScope.$state.go('login');
            }
        }
    }
}]);


