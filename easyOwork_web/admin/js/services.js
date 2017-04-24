/**
 * Created by Nose on 2016/8/30.
 */
var app=angular.module('qiyi.services',['nose.tpls']);
var n= 1,mundata;

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
        RndNum:function(n) {
            var rnd = "";
            for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
            return rnd;
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
        //获取当前时间yyyy-mm-dd
        getNowDate:function () {
            var date = new Date();
            var seperator1 = "-";//"-";
            var seperator2 = "";//':'
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
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
            notify({ message: newmsg, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
        },
        errormsg:function(data){
            var sts=data.body.status;
            notify({ message: status.errorDesc, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
/*            if((status.erroCode=="ErrorCode.login.0004")){
            //if((status.erroCode=="ErrorCode.common.0002" || status.erroCode=="ErrorCode.login.0004")){
                $rootScope.$state.go('login');
            }*/
        }
    }
}]);
app.factory('Common', ['$q','$modal','RecruitFlowService',
    function ($q,$modal,RecruitFlowService) {
        return {
            openConfirmWindow: function(modalTitle,modalContent,modalInstance) {
                var deferred = $q.defer();
                /*
                 * modalInstance是在弹窗的基础上再弹出confirm确认框时从第一个弹窗中传进的$modalInstance,
                 * 若是直接在页面上弹出confirm确认框，则不能传$modalInstance,否则会报错
                 */
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
            },
            getduanDate:function (start,end) {
                var datearr=[];
                var date = new Date();
                for(var i=0;i>parseInt(start);i--){
                    var startdate = new Date(date.getTime() + 24*60*60*1000*(parseInt(start)-i));  //向前
                    var ddate=getthedata(startdate);
                    datearr.push(ddate);
                }
                for(var i=0;i<parseInt(end);i++){
                    var enddate = new Date(date.getTime() + 24*60*60*1000*i);  //向前
                    var ddate=getthedata(enddate);
                    if(i==0){
                        ddate.thisweek=ddate.cweekhao;
                    }
                    datearr.push(ddate);
                }

                function getthedata(thisdata){
                    var thedata={};
                    var arrweek=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
                    var theweek=thisdata.getDay();
                    var seperator1 = "-";//"-";
                    var seperator2 = ":";//':'
                    var month = thisdata.getMonth() + 1;
                    var strDate = thisdata.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var cdate = thisdata.getFullYear() + seperator1  +  month + seperator1 + strDate;

                    thedata.cdate=cdate;
                    thedata.cweek=arrweek[theweek];
                    thedata.cweekhao=theweek;

                    return thedata;
                }
                return datearr;
            },
            timecompareTo:function compareTo(beginTime,endTime){
                //var beginTime = "2009-09-21 00:00:02";
                //var endTime    = "2009-09-21 00:00:01";
                var val;
                //var beginTimes = beginTime.substring(0,10).split('-');
                //var endTimes   =  endTime.substring(0,10).split('-');
                //beginTime = beginTimes[1]+'-'+beginTimes[2]+'-'+beginTimes[0]+' '+beginTime.substring(10,19);
                //endTime    = endTimes[1]+'-'+endTimes[2]+'-'+endTimes[0]+' '+endTime.substring(10,19);
                var a =(Date.parse(endTime)-Date.parse(beginTime))/3600/1000;
                //alert(a);
                if(a<0){
                    val=0; //endTime小
                }else if (a>0){
                    val=1; //endTime大
                }else if (a==0){
                    val=2; //时间相等
                }
                return val;
            },
            //查询简历在各个招聘节点数量
            inquiryRecruitPositionSummaryFun:function($scope,planName,positionName){
                //var newObj=[];
                if ($scope) {
                    var options={
                        "planName":planName,
                        "positionName":positionName
                    };
                    var promise = RecruitFlowService.inquiryRecruitPositionSummary({body:options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            if(n==1){
                                n++;
                                $scope.mundata=mundata=data.body.data;
                            }else{
                                mundata.channelPublishCount=data.body.data.channelPublishCount;
                                mundata.channelTotalCount=data.body.data.channelTotalCount;
                                mundata.hiredCount=data.body.data.hiredCount;
                                mundata.resumeCount=data.body.data.resumeCount;
                                angular.forEach(mundata.nodeList,function(val,ind){
                                    angular.forEach(data.body.data.nodeList,function(newval,newind){
                                        if(ind==newind){
                                            val.nodeHoldCount=newval.nodeHoldCount;
                                            val.nodeNormalCount=newval.nodeNormalCount;
                                            val.nodeRejectCount=newval.nodeRejectCount;
                                            val.nodeTotalCount=newval.nodeTotalCount;
                                        }
                                    });
                                })
                                $scope.mundata=mundata;
                            }
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                }
                //return newObj;
            }
        }
    }]);
app.factory('accessService',['LocalStorage',function(LocalStorage){
	return{
        setAccessList:function(accessList){
        	LocalStorage.setObject('permissionList',accessList);
        },
        setUserList:function(userList){
        	LocalStorage.setObject('userList',userList);
        },
        hasAccess:function(accessId){
        	var permissionList = LocalStorage.getObject('permissionList');
        	if(permissionList != undefined)
	        	for(permission in permissionList){
	        		if(permissionList[permission].functionCode == accessId)
	        			return true
	        	}
        	return false;
        },
        hasUser:function(userUuid){
        	var userList = LocalStorage.getObject('userList');
        	if(userList != undefined)
	        	for(user in userList){
	        		if(userList[user].userUuid == userUuid)
	        			return true
	        	}
        	return false;
        }
    }
}]);



