/**
 * Created by Nose on 2016/9/7.
 */
function staffmsgCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        //增加员工
        $scope.addstaff=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        //修改员工
        $scope.editstaff = function () {
            var modalInstance = $modal.open({
                templateUrl: 'editstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.delete=function(){
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        //添加薪酬类
        $scope.addPayclass = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'addPayclass.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };


        //addconfigitem
        $scope.addconfigitem = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };





    }]
}

function setCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;

        //新增配置项
        $scope.addconfigitem = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑配置项
        $scope.editconfigitem = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'editconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };


        //删除
        $scope.delete=function(){
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };



        //新增社保配置项
        $scope.addconfigitem2 = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem2.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑社保配置项
        $scope.editconfigitem2 = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'editconfigitem2.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };


    }]
}