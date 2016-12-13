function noticelistCtrl(){
    return['$scope','$modal','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$state,roleService,MsgService,reportService,LocalStorage,Common){

        var userinfo=LocalStorage.getObject('userinfo');
    	$scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
    	$scope.init = function(){
    		inquiryCreatedReports();
    	};
        //工资单明细
        $scope.addnoticeFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addnotice.html',
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
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.errormsg(data);
            });
    	}


    }]
}

function noticeviewCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){

    }]
}