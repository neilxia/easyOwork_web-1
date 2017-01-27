//菜单
function dtplanmenuCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        $scope.planName=$rootScope.$stateParams.planName;
        $scope.positionName=$rootScope.$stateParams.positionName;
        $scope.positionCount=$rootScope.$stateParams.positionCount;
        $scope.initFun=function(){
            inquiryRecruitFlowFun();//查询list流程
        }
        //查询list流程
        function inquiryRecruitFlowFun(){
            $scope.options={};
            var promise = RecruitFlowService.inquiryRecruitFlow({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.flows[0].recruitFlowNodeDTOList;
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
//列表
function dtplanlistCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.planName=$rootScope.$stateParams.planName;
        $scope.positionName=$rootScope.$stateParams.positionName;
        $scope.initFun = function(){
            inquiryRecruitPlanFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };

        //查询list
        function inquiryRecruitPlanFun(){
            $scope.options={
                "planName":$scope.planName	//按名称查询
            };
            var promise = RecruitFlowService.inquiryRecruitPlan({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datadt=data.body.data.plans[0];
                    angular.forEach(data.body.data.plans[0].recruitPositionDTOList,function(val,ind){
                        if(val.positionName==$scope.positionName){
                            $scope.datadt.Position=val
                        }
                    })
                    //$scope.thispages.total=$scope.datalist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //添加/修改/删除
        function changeRecruitPlanFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var planEndDate=$filter('date')(row.planEndDate,'yyyy-MM-dd');
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "planName":oldrow.planName || "",		//招聘计划名称
                    "newPlanName":row.planName || "",		//新招聘计划名称
                    "planEndDate":planEndDate || "",		//计划完成时间
                    "planStatus":row.planStatus || "",		//已启动, 已取消, 已完成
                    "sponsor":row.sponsor[0] || row.sponsor || ''/*,
                     "recruitPositionDTOList":{
                     "positionName":row.xxx || "",	//职位名称
                     "positionRequirement":row.xxx || "",	//职位yaoqiu
                     "positionDesc":row.xxx || "",	//职位描述
                     "positionCount":row.xxx || "" 	//职位招聘人数
                     }*/
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "planName":row.planName		//招聘计划名称
                };
            }
            debugger;
            var promise = RecruitFlowService.changeRecruitPlan({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryRecruitPlanFun();
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeRecruitPlanFun('ADD',$scope.modalform,$modalInstance);
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //$scope.modalform.sponsor=[row.sponsor];
                $scope.modalform.sponsorarr=[[],[row.sponsor]];
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeRecruitPlanFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                changeRecruitPlanFun('DELETE',row);
            });
        };

    }]
}
//列表发布职位
function dtfpositionsCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.planName=$rootScope.$stateParams.planName;
        $scope.positionName=$rootScope.$stateParams.positionName;
        $scope.positionCount=$rootScope.$stateParams.positionCount;
        $scope.initFun = function(){
            inquiryRecruitPositionChannelFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询list
        function inquiryRecruitPositionChannelFun(){
            $scope.options={
                "planName":$scope.planName || '',	//招聘计划名称
                "positionName":$scope.positionName || ''	//职位名称
            };
            var promise = RecruitFlowService.inquiryRecruitPositionChannel({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    if($rootScope.$stateParams.type=="1"){
                        angular.forEach(data.body.data.positionChannelList,function(val,ind){
                            if(val.status=='已发布'){
                                datalist.push(val);
                            }
                        })
                    }else if($rootScope.$stateParams.type=="2"){
                        angular.forEach(data.body.data.positionChannelList,function(val,ind){
                            if(val.status=='未发布'){
                                datalist.push(val);
                            }
                        })
                    }else{
                        datalist=data.body.data.positionChannelList;
                    }
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
        //添加/修改/删除
        function sendRecruitPositionFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "recruitPositionDTO":{
                        "planName":$scope.planName || '',	//招聘计划名称
                        "positionName":$scope.positionName || ''	//职位名称
                    },
                    "recruitChannelDTO":{
                        "channelName":row.recruitChannelDTO.companyName || '',	//渠道名称
                        "companyName":row.recruitChannelDTO.companyName || ''	//公司名称
                    },
                    "url":row.url || ''	//发布地址
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "recruitPositionDTO":{
                        "planName":$scope.planName || '',	//招聘计划名称
                        "positionName":$scope.positionName || ''	//职位名称
                    },
                    "recruitChannelDTO":{
                        "channelName":row.recruitChannelDTO.companyName || '',	//渠道名称
                        "companyName":row.recruitChannelDTO.companyName || ''	//公司名称
                    }
                };
            }
            var promise = RecruitFlowService.sendRecruitPosition({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryRecruitPositionChannelFun();
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
        $scope.addmodelFun = function (row) {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                $scope.modalform=row;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    sendRecruitPositionFun('ADD',$scope.modalform,$modalInstance);
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    sendRecruitPositionFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                sendRecruitPositionFun('DELETE',row);
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
                        inquiryRecruitPositionChannelFun();
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
//列表简历管理
function dtresumemsgCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.planName=$rootScope.$stateParams.planName;
        $scope.positionName=$rootScope.$stateParams.positionName;
        $scope.positionCount=$rootScope.$stateParams.positionCount;
        $scope.initFun = function(){
            inquiryRecruitResumeFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询list
        function inquiryRecruitResumeFun(){
            $scope.options={
                "planName":$scope.planName,	//招聘计划名称
                "positionName":$scope.positionName		//职位名称
                //"positionRequirement":$scope.planName,	//职位要求
                //"positionDesc":$scope.planName,	//职位描述
                //"positionCount":$scope.positionCount	//职位招聘人数
            };
            var promise = RecruitFlowService.inquiryRecruitResume({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    if($rootScope.$stateParams.type=="1"){
                        angular.forEach(data.body.data.resumes,function(val,ind){
                            if(val.planStatus=='未完成'){
                                datalist.push(val);
                            }
                        })
                    }else if($rootScope.$stateParams.type=="2"){
                        angular.forEach(data.body.data.resumes,function(val,ind){
                            if(val.planStatus=='已完成'){
                                datalist.push(val);
                            }
                        })
                    }else{
                        datalist=data.body.data.resumes;
                    }
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
        //添加/修改/删除
        function changeRecruitResumeFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "resumeDTO":{
                        "resumeName":oldrow.resumeName || "",	//简历名称
                        "newResumeName":row.resumeName || "",	//新简历名称
                        "resumeEmail":row.resumeEmail || "",	//应聘人电子邮箱
                        "resumeMobileCountryCode":"86",	//应聘人手机号码国家代码
                        "resumeMobileNo":row.resumeMobileNo || "",	//应聘人手机号码
                        "resumeUrl":row.resumeUrl || ""	//简历地址
                    } ,
                    "recruitPositionDTO":{
                        "planName":$scope.planName || "",	//招聘计划名称
                        "positionName":$scope.positionName || ""		//职位名称
                        //"positionRequirement":row.xxx || "",	//职位要求
                        //"positionDesc":row.xxx || "",	//职位描述
                        //"positionCount":row.xxx || ""	//职位招聘人数
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "resumeDTO":{
                        "resumeName":row.resumeName || ""	//简历名称
                    } ,
                    "recruitPositionDTO":{
                        "planName":$scope.planName || "",	//招聘计划名称
                        "positionName":$scope.positionName || ""		//职位名称
                    }
                };
            }
            debugger;
            var promise = RecruitFlowService.changeRecruitResume({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryRecruitResumeFun();
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeRecruitResumeFun('ADD',$scope.modalform,$modalInstance);
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //$scope.modalform.sponsor=[row.sponsor];
                $scope.modalform.sponsorarr=[[],[row.sponsor]];
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeRecruitResumeFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                changeRecruitResumeFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAll=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datalist, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({
                            "resumeDTO":{
                                "resumeName":item.resumeName	//简历名称
                            } ,
                            "recruitPositionDTO":{
                                "planName":$scope.planName,	//招聘计划名称
                                "positionName":$scope.positionName		//职位名称
                            }
                        });
                    }
                });
                $scope.options={
                    positionResumes:selectedItems
                };
                var promise = RecruitFlowService.deleteRecruitResumes({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        inquiryRecruitResumeFun();
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.tomsg(data.body.status.errorDesc);
                });
            });
        };

        //进下轮
        $scope.nextstep=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datalist, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({
                            "recruitPositionResumeDTO":{
                                "recruitPositionDTO":{
                                    "planName":$scope.planName,	//招聘计划名称
                                    "positionName":$scope.positionName		//职位名称
                                },
                                "resumeDTO":{
                                    "resumeName":item.resumeName	//简历名称
                                }
                            },
                            "recruitFlowDTO":{
                                "flowName":"默认招聘流程"	//招聘流程名称
                            }
                        });
                    }
                });
                $scope.options={
                    positionDetailList:selectedItems
                };
                var promise = RecruitFlowService.startRecruitFlow({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        inquiryRecruitResumeFun();
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

//列表流程
function dtprocessCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.planName=$rootScope.$stateParams.planName;
        $scope.positionName=$rootScope.$stateParams.positionName;
        $scope.positionCount=$rootScope.$stateParams.positionCount;
        $scope.flowNodeName=$rootScope.$stateParams.flowNodeName;
        $scope.flowNodeSequence=$rootScope.$stateParams.flowNodeSequence;
        $scope.initFun = function(){
            inquiryRecruitResumeByFlowNodeFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询list
        function inquiryRecruitResumeByFlowNodeFun(){
            $scope.options={
                "recruitPositionDTO":{	//职位
                    "planName":$scope.planName,
                    "positionName":$scope.positionName
                },
                "recruitFlowNodeDTO":{	//当前招聘流程
                    "flowName":"默认招聘流程",
                    "flowNodeName":$scope.flowNodeName,
                    "flowNodeSequence":$scope.flowNodeSequence
                }
            };
            var promise = RecruitFlowService.inquiryRecruitResumeByFlowNode({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    if($rootScope.$stateParams.type=="0"){
                        angular.forEach(data.body.data.resumes,function(val,ind){
                            if(val.markFlag=='NORMAL'){
                                datalist.push(val);
                            }
                        })
                    }else if($rootScope.$stateParams.type=="1"){
                        angular.forEach(data.body.data.resumes,function(val,ind){
                            if(val.markFlag=='HOLD'){
                                datalist.push(val);
                            }
                        })
                    }else if($rootScope.$stateParams.type=="2"){
                        angular.forEach(data.body.data.resumes,function(val,ind){
                            if(val.markFlag=='REJECT'){
                                datalist.push(val);
                            }
                        })
                    }else{
                        datalist=data.body.data.resumes;
                    }
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
        //通过/拒绝/待定招聘职位
        function tellResumeForPositionFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var selectedItems=[];
            angular.forEach($scope.datalist, function(item) {
                if (item.checked == true) {
                    selectedItems.push({
                        "recruitPositionDTO": {
                            "planName": $scope.planName || '',	//招聘计划名称
                            "positionName": $scope.positionName || ''	//职位名称
                        },
                        "resumeDTO": {
                            "resumeName": item.resumeName || ''	//简历名称
                        },
                        "comment":row.comment || ''
                    });
                }
            });
            $scope.options={
                "actionType":change,
                "positionResumes":selectedItems
            };
            var promise = RecruitFlowService.tellResumeForPosition({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryRecruitResumeByFlowNodeFun();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //通过
        $scope.acceptFun = function () {
            Common.openConfirmWindow('','确定通过？').then(function() {
                tellResumeForPositionFun('ACCEPT',{});
            });
        };
        //待定
        $scope.holdFun = function (row) {
            Common.openConfirmWindow('','确定进入待定？').then(function() {
                tellResumeForPositionFun('HOLD',{});
            });
        };
        //拒绝淘汰
        $scope.rejectFun=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'taotaimodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='转移';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    tellResumeForPositionFun('REJECT',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //转移
        $scope.zhuanyimodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'zhuanyimodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='转移';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeRecruitResumeFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

    }]
}















//列表
function dtprocessofferCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAttendanceFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询考勤记录当月
        function inquiryAttendanceFun(){
            $scope.options={
                "attendanceYear":attendance.attendanceYear,	//签到或签退年份
                "attendanceMonth":attendance.attendanceMonth,	//签到或签退月份
                "attendanceDay":""		//签到或签退天
            };
            var promise = RecruitFlowService.inquiryAttendance({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.attendanceslist=data.body.data.attendances;
                    $scope.thispages.total=$scope.attendanceslist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //入职
        $scope.ruzhimodelFun = function () {

        };
        //转移
        $scope.zhuanyimodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'zhuanyimodel.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
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



    }]
}
//列表
function dtprocessrzCtrl(){
    return['$rootScope','$scope','$modal','RecruitFlowService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,RecruitFlowService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAttendanceFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询考勤记录当月
        function inquiryAttendanceFun(){
            $scope.options={
                "attendanceYear":attendance.attendanceYear,	//签到或签退年份
                "attendanceMonth":attendance.attendanceMonth,	//签到或签退月份
                "attendanceDay":""		//签到或签退天
            };
            var promise = RecruitFlowService.inquiryAttendance({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.attendanceslist=data.body.data.attendances;
                    $scope.thispages.total=$scope.attendanceslist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //转移
        $scope.zhuanyimodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'zhuanyimodel.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
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


    }]
}
