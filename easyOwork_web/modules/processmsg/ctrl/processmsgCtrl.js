/**
 * Created by Nose on 2016/9/7.
 */
/*====================我的申请=================================*/
function addpcsCtrl(){
    return['$rootScope','$scope','$modal','editableOptions','processService','projectService','LocalStorage','MsgService','$state','noseService','OSSService','FileUploader',function($rootScope,$scope,$modal,editableOptions,processService,projectService,LocalStorage,MsgService,$state,noseService,OSSService,FileUploader){
        var userinfo=LocalStorage.getObject('userinfo');
        var attachmentUploader = $scope.attachmentUploader = new FileUploader({
            url: '', //不使用默认URL上传
            queueLimit: 1,     //文件个数
            removeAfterUpload: true,   //上传后删除文件
            autoUpload:false
        });

        attachmentUploader.onAfterAddingFile = function(fileItem){
            debugger;
            attachmentUploader.cancelAll();
             var file = $("#attachment").get(0).files[0];
             var filePath = LocalStorage.getObject('userinfo').entId+'/process/attachment/'+noseService.randomWord(false, 32)+'_';
             var key= filePath+file.name;
             var promise = OSSService.uploadFile(filePath,file);
             promise.success(function (data, status, headers, config) {
                 var urlPromise = OSSService.getUrl({'body':{'key':key}});
                 urlPromise.success(function (data, status, headers, config) {
                 var sts=data.body.status;
                 if(sts.statusCode==0){
                	 if(!$scope.processmodal.attachmentList)
                		 $scope.processmodal.attachmentList = [];
                	 $scope.processmodal.attachmentList.push({"url":data.body.data.url,"fileName":file.name,"ossKey":filePath+file.name,"size":file.size});
                 }
                 });
             });
             promise.error(function (data, status, headers, config) {
            	 MsgService.tomsg('附件上传失败');
             });
        }
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
                    //转化为可使用添加流程可使用的数据结构
                    $scope.processList = [];
                    angular.forEach($scope.inquiryProcessModelData, function(obj, key) {
                    	var process = {
        	            	"name":obj.name,
        	            	"title":obj.title,
        	            	"description":obj.description,
        	            	"processType":obj.processType,
        	            	"cost":obj.cost,
        	            	"projectDTO":{},
        	            	"launchUserDTO":{
        	                    "id":userinfo.id,	//员工号
        	                    "personalEmail":userinfo.personalEmail,	//邮件地址
        	                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
        	                    "personalPhone":userinfo.personalPhone,		//电话号码
        	                    "name":userinfo.name
        	                },
        	            	"processFieldDTOList":[],
        	            	"processStepDTOList":obj.processDefStepDTOList
                    	};
                    	angular.forEach(obj.processDefFieldDTOList, function(obj1, key1) {
                    		process.processFieldDTOList.push({'name':obj1.name,'value':'','valueList':obj1.valueList,'type':obj1.type});
                    	});
                    	$scope.processList.push(process);
                    })
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };
        //发起流程
        $scope.createProcessFun=function(){
            /*if($scope.processmodal.title==''||$scope.processmodal.title==undefined){
                MsgService.tomsg('新建流程名称为必填！');
                return;
            }*/
            debugger;
            var promise = processService.createProcess({body:$scope.processmodal});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	$state.go('processmsg.mypcs');
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };
        $scope.deleteAttachment=function($index){
            $scope.processmodal.attachmentList.splice($index, 1);
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
                //提交编辑
                $scope.ok=function(state){
                    if(!state){return;} //状态判断
                    if($scope.processDefStep.myselected != null)
                    	row.userDTO=$scope.processDefStep.myselected[0];
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            }
        }
        
        $scope.clearproject = function(){
        	$scope.processmodal.projectDTO.projectName = '';
        }
        $scope.selectproject = function(){
        	var modalInstance = $modal.open({
                templateUrl: 'selectproject.html',
                size:'sm',
                controller: modalCtrl,
                resolve:{
                	processmodal: function () {
                        return $scope.processmodal;
                    }
                }
            });
        	function modalCtrl ($scope, $modalInstance,processmodal) {
            	
            	var promise = projectService.inquiryProject({body:{}});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                    	$scope.projects = data.body.data.projects;
                    }
                });
                promise.error(function(data, status, headers, config){
                    //MsgService.tomsg(data.body.status.errorDesc);
                });
                
                $scope.clickproject = function(row){
                	$scope.projectName= row.projectName;
                }
            	
                $scope.ok=function(){
                	processmodal.projectDTO.projectName = $scope.projectName;
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }


    }]
}

