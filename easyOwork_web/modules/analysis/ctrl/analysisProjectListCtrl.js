
function analysisProjectListCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','noseService','FileUploader',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,noseService,FileUploader){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.userinfo = userinfo;
        $scope.initFun = function(){
    		inquiryProjectDefFun();//查询项目类型
    		inquiryProjectFun();//查询项目
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

function analysisProjectDetailCtrl(){
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
