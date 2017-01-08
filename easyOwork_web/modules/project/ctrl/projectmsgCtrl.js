//列表
function projectmsglistCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','noseService',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryProjectDefFun();//查询项目类型
            inquiryProjectFun();//查询项目
        };
        $scope.projectStatusArr=[
            {name:'正常',val:'GREEN'},
            {name:'轻度',val:'RED'},
            {name:'严重',val:'YELLOW'},
            {name:'完成',val:'COMPLETED'}
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
                //"projectName":"",		//按照项目名称查询
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

        //添加/修改/删除项目模板
        function changeProjectsxFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var startDate=$filter('date')(row.startDate,'yyyy-MM-dd');
            var endDate=$filter('date')(row.endDate,'yyyy-MM-dd');
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "projectName":oldrow.projectName || '',		//项目名称
                    "newProjectName":row.projectName || '',	//新项目名称
                    "projectStatus":row.projectStatus || '',		//项目状态 GREEN, RED, YELLOW, COMPLETED
                    "projectDesc":row.projectDesc || '',		//项目描述
                    "projectId":row.projectId || '',		//项目编号
                    "projectAmount":row.projectAmount || '',		//项目金额
                    "projectCost":row.projectCost || '',		//项目成本
                    "startDate":startDate || '',		//项目开始时间
                    "endDate":endDate || '',		//项目结束时间
                    "userDTO":{	//项目负责人
                        "name":row.myselected[0].name || '',
                        "id":row.myselected[0].id || '',	//员工号
                        "personalEmail":row.myselected[0].personalEmail || '',	//邮件地址
                        "personalPhoneCountryCode":'86',	//电话号码国家代码
                        "personalPhone":row.myselected[0].personalPhone || ''		//电话号码
                    },
                    "customerDTO":{
                        "customerName":row.customerName || ''	//客户名字
                    }
                };
                if(change=='ADD'){
                    $scope.options.projectDefDTO={
                        "projectDefName":row.projectDefName || ''	//项目模板名称
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "projectName":oldrow.projectName || ''		//项目名称
                };
            }

            var promise = projectService.changeProject({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryProjectFun();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
            return promise;
        }

        //新增
        $scope.addmodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl,
                resolve:{
                    projectDefs : function() {
                        return $scope.projectDefs;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,projectDefs) {
                $scope.thename='新增';
                $scope.projectDefNames=projectDefs;
                $scope.modalform={};
                $scope.RndNum=function(){
                    $scope.modalform.projectId=noseService.RndNum(8);
                }
                //提交增加
                $scope.ok = function (state) {
                    debugger;
                    if(!state){return;} //状态判断
                    changeProjectsxFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //编辑
        $scope.editFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                controller: modalCtrl,
                resolve:{
                    projectDefs : function() {
                        return $scope.projectDefs;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,projectDefs) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.projectDefNames=projectDefs;
                //$scope.modalform.projectDefName=row.projectDefDTO.projectDefName;
                $scope.RndNum=function(){
                    $scope.modalform.projectId=noseService.RndNum(8);
                }
                $scope.modalform.myselected=[row.userDTO];
                $scope.modalform.selectedallarr=[[],[row.userDTO]];
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectsxFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeProjectsxFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAll=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datalist, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"projectName":item.projectName});
                    }
                });
                $scope.options={
                    projects:selectedItems
                };
                var promise = projectService.deleteProjects({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        inquiryProjectFun();
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
            });
        };



    }]
}
//子列表
function projectmsgdtmainlistCtrl(){
    return['$rootScope','$scope','$modal','projectService','MsgService','LocalStorage','Common','OSSService','FileUploader',function($rootScope,$scope,$modal,projectService,MsgService,LocalStorage,Common,OSSService,FileUploader){
        var userinfo=LocalStorage.getObject('userinfo');
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
        //添加/修改/删除
        function changeProjectTaskFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                'actionType':change,		//ADD, MODIFY, DELETE
                "taskName":oldrow.taskName || '',	//任务名称
                "newTaskName":row.taskName || '',	//新任务名称
                "description":row.description || '',	//任务描述
                "status":row.status || '',	//任务状态
                "startDate":row.startDate || '',	//任务开始时间
                "endDate":row.endDate || '',	//任务结束时间
                "fromUserDTO":{	//谁分配任务
                    "id":row.xxxx || '',	//员工号
                    "personalEmail":row.xxxx || '',	//邮件地址
                    "personalPhoneCountryCode":row.xxxx || '',	//电话号码国家代码
                    "personalPhone":row.xxxx || '',		//电话号码
                },
                "toUserDTO":{	//分配给谁
                    "id":row.xxxx || '',	//员工号
                    "personalEmail":row.xxxx || '',	//邮件地址
                    "personalPhoneCountryCode":row.xxxx || '',	//电话号码国家代码
                    "personalPhone":row.xxxx || '',		//电话号码
                },
                "projectDTO":{
                    "projectName":row.projectName || ''	//项目名称
                },
                "projectStageDTO":{
                    "projectStageName":row.projectStageName || ''	//项目阶段名称
                }
            };
            var promise = projectService.changeProjectTask({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryProjectFun();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
            return promise;
        }

        //新增
        $scope.addmodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                controller: modalCtrl,
                resolve:{
                    Types : function() {
                        return $scope.projectDefTypes;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Types) {
                $scope.thename='新增';
                $scope.thisTypes=Types;
                $scope.selectedName=Types[0];
                $scope.projectDefDomainnew=null;
                $scope.modalform={
                    "projectDefName":"",
                    //"newProjectDefName":"",
                    "projectDefDesc":""
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    $scope.modalform.projectDefDomain=$scope.selectedName=='其他'?$scope.projectDefDomainnew:$scope.selectedName;
                    changeProjectDefFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑
        $scope.editFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl,
                resolve:{
                    Types : function() {
                        return $scope.projectDefTypes;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Types) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.thisTypes=Types;
                var index = Types.indexOf(row.projectDefDomain);
                if (index > -1) {
                    $scope.selectedName=row.projectDefDomain;
                    $scope.projectDefDomainnew='';
                }else{
                    $scope.selectedName='其他';
                    $scope.projectDefDomainnew=row.projectDefDomain;
                }
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectDefFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //批量
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeProjectDefFun('DELETE',row);
            });
        };

        //批量删除
        $scope.deleteAll=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datalist, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"projectDefName":item.projectDefName});
                    }
                });
                $scope.options={
                    projectDefs:selectedItems
                };
                debugger;
                var promise = projectService.deleteProjectDefs({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        inquiryProjectDefFun();
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
            });
        };



        //发布动态
        $scope.adddynamic = function () {
            var modalInstance = $modal.open({
                templateUrl: 'adddynamic.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //$modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //新增
        $scope.addmodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //$modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑社保
        $scope.editmodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //$modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //批量
        $scope.delete2=function(row){
            Common.openConfirmWindow().then(function() {
                changeshebaoFun('DELETE',row);
            });
        };

        //批量删除
        $scope.deleteAll=function(){
            Common.openConfirmWindow().then(function() {
                deleteAllEmployees();
            });
        };
        function deleteAllsx(){
            var datalist = $scope.datalist;
            angular.forEach(datalist, function(item) {
                if (item.checked == true) {
                    selectedItems.push({"userUuid":item.userUuid});
                }
            });
            $scope.options={
                userList:selectedItems
            };
            var promise = employeesService.deleteEmployees({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryEmployeeFun();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }


        //上传开始
        var uploader = $scope.uploader = new FileUploader({
            url: '', //不使用默认URL上传
            queueLimit: 1,     //文件个数
            removeAfterUpload: true,   //上传后删除文件
            autoUpload:false
        });
        uploader.onAfterAddingFile = function(fileItem){
            uploader.cancelAll();
            var file = $("#licence").get(0).files[0];
            var filePath = $scope.EPinfo.entId+'/company/licence/';
            var key= filePath+file.name;
            var promise = OSSService.uploadFile(filePath,file);
            promise.success(function (data, status, headers, config) {
                var urlPromise = OSSService.getUrl({'body':{'key':key}});
                urlPromise.success(function (data, status, headers, config) {
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        $scope.EPinfo.licenceUrl = data.body.data.url;
                        LocalStorage.setObject('companyinfo',$scope.EPinfo);
                        $scope.changeCompanyInfoFun($scope.EPinfo.licenceUrl,'licenceUrl');
                    }
                });

            })
        };


    }]
}
