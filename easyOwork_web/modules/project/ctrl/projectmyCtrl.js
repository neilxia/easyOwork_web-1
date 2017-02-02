//列表
function projectmylistCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','noseService',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,noseService){
        debugger;
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            //inquiryProjectDefFun();//查询项目类型
            inquiryMyProjectFun();//查询项目
        };
        $scope.projectStatusArr=[
            {name:'全部状态',val:''},
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

        //查询项目
        function inquiryMyProjectFun(){
            $scope.options={
                //"projectName":"",		//按照项目名称查询
                "userDTO":{		//按创建者查询
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":'86',	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = projectService.inquiryMyProject({body:$scope.options});
            //var promise = projectService.inquiryProject({body:$scope.options});
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
//子列表
function projectmydtmainlistCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','OSSService','FileUploader','noseService',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,OSSService,FileUploader,noseService){
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
        function changeProjectTaskFun(change,row){
            $scope.options={
                'actionType':change,		//ADD, MODIFY, DELETE
                "taskName":row.taskName || '',	//任务名称
                "status":'已完成',	//任务状态
                "projectDTO":{
                    "projectName":$scope.datadt.projectName || ''	//项目名称
                },
                "projectStageDTO":{
                    "projectStageName":row.projectStageName || ''	//项目阶段名称
                }
            };
            debugger;
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

        //完成
        $scope.editTask=function(row){
            Common.openConfirmWindow('','你确定要完成这个任务！').then(function() {
                changeProjectTaskFun('MODIFY',row);
            });
        };
/*        $scope.editTask = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addTask.html',
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
                    changeProjectTaskFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };*/



        /*=======文档=======*/
        //添加/修改/删除
        function changeProjectDocumentFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "documentName":oldrow.documentName || '',	//文档名称
                    "newDocumentName":row.documentName || '',	//新文档名称
                    "documentUrl":row.documentUrl || 'www.baidu.com',		//文档地址
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
                //提交增加
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

        /*=======参与人员=======*/

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