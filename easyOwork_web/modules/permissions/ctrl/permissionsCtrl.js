/**
 * Created by Nose on 2016/9/7.
 */
function permissionsCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
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

    }]
}

function permissionsaddCtrl(){
    return['$scope','$modal',function($scope,$modal){
        $scope.treegirdoptions={
            displayLevel:2,
            columns:[
                {headerText: "功能名称", dataField: "name", width:'200'},
                {headerText: "功能描述", dataField: "gndescribe",width:'auto'}
            ],
            data:[
                {id:'1',name:'平台管理',children:[
                    {id:'1-1',name:'公司信息管理',gndescribe:'公司基本信息, 公司组织架构'},
                    {id:'1-2',name:'平台参数设置',gndescribe:'平台相关系统参数设置'},
                    {id:'1-3',name:'角色管理',gndescribe:'添加修改删除公司角色'},
                    {id:'1-4',name:'权限分配',gndescribe:'为角色分配或取消功能'},
                    {id:'1-5',name:'权限分配',gndescribe:'根据企业时间情况启用或禁止某些应用'}
                ]},
                {id:'2',name:'流程管理',children:[
                    {id:'2-1',name:'流程设置',gndescribe:'添加修改删除企业流程设置'}
                ]}
            ],
            itemClick:function(id,date){
                console.log("itemclick");
            },
            showCheckbox:true
        }

        $scope.getCk=function (){
            var r = $scope.treegird.TreeGrid("getCheckedRows");
            alert(r);
        }
    }]
}
