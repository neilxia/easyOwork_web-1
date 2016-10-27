/**
 * Created by Nose on 2016/9/7.
 */
function listCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
        $scope.EPinfo={
            "entId":""	,	//企业号
            "name":"成都尔康互动有限公司",	//公司名称
            "shortName":"尔康互动",	//公司简称
            "entPhone":"028-65588885",	//公司电话
            "entEmail":"xxx@xx.com",	//公司电子邮箱
            "contactName":"xxx",		//联系人姓名
            "contactPhone":"13418009887",	//联系人电话
            "logoUrl":"./images/mo02.jpg",		//logo图片地址
            "licenceUrl":"./images/mo01.jpg"		//营业执照图片地址
        }

    }]
}
function cssetCtrl(){
    return['$scope',function($scope){

        $scope.Param={
            Vcode:'3'
        }
    }]
}
function searchCtrl(){
    return['$scope','$modal',function($scope,$modal){
        $scope.staffbase=function(){
            var modalInstance = $modal.open({
                templateUrl: 'staffbase.html',
                //size:'md',
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
    }]
}