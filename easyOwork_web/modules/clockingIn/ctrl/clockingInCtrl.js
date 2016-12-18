function clockingInlistCtrl(){
    return['$scope', '$modal' ,'$compile','$state','attendanceService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,attendanceService,MsgService,reportService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        $scope.init = function(){
            inquiryAttendanceFun();
        };
        var date = new Date();
        var attendance={
            attendanceYear:date.getFullYear(),
            attendanceMonth:date.getMonth()+1,
            attendanceDay:date.getDate()
        }
        //查询考勤记录当月
        function inquiryAttendanceFun(){
            $scope.options={
                "attendanceYear":attendance.attendanceYear,	//签到或签退年份
                "attendanceMonth":attendance.attendanceMonth,	//签到或签退月份
                "attendanceDay":""		//签到或签退天
            };
/*            $scope.options={
                "attendanceYear":attendance.attendanceYear,	//签到或签退年份
                "attendanceMonth":attendance.attendanceMonth,	//签到或签退月份
                "attendanceDay":"",		//签到或签退天
                "userDTO":{
                    "id":userinfo.id || "",	//员工号
                    "personalEmail":userinfo.personalEmail || "",	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode || "",	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone || ""		//电话号码
                }
            };*/
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.attendanceslist=data.body.data.attendances;
                    $scope.thispages.total=$scope.attendanceslist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

    }]
}

function clockingInviewCtrl(){
    return['$scope', '$modal' ,'$compile','$state','attendanceService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,attendanceService,MsgService,reportService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        $scope.init = function(){
            inquiryAttendanceFun();
        };
        var date = new Date();
        var attendance={
            attendanceYear:date.getFullYear(),
            attendanceMonth:date.getMonth()+1,
            attendanceDay:date.getDate()
        }
        //查询考勤记录当月
        function inquiryAttendanceFun(){
            $scope.options={
                "attendanceYear":attendance.attendanceYear,	//签到或签退年份
                "attendanceMonth":attendance.attendanceMonth,	//签到或签退月份
                "attendanceDay":"",		//签到或签退天
                "userDTO":{
                    "id":userinfo.id || "",	//员工号
                    "personalEmail":userinfo.personalEmail || "",	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode || "",	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone || ""		//电话号码
                }
            };
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.reportlist=data.body.data.reports;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

    }]
}

function clockingInsetCtrl(){
    return['$scope','publicService','attendanceService','MsgService',function($scope,publicService,attendanceService,MsgService){
        $scope.initFun=function(){
            inquiryParameterFun();
        }

        //查询系统参数
        $scope.options={
            "name":""	//如为空则查询所有系统参数, 如有值则查询该参数
            //"name":"WORKING_FROM_TIME"	//如为空则查询所有系统参数, 如有值则查询该参数
        };
        function inquiryParameterFun(){
            var promise = publicService.inquiryParameter({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.settings;
                    debugger;
                    angular.forEach(datalist,function(val,ind){

                        if(val.name=='WORKING_FROM_TIME'){
                            val.nameas='上班时间';
                        }else if(val.name=='WORKING_TO_TIME'){
                            val.nameas='下班时间';
                        }else if(val.name=='WORKING_DAY'){
                            val.nameas='工作日';
                        }
                    })
                    $scope.dataslist=datalist;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };


        //设置工作时间
        $scope.setWorkingTimeFun=function (data,name){
            var dataArr = data.split(':');
            switch (name){
                case 'workingFrom':{
                    $scope.options={
                        "workingFromHour":dataArr[0],	//工作起始时间-小时
                        "workingFromMin":dataArr[1]	//工作起始时间-分钟
                    };
                    break;
                }
                case 'workingTo':{
                    $scope.options={
                        "workingToHour":dataArr[0],	//工作结束时间-小时
                        "workingToMin":dataArr[1]		//工作结束时间-分钟
                    };
                    break;
                }
            }
            var promise = attendanceService.setWorkingTime({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //MsgService.tomsg();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
            return promise;
        };
    }]
}