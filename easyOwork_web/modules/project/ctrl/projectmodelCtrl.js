//列表
function projectmodallistCtrl(){
    return['$rootScope','$scope','$modal','projectService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,projectService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryProjectDefTypeFun();//类型
            inquiryProjectDefFun();//模板
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询项目模板
        function inquiryProjectDefFun(){
            $scope.options={
                "projectDefName":''	//按名称查询传入该值, 查询所有项目模板则不用传入
            };
            var promise = projectService.inquiryProjectDef({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.projectDefs;
                    $scope.thispages.total=$scope.datalist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //查询项目模板类型
        function inquiryProjectDefTypeFun(){
            $scope.options={};
            var promise = projectService.inquiryProjectDefType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.projectDefTypes=data.body.data.projectDefTypes;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //添加/修改/删除项目模板
        function changeProjectDefFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                'actionType':change,		//ADD, MODIFY, DELETE
                'projectDefName':oldrow.projectDefName || "",	//项目模板名称
                'newProjectDefName':row.projectDefName || "",	//新项目模板名称
                'projectDefDesc':row.projectDefDesc || "",	//项目模板描述
                'projectDefDomain':row.projectDefDomain || row.projectDefDomainnew	//行业
                /*'projectDefStageDTOList':{	//项目模板阶段列表
                    'stageName':row.xx,	//阶段名称
                    'seqNo':row.xx 		//阶段序列号
                }*/
            };
            var promise = projectService.changeProjectDef({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryProjectDefFun();
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
        $scope.addmodelFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl,
                resolve:{
                    Types : function() {
                        return $scope.projectDefTypes;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Types) {
                $scope.thename='新增';
                $scope.thisTypes=Types;
                $scope.selectedName=Types[0];
                $scope.projectDefDomainnew=null;
                $scope.modalform={
                    "projectDefName":"",
                    //"newProjectDefName":"",
                    "projectDefDesc":""
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    $scope.modalform.projectDefDomain=$scope.selectedName=='其他'?$scope.projectDefDomainnew:$scope.selectedName;
                    changeProjectDefFun('ADD',$scope.modalform,$modalInstance);
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
                //size:'sm',
                controller: modalCtrl,
                resolve:{
                    Types : function() {
                        return $scope.projectDefTypes;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Types) {
                $scope.thename='编辑';
                $scope.modalform=row;
                $scope.thisTypes=Types;
                var index = Types.indexOf(row.projectDefDomain);
                if (index > -1) {
                    $scope.selectedName=row.projectDefDomain;
                    $scope.projectDefDomainnew='';
                }else{
                    $scope.selectedName='其他';
                    $scope.projectDefDomainnew=row.projectDefDomain;
                }
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectDefFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //批量
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeProjectDefFun('DELETE',row);
            });
        };

        //批量删除
        $scope.deleteAll=function(){
            Common.openConfirmWindow().then(function() {
                var selectedItems=[];
                angular.forEach($scope.datalist, function(item) {
                    if (item.checked == true) {
                        selectedItems.push({"projectDefName":item.projectDefName});
                    }
                });
                $scope.options={
                    projectDefs:selectedItems
                };
                debugger;
                var promise = projectService.deleteProjectDefs({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        inquiryProjectDefFun();
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
function projectmodalphaseCtrl(){
    return['$rootScope','$scope','$modal','projectService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,projectService,MsgService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        var projectDefName=$rootScope.$stateParams.name;
        $scope.initFun = function(){
            inquiryProjectDefFun();
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询项目模板
        function inquiryProjectDefFun(){
            $scope.options={
                "projectDefName":projectDefName || ''	//按名称查询传入该值, 查询所有项目模板则不用传入
            };
            var promise = projectService.inquiryProjectDef({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.projectDefs[0];
                    //$scope.projectDefStageDTOList=data.body.data.projectDefs.projectDefStageDTOList;
                    $scope.thispages.total=$scope.datalist.projectDefStageDTOList.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //添加/修改/删除项目模板
        function changeProjectDefFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){
                if(change=='DELETE'){
                    change='MODIFY';
                    var index = $scope.datalist.projectDefStageDTOList.indexOf(row);
                    if (index > -1) {
                        $scope.datalist.projectDefStageDTOList.splice(index, 1);
                    }
                }else{
                    $scope.datalist.projectDefStageDTOList.push(row);
                }
            }else{
                var index2 = $scope.datalist.projectDefStageDTOList.indexOf(row);
                if (index2 > -1) {
                    $scope.datalist.projectDefStageDTOList[index2]=row;
                }
            }
            $scope.options={
                'actionType':change,		//ADD, MODIFY, DELETE
                'projectDefName':$scope.datalist.projectDefName || "",	//项目模板名称
                'projectDefDesc':$scope.datalist.projectDefDesc || "",	//项目模板描述
                'projectDefDomain':$scope.datalist.projectDefDomain || row.projectDefDomainnew,	//行业
                'projectDefStageDTOList':$scope.datalist.projectDefStageDTOList
            };
            var promise = projectService.changeProjectDef({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryProjectDefFun();
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
        $scope.addmodelFun = function (num) {
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            num=num?num:0;
            debugger;
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={
                    "seqNo":num+1,
                    "stageName":null
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeProjectDefFun('MODIFY',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };


        };
        //编辑
        $scope.editFun = function (row,ind) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addmodel.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    $scope.modalform.seqNo=ind;
                    changeProjectDefFun('MODIFY',$scope.modalform,$modalInstance,row.seqNo);
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
                changeProjectDefFun('DELETE',row);
            });
        };


    }]
}
