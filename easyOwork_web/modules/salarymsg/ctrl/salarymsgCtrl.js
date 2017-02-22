
function salarymsgissueCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','salaryService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,salaryService,LocalStorage,Common){
        $scope.initFun=function(){
            inquiryPayrollSummaryFun();//查询薪酬总额
        }
        var date = new Date();
        $scope.thisyear=date.getFullYear();
        var attendance={
            attendanceYear:date.getFullYear(),
            attendanceMonth:date.getMonth()+1,
            attendanceDay:date.getDate()
        }
        function inquiryPayrollSummaryFun(){
            //查询薪酬总额
            $scope.options={
                "year":attendance.attendanceYear		//年
            };
            var promise = salaryService.inquiryPayrollSummary({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.summaryListData=data.body.data.summaryList;
                    //开启上面，下面是测试数据
                    /**$scope.summaryListData=[
                        {
                            "month":"12",	//月份
                            "totalEmployeeCount":"30",	//总人数
                            "totalSettledEmployeeCount":"" || '0',	//月已发放人数
                            "totalAmountMonth":"30000",	//月总发放额总收入
                            "totalSocialSecurityMonth":"3000"	//月总五险一金额(公司缴纳)
                        },{
                            "month":"11",	//月份
                            "totalEmployeeCount":"30",	//总人数
                            "totalSettledEmployeeCount":"20",	//月已发放人数
                            "totalAmountMonth":"30000",	//月总发放额总收入
                            "totalSocialSecurityMonth":"3000"	//月总五险一金额(公司缴纳)
                        },{
                            "month":"10",	//月份
                            "totalEmployeeCount":"30",	//总人数
                            "totalSettledEmployeeCount":"30",	//月已发放人数
                            "totalAmountMonth":"30000",	//月总发放额总收入
                            "totalSocialSecurityMonth":"3000"	//月总五险一金额(公司缴纳)
                        },{
                            "month":"9",	//月份
                            "totalEmployeeCount":"30",	//总人数
                            "totalSettledEmployeeCount":"30",	//月已发放人数
                            "totalAmountMonth":"30000",	//月总发放额总收入
                            "totalSocialSecurityMonth":"3000"	//月总五险一金额(公司缴纳)
                        },
                    ]**/

                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };
    }]
}
function salarymsglistCtrl(){
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
                "queryType":'HIERARCHY',
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
                        //上面开启，下面是测试数据
                        /**
                        $scope.inquiryPayrollData={
                            "totalIncome":"12000",	//总收入
                            "totalDeduction":"1540",	//总扣缴
                            "year":"2016",		//年
                            "month":"12",	//月
                            "status":"CONFIRMED",	// CREATED(已生成未确认), CONFIRMED(已确认)
                            "payrollItems":[
                                {
                                    "itemNo":"1",	//薪酬项序列号
                                    "itemName":"收入1",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":true	// true or false(收入项或者是扣缴项)
                                },{
                                    "itemNo":"2",	//薪酬项序列号
                                    "itemName":"收入2",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":true	// true or false(收入项或者是扣缴项)
                                },{
                                    "itemNo":"3",	//薪酬项序列号
                                    "itemName":"扣除1",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":false	// true or false(收入项或者是扣缴项)
                                },{
                                    "itemNo":"4",	//薪酬项序列号
                                    "itemName":"扣除1",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":false	// true or false(收入项或者是扣缴项)
                                }
                            ]
                        }**/

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
function salarymsgviewCtrl(){
    return['$scope','$rootScope', '$modal' ,'$compile','$state','employeesService','MsgService','salaryService','LocalStorage','Common',function($scope,$rootScope,$modal,$compile,$state,employeesService,MsgService,salaryService,LocalStorage,Common){
        $scope.initFun=function(){
            inquiryEmployeeFun();
        }
        var thisyear=$rootScope.$stateParams.year;
        var thismonth=$rootScope.$stateParams.month;
        $scope.thisyear = thisyear;
        $scope.thismonth = thismonth;
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
                "month":thismonth
            };
            var promise = salaryService.inquiryPayroll({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.payrolls;
                    for(d in datalist){
                        datalist[d].checked = false;
                        //如果有未定薪员工, 则设置编辑模式可以生成工资单
                        if(datalist[d].status != 'CONFIRMED')
                        	$scope.editMode = true;
                    }
                    $scope.datalist=datalist;
                    $scope.thispages.total=$scope.datalist.length;//分页总数
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };

        //生成工资单
        $scope.createPayrollFunAll=function(){
            Common.openConfirmWindow('','选中生成工资单？').then(function() {
                createPayrollFun();
            });
        };
        //var selectedItems=[];
        function createPayrollFun(){
            var datalist = $scope.datalist;
            angular.forEach(datalist, function(item) {
                if (item.checked == true) {
                    //selectedItems.push({"userUuid":item.userUuid});
                    $scope.options={
                        "userDTO":item.userDTO,
                        "year":thisyear || '',		//工资年份
                        "month":thismonth || '' 	//工资月份
                    };

                    var promise = salaryService.createPayroll({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            //MsgService.tomsg();
                            inquiryEmployeeFun();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                }
            });

        }

        //工资单明细
        $scope.s_issueDetail = function (row) {
            var modalInstance = $modal.open({
                templateUrl: 's_issueDetail.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance,salaryService,$filter) {
                //$scope.addconfigform={};
                //查询工资单
                $scope.userinfo=row;
                $scope.options={
                    "userDTO":row.userDTO,
                    "year":thisyear || '',		//工资年份
                    "month":thismonth || '' 	//工资月份
                };
                var promise = salaryService.inquiryPayroll({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        $scope.inquiryPayrollData=data.body.data.payrolls[0];
                        //上面开启，下面是测试数据
                        /**
                        $scope.inquiryPayrollData={
                            "totalIncome":"12000",	//总收入
                            "totalDeduction":"1540",	//总扣缴
                            "year":"2016",		//年
                            "month":"12",	//月
                            "status":"CREATED",	// CREATED(已生成未确认), CONFIRMED(已确认)
                            "payrollItems":[
                                {
                                    "itemNo":"1",	//薪酬项序列号
                                    "itemName":"收入1",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":true	// true or false(收入项或者是扣缴项)
                                },{
                                    "itemNo":"2",	//薪酬项序列号
                                    "itemName":"收入2",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":true	// true or false(收入项或者是扣缴项)
                                },{
                                    "itemNo":"3",	//薪酬项序列号
                                    "itemName":"扣除1",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":false	// true or false(收入项或者是扣缴项)
                                },{
                                    "itemNo":"4",	//薪酬项序列号
                                    "itemName":"扣除1",	//薪酬项名称
                                    "itemAmount":"100",	//薪酬项金额
                                    "income":false	// true or false(收入项或者是扣缴项)
                                }
                            ]
                        }**/

                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
                //增加项
                $scope.addincome=function(item){
                    var modalInstance2 = $modal.open({
                        templateUrl: 's_issueDetail-2.html',
                        size:'sm',
                        controller: function($scope, $modalInstance,salaryService){
                            //提交增加
                            $scope.ok = function (state) {
                                if(!state){return;} //状态判断
                                $modalInstance.close($scope.addincomename);
                            };
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        }
                    });
                    modalInstance2.result.then(function (addincomename) {
                        $scope.inquiryPayrollData.payrollItems.push({
                            "itemNo":$scope.inquiryPayrollData.payrollItems.length+1,	//薪酬项序列号
                            "itemName":addincomename,	//薪酬项名称
                            "itemAmount":0,	//薪酬项金额
                            "income":item,	// true or false(收入项或者是扣缴项)
                            "del":true
                        })
                    });
                }
                //删除项
                $scope.removeincome = function (index) {
                    var newindex;
                    angular.forEach($scope.inquiryPayrollData.payrollItems,function(val,ind){
                        if(val.itemNo==index){
                            newindex = $scope.inquiryPayrollData.payrollItems.indexOf(val);
                        }
                    })
                    $scope.inquiryPayrollData.payrollItems.splice(newindex, 1);
                }
                $scope.countTotal=function(){
                    var totalIncome=0,totalDeduction=0;
                    angular.forEach($scope.inquiryPayrollData.payrollItems,function(val,ind){
                        if(val.income){
                            totalIncome += parseInt(val.itemAmount);
                        }else{
                            totalDeduction += parseInt(val.itemAmount);
                        }
                    });
                    $scope.inquiryPayrollData.totalIncome=totalIncome;
                    $scope.inquiryPayrollData.totalDeduction=totalDeduction;
                }
                //修改工资单
                $scope.changePayrollFun=function (state){
                    if(!state){return;}
                    $scope.options={
                        "userDTO":row.userDTO,
                        //"totalIncome":"",	//总收入
                        //"totalDeduction":"",	//总扣缴
                        "year":$scope.inquiryPayrollData.year,		//年
                        "month":$scope.inquiryPayrollData.month,	//月
                        "status":"CONFIRMED",	//CREATED(已生成未确认), CONFIRMED(已确认)
                        "payrollItems":$scope.inquiryPayrollData.payrollItems,
                        "totalIncome":$scope.inquiryPayrollData.totalIncome,
                        "totalDeduction":$scope.inquiryPayrollData.totalDeduction
                    };
                    var promise2 = salaryService.changePayroll({body:$scope.options});
                    promise2.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            //MsgService.tomsg();
                            inquiryEmployeeFun();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise2.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };

                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //changeconfigFun('ADD',$scope.addconfigform,$modalInstance);
                    //$modalInstance.close();
                };
               /* $scope.editfalaryed=true;
                $scope.editfalary1 = function () {
                    $scope.inquiryPayrollDataOld=angular.copy($scope.inquiryPayrollData);
                    $scope.editfalaryed=!$scope.editfalaryed;
                };
                $scope.editfalary2 = function () {
                    debugger;
                    angular.copy($scope.inquiryPayrollDataOld, $scope.inquiryPayrollData);
                    $scope.editfalaryed=!$scope.editfalaryed;
                };*/
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        };
    }]
}