/*====================我的申请=================================*/
function mypcsCtrl(){
    return['$rootScope','$scope', '$modal','Common','processService','LocalStorage','MsgService',function($rootScope,$scope,$modal,Common,processService,LocalStorage,MsgService){

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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };
        //分页
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        function inquiryCreatedProcessesFun(){
            //查询发起的流程
            $scope.options={
                "launchUserDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone,		//电话号码
                    "name":userinfo.name
                }
            };
            var promise = processService.inquiryCreatedProcesses({body:$scope.options});
            promise.success(function(data, status, headers, config){
                if(status==200){
                    $scope.inquiryProcessesData=data.processes;
                }
                //远程开启下面的
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryProcessesData=data.body.data.processes;
                    $scope.thispages.total=$scope.inquiryProcessesData.length;//分页总数
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
/*====================我的申请详情=================================*/
function mypcsdetailCtrl(){
    return['$rootScope','$scope','LocalStorage','Common','processService','MsgService',function($rootScope,$scope,LocalStorage,Common,processService,MsgService){
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
/*====================我的审批=================================*/
function myauditCtrl(){
    return['$rootScope','$scope', '$modal','Common','processService','LocalStorage','MsgService',function($rootScope,$scope,$modal,Common,processService,LocalStorage,MsgService){

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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };

        //分页
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        function inquiryHandlingProcessesFun(){
            //查询审批
            $scope.options={
                "launchUserDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone,		//电话号码
                    "name":userinfo.name
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
                     $scope.thispages.total=$scope.inquiryProcessesData.length;//分页总数
                 }else{
                 MsgService.tomsg(data.body.status.errorDesc);
                 }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
/*====================审批详情=================================*/
function myauditdetailCtrl(){
    return['$rootScope','$scope','LocalStorage','Common','processService',function($rootScope,$scope,LocalStorage,Common,processService){
        $scope.pcsdetail = LocalStorage.getObject('pcsdetail');
        //撤回流程
        $scope.jujue=false;
        $scope.tongyi=false;
        $scope.jujuetoggle=function(){
            $scope.jujue = !$scope.jujue;
            $scope.tongyi=false;
        }
        //批准同意
        $scope.tongyitoggle=function(){
        	$scope.tongyi = !$scope.tongyi;
        	$scope.jujue=false;
        }
        //批准拒绝
        $scope.rejectdproFun=function(state,msg){
            if(!state) return;
            Common.openConfirmWindow('','您确定要拒绝申请么？').then(function() {
                $scope.pcsdetail.rejectMsg=msg;
                $scope.changeProcessFun('REJECT',$scope.pcsdetail)
            });
        }
      //批准同意
        $scope.agreedproFun=function(msg){
            Common.openConfirmWindow('','您确定要批准申请么？').then(function() {
                $scope.pcsdetail.rejectMsg=msg;
            	$scope.changeProcessFun('APPROVE',$scope.pcsdetail)
            });
        }

        $scope.changeProcessFun=function(change,row){
            //批准/拒绝/撤回流程
            $scope.options={
                "actionType":change	,	//APPROVE, REJECT, WITHDRAW
                "processUuid":row.processUuid,	//流程编号
                "message":row.rejectMsg || ''	//批准拒绝时添加的信息
            };
            var promise = processService.changeProcess({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //成功
                    $rootScope.$state.go('processmsg.mypcs');
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
/*====================添加流程=================================*/
function addsetpcsCtrl(){
    return['$rootScope','$scope','$modal','editableOptions','processService','LocalStorage','MsgService','$state',function($rootScope,$scope,$modal,editableOptions,processService,LocalStorage,MsgService,$state){

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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
                "cost":pcsRowData.cost,
                "costFieldName":pcsRowData.costFieldName||"",
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
                "cost":false,
                "costFieldName":"",
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

        var oldname=angular.copy($scope.processmodal.name);

    //    总流程添加
        $scope.addprocessmodalFun=function(){
            if($scope.pcsclass=='' || $scope.processmodal.name==''){
            }
            //如果用于成本核算, 检查是否选择金额字段
            if($scope.processmodal.cost){
            	var costFieldName = $('#costFieldName option:selected').val();
                if(costFieldName==''){
                	MsgService.tomsg('该流程用于成本核算, 请选择金额字段');
                    return;
                }
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
            $scope.processmodal.newName=$scope.processmodal.name;
            $scope.processmodal.name=oldname;

            debugger;

            var promise = processService.changeProcessModel({'body':$scope.processmodal});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	$state.go('processmsg.setpcs');
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }



        //新增审批人
        $scope.addapprover=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addapprover.html',
                size:'sm',
                controller: modalCtrl
            });
            var processDefStepDTOList=$scope.processmodal.processDefStepDTOList;
            function modalCtrl ($scope, $modalInstance) {
                $scope.approvername='新增';
                $scope.processDefStep={};
                $scope.ok = function (state) {
                    if(!state)return;
                    var row={
                        "stepName":$scope.processDefStep.stepName,	//节点名称
                        "stepNo":processDefStepDTOList.length+1,	//节点顺序号
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
                    debugger;
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
                    if($scope.processDefStep.myselected != null && $scope.processDefStep.myselected.length>0)
                    	row.userDTO=$scope.processDefStep.myselected[0];
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
            //重新计算stepNo
            angular.forEach($scope.processmodal.processDefStepDTOList, function(obj1, key1) {
            	$scope.processmodal.processDefStepDTOList[key1].stepNo = key1+1;
        	});
        }


    }]
}
/*====================流程设置=================================*/
function setpcsCtrl(){
    return['$scope','$modal','LocalStorage','processService','Common','MsgService',function($scope,$modal,LocalStorage,processService,Common,MsgService){
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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            });
        };

    }]
}

/*====================类别设置=================================*/
function setpcsclassCtrl(){
    return['$scope', '$modal','processService','LocalStorage','Common','MsgService',function($scope,$modal,processService,LocalStorage,Common,MsgService){
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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
