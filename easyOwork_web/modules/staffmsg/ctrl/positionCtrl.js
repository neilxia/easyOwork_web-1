
function positionCtrl(){
    return['$scope', '$modal','$filter' ,'companyService','LocalStorage','Common','employeesService','MsgService','salaryService','FileUploader','OSSService','noseService',function($scope,$modal,$filter,companyService,LocalStorage,Common,employeesService,MsgService,salaryService,FileUploader,OSSService,noseService){
    	
    	var userinfo=LocalStorage.getObject('userinfo');
        $scope.initFun = function(){
            inquiryPositionFun(); //查询列表
        };
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
/*        $scope.statelist=[
            {name:'全部状态',val:''},
            {name:'已分配',val:'NORMAL'},
            {name:'未分配',val:'IMPORTANT'},
            {name:'已报损',val:'IMPORTANT'}
        ]*/
        //查询类型list
        function inquiryPositionFun(){
            var promise = companyService.getPositions({body:{}});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.positions=data.body.data.positions;
                    $scope.thispages.total = data.body.data.positions.length;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        
        function changePositionFun(change,row,$modalInstance,oldrow){
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "name":row.name || '',	//职位名称
                    "positionUuid":row.positionUuid || '',	//职位唯一ID
                    "id":row.id || ''	//职位编号
                }
            }else {
                $scope.options={
                    "actionType":change,		//ADD, MODIFY, DELETE
                    "positionUuid":row.positionUuid || ''		//职位唯一ID
                };
            }
            var promise = companyService.changePosition({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	inquiryPositionFun();
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
        $scope.addpositionFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addposition.html',
                //size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changePositionFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        
        $scope.editpositionFun = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addposition.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thename='编辑';
                $scope.modalform=row;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changePositionFun('MODIFY',$scope.modalform,$modalInstance,oldrow);
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
            	changePositionFun('DELETE',row);
            });
        };
    	
    }]
    
}

