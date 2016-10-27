/**
 * Created by Nose on 2016/9/7.
 */
function structuremsgCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){



        //$scope.active=true;
        //增加部门
        $scope.addDPment=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addDPment.html',
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
        //编辑部门
        //alert(22);
        $scope.editDPment=function(){

            var modalInstance = $modal.open({
                templateUrl: 'editDPment.html',
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
        //删除部门
        $scope.deleDPment=function(){
            var modalInstance = $modal.open({
                templateUrl: 'deleDPment.html',
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
        $scope.xxxx=function(id,data){
            alert(id);
        };
        $scope.treegirdoptions={
            columns:[
                {headerText: "部门名称", dataField: "name", headerAlign: "left",dataAlign: "left",width:'auto'}
            ],
            data:[
                {id:'1',name:'行政部'},
                {
                    id:'2',name:'产品中心',children:[
                        {id:'2-1',name:'产品一部'},
                        {id:'2-2',name:'用户体验部'},
                        {id:'2-3',name:'用户研究部'}
                    ]
                },
                {id:'3',name:'人事部'},
                {id:'4',name:'市场部'}
            ],
            itemClick:function(id,date){
                console.log("itemclick");
            },
            //showCheckbox:false,
            showbtnbox:true,
            showbtnboxcom:[
                {title:'编辑',classbox:'btn btn-default btn-xs h30',text:'<i class="iconfont icon-bianji f14"></i>',btnClick:function(id,data){
                    //$scope.xxxx(id,data);
                    $scope.editDPment();
                }},

                {title:'删除',classbox:'btn btn-danger ml5 btn-xs h30',text:'<i class="iconfont icon-del f14"></i>',btnClick:function(id,data){
                    $scope.deleDPment();
                }}
            ]
        }


    }]
}
