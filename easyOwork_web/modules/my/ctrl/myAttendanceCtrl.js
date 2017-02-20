/**
 * Created by Nose on 2016/9/7.
 */
function myAttendanceCtrl(){
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
        $scope.initFun=function(){
            if(attendance.attendanceMonth<10)
        		$scope.form = {"attendanceDate":attendance.attendanceYear+"-0"+attendance.attendanceMonth};
        	else
        		$scope.form = {"attendanceDate":attendance.attendanceYear+"-"+attendance.attendanceMonth};
            inquiryAttendanceFun();
        };
        $scope.myinit = function(){
            if(attendance.attendanceMonth<10)
        		$scope.form = {"attendanceDate":attendance.attendanceYear+"-0"+attendance.attendanceMonth};
        	else
        		$scope.form = {"attendanceDate":attendance.attendanceYear+"-"+attendance.attendanceMonth};
            inquiryMyAttendanceFun();
        };
        $scope.changeYearMonth = function(){
        	var attendanceDate = $("#attendanceDate").val();
        	attendance.attendanceYear = attendanceDate.substring(0,4);
        	attendance.attendanceMonth = attendanceDate.substring(5,7);
        	inquiryAttendanceFun();
        }
        function inquiryMyAttendanceFun(){
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

