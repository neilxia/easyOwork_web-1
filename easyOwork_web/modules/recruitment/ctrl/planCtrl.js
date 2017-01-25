//列表
function planlistCtrl(){
    return['$rootScope','$scope','$modal','attendanceService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,attendanceService,MsgService,LocalStorage,Common){
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
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
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


    }]
}
//列表
function channemsgllistCtrl(){
    return['$rootScope','$scope','$modal','attendanceService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,attendanceService,MsgService,LocalStorage,Common){
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
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
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


    }]
}
//列表
function processmsglistCtrl(){
    return['$rootScope','$scope','$modal','attendanceService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,attendanceService,MsgService,LocalStorage,Common){
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
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
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


    }]
}
//列表
function classlistreCtrl(){
    return['$rootScope','$scope','$modal','attendanceService','MsgService','LocalStorage','Common',function($rootScope,$scope,$modal,attendanceService,MsgService,LocalStorage,Common){
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
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
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


    }]
}