//列表
function assetsmsgCtrl(){
    return['$rootScope','$scope','$modal','CustomerService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,CustomerService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquirySaleFun();
            inquiryCustomerFun();//查询客户list
        };
        $scope.selectedStatus='';
        $scope.sltname='';
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询客户
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
                    $scope.datalist2=datalist;
                    //$scope.thispages.total=$scope.datalist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //查询销售活动
        function inquirySaleFun(){
            $scope.options={
/*                "saleName":"",	//如查询单个销售, 传入该数据
                "customerDTO":{
                    "customerName":""		//如查询针对某个客户的所有销售行为, 传入该数据
                }*/
                "userDTO":{		//如查询某个销售人员所有客户, 传入该数据
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":'86',	//电话号码国家代码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
        };
            var promise = CustomerService.inquirySale({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.sales;
                    $scope.thispages.total=$scope.datalist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        /*=======销售过程=======*/
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
                        "customerName":row.customerName
                    }
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "saleName":row.saleName || '',
                    "customerDTO":{
                        "customerName":row.customerName
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
                controller: modalCtrl,
                resolve:{
                    datalist : function() {
                        return $scope.datalist2;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,datalist) {
                $scope.thename='新增';
                $scope.datalist=datalist;
                $scope.modalform={};
                if(datalist.length>0){
                    $scope.modalform.customerName=datalist[0].customerName;
                }
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
                controller: modalCtrl,
                resolve:{
                    datalist : function() {
                        return $scope.datalist2;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,datalist) {
                $scope.thename='编辑';
                $scope.datalist=datalist;
                $scope.modalform=row;
                modalform.customerName=row.customerDTO.customerName
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
    }]
}
//子列表
function assetsdtmainmsgCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common','OSSService','FileUploader',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common,OSSService,FileUploader){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquirySaleFun();//查询
        };


        //查询
        function inquirySaleFun(){
            $scope.options={
                "saleName":$rootScope.$stateParams.name		//如查询单个客户, 传入该数据
            };
            var promise = CustomerService.inquirySale({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datadt=data.body.data.sales[0];
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        /*======产品=======*/
        //添加/修改/删除
        function changeProductFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "productName":oldrow.productName || "",		//产品名称
                    "newProductName":row.productName || "",	//新产品名称
                    "productDesc":row.productDesc || "",		//产品描述
                    "unitPrice":row.unitPrice || "",		//单价
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "productName":oldrow.productName || "",		//产品名称
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                };
            }
            var promise = CustomerService.changeProduct({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquirySaleFun();
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
        $scope.addProductFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'Productmodal.html',
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
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProductFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑
        $scope.editProductFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'Productmodal.html',
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
                    changeProductFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deletProduct=function(row){
            Common.openConfirmWindow().then(function() {
                changeProductFun('DELETE',row);
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
                    "remindTime":remindTime || '',		//提醒时间
                    "memo":row.memo || '',		//备忘
                    "userDTO":row.myActivity[0] || '',
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "activityName":row.activityName || '',
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                };
            }
            var promise = CustomerService.changeActivity({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquirySaleFun();
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

        /*======竞争对手=======*/
        //添加/修改/删除
        function changeRivalFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "rivalName":oldrow.rivalName || "",	//竞争对手名称
                    "newRivalName":row.rivalName || "",	//新竞争对手名称
                    "rivalAddress":row.rivalAddress || "",	//竞争对手地址
                    "rivalPhone":row.rivalPhone || "",	//竞争对手电话
                    "memo":row.memo || "",	//备忘
                    "rivalSize":row.rivalSize || "",	//竞争对手规模
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "rivalName":row.rivalName || "",	//竞争对手名称
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                };
            }
            var promise = CustomerService.changeRival({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquirySaleFun();
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
        $scope.addRivalFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'Rivalmodal.html',
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
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeRivalFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑
        $scope.editRivalFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'Rivalmodal.html',
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
                    changeRivalFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deletRival=function(row){
            Common.openConfirmWindow().then(function() {
                changeRivalFun('DELETE',row);
            });
        };

        /*=======销售合同=======*/
        //添加/修改/删除
        function changeContractFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                var startDate=$filter('date')(row.startDate,'yyyy-MM-dd');
                var endDate=$filter('date')(row.endDate,'yyyy-MM-dd');
                debugger;
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
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                }
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "contractName":row.contractName || '',
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                };
            }
            var promise = CustomerService.changeContract({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquirySaleFun();
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
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeContractFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
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
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeContractFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                    "name":oldrow.name || '',	//文档名称
                    "newName":row.name || '',	//新文档名称
                    "url":row.url || '',
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    },
                    //"userDTO":userinfo
                };
            }else{
                $scope.options={
                    'actionType':change,		//ADD, MODIFY, DELETE
                    "name":row.name || '',
                    "saleDTO":{
                        "saleName":$scope.datadt.saleName || ""	//销售过程名称
                    }
                };
            }
            debugger;
            var promise = CustomerService.changeDocument({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquirySaleFun();
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



    }]
}
