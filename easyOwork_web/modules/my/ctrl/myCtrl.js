/**
 * Created by Nose on 2016/9/7.
 */
function mySetCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
        //$scope.active=true;
        //弹出框
        $scope.open3 = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/my/tmp/mysetMobileModal.html',
                size: size,
                controller: ModalInstanceCtrl
            });
            modalInstance.opened.then(function(e) {// 模态窗口打开之后执行的函数

            });
        };


        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];

        $scope.alertMe = function() {
            setTimeout(function() {
                $window.alert('You\'ve selected the alert tab!');
            });
        };

    }]
}

function ModalInstanceCtrl ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
