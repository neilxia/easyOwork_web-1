//列表
function assetsmpmsgCtrl(){
    return['$rootScope','$scope','$modal','$filter','CustomerService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,$filter,CustomerService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        var date = new Date();
        var curryear=date.getFullYear();
        $scope.curryear='';
        $scope.dateJson={
            curryear:'',
            org:'',
            user:''
        };
        $scope.initFun = function(){
        	$scope.dateJson.curryear=date;
            inquirySaleTargetFun(curryear);
        };

        $scope.radioModel='USER';
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询考勤记录当月
        function inquirySaleTargetFun(year,org,user){
            $scope.options={
                "targetOn":$scope.radioModel,		//COMPANY, ORG or USER(公司, 部门或个人)
                "year":year			//年份
/*                "orgDTO":org || "",/!*{	//传入则查询特定部门的目标, 不传则查询所有部门
                    "orgName":orgname || ""
                },*!/
                "userDTO":user || ""/!*{	//传入则查询特定员工的目标, 不传则查询所有员工
                    "id":"",
                    "personalEmail":"",
                    "personalPhone":"",
                    "personalPhoneCountryCode":""
                }*!/*/
            };
            if(org){
                $scope.options.orgDTO=org
            }
            if(user){
                $scope.options.userDTO=user
            }
            var promise = CustomerService.inquirySaleTarget({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.saleTargetList;
                    $scope.thispages.total=$scope.datalist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        $scope.inquirySaleTargetFun=function(){
        	year=$filter('date')($scope.dateJson.curryear,'yyyy');
            year=year?year:"";
            inquirySaleTargetFun(year);
        };
        $scope.inquirySalelist=function(year,org,user){
            year=$filter('date')(year,'yyyy');
            //year=year?year:curryear;
            year=year?year:"";
            var thisorg={};
            if(org){
                thisorg.name=org.text || ""
            }
            inquirySaleTargetFun(year,thisorg,user);
        };

        //实现添加/修改/删除
        function changeSaleTargetFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                var year=$filter('date')(row.year,'yyyy');
                var month=$filter('date')(row.month,'yyyy-M');

                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "targetOn":$scope.radioModel,	//COMPANY, ORG or User (代表公司, 部门, 个人)
                    "targetType":row.targetType || "",	//YEAR, QUARTER, MONTH(代表年, 季度或月度目标)
                    "saleTargetUuid":row.saleTargetUuid || "",		//目标唯一编码, 修改时需传入
                    "targetAmount":row.targetAmount || "",	//目标金额
                    "memo":row.memo || ""	//其他备忘
                };
                if($scope.radioModel=='ORG'){
                    $scope.options.orgDTO={
                        name:row.orgDTO[0].text
                    };
                }else if($scope.radioModel=='USER'){
                    $scope.options.userDTO=row.myuserDTO[0];
                }
                if(row.targetType=='YEAR'){
                    $scope.options.year=year;
                }else if(row.targetType=='QUARTER'){
                    $scope.options.year=curryear;
                    $scope.options.quarter=row.quarter;
                }else if(row.targetType=='MONTH'){
                    var montharr=month.split('-');
                    $scope.options.year=montharr[0];
                    $scope.options.month=montharr[1];
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "saleTargetUuid":row.saleTargetUuid || ''
                };
            }
            var promise = CustomerService.changeSaleTarget({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	var year=$filter('date')($scope.dateJson.curryear,'yyyy');
                    year=year?year:"";
                    inquirySaleTargetFun(year);
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
        $scope.addmplFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                controller: modalCtrl,
                resolve:{
                    item : function() {
                        return $scope.radioModel;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,item) {
                $scope.thename='新增';
                $scope.modalform={};
                $scope.radioModel=item;
                $scope.modalform.targetType='YEAR';
                $scope.modalform.quarter='1';
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeSaleTargetFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //编辑
        $scope.editmpFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                controller: modalCtrl,
                resolve:{
                    item : function() {
                        return $scope.radioModel;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,item) {
                $scope.thename='编辑';
                $scope.modalform=row;
                if(row.targetType=='YEAR'){
                    $scope.modalform.year=row.year+'-01-01';
                }
                if(row.targetType=='MONTH'){
                    $scope.modalform.month=row.year+'-'+row.month;
                }
                $scope.radioModel=item;
                $scope.modalform.orgDTO=[row.orgDTO];
                $scope.modalform.orgDTOall=[[],[row.orgDTO]];
                $scope.modalform.myuserDTO=[row.userDTO];
                $scope.modalform.myuserDTOall=[[],[row.userDTO]];
                debugger;
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeSaleTargetFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deletemp=function(row){
            Common.openConfirmWindow().then(function() {
                changeSaleTargetFun('DELETE',row);
            });
        };





    }]
}
//子列表
function assetsmpdtmainmsgCtrl(){
    return['$rootScope','$scope','$modal','attendanceService','MsgService','LocalStorage','Common','OSSService','FileUploader',function($rootScope,$scope,$modal,attendanceService,MsgService,LocalStorage,Common,OSSService,FileUploader){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquirySaleTargetFun();
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
