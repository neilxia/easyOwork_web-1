function clockingInlistCtrl(){
    return['$scope', '$modal' ,'$compile','$state','attendanceService','MsgService','reportService','LocalStorage','Common','publicService',function($scope,$modal,$compile,$state,attendanceService,MsgService,reportService,LocalStorage,Common,publicService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        var date = new Date();
        var attendance={
                attendanceYear:date.getFullYear(),
                attendanceMonth:date.getMonth()+1,
                attendanceDay:date.getDate()
            }
        $scope.init = function(){
            if(attendance.attendanceMonth<10)
        		$scope.form = {"attendanceDate":attendance.attendanceYear+"-0"+attendance.attendanceMonth};
        	else
        		$scope.form = {"attendanceDate":attendance.attendanceYear+"-"+attendance.attendanceMonth};
            inquiryAttendanceFun();
        };
        $scope.changeYearMonth = function(){
        	var attendanceDate = $("#attendanceDate").val();
        	attendance.attendanceYear = attendanceDate.substring(0,4);
        	attendance.attendanceMonth = attendanceDate.substring(5,7);
        	inquiryAttendanceFun();
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
            var promise = attendanceService.inquiryAttendanceSummary({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.attendanceslist=data.body.data.attendances;
                    /*$scope.attendanceslist=[
                        {
                            "name":"将之前",
                            "id":"01111",
                            "orgList":"人力资源部",
                            "time":"2016-11",
                            "datey":"18",
                            "chidao":"2",
                            "zhaotui":"2"
                        }
                    ]*/
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
    return['$scope','$rootScope','attendanceService',function($scope,$rootScope,attendanceService){
        //var userinfo=LocalStorage.getObject('userinfo');
        var rordatas=$rootScope.$stateParams.row;
        $scope.yearMonth = rordatas;
/*        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };*/
        $scope.init = function(){
            inquiryAttendanceFun();
        };
        //查询考勤记录当月
        function inquiryAttendanceFun(){
            $scope.options={
                "attendanceYear":rordatas.attendanceYear || "",	//签到或签退年份
                "attendanceMonth":rordatas.attendanceMonth || "",	//签到或签退月份
                //"attendanceDay":"",		//签到或签退天
                "userDTO":{
                    "id":rordatas.userDTO.id || "",	//员工号
                    "personalEmail":rordatas.userDTO.personalEmail || "",	//邮件地址
                    "personalPhoneCountryCode":rordatas.userDTO.personalPhoneCountryCode || "",	//电话号码国家代码
                    "personalPhone":rordatas.userDTO.personalPhone || ""		//电话号码
                }
            };
            debugger;
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.attendanceslist=data.body.data.attendances;
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

        $scope.workingDay = [
            {value: 1, text: '星期一',checked:false},
            {value: 2, text: '星期二',checked:false},
            {value: 3, text: '星期三',checked:false},
            {value: 4, text: '星期四',checked:false},
            {value: 5, text: '星期五',checked:false},
            {value: 6, text: '星期六',checked:false},
            {value: 7, text: '星期日',checked:false}
        ];

        function inquiryParameterFun(){
            var promise = publicService.inquiryParameter({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.settings;
                    var datalistnew=[];
                    angular.forEach(datalist,function(val,ind){
                        if(val.name=='WORKING_FROM_TIME'){
                            val.nameas='上班时间';
                            datalistnew.push(val);
                        }else if(val.name=='WORKING_TO_TIME'){
                            val.nameas='下班时间';
                            datalistnew.push(val);
                        }else if(val.name=='WORKING_DAY'){
                            var arr=val.value.split(',');
                            var arrnew=[];
                            val.nameas='工作日自定义';
                            datalistnew.push(val);
                            angular.forEach(arr,function(aval){
                                angular.forEach($scope.workingDay,function(val,ind){
                                    if(aval==val.value){
                                        arrnew.push(val);
                                    }
                                })
                            })
                            $scope.seleworking=arrnew;
                        }
                    })
                    $scope.dataslist=datalistnew;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };

        $scope.showStatus = function() {
            var selected = [];
            angular.forEach($scope.workingDay, function(val) {
                if (val.checked) {
                    selected.push(s.text);
                }
            });
            return selected.length ? selected.join(',') : '没有选择';
        };
        //设置工作时间
        $scope.seleworked=true;
        $scope.seleworkedopen=function(){
            $scope.seleworked=false;
        }
        $scope.setWorkingTimeFun=function (data,name){
            var dataArr = data.split(':');
            switch (name){
                case 'WORKING_FROM_TIME':{
                    $scope.options={
                        "workingFromHour":dataArr[0],	//工作起始时间-小时
                        "workingFromMin":dataArr[1]	//工作起始时间-分钟
                    };
                    break;
                }
                case 'WORKING_TO_TIME':{
                    $scope.options={
                        "workingToHour":dataArr[0],	//工作结束时间-小时
                        "workingToMin":dataArr[1]		//工作结束时间-分钟
                    };
                    break;
                }
                case 'WORKING_DAY':{
                    $scope.seleworking = [];
                    $scope.seleworkstring = '';
                    angular.forEach($scope.workingDay, function(val) {
                        if (val.checked) {
                            $scope.seleworking.push(val);
                            if($scope.seleworkstring==''){
                                $scope.seleworkstring = val.value;
                            }else {
                                $scope.seleworkstring = $scope.seleworkstring+','+val.value;
                            }
                        }
                    });
                    //return $scope.selected.length ? $scope.selected.join(',') : '没有选择';
                    $scope.options={
                        "workingDay":$scope.seleworkstring	//工作结束时间-小时
                    };
                    break;
                }
            }
            var promise = attendanceService.setWorkingTime({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //MsgService.tomsg();
                    //$modalInstance.close();
                    $scope.seleworked=true;
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