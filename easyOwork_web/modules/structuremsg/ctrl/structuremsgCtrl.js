/**
 * Created by Nose on 2016/9/7.
 */
function structuremsgCtrl(){
    return['$scope','$modal','LocalStorage','companyService','Common',function($scope,$modal,LocalStorage,companyService,Common){
        var userinfo;
        $scope.treedataisready=true;
        $scope.initFun=function(){
            userinfo=LocalStorage.getObject('userinfo');
            getCompanyOrg();
        }
        function getNewarr(arr){
            var pmData=[];
            angular.forEach(arr,function(val,ind){
                //var idname=parentId=='#'?ind.toString():(parentId+'-'+ind);
                if(val.childOrgs.length>0){
                    //pmData.push({id:ind,name:val.name});
                    var children=getNewarr(val.childOrgs);
                    pmData.push({id:ind,name:val.name,desc:val.desc,parentOrgName:[{text:val.parentOrgName}],children:children});
                }else{
                    pmData.push({id:ind,name:val.name,desc:val.desc,parentOrgName:[{text:val.parentOrgName}]});
                }
            });
            return pmData;
        }
        function getCompanyOrg(){
            $scope.options={
                "entId":userinfo.entId		//8位企业号
            };
            var promise = companyService.inquiryCompanyOrg({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var datas=data.body;
                if(datas.status.statusCode==0){
                    $scope.treegirdoptions.data=getNewarr(data.body.data.orgs);
                    $scope.treedataisready=!$scope.treedataisready;
                    //getNewarr(datas.data.orgs,'#');

                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        $scope.treegirdoptions={
            columns:[
                {headerText: "部门名称", dataField: "name", width:'20'},
                {headerText: "部门描述", dataField: "desc",width:'auto'},
                {headerText: "部门经理", dataField: "managerUserName",width:'100'}
            ],
            data:[],
            itemClick:function(id,date){
                console.log("itemclick");
            },
            displayLevel:2,
            //showCheckbox:false,
            showbtnbox:true,
            showbtnboxcom:[
                {title:'编辑',classbox:'btn btn-default btn-xs h30',text:'<i class="iconfont icon-bianji f14"></i>',btnClick:function(id,data){
                    //$scope.xxxx(id,data);
                    $scope.editDPment(data);
                }},

                {title:'删除',classbox:'btn btn-danger ml5 btn-xs h30',text:'<i class="iconfont icon-del f14"></i>',btnClick:function(id,data){
                    $scope.deleDPment(data);
                }}
            ]
        }

        /*$scope.treegirdoptions={
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
        }*/


        //实现添加/修改/删除部门
        function changeDPmentFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            debugger;
            //修改公司部门
            var parentOrgName=typeof (row.parentOrgName)=="object"?row.parentOrgName[0].text:'';
            $scope.options={
                "entId":userinfo.entId,		//必填项, 8位企业代码
                "actionType":change,		//必填项, ADD, MODIFY, DELETE
                "name":oldrow.name,		//部门名称,必填项
                "newName":row.name || '',		//新部门名称, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                "desc":row.desc || '',			//新部门描述
                "parentOrgName":parentOrgName ,//上级部门名称
                "managerUserId":row.managerUser.id || '',		//部门经理员工号,

/*                 如有修改传入修改后的值, 如没有修改则不要包含在request里
                "managerUserId":row.managerUserId || '',		//部门经理员工号, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                "managerEmail":row.managerEmail || '',		//部门经理邮件, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                "managerMobileCountryCode":row.managerMobileCountryCode || '',	//部门经理电话国家代码, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                "managerMobileNo":row.managerMobileNo || ''	//部门经理电话号码, 如有修改传入修改后的值, 如没有修改则不要包含在request里*/

            };
            debugger;
            var promise = companyService.changeCompanyOrg({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    getCompanyOrg();
                    $modalInstance.close();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
            return promise;
        }


        //增加部门
        $scope.addDPment=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addDPment.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thisname="新增";
                //修改公司部门
                $scope.theform={
                    "name":"",		//部门名称,必填项
                    "desc":"",			//新部门描述
                    "parentOrgName":"",		//上级部门名称, 如有修改传入修改后的值,
                    "managerUser":$scope.managerUser
                };

                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeDPmentFun('ADD',$scope.theform,$modalInstance);
                    //$modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        //编辑部门
        $scope.editDPment=function(row){
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addDPment.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thisname="编辑";
                //修改公司部门
                $scope.theform=row;
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    $scope.theform.managerUser=$scope.managerUser;
                    changeDPmentFun('MODIFY',$scope.theform,$modalInstance,oldrow);
                    //$modalInstance.close();
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
        //删除
        $scope.deleDPment=function(row){
            Common.openConfirmWindow().then(function() {
                changeDPmentFun('DELETE',row);
            });
        };



    }]
}
