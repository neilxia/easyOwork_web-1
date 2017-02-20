
function mySalaryCtrl(){
    return['$scope', '$modal','$rootScope','MsgService','salaryService','LocalStorage','employeesService',function($scope,$modal,$rootScope,MsgService,salaryService,LocalStorage,employeesService){
        var userinfo=LocalStorage.getObject('userinfo');
        var date = new Date();
        var thisyear = date.getFullYear();
        var thismonth = date.getMonth()+1;
        var attendance={
            attendanceYear:thisyear,
            attendanceMonth:thismonth,
            attendanceDay:date.getDate()
        }
        $scope.form = {};
        $scope.initFun=function(){
        	if(thismonth<10)
        		$scope.form = {"payrollDate":thisyear+"-0"+thismonth};
        	else
        		$scope.form = {"payrollDate":thisyear+"0"+thismonth};
            inquiryEmployeeFun();
        }
        $scope.changeYearMonth = function(){
        	var payrollDate = $("#payrollDate").val();
        	thisyear = payrollDate.substring(0,4);
        	thismonth = payrollDate.substring(5,7);
        	inquiryEmployeeFun();
        }
        //查询本人/其他员工信息列表
        //分页
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        function inquiryEmployeeFun(){
            $scope.options={
                "year":thisyear,
                "month":thismonth,
                "userDTO":{
                	"id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":'86',	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = salaryService.inquiryPayroll({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.payrolls;
                    $scope.thispages.total=$scope.datalist.length;//分页总数
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };


        //工资单明细
        $scope.s_issueDetail = function (row) {
            var modalInstance = $modal.open({
                templateUrl: 's_issueDetail.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance,salaryService) {
                //$scope.addconfigform={};
                //查询工资单
                $scope.userinfo=row;
                $scope.options={
                    "userDTO":row.userDTO,
                    "year":thisyear || attendance.attendanceYear,		//工资年份
                    "month":thismonth || attendance.attendanceMonth 	//工资月份
                };
                debugger;
                var promise = salaryService.inquiryPayroll({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        $scope.inquiryPayrollData=data.body.data.payrolls[0];

                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
                //提交增加
                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        };

    }]
}


