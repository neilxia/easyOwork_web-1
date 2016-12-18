function salarymsglistCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        $scope.init = function(){
            inquiryCreatedReports();
        };
        function inquiryCreatedReports(){
            $scope.options={
            };
            var promise = reportService.inquiryCreatedReports({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.reportlist=data.body.data.reports;
                    $scope.thispages.total=$scope.reportlist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //工资单明细
        $scope.s_issueDetail = function () {
            var modalInstance = $modal.open({
                templateUrl: 's_issueDetail.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform={
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //changeconfigFun('ADD',$scope.addconfigform,$modalInstance);
                    //$modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

    }]
}
function salarymsgissueCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){

    }]
}

function salarymsgviewCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){
        //工资单明细
        $scope.s_issueDetail = function () {
            var modalInstance = $modal.open({
                templateUrl: 's_issueDetail.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform={
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    //changeconfigFun('ADD',$scope.addconfigform,$modalInstance);
                    //$modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
    }]
}