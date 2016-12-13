function clockingInlistCtrl(){
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
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        }

    }]
}

function clockingInviewCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){

    }]
}