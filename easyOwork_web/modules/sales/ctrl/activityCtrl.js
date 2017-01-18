//列表
function activityCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryCampaignFun();//查询
        };
        $scope.gcStatusArr=[
            {name:'活动状态',val:''},
            {name:'计划中',val:'PLAN'},
            {name:'正在进行',val:'INPROGRESS'},
            {name:'已完成',val:'COMPLETED'},
            {name:'已取消',val:'CANCELLED'}
        ]

        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询项目
        function inquiryCampaignFun(){
            $scope.options={
                //"campaignName":"",		//如查询单个营销活动, 传入该数据; 否则查询所有营销活动
            };
            var promise = CustomerService.inquiryCampaign({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.campaigns;
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
        function changeCampaignFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                var startDate=$filter('date')(row.startDate,'yyyy-MM-dd hh:mm');
                var endDate=$filter('date')(row.endDate,'yyyy-MM-dd hh:mm');
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "campaignName":oldrow.campaignName,	//营销活动名称
                    "newCampaignName":row.campaignName,	//新营销活动名称
                    "campaignType":row.campaignType,		//营销活动类型
                    "startDate":startDate,		//活动开始时间
                    "endDate":endDate,		//活动结束时间
                    "campaignDesc":row.campaignDesc,		//活动描述
                    "status":row.status,		//活动状态(PLAN, INPROGRESS, COMPLETED, CANCELLED)
                    "planCost":row.planCost,		//计划成本
                    "actualCost":row.actualCost,		//实际花费
                    "userDTO":row.myselected[0]
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "campaignName":row.campaignName || ''		//项目名称
                };
            }
debugger;

            var promise = CustomerService.changeCampaign({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryCampaignFun();
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
                    changeCampaignFun('ADD',$scope.modalform,$modalInstance);
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

    }]
}
//子列表
function activitydtmainCtrl(){
    return['$rootScope','$scope','$modal','attendanceService','MsgService','LocalStorage','Common','OSSService','FileUploader',function($rootScope,$scope,$modal,attendanceService,MsgService,LocalStorage,Common,OSSService,FileUploader){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAttendanceFun();
        };


        //新增销售
        $scope.addassetsFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addassets.html',
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
        //新增合同
        $scope.addcontractFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addcontract.html',
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
