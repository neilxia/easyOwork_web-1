//列表
function assetslistCtrl(){
    return['$rootScope','$scope','$filter','$modal','assetService','MsgService','LocalStorage','Common',function($rootScope,$scope,$filter,$modal,assetService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAssetTypesFun(); //查询类型list
            inquiryAssetsFun(); //查询list
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        // $scope.barTrue=false;
        // $scope.blinkObj=function(){
        //     this.barTrue = !this.barTrue;
        // }
/*        $scope.statelist=[
            {name:'全部状态',val:''},
            {name:'已分配',val:'NORMAL'},
            {name:'未分配',val:'IMPORTANT'},
            {name:'已报损',val:'IMPORTANT'}
        ]*/
        //查询类型list
        function inquiryAssetTypesFun(){
            $scope.options={};
            var promise = assetService.inquiryAssetTypes({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.listClass=data.body.data.assetTypeList;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //查询list
        function inquiryAssetsFun(){
            $scope.options={};
            var promise = assetService.inquiryAssets({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    if($rootScope.$stateParams.type=="1"){
                        angular.forEach(data.body.data.assets,function(val,ind){
                            if(val.userDTO){
                                datalist.push(val);
                            }
                        })
                    }else if($rootScope.$stateParams.type=="2"){
                        angular.forEach(data.body.data.assets,function(val,ind){
                            if(!val.userDTO){
                                datalist.push(val);
                            }
                        })
                    }else{
                        datalist=data.body.data.assets;
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
        function changeAssetFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var startDate=$filter('date')(row.startDate,'yyyy-MM-dd');
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "assetModel":row.assetModel || '',	//资产型号
                    "assetName":row.assetName || '',	//资产名称
                    "assetType":row.assetType || '',	//资产类型
                    "price":row.price || '',		//价格
                    "startDate":startDate || '',	//购买日期
                    "age":row.age || '',		//服务年限
                    "description":row.description || '',	//描述
                    "id":oldrow.id || '',		//资产编号
                    "newId":row.id || ''	//资产编号 for MODIFYs
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "id":row.id || ''		//资产编号
                };
            }
            var promise = assetService.changeAsset({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryAssetsFun();
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
                    listClass : function() {
                        return $scope.listClass;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,listClass) {
                $scope.thename='新增';
                $scope.listClass=listClass;
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeAssetFun('ADD',$scope.modalform,$modalInstance);
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
                    listClass : function() {
                        return $scope.listClass;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,listClass) {
                $scope.thename='编辑';
                $scope.listClass=listClass;
                $scope.modalform=row;
                //[[],[row.userDTO]]
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeAssetFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                changeAssetFun('DELETE',row);
            });
        };

    }]
}
//列表详情
function assetsviewCtrl(){
    return['$rootScope','$scope','$modal','assetService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,assetService,MsgService,LocalStorage,Common){
        $scope.datadt=$rootScope.$stateParams.data;
        var userinfo=LocalStorage.getObject('userinfo');
debugger;

    }]
}
//列表
function dbtassetsCtrl(){
    return['$rootScope','$scope','$modal','assetService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,assetService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAssetTypesFun();
            inquiryAssetsFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询类型list
        function inquiryAssetTypesFun(){
            $scope.options={};
            var promise = assetService.inquiryAssetTypes({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.listClass=data.body.data.assetTypeList;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //查询list未分配
        function inquiryAssetsFun(){
            $scope.options={};
            var promise = assetService.inquiryAssets({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    angular.forEach(data.body.data.assets,function(val,ind){
                        if(!val.userDTO){
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
        function assignWithdrawAssetFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                "actionType":change,	//ASSIGN, WITHDRAW
                "userDTO":row.userDTO[0] || "",
                "id":row.id	//资产号
            }
            var promise = assetService.assignWithdrawAsset({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryAssetsFun();
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
        $scope.addmodelFun = function (data) {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                $scope.modalform=data;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    assignWithdrawAssetFun('ASSIGN',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };



    }]
}
//列表
function recyclingassetsCtrl(){
    return['$rootScope','$scope','$modal','assetService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,assetService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAssetTypesFun();
            inquiryAssetsFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询类型list
        function inquiryAssetTypesFun(){
            $scope.options={};
            var promise = assetService.inquiryAssetTypes({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.listClass=data.body.data.assetTypeList;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        //查询list分配
        function inquiryAssetsFun(){
            $scope.options={};
            var promise = assetService.inquiryAssets({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=[];
                    angular.forEach(data.body.data.assets,function(val,ind){
                        if(val.userDTO){
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
        function assignWithdrawAssetFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                "actionType":change,	//ASSIGN, WITHDRAW
                "userDTO":row.userDTO[0] || row.userDTO || "",
                "id":row.id	//资产号
            }
            var promise = assetService.assignWithdrawAsset({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryAssetsFun();
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
/*        $scope.delete = function (data) {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                $scope.modalform=data;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    assignWithdrawAssetFun('ASSIGN',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };*/

        //批量
        $scope.delete=function(row){
            Common.openConfirmWindow('','确定回收？').then(function() {
                assignWithdrawAssetFun('WITHDRAW',row);
            });
        };

        //批量删除
/*        $scope.deleteAll=function(){
            Common.openConfirmWindow('','确定选择项回收？').then(function() {
                deleteAllEmployees();
            });
        };*/

    }]
}
//类型
function assetsclassCtrl(){
    return['$rootScope','$scope','$modal','assetService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,assetService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryAssetTypesFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询list
        function inquiryAssetTypesFun(){
            $scope.options={};
            var promise = assetService.inquiryAssetTypes({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.assetTypeList;
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
        function changeAssetTypeFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "assetTypeUuid":row.assetTypeUuid,	//资产类型编号, MODIFY和DELETE时需要传入
                    "name":row.name	//类型名称
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "assetTypeUuid":row.assetTypeUuid	//资产类型编号, MODIFY和DELETE时需要传入
                };
            }
            var promise = assetService.changeAssetType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryAssetTypesFun();
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
                    changeAssetTypeFun('ADD',$scope.modalform,$modalInstance);
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
                    changeAssetTypeFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
                changeAssetTypeFun('DELETE',row);
            });
        };
    }]
}
