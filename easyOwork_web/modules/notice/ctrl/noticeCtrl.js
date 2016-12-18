function noticelistCtrl(){
    return['$scope','$modal','$state','$http','noticeService','MsgService','LocalStorage','Common',function($scope,$modal,$state,$http,noticeService,MsgService,LocalStorage,Common){

        $scope.init = function(){
            inquiryAnnouncementsFun();
        };
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        //查询公告
        function inquiryAnnouncementsFun(){
            var promise = noticeService.inquiryAnnouncements({body:{}});
            //var promise = $http.get('./modules/notice/json/inquiryHandlingProcesses.json');
            promise.success(function(data, status, headers, config){
                //远程开启下面的
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryAnnouncementsData=data.body.data.reports;
                    $scope.thispages.total=$scope.inquiryAnnouncementsData.length;	//分页
                }else{
                    MsgService.tomsg(sts.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                var sts=data.body.status;
                MsgService.tomsg(sts.errorDesc);
            });
        };


        //发布公告
        $scope.addnoticeFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addnotice.html',
                controller: modalCtrl
            });
            $scope.notices={}
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='添加';
                $scope.ok = function(state) {
                    if(!state){return;}
                    changeconfigFun('ADD',$scope.notices,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑公告
        $scope.editnoticeFun = function (row) {
            var modalInstance = $modal.open({
                templateUrl: 'addnotice.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                var oldrow=angular.copy(row);
                $scope.user=row;
                $scope.ok = function (state) {
                    if(!state){return;}
                    changeconfigFun('MODIFY',$scope.user,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };

            };
        };
        $scope.delete=function(row){

        }
        function changeconfigFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            debugger;
            //添加/修改公告
            $scope.options={
                "actionType":change,	//ADD, MODIFY, DELETE
                "name":oldrow.name,		//公告名称
                "newName":row.newName,		//新公告名称
                "content":oldrow.content,		//公告内容
                "newContent":row.newContent,		//新公告内容
                "sentName":oldrow.sentName,		//发送者名称
                "newSentName":row.newSentName		//新发送者名称
            };
            function changeAnnouncementFun(state){
                if(!state){return;}
                var promise = noticeService.changeAnnouncement({body:$scope.options});
                promise.success(function(data, status, headers, config){
                    var sts=data.body.status;
                    if(sts.statusCode==0){
                        MsgService.tomsg();
                        $modalInstance.close();
                    }else{
                        MsgService.errormsg(data);
                    }
                });
                promise.error(function(data, status, headers, config){
                    MsgService.errormsg(data);
                });
            };
        }
/*

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
*/


    }]
}

function noticeviewCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){

    }]
}