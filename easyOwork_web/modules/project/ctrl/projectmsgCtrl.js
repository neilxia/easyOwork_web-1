//列表
function projectmsglistCtrl(){
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
        $scope.startDatexx='2016-01-02';
        $scope.today='2016-01-02';
        $scope.views = ['year', 'month', 'date', 'hours', 'minutes'];

        $scope.callbackState = 'Callback: Not fired';

        $scope.changeDate = function (modelName, newDate) {
            console.log(modelName + ' has had a date change. New value is ' + newDate.format());
            $scope.callbackState = 'Callback: Fired';
        }

        $scope.changeMinMax = function (modelName, newValue) {
            //minDate or maxDate updated. Generate events to update relevant pickers

            var values = {
                minDate: false,
                maxDate: false,
            }

            if (modelName === 'dates.minDate') {
                values.minDate = newValue;
                $scope.$broadcast('pickerUpdate', ['pickerMinDate', 'pickerMinDateDiv', 'pickerMaxSelector'], values);
                values.maxDate = $scope.dates.maxDate;
            } else if (modelName === 'dates.maxDate') {
                values.maxDate = newValue;
                $scope.$broadcast('pickerUpdate', ['pickerMaxDate', 'pickerMaxDateDiv', 'pickerMinSelector'], values);
                values.minDate = $scope.dates.minDate;
            }

            //For either min/max update, update the pickers which use both.
            $scope.$broadcast('pickerUpdate', ['pickerBothDates', 'pickerBothDatesDiv'], values);
        }

        $scope.changeData = function (type) {
            var values = {},
                pickersToUpdate = ['pickerMinDate', 'pickerMaxDate', 'pickerBothDates', 'pickerMinDateDiv', 'pickerMaxDateDiv', 'pickerBothDatesDiv', 'pickerRange'];

            switch (type) {
                case 'view':
                    values.view = $scope.options.view;
                    break;
                case 'minView':
                    values.minView = $scope.options.minView;
                    break;
                case 'maxView':
                    values.maxView = $scope.options.maxView;
                    break;
                case 'format':
                    values.format = $scope.options.format;
                    break;
            }

            if (values) {
                $scope.$broadcast('pickerUpdate', pickersToUpdate, values);
            }
        }
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
            debugger;
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
                    "customerDTO":{
                        "customerName":row.customerName || ''	//客户名字
                    }
                };
                if(change=='ADD'){
                    $scope.options.projectDefDTO={
                        "projectDefName":row.projectDefName || ''	//项目模板名称
                    }
                }
                //新建时默认创建人员为项目负责人
                if(change=="MODIFY"){
                	$scope.options.userDTO = {	//项目负责人
                            "name":row.myselected[0].name || '',
                            "id":row.myselected[0].id || '',	//员工号
                            "personalEmail":row.myselected[0].personalEmail || '',	//邮件地址
                            "personalPhoneCountryCode":'86',	//电话号码国家代码
                            "personalPhone":row.myselected[0].personalPhone || ''		//电话号码
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
                $scope.modalform.startDate=noseService.getNowDate();
                $scope.RndNum=function(){
                    $scope.modalform.projectId=noseService.RndNum(8);
                }
                $scope.changeDate=function(){
                    alert(11);
                }
                //提交增加
                $scope.ok = function (state) {
                    debugger;
                    if(!state){return;} //状态判断
                    if($scope.modalform.projectDefName==null||$scope.modalform.projectDefName=='') return;
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
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','OSSService','FileUploader','noseService',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,OSSService,FileUploader,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
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
        
        $scope.editProgress = function () {
            var modalInstance = $modal.open({
                templateUrl: 'editprogress.html',
                controller: modalCtrl,
                resolve:{
                	datadt : function() {
                        return $scope.datadt;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,datadt) {
            	$scope.progress = datadt.projectProgress;
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //判断格式
                    if($scope.progress!=undefined && $scope.progress<=100){
                    	var promise = projectService.changeProject({body:{"actionType":'MODIFY',"projectName":datadt.projectName,'projectProgress':$scope.progress}});
	                    promise.success(function(data, status, headers, config){
	                        var sts=data.body.status;
	                        if(sts.statusCode==0){
	                        	datadt.projectProgress = $scope.progress;
	                        	$modalInstance.close();
	                        }else{
	                            MsgService.tomsg(data.body.status.errorDesc);
	                        }
	                    });
	                    promise.error(function(data, status, headers, config){
	                        MsgService.tomsg(data.body.status.errorDesc);
	                    });
                    }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        $scope.editHealth = function () {
        	var modalInstance = $modal.open({
                templateUrl: 'edithealth.html',
                controller: modalCtrl,
                resolve:{
                	datadt : function() {
                        return $scope.datadt;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,datadt) {
            	$scope.health = datadt.projectHealth;
            	$scope.healthList = [{'value':'正常','label':'正常'},{'value':'轻度','label':'轻度'},{'value':'严重','label':'严重'}]
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //判断格式
                    if($scope.health!=''){
	                    var promise = projectService.changeProject({body:{"actionType":'MODIFY',"projectName":datadt.projectName,'projectProgress':datadt.projectProgress,'projectHealth':$scope.health}});
	                    promise.success(function(data, status, headers, config){
	                        var sts=data.body.status;
	                        if(sts.statusCode==0){
	                        	datadt.projectHealth = $scope.health;
	                        	$modalInstance.close();
	                        }else{
	                            MsgService.tomsg(data.body.status.errorDesc);
	                        }
	                    });
	                    promise.error(function(data, status, headers, config){
	                        MsgService.tomsg(data.body.status.errorDesc);
	                    });
                    }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        $scope.updateStageStatus = function(row){
        	var stageStatus;
        	if(row.status == '未完成')
        		stageStatus='已完成';
        	else if(row.status == '已完成')
        		stageStatus='未完成'
        	var promise = projectService.updateProjectStage({body:{'projectName':$scope.datadt.projectName,'projectStageName':row.projectStageName,'status':stageStatus}});
        	promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	row.status = stageStatus;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        
        //添加/修改/删除
        $scope.changeProjectFun=function (field){
            $scope.options={
                "actionType":'MODIFY',		//ADD, MODIFY, DELETE
                "projectName":$scope.datadt.projectName || '',		//项目名称
                'projectProgress':$scope.options.projectProgress
            };
            if('HEALTH'==field)
            	$scope.options.projectHealth = $scope.datadt.projectHealth;
            debugger;
            var promise = projectService.changeProject({body:$scope.options});
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
        //添加/修改/删除
        function changeProjectTaskFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var startDate=$filter('date')(row.startDate,'yyyy-MM-dd');
            var endDate=$filter('date')(row.endDate,'yyyy-MM-dd');
            if(change!='DELETE'){
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "taskName":oldrow.taskName || '',	//任务名称
                    "newTaskName":row.taskName || '',	//新任务名称
                    "description":row.description || '',	//任务描述
                    "status":row.status || '',	//任务状态
                    "startDate":startDate || '',	//任务开始时间
                    "endDate":endDate || '',	//任务结束时间
                    "fromUserDTO":userinfo,
                    "toUserDTO":row.mytask,
                    "projectDTO":{
                        "projectName":$scope.datadt.projectName || ''	//项目名称
                    },
                    "projectStageDTO":{
                        "projectStageName":row.projectStageName || ''	//项目阶段名称
                    }
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "taskName":row.taskName || '',	//任务名称
                    "projectDTO":{
                        "projectName":$scope.datadt.projectName || ''	//项目名称
                    }
                };
            }
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
        }
        //新增
        $scope.addTask = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addTask.html',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    },
                    UserDTOList : function() {
                        return $scope.datadt.projectUserDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage,UserDTOList) {
                $scope.thename='新增';
                $scope.thisStage=Stage;
                $scope.thisUserDTOList=UserDTOList;
                $scope.modalform={};
                $scope.modalform.projectStageName=Stage[0].projectStageName;
                $scope.modalform.startDate=noseService.getNowDate();
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectTaskFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑
        $scope.editTask = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addTask.html',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    },
                    UserDTOList : function() {
                        return $scope.datadt.projectUserDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage,UserDTOList) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.thisStage=Stage;
                $scope.thisUserDTOList=UserDTOList;
                $scope.modalform.projectStageName=row.projectStageDTO.projectStageName;
                angular.forEach(UserDTOList,function(val,ind){
                    if(val.name==row.toUserDTO.name){
                        $scope.modalform.mytask=val;
                    }
                });
                //$scope.modalform.mytask=row.toUserDTO;
                //$scope.modalform.taskall=[[],[row.toUserDTO]];
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectTaskFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteTask=function(row){
            Common.openConfirmWindow().then(function() {
                changeProjectTaskFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAllTask=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datadt.projectTaskDTOList, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"taskName":item.taskName,"projectDTO":{"projectName":$scope.datadt.projectName || ''}});
                    }
                });
                $scope.options={
                    projectTasks:selectedItems
                };
                var promise = projectService.deleteProjectTasks({body:$scope.options});
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




        /*=======文档=======*/
        //添加/修改/删除
        function changeProjectDocumentFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "documentName":oldrow.documentName || '',	//文档名称
                    "newDocumentName":row.documentName || '',	//新文档名称
                    "documentUrl":row.documentUrl || '',		//文档地址
                    "projectDTO":{
                        "projectName":$scope.datadt.projectName || ''	//项目名称
                    },
                    "userDTO":userinfo
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "documentName":row.documentName || '',	//文档名称
                    "projectDTO":{
                        "projectName":$scope.datadt.projectName || ''	//项目名称
                    }
                };
            }
            debugger;
            var promise = projectService.changeProjectDocument({body:$scope.options});
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
        $scope.addDocument = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addDocument.html',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage,FileUploader) {
                $scope.thename='新增';
                $scope.thisStage=Stage;
                $scope.modalform={};
                $scope.modalform.projectStageName=Stage[0].projectStageName;
                //提交增加
                var htUploader = $scope.htUploader = new FileUploader({
                    url: '', //不使用默认URL上传
                    queueLimit: 1,     //文件个数
                    removeAfterUpload: true,   //上传后删除文件
                    autoUpload:false
                });
                htUploader.onAfterAddingFile = function(fileItem){
                    htUploader.cancelAll();
                     var file = $("#projectFile").get(0).files[0];
                     var filePath = LocalStorage.getObject('userinfo').entId+'/project/document/'+noseService.randomWord(false, 32)+'_';
                     var key= filePath+file.name;
                     var promise = OSSService.uploadFile(filePath,file);
                     promise.success(function (data, status, headers, config) {
	                     var urlPromise = OSSService.getUrl({'body':{'key':key}});
	                     urlPromise.success(function (data, status, headers, config) {
	                     var sts=data.body.status;
	                     if(sts.statusCode==0){
	                    	 $scope.modalform.documentUrl = data.body.data.url;
	                    	 $scope.modalform.documentName = file.name;
	                     }
	                     });
                     });
                     promise.error(function (data, status, headers, config) {
                    	 MsgService.tomsg('文件上传失败');
                     });
                };
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    if($scope.modalform.documentName != undefined)
                    	changeProjectDocumentFun('ADD',$scope.modalform,$modalInstance);
                    else
                    	$modalInstance.dismiss('cancel');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.deleteDocument = function () {
                	 $scope.modalform = {};
                };
            };
        };
        $scope.downDocument=function(){

        }
        //编辑
        $scope.editDocument = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addDocument.html',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.thisStage=Stage;
                $scope.modalform.taskall=[[],[row.toUserDTO]];
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectDocumentFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteDocument=function(row){
            Common.openConfirmWindow().then(function() {
                changeProjectDocumentFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAllDocument=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datadt.projectDocumentDTOList, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"documentName":item.documentName,"projectDTO":{"projectName":$scope.datadt.projectName || ''}});
                    }
                });
                $scope.options={
                    projectDocumentList:selectedItems
                };
                var promise = projectService.deleteProjectDocuments({body:$scope.options});
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



        /*=======阶段管理=======*/
        //添加/修改/删除
        function updateProjectStageFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                "projectName":$scope.datadt.projectName,	//项目名称
                "projectStageName":row.projectStageName,	//项目阶段名称
                "userDTO":row.userDTO[0]
            };
            var promise = projectService.updateProjectStage({body:$scope.options});
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
        //编辑
        $scope.editStage = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addStage.html',
                size:'sm',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.modalform.userDTOall=[[],[row.userDTO]];
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    updateProjectStageFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };

/*        //新增
        $scope.addStage = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addStage.html',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage) {
                $scope.thename='新增';
                $scope.thisStage=Stage;
                $scope.modalform={};
                $scope.modalform.projectStageName=Stage[0].projectStageName;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    updateProjectStageFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteStage=function(row){
            Common.openConfirmWindow().then(function() {
                updateProjectStageFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAllStage=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datadt.projectStageDTOList, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"projectName":item.projectName});
                    }
                });
                $scope.options={
                    projectDTO:selectedItems
                };
                var promise = projectService.deleteProjectStages({body:$scope.options});
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
        };*/



        /*=======参与人员=======*/
        //添加/修改/删除
        function changeUserProjectFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "userDTO":row.userDTO[0],
                    "projectDTO":{
                        "projectName":$scope.datadt.projectName	//项目名称
                    }
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "userDTO":row,
                    "projectDTO":{
                        "projectName":$scope.datadt.projectName	//项目名称
                    }
                };
            }
            var promise = projectService.changeUserProject({body:$scope.options});
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
        $scope.addUserProject = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addUserProject.html',
                size:'sm',
                controller: modalCtrl,
                resolve:{
                    Stage : function() {
                        return $scope.datadt.projectStageDTOList;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Stage) {
                $scope.thename='新增';
                $scope.thisStage=Stage;
                $scope.modalform={};
                $scope.modalform.projectStageName=Stage[0].projectStageName;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeUserProjectFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteUserProject=function(row){
            Common.openConfirmWindow().then(function() {
                changeUserProjectFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAllUserProject=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datadt.projectUserDTOList, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"userDTO":item,"projectDTO":{"projectName":$scope.datadt.projectName}});
                    }
                });
                $scope.options={
                    userProjectList:selectedItems
                };
                var promise = projectService.deleteProjectUsers({body:$scope.options});
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


        /*=======评论动态=======*/
        //添加/修改/删除
        function addCommentToProjectFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                "comment":row.comment,
                "userDTO":userinfo,
                "projectDTO":{
                    "projectName":$scope.datadt.projectName	//项目名称
                }
            };
            var promise = projectService.addCommentToProject({body:$scope.options});
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
        //发布动态
        $scope.adddynamic = function () {
            var modalInstance = $modal.open({
                templateUrl: 'adddynamic.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    addCommentToProjectFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

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
