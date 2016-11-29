/**
 * Created by Nose on 2016/9/7.
 */
/*====================我的申请=================================*/
function addpcsCtrl(){
    return['$rootScope','$scope','$modal','editableOptions','processService','LocalStorage','MsgService',function($rootScope,$scope,$modal,editableOptions,processService,LocalStorage,MsgService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun=function(){
            inquiryProcessModelTypeFun();
            inquiryProcessModelFun();//查询流程模板
        }
        //查询流程模板
        function inquiryProcessModelFun(){
            $scope.options={
                "name":""		//流程模板名称, 如查询所有模板就不用传入该值
            };
            var promise = processService.inquiryProcessModel({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryProcessModelData=data.body.data.processDefList;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };
        //查询流程模板类型
        function inquiryProcessModelTypeFun(){
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = processService.inquiryProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //data.body.data.processDefTypes.unshift({name:'全部'});
                    $scope.prosclasslist=data.body.data.processDefTypes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };


        //发起流程
        $scope.createProcessFun=function(){
            if($scope.processmodal.title){
                MsgService.tomsg('新建流程名称为必填！');
                return;
            }
            $scope.processmodal.launchUserDTO={
                "id":userinfo.id,	//员工号
                "personalEmail":userinfo.personalEmail,	//邮件地址
                "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                "personalPhone":userinfo.personalPhone		//电话号码
            }
            debugger;
            var promise = processService.createProcess({body:$scope.processmodal});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){

                    debugger;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };


    }]
}

/*====================我的申请=================================*/
function mypcsCtrl(){
    return['$rootScope','$scope', '$modal','Common','processService','LocalStorage',function($rootScope,$scope,$modal,Common,processService,LocalStorage){

        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        //$scope.active=true;
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun=function(){
            inquiryCreatedProcessesFun();
            inquiryProcessModelTypeFun();
        }
        //筛选
        $scope.Processstatus="";
        $scope.processtitle="";
        $scope.selectedproclass="";
        function inquiryProcessModelTypeFun(){
            //查询流程模板类型
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = processService.inquiryProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.prosclasslist=data.body.data.processDefTypes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        function inquiryCreatedProcessesFun(){
            //查询发起的流程
            $scope.options={
                "launchUserDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = processService.inquiryCreatedProcesses({body:$scope.options});
            promise.success(function(data, status, headers, config){
                /*if(status==200){
                    $scope.inquiryProcessesData=data.processes;
                }*/
                //远程开启下面的
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryProcessesData=data.body.data.processes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //查看流程详情
        $scope.chakanFun=function(row){
            LocalStorage.setObject('pcsdetail',row);
            $rootScope.$state.go('processmsg.mypcsdetail',{processesId:row.processesId})
        }
        //撤回流程
        $scope.changeProcessFun=function(row){
            Common.openConfirmWindow('','您确定要撤回申请么？').then(function() {
                //批准/拒绝/撤回流程
                $scope.options={
                    "actionType":"WITHDRAW"	,	//APPROVE, REJECT, WITHDRAW
                    "processUuid":row.processUuid,	//流程编号
                    "message":''	//批准拒绝时添加的信息
                };
                var promise = processService.changeProcess({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        //成功
                    }else{
                        MsgService.errormsg(data);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.errormsg(data);
                });
            });
        };


    }]
}
/*====================我的申请详情=================================*/
function mypcsdetailCtrl(){
    return['$rootScope','$scope','LocalStorage','Common','processService',function($rootScope,$scope,LocalStorage,Common,processService){
        $scope.pcsdetail = LocalStorage.getObject('pcsdetail');
        //撤回流程
        $scope.changeProcessFun=function(row){

            Common.openConfirmWindow('','您确定要撤回申请么？').then(function() {
                //批准/拒绝/撤回流程
                $scope.options={
                    "actionType":"WITHDRAW"	,
                    "processUuid":row.processUuid	//流程编号
                };
                var promise = processService.changeProcess({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        //成功
                        $rootScope.$state.go('processmsg.mypcs');
                    }else{
                        MsgService.errormsg(data);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.errormsg(data);
                });
            });
        };
    }]
}
/*====================我的审批=================================*/
function myauditCtrl(){
    return['$rootScope','$scope', '$modal','Common','processService','LocalStorage','processService',function($rootScope,$scope,$modal,Common,processService,LocalStorage,processService){

        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        //$scope.active=true;
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun=function(){
            inquiryHandlingProcessesFun();
            inquiryProcessModelTypeFun();
        }
        //筛选
        $scope.Processstatus="";
        $scope.processtitle="";
        $scope.selectedproclass="";
        function inquiryProcessModelTypeFun(){
            //查询流程模板类型
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = processService.inquiryProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.prosclasslist=data.body.data.processDefTypes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        function inquiryHandlingProcessesFun(){
            //查询发起的流程
            $scope.options={
                "launchUserDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = processService.inquiryHandlingProcesses({body:$scope.options});
            promise.success(function(data, status, headers, config){
                /*if(status==200){
                    $scope.inquiryProcessesData=data.processes;
                }*/
                //远程开启下面的
                var sts=data.body.status;
                 if(sts.statusCode==0){
                 $scope.inquiryProcessesData=data.body.data.processes;
                 }else{
                 MsgService.errormsg(data);
                 }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //查看流程详情
        $scope.chakanFun=function(row){
            LocalStorage.setObject('pcsdetail',row);
            $rootScope.$state.go('processmsg.myauditdetail',{processesId:row.processesId})
        }
        //撤回流程
        $scope.changeProcessFun=function(row){
            Common.openConfirmWindow('','您确定要撤回申请么？').then(function() {
                //批准/拒绝/撤回流程
                $scope.options={
                    "actionType":"WITHDRAW"	,	
                    "processUuid":row.processUuid	//流程编号
                };
                var promise = processService.changeProcess({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        //成功
                    }else{
                        MsgService.errormsg(data);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.errormsg(data);
                });
            });
        };


    }]
}
/*====================审批详情=================================*/
function myauditdetailCtrl(){
    return['$rootScope','$scope','LocalStorage','Common',function($rootScope,$scope,LocalStorage,Common){
        $scope.pcsdetail = LocalStorage.getObject('pcsdetail');
        //撤回流程
        $scope.jujue=false;
        $scope.jujuetoggle=function(){
            $scope.jujue = !$scope.jujue;
        }
        //批准同意
        $scope.agreedproFun=function(){
            Common.openConfirmWindow('','您确定要批准同意申请么？').then(function() {
                changeProcessFun('APPROVE',$scope.pcsdetail)
            });
        }
        //批准拒绝
        $scope.rejectdproFun=function(state){
            if(!state) return;
            Common.openConfirmWindow('','您确定要批准拒绝申请么？').then(function() {
                changeProcessFun('REJECT',$scope.pcsdetail)
            });
        }
        $scope.rejectMsg="";
        $scope.changeProcessFun=function(change,row){
            //批准/拒绝/撤回流程
            $scope.options={
                "actionType":change	,	//APPROVE, REJECT, WITHDRAW
                "processUuid":row.processUuid,	//流程编号
                "message":$scope.rejectMsg	//批准拒绝时添加的信息
            };
            var promise = processService.changeProcess({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //成功
                    $rootScope.$state.go('processmsg.mypcs');
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };
    }]
}
/*====================添加流程=================================*/
function addsetpcsCtrl(){
    return['$rootScope','$scope','$modal','editableOptions','processService','LocalStorage','MsgService',function($rootScope,$scope,$modal,editableOptions,processService,LocalStorage,MsgService){

        var userinfo=LocalStorage.getObject('userinfo');

        $scope.initFun=function(){
            inquiryProcessModelTypeFun()
        }

        //查询流程模板类型
        function inquiryProcessModelTypeFun(){
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = processService.inquiryProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.prosclasslist=data.body.data.processDefTypes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //增加框
        $scope.objs = new Object();
        //默认选择类型
        var pcsRowData=$rootScope.$stateParams.pcsRow;
        if(pcsRowData){
            $scope.pcsclass=pcsRowData.processType;
            $scope.processmodal={
                "actionType":'MODIFY',		//ADD, MODIFY, DELETE
                "name":pcsRowData.name || "",		//数据模板名称
                "description":pcsRowData.description || "",		//数据模板描述
                "userDTOList":pcsRowData.userDTOList || [],
                "orgDTOList":pcsRowData.orgDTOList || [], //如果userDTOList和orgDTOList都不传入则表示适用公司所有人员
                "processDefStepDTOList":pcsRowData.processDefStepDTOList || [],
                "processDefFieldDTOList":pcsRowData.processDefFieldDTOList || []
            }
            $scope.theapply={
                orgList:pcsRowData.orgDTOList.concat(pcsRowData.userDTOList)
            };
        }else{
            $scope.pcsclass="";
            $scope.processmodal={
                "actionType":'ADD',		//ADD, MODIFY, DELETE
                "name":"",		//数据模板名称
                "description":"",		//数据模板描述
                "userDTOList":[],
                "orgDTOList":[], //如果userDTOList和orgDTOList都不传入则表示适用公司所有人员
                "processDefStepDTOList":[],
                "processDefFieldDTOList":[]
            }
            $scope.theapply={};
        }

        // 增加
        $scope.objs.addFun = function(classname) {
            switch(classname){
                case 'TEXT':{
                    //$scope.objs.datas.push({clas:'input',key:'',value:''});
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'单行文本框',placeholder:'请输入',value:''});
                    break;
                }
                case 'NUMBER':{
                    //$scope.processmodal.processDefFieldDTOList.push({type:'input',key:'',value:''});
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'数量框',placeholder:'请输入',value:''});
                    break;
                }
                case 'TEXTAREA':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'多行文本框',placeholder:'请输入',value:''});
                    break;
                }
                case 'SELECTION':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'下拉选择框',valueList:[{id:1,value:'选择项1'},{id:2,value:'选择项2'}],value:''});
                    break;
                }
                case 'DATE':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'时间选择',placeholder:'请选择时间',value:''});
                    break;
                }
/*                case 'daterange':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:" , length:"n, mandatory:"a,defaultValue:"m,e:'时间范围选择',sctitema:'选择开始时间',sctitemb:'选择结束时间',valuea:'',valueb:''});

                    break;
                }*/
                case 'ATTACHMENT':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'附件上传',placeholder:'本地上传',value:''});
                    break;
                }
                case 'CHECKBOX':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'多选框',valueList:[{value:'选择项1'},{value:'选择项2'}]});
                    break;
                }
                case 'RADIO':{
                    $scope.processmodal.processDefFieldDTOList.push({type:classname, seqNo:"", length:"", mandatory:"false",defaultValue:"", name:'单选框',valueList:[{value:'选择项1'},{value:'选择项2'}]});
                    break;
                }
            }
        };
        // select选项增加
        $scope.addvalueList = function(hashkey) {
            angular.forEach($scope.processmodal.processDefFieldDTOList, function(obj, key) {
                if(obj.$$hashKey===hashkey){
                    obj.valueList.push({id: obj.valueList.length+1,value: ''});
                }
            })
        };
        // select选项减少
        $scope.delevalueList = function(thisobj,$index) {
            if(thisobj.valueList.length > 1){
                thisobj.valueList.splice($index, 1);
            }

        };
        // 减少
        $scope.objs.deleFun = function($index) {
            //if ($scope.processmodal.processDefFieldDTOList.length > 1) {
            $scope.processmodal.processDefFieldDTOList.splice($index, 1);
            //}
        };

        $scope.DisabledFun=function(data){
            //return false;
        };
        //配置开关
        $scope.tableisDisabled=true; //false
        $scope.changeeditable=function(){
            $scope.tableisDisabled = !$scope.tableisDisabled;
        };

        //头像上传
