
function orgProjectCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','noseService','FileUploader',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,noseService,FileUploader){
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
        		inquiryProjectDefFun();//查询项目类型
        		inquiryProjectFun();//查询项目
        	}
        };
        $scope.projectStatusArr=[
            {name:'全部状态',val:''},
            {name:'未开始',val:'未开始'},
            {name:'进行中',val:'进行中'},
            {name:'已完成',val:'已完成'}
        ]
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };

        //查询项目模板
        function inquiryProjectDefFun(){
            $scope.options={};
            var promise = projectService.inquiryProjectDef({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.projectDefs=data.body.data.projectDefs;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //查询项目
        function inquiryProjectFun(){
            $scope.options={
                "userDTO":{		//按创建者查询
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":'86',	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = projectService.inquiryProject({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.projects;
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

function orgProjectDetailCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','OSSService','FileUploader','noseService',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,OSSService,FileUploader,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.userinfo = userinfo;
        $scope.editingProgress = false;
        $scope.editingHealth = false;
        $scope.initFun = function(){
            inquiryProjectFun();
        };
        //查询项目
        function inquiryProjectFun(){
            $scope.options={
                "projectName":$rootScope.$stateParams.name		//按照项目名称查询
            };
            var promise = projectService.inquiryProject({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datadt=data.body.data.projects[0];
                    debugger;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        
        /*=======任务=======*/
        $scope.projectStatusArr=[
            {name:'全部状态',val:''},
            {name:'已分配',val:'已分配'},
            {name:'已开始',val:'已开始'},
            {name:'已拒绝',val:'已拒绝'},
            {name:'未分配',val:'未分配'},
            {name:'已完成',val:'已完成'},
            {name:'已取消',val:'已取消'}
        ]
    }]
}
