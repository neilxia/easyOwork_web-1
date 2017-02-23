//列表
function analysisCustomerListCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common','noseService',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.userinfo = userinfo;
    	var orgName = $scope.userinfo.orgList[0].name;
    	//获取部门经理ID
    	var mangerUuid = $scope.userinfo.orgList[0].managerUuid;
    	
        $scope.initFun = function(){
        	//如果当前用户ID和部门经理ID不一致则不能使用该功能
        	if($scope.userinfo.userUuid != mangerUuid){
        		MsgService.tomsg('您不是'+orgName+'的负责人, 如信息有误, 请联系管理员设置您为负责人员');
        	}else{
        		inquiryCustomerFun();//查询list
        	}
        };
        $scope.thisStatusArr=[
            {name:'全部级别',val:''},
            {name:'一般',val:'NORMAL'},
            {name:'重要',val:'IMPORTANT'}
        ]
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询list
        function inquiryCustomerFun(){
            $scope.options={
            };
            var promise = CustomerService.inquiryCustomer({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    angular.forEach(data.body.data.customers,function(val,ind){
                        if(val.prospect==false){
                            datalist.push(val);
                        }
                    })
                    $scope.datalist=datalist;
                    $scope.thispages.total=$scope.datalist.length;	//分页
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
//子列表
function analysisCustomerDetailCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common','OSSService','FileUploader','noseService',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common,OSSService,FileUploader,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.userinfo = userinfo;
    	var orgName = $scope.userinfo.orgList[0].name;
        $scope.initFun = function(){
            inquiryCustomerFun();//查询
            inquiryCustomerHistoryFun();
        };


        //查询
        function inquiryCustomerFun(){
            $scope.options={
                "customerName":$rootScope.$stateParams.name		//如查询单个客户, 传入该数据
            };
            var promise = CustomerService.inquiryCustomer({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datadt=data.body.data.customers[0];
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        
        function inquiryCustomerHistoryFun(){
            $scope.options={
                "customerName":$rootScope.$stateParams.name		//如查询单个客户, 传入该数据
            };
            var promise = CustomerService.inquiryCustomerHistory({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.customerHistories=data.body.data.customerHistories;
                    $scope.$apply();
                    $('#timeline').timelinr($scope.timelineoptions);
                }else{
                    //MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                //MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        /*======日程活动=======*/
        $scope.gcStatusArr=[
            {name:'活动状态',val:''},
            {name:'计划中',val:'PLAN'},
            {name:'正在进行',val:'INPROGRESS'},
            {name:'已完成',val:'COMPLETED'},
            {name:'已取消',val:'CANCELLED'}
        ]

        /*======客户跟踪=======*/
        $scope.timelineoptions={

        }

    }]
}
