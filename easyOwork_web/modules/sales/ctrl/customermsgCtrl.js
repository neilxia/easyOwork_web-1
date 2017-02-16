//列表
function customermsgCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common','noseService',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryCustomerFun();//查询list
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
                //"customerName":"",		//如查询单个客户, 传入该数据
                "userDTO":{		//如查询某个销售人员所有客户, 传入该数据
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":'86',	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
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

        //添加/修改/删除
        function changeCustomerFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "customerName":oldrow.customerName || '',		//客户名称
                    "newCustomerName":row.customerName || '',	//新客户名称
                    "customerPostCode":row.customerPostCode || '',	//客户邮编
                    "customerLevel":row.customerLevel || '',		//客户级别  NORMAL， IMPORTANT
                    "customerPhone":row.customerPhone || '',	//客户电话号码
                    "customerWebsite":row.customerWebsite || '',	//客户官方网址
                    "customerAddress":row.customerAddress || '',	//客户地址
                    "customerSource":row.customerSource || '',	//客户来源
                    "prospect":false,		//true(潜在客户), false(一般客户)
/*                    "contactList":[{		//添加时可同时传入联系人信息
                        "contactName":"",		//客户联系人名称
                        "contactEmail":"",		//客户联系人邮箱
                        "contactMobileCountryCode":"",	//客户联系人手机号码国家代码
                        "contactMobileNo":"",	//客户联系人手机号码
                        "contactPosition":"",		//客户联系人职位客户级别
                        "contactMemo":"",		//备注
                    }],*/
                    "userDTO":row.myselected[0] || ''
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "customerName":row.customerName || ''		//项目名称
                };
            }
            debugger;

            var promise = CustomerService.changeCustomer({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCustomerFun();
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
                $scope.modalform.customerLevel="NORMAL";
                $scope.modalform.myselected=[userinfo];
                $scope.modalform.selectedallarr=[[],[userinfo]];
                $scope.RndNum=function(){
                    $scope.modalform.projectId=noseService.RndNum(8);
                }
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeCustomerFun('ADD',$scope.modalform,$modalInstance);
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
                $scope.modalform.myselected=[row.userDTO];
                $scope.modalform.selectedallarr=[[],[row.userDTO]];
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeCustomerFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                changeCustomerFun('DELETE',row);
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
                        inquiryCustomerFun();
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
function customerdtmainmsgCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common','OSSService','FileUploader','noseService',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common,OSSService,FileUploader,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryCustomerFun();//查询
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

        /*=======销售过程=======*/
/*        $scope.gcStatusArr=[
            {name:'机会来源',val:'机会来源'},
            {name:'广告',val:'广告'},
            {name:'研讨会',val:'研讨会'},
            {name:'搜索引擎',val:'搜索引擎'},
            {name:'客户介绍',val:'客户介绍'},
            {name:'其他',val:'其他'}
        ]*/
        //添加/修改/删除 销售活动
        function changeSaleFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "saleName":oldrow.saleName || '',	//销售过程名称
                    "newSaleName":row.saleName || '',	//新销售过程名称
                    "memo":row.memo || '',	//销售过程备忘
                    "saleStage":row.saleStage || '',	//接洽客户/确定需求/报价方案/议价审核/销售成功
                    "saleSource":row.saleSource || '',	//销售机会来源
                    "saleAmount":row.saleAmount || '',	//销售金额
                    "userDTO":row.mycourseall[0],
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "saleName":row.saleName || '',
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                };
            }
            var promise = CustomerService.changeSale({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCustomerFun();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //新增销售过程
        $scope.addcourse = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addcourse.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                $scope.modalform.mycourseall=[userinfo];
                $scope.modalform.courseall=[[],[userinfo]];
                $scope.modalform.saleStage="接洽客户";
                //$scope.modalform.projectStageName=Stage[0].projectStageName;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeSaleFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑
        $scope.editcourse = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addcourse.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.modalform.mycourseall=[row.userDTO];
                $scope.modalform.courseall=[[],[row.userDTO]];
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeSaleFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deletecourse=function(row){
            Common.openConfirmWindow().then(function() {
                changeSaleFun('DELETE',row);
            });
        };


        /*=======销售合同=======*/
        //添加/修改/删除
        function changeContractFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                var startDate=$filter('date')(row.startDate,'yyyy-MM-dd');
                var endDate=$filter('date')(row.endDate,'yyyy-MM-dd');
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "contractName":oldrow.contractName || "",	//合同名称
                    "newContractName":row.contractName || "",	//新合同名称
                    "status":row.status || "",		//合同状态
                    "url":row.url || "",		//合同文件地址
                    "contractAmount":row.contractAmount || "",	//合同金额
                    "receivable":row.receivable || "",	//营收金额
                    "collectedAmount":row.collectedAmount || "",//实收金额
                    "startDate":startDate || "",	//合同开始时间
                    "endDate":endDate || "",	//合同结束时间
                    "userDTO":$scope.datadt.userDTO || "",
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                }
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "contractName":row.contractName || '',
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                };
            }
            var promise = CustomerService.changeContract({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCustomerFun();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //新增销售过程
        $scope.addcontractFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addcontract.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                var customerContractUploader = $scope.customerContractUploader = new FileUploader({
                    url: '', //不使用默认URL上传
                    queueLimit: 1,     //文件个数
                    removeAfterUpload: true,   //上传后删除文件
                    autoUpload:false
                });
                customerContractUploader.onAfterAddingFile = function(fileItem){
                	customerContractUploader.cancelAll();
                    var file = $("#customerContract").get(0).files[0];
                    var filePath = LocalStorage.getObject('userinfo').entId+'/customer/contract/'+noseService.randomWord(false, 32)+'_';
                    var key= filePath+file.name;
                    var promise = OSSService.uploadFile(filePath,file);
                    promise.success(function (data, status, headers, config) {
                        var urlPromise = OSSService.getUrl({'body':{'key':key}});
                        urlPromise.success(function (data, status, headers, config) {
                            var sts=data.body.status;
                            if(sts.statusCode==0){
                                $scope.modalform.url = data.body.data.url;
                                $scope.modalform.contractName = file.name;
                            }
                        });
                    });
                    promise.error(function (data, status, headers, config) {
                        MsgService.tomsg('文件上传失败');
                    });
                };
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeContractFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.deleteDocument = function () {
                    $scope.modalform = {};
                };
            };
        };
        //编辑
        $scope.editcontractFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addcontract.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.modalform.mycourseall=[row.userDTO];
                $scope.modalform.courseall=[[],[row.userDTO]];
                
              //提交增加
                var customerContractUploader = $scope.customerContractUploader = new FileUploader({
                    url: '', //不使用默认URL上传
                    queueLimit: 1,     //文件个数
                    removeAfterUpload: true,   //上传后删除文件
                    autoUpload:false
                });
                customerContractUploader.onAfterAddingFile = function(fileItem){
                	customerContractUploader.cancelAll();
                    var file = $("#customerContract").get(0).files[0];
                    var filePath = LocalStorage.getObject('userinfo').entId+'/customer/contract/'+noseService.randomWord(false, 32)+'_';
                    var key= filePath+file.name;
                    var promise = OSSService.uploadFile(filePath,file);
                    promise.success(function (data, status, headers, config) {
                        var urlPromise = OSSService.getUrl({'body':{'key':key}});
                        urlPromise.success(function (data, status, headers, config) {
                            var sts=data.body.status;
                            if(sts.statusCode==0){
                                $scope.modalform.url = data.body.data.url;
                                $scope.modalform.contractName = file.name;
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
                    changeContractFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
                $scope.deleteDocument = function () {
                    $scope.modalform = {};
                };
            };
        };
        //删除
        $scope.deletecourse=function(row){
            Common.openConfirmWindow().then(function() {
                changeContractFun('DELETE',row);
            });
        };

        /*=======文档=======*/
        //添加/修改/删除
        function changeDocumentFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "name":oldrow.documentName || '',	//文档名称
                    "newName":row.documentName || '',	//新文档名称
                    "url":row.documentUrl || '',
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    },
                    //"userDTO":userinfo
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "name":row.name || '',
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                };
            }
            debugger;
            var promise = CustomerService.changeDocument({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCustomerFun();
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance,FileUploader) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                var htUploader = $scope.htUploader = new FileUploader({
                    url: '', //不使用默认URL上传
                    queueLimit: 1,     //文件个数
                    removeAfterUpload: true,   //上传后删除文件
                    autoUpload:false
                });
                htUploader.onAfterAddingFile = function(fileItem){
                    htUploader.cancelAll();
                    var file = $("#customerDocumentFile").get(0).files[0];
                    var filePath = LocalStorage.getObject('userinfo').entId+'/customer/document/'+noseService.randomWord(false, 32)+'_';
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
                        changeDocumentFun('ADD',$scope.modalform,$modalInstance);
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
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeDocumentFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                changeDocumentFun('DELETE',row);
            });
        };



        /*======日程活动=======*/
        $scope.gcStatusArr=[
            {name:'活动状态',val:''},
            {name:'计划中',val:'PLAN'},
            {name:'正在进行',val:'INPROGRESS'},
            {name:'已完成',val:'COMPLETED'},
            {name:'已取消',val:'CANCELLED'}
        ]

        //添加/修改/删除日程活动
        function changeActivityFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                var startDate=$filter('date')(row.startDate,'yyyy-MM-dd hh:mm');
                var endDate=$filter('date')(row.endDate,'yyyy-MM-dd hh:mm');
                var remindTime=$filter('date')(row.remindTime,'yyyy-MM-dd hh:mm');
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "activityName":oldrow.activityName || '',		//日程活动名称
                    "newActivityName":row.activityName || '',	//新日程活动名称
                    "activityType":row.activityType || '',		//活动类型
                    "startDate":startDate || '',		//活动开始时间
                    "endDate":endDate || '',		//活动结束时间
                    //"remindTime":remindTime,		//提醒时间
                    "memo":row.memo || '',		//备忘
                    "userDTO":row.myActivity[0] || '',
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "activityName":row.activityName || '',
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                };
            }
            var promise = CustomerService.changeActivity({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCustomerFun();
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
        $scope.addActivitylFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'rcactivities.html',
                //size:'sm',
                controller: modalCtrl,
                resolve:{
                    gcStatusArr : function() {
                        return $scope.gcStatusArr;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,gcStatusArr) {
                $scope.thename='新增';
                $scope.gcStatusArr=gcStatusArr;
                $scope.modalform={};
                $scope.modalform.myActivity=[userinfo];
                $scope.modalform.myActivityall=[[],[userinfo]];
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeActivityFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //编辑
        $scope.editActivityFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'rcactivities.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.modalform.myActivity=[row.userDTO];
                $scope.modalform.myActivityall=[[],[row.userDTO]];
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeActivityFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteActivity=function(row){
            Common.openConfirmWindow().then(function() {
                changeActivityFun('DELETE',row);
            });
        };



        /*====联系人员====*/
        //添加/修改/删除项目模板
        function changeCustomerContactFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "contactName":oldrow.contactName || "",		//客户联系人名称
                    "contactEmail":row.contactEmail || "",		//客户联系人邮箱
                    "contactMobileCountryCode":"86",	//客户联系人手机号码国家代码
                    "contactMobileNo":row.contactMobileNo || "",	//客户联系人手机号码
                    "contactPosition":row.contactPosition || "",		//客户联系人职位
                    "contactMemo":row.contactMemo || "",		//备注
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "contactName":row.contactName || '',		//客户联系人名称
                    "customerDTO":{
                        "customerName":$scope.datadt.customerName
                    }
                };
            }
            var promise = CustomerService.changeCustomerContact({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCustomerFun();
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
        $scope.addCustomerContactFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'CustomerContact.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeCustomerContactFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //编辑
        $scope.editCustomerContactFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'CustomerContact.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeCustomerContactFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteCustomerContact=function(row){
            Common.openConfirmWindow().then(function() {
                changeCustomerContactFun('DELETE',row);
            });
        };


        /*======客户跟踪=======*/
        $scope.timelineoptions={

        }

    }]
}
