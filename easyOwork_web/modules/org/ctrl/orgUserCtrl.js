
function orgUserCtrl(){
    return['$rootScope','$scope','$modal','employeesService','LocalStorage','salaryService','MsgService','projectService','CustomerService',function($rootScope,$scope,$modal,employeesService,LocalStorage,salaryService,MsgService,projectService,CustomerService){
        
    	$scope.userinfo=LocalStorage.getObject('userinfo');
    	var orgName = $scope.userinfo.orgList[0].name;
    	//获取部门经理ID
    	var mangerUuid = $scope.userinfo.orgList[0].managerUuid;
    	
    		
    	$scope.initFun=function(){
    		//如果当前用户ID和部门经理ID不一致则不能使用该功能
        	if($scope.userinfo.userUuid != mangerUuid){
        		MsgService.tomsg('您不是'+orgName+'的负责人, 如信息有误, 请联系管理员设置您为负责人员');
        	}else{
        		inquiryEmployeeFun();
        	}
        }
        //查询本人/其他员工信息列表
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        function inquiryEmployeeFun(){
        	var options={
                    "type":'ORG',
                    "orgName":orgName
        	}
            var promise = employeesService.inquiryEmployee({body:options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.userList;
                    $scope.thispages.total=$scope.datalist.length;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };

        $scope.staffbase=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'staffbase.html',
                size:'lg',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.user=row;
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        $scope.staffsalary=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'staffsalary.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.user=row;
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        $scope.staffpayroll=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'staffpayroll.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.user=row;
                $scope.currentYear = new Date().getFullYear();
                $scope.currentMonth = new Date().getMonth()+1;
                
                $scope.changeYear = function (yearItem) {
                	$scope.year = yearItem;
                	$scope.monthList = [];
                	$scope.month = null;
                    if($scope.year == $scope.currentYear){
                    	for(i = 1; i<$scope.currentMonth; i++){
                    		$scope.monthList.push({'label':i+'月','value':i});
                    	}
                    }else{
                    	for(i = 1; i<13; i++){
                    		$scope.monthList.push({'label':i+'月','value':i});
                    	}
                    }
                };
                $scope.changeMonth = function () {
                	if($scope.month < 1)
                		return;
                	$scope.options={
                            "userDTO":{
                                "id":row.id || '',	//员工号
                                "personalEmail":row.personalEmail || '',	//邮件地址
                                "personalPhoneCountryCode":'86',	//电话号码
                                "personalPhone":row.personalPhone || ''		//电话号码
                            },
                            "year":$scope.year,		//工资年份
                            "month":$scope.month 	//工资月份
                        };
                        var promise = salaryService.inquiryPayroll({body:$scope.options});
                        promise.success(function(data, status, headers, config){
                            var sts=data.body.status;
                            if(sts.statusCode==0){
                                $scope.inquiryPayrollData=data.body.data;
                                if($scope.inquiryPayrollData.payrolls[0].payrollItems.length==0){
                                	MsgService.tomsg('没找到该月工资单');
                                }
                            }else{
                                MsgService.tomsg(data.body.status.errorDesc);
                            }
                        });
                        promise.error(function(data, status, headers, config){
                            MsgService.tomsg(data.body.status.errorDesc);
                        });
                };
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                //默认为今年, 选择月份为当月
                $scope.changeYear($scope.currentYear);
                $scope.month = $scope.currentMonth-1;
                $scope.changeMonth();
            }
        };
        $scope.staffproject=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'staffproject.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
            	
                $scope.user=row;
                
                $scope.options={
                        "userDTO":{
                            "id":row.id || '',	//员工号
                            "personalEmail":row.personalEmail || '',	//邮件地址
                            "personalPhoneCountryCode":'86',	//电话号码
                            "personalPhone":row.personalPhone || ''		//电话号码
                        }
                };
                var promise = projectService.inquiryMyProject({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        $scope.projects=data.body.data.projects;
                        if($scope.projects.length==0){
                        	MsgService.tomsg('该员工没有参与项目');
                        }
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        $scope.staffcustomer=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'staffcustomer.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
            	
                $scope.user=row;
                
                $scope.options={
                        "userDTO":{
                            "id":row.id || '',	//员工号
                            "personalEmail":row.personalEmail || '',	//邮件地址
                            "personalPhoneCountryCode":'86',	//电话号码
                            "personalPhone":row.personalPhone || ''		//电话号码
                        }
                };
                var promise = CustomerService.inquiryCustomer({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        $scope.customers=data.body.data.customers;
                        if($scope.customers.length==0){
                        	MsgService.tomsg('该员工没有负责客户');
                        }
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
    }]
}