/*        $scope.upheadoptions={
            upimgbox:"#headimgbox",
            server : './xxxx'
        };
        $scope.uploadSuccess=function(file,response){
            debugger;
        };
        $scope.uploadError=function(file,reason){
            debugger;
            //angular.element("#uploadCon").prepend(el);
        };*/

        //增加流程数据
        $scope.addpcsdata=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addpcsdata.html',
                size:'md',
                controller: modalCtrl
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.objs.addFun(selectedItem);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });

            function modalCtrl ($scope, $modalInstance) {
                $scope.selected = {
                    item: ''
                };
                $scope.radioitem='';
                $scope.ok = function () {
                    //$scope.radioitem;
                    $modalInstance.close($scope.selected.item);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        /*        angular.element('body').click(function(){
         $scope.inputForm.$hide();
         });*/
        $scope.checkName=function(data){
            if (data !== 'awesome') {
            }
        };


    //    总流程添加
        $scope.addprocessmodalFun=function(){
            if($scope.pcsclass=='' || $scope.processmodal.name==''){
                MsgService.tomsg('流程类型、流程名称为必填项哦！');
                return;
            }
            //流程类型需要传入接口
            $scope.processmodal.processType=$scope.pcsclass;
            if($scope.theapply.selectedallarr){
                var userDTOList=[];
                var orgDTOList=[];
                if($scope.theapply.selectedallarr[1].length>0){
                    angular.forEach($scope.theapply.selectedallarr[1],function(val,ind){
                        userDTOList.push({		//适用人员
                            "id":$scope.theapply.selectedallarr[1][ind].id || '',
                            "personalEmail":$scope.theapply.selectedallarr[1][ind].personalEmail || '',
                            "personalPhoneCountryCode":$scope.theapply.selectedallarr[1][ind].personalPhoneCountryCode || '',
                            "personalPhone":$scope.theapply.selectedallarr[1][ind].personalPhone || ''
                        })
                    });
                }
                if($scope.theapply.selectedallarr[0].length>0){
                    angular.forEach($scope.theapply.selectedallarr[0],function(val,ind){
                        orgDTOList.push({		//适用角色
                            "name":$scope.theapply.selectedallarr[0][ind].text || ''
                        })
                    });
                }
                $scope.processmodal.userDTOList=userDTOList;
                $scope.processmodal.orgDTOList=orgDTOList;
            }
            angular.forEach($scope.processmodal.processDefStepDTOList,function(val,ind){
                if(($scope.processmodal.processDefStepDTOList.length-1)==ind){
                    val.end=true;
                }
            })
            var promise = processService.changeProcessModel({'body':$scope.processmodal});
            promise.success(function(data, status, headers, config){
                debugger;

                var sts=data.body.status;
                if(sts.statusCode==0){
                	$rootScope.$state.go('processmsg.setpcs');
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        }



        //新增审批人
        $scope.addapprover=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addapprover.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.approvername='新增';
                $scope.processDefStep={};
                $scope.ok = function (state) {
                    if(!state)return;
                    var row={
                        "stepName":$scope.processDefStep.stepName,	//节点名称
                        "stepNo":$scope.processDefStep.stepNo,	//节点顺序号
                        "end":$scope.processDefStep.end || false,		//是否最后一个节点 TRUE or FALSE
                        "userDTO":{	//审批人
                            "name":$scope.processDefStep.selectedallarr[1][0].name,
                            "id":$scope.processDefStep.selectedallarr[1][0].id,
                            "personalEmail":$scope.processDefStep.selectedallarr[1][0].personalEmail,
                            "personalPhoneCountryCode":$scope.processDefStep.selectedallarr[1][0].personalPhoneCountryCode,
                            "personalPhone":$scope.processDefStep.selectedallarr[1][0].personalPhone
                        }/*,
                        "roleDTO":{	//当前仅限制审批人为人员, 该值不传
                            "name":$scope.processDefStep.selectedallarr[0].text,		//节点处理角色名称
                        }*/
                    }
                    approverchage(row);
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }
        //新增审批人具体实现
        function approverchage(row){
            //$scope.processmodal.name=row;
            $scope.processmodal.processDefStepDTOList.push(row);
        }

        //编辑审批人
        $scope.editapprover=function(row){

            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addapprover.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.approvername='编辑';
                $scope.processDefStep=row;
                $scope.processDefStep.selectedallarr=[[],[row.userDTO]];
                debugger;
                //提交编辑
                $scope.ok=function(state){
                    if(!state){return;} //状态判断
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            }
        }
        //删除审批人
        $scope.deleteapprover=function($index){
            $scope.processmodal.processDefStepDTOList.splice($index, 1);
        }


    }]
}
/*====================流程设置=================================*/
function setpcsCtrl(){
    return['$scope','$modal','LocalStorage','processService',"Common",function($scope,$modal,LocalStorage,processService,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun=function(){
            inquiryProcessModelTypeFun();
            inquiryProcessModelFun();//查询流程模板
        }

        //查询流程模板
        function inquiryProcessModelFun(){
            $scope.options={
                "name":""		//流程模板名称, 如查询所有模板就不用传入该值
            };
            var promise = processService.inquiryProcessModel({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryProcessModelData=data.body.data.processDefList;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //查询流程模板类型
        function inquiryProcessModelTypeFun(){
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = processService.inquiryProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //data.body.data.processDefTypes.unshift({name:'全部'});
                    $scope.prosclasslist=data.body.data.processDefTypes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //删除
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeProcessModelFun();
                function changeProcessModelFun(){
                    $scope.options={
                        "actionType":"DELETE",		//ADD, MODIFY, DELETE
                        "name":row.name
                    };
                    var promise = processService.changeProcessModel({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            inquiryProcessModelFun();
                        }else{
                            MsgService.errormsg(data);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.errormsg(data);
                    });
                };
            });
        };

    }]
}

/*====================类别设置=================================*/
function setpcsclassCtrl(){
    return['$scope', '$modal','processService','LocalStorage','Common',function($scope,$modal,processService,LocalStorage,Common){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        var userinfo;
        $scope.initFun=function(){
            userinfo=LocalStorage.getObject('userinfo');
            inquiryProcessModelTypeFun();
        }
        function inquiryProcessModelTypeFun(){
            //查询流程模板类型
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = processService.inquiryProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.processDefTypes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //添加/修改/删除流程模板类型
        function changeProcessModelTypeFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                "actionType":change,		//ADD, MODIFY, DELETE
                "name":oldrow.name,		//角色名称
                "newName":row.name		//新角色名称, 必填当actionType为MODIFY时
            };
            var promise = processService.changeProcessModelType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryProcessModelTypeFun();
                    $modalInstance.close();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };
        //$scope.active=true;
        //增加类型
        $scope.addclass=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addclass.html',
                //size:'md',
                controller: modalCtrl
            });
            $scope.user={
                "name":""
            };
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='添加';
                $scope.ok = function(state) {
                    if(!state){return;}
                    changeProcessModelTypeFun('ADD',$scope.user,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        //编辑类型
        $scope.editclass=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'addclass.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                var oldrow=angular.copy(row);
                $scope.user=row;
                $scope.ok = function (state) {
                    if(!state){return;}
                    changeProcessModelTypeFun('MODIFY',$scope.user,$modalInstance,oldrow);
                };

                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        //删除
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeProcessModelTypeFun('DELETE',row);
            });
        };


    }]
}
