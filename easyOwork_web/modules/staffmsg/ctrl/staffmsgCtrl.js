/**
 * Created by Nose on 2016/9/7.
 */
function staffmsgCtrl(){
    return['$scope', '$modal','$filter' ,'companyService','LocalStorage','Common','employeesService','MsgService',function($scope,$modal,$filter,companyService,LocalStorage,Common,employeesService,MsgService){
        $scope.singleModel = 1;
        $scope.initFun=function(){
            inquiryEmployeeFun();
        }


        //查询本人/其他员工信息列表
        function inquiryEmployeeFun(){
/*            var datas=[
                {
                    "id":"001",		//员工号
                    "photoUrl":"url",		//头像地址
                    "name":"0001",		//姓名
                    "sex":"男",			//性别
                    "birthDate":"2016-10-01",		//出生日期  yyyyMMdd
                    "university":"武警",		//毕业院校
                    "personalEmail":"nose01@163.com",		//私人邮箱
                    "entEmail":"nose01@163.com",		//公司邮箱
                    "personalPhoneCountryCode":"86",		//手机号码国家代码
                    "personalPhone":"13438301661",		//手机号码
                    "orgList":[{"name":"11"}],		//所属部门名称
                    "joiningDate":"2016-10-02",		//入职日期
                    "roleList":[{"name":"11-01"}]	//角色数组, 可多个角色
                },
                {
                    "id":"002",		//员工号
                    "photoUrl":"url",		//头像地址
                    "name":"0002",		//姓名
                    "sex":"男",			//性别
                    "birthDate":"2016-10-01",		//出生日期  yyyyMMdd
                    "university":"武警",		//毕业院校
                    "personalEmail":"nose01@163.com",		//私人邮箱
                    "entEmail":"nose01@163.com",		//公司邮箱
                    "personalPhoneCountryCode":"86",		//手机号码国家代码
                    "personalPhone":"13438301661",		//手机号码
                    "orgList":[{"name":"11"}],		//所属部门名称
                    "joiningDate":"2016-10-02",		//入职日期
                    "roleList":[{"name":"11-01"}]	//角色数组, 可多个角色
                }
            ];
            $scope.datalist=datas;*/

            $scope.options={
                "type":"ALL"
            };
            var promise = employeesService.inquiryEmployee({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.userList;
                    //分页
                    $scope.thispages={
                        total:$scope.datalist.length,
                        pageNum:1,
                        pageSize:10
                    };
                    for(d in datas){
                        datas[d].checked = false;
                    }
                    $scope.datalist=datas;
                    $modalInstance.close();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };


        $scope.staffselected='22';
        $scope.xxxx=function(){
            $scope.selected;
            debugger;
        }
        //实现添加/修改/删除员工
        function changeEmployeeFun(change,row,$modalInstance){
            var personalEmail = row.personalEmail;
            var personalPhone = row.personalPhone;
            var id = row.id;
            debugger;
            if(personalEmail==''&&personalPhone==''&&id==''){
                MsgService.tomsg('邮箱|电话|员工编号选一必填');
                return;
            }
            var birthDate=$filter('date')(row.birthDate,'yyyy-MM-dd');
            var joiningDate=$filter('date')(row.joiningDate,'yyyy-MM-dd');
            $scope.options={
                "actionType":change,			// ADD, MODIFY, DELETE
                "id":row.id,		//员工编号
                "photoUrl":row.photoUrl,		//头像地址
                "name":row.name,		//姓名
                "sex":row.sex,			//性别
                "birthDate":row.birthDate,		//出生日期  yyyyMMdd
                "university":row.university,		//毕业院校
                "personalEmail":row.personalEmail,		//电子邮箱
                "personalPhone":row.personalPhone,		//手机号码
                "orgList":[{"name":row.orgList[0].text}],		//所属部门名称
                "joiningDate":row.joiningDate,		//入职日期
                "roleList":[{"name":row.roleList[0].text}],	//角色数组, 可多个角色
                "contractUrl":row.contractUrl,		//合同文件地址
                "salaryTypeList":row.salaryTypeList
            };

            var promise = employeesService.changeEmployee({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var status=data.body.status;
                if(status.statusCode==0){
                    MsgService.tomsg();
                    $modalInstance.close();

                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        }
        //删除
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeEmployeeFun('DELETE',row);
            });
        };
        //增加员工
        $scope.addstaff=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.depoptions='bm';
                $scope.gwoptions='gw';
                $scope.user={};
                $scope.ok = function(state) {
                    if(!state){return;}
                    //$scope.user.orgList=[{"name":row.orgList[0].text}];
                    //$scope.user.roleList=[{"name":row.roleList[0].text}];
                    changeEmployeeFun('ADD',$scope.user,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
/*        $scope.test11=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'test11data.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl($scope, $modalInstance){
                $scope.test11data=row;
                $scope.ok = function (state) {
                    if(!state){return;}
                    //changeEmployeeFun('MODIFY',$scope.user);
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }*/
        //修改员工
        $scope.editstaff = function (row) {
            var modalInstance = $modal.open({
                templateUrl: 'editstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.depoptions='bm';
                $scope.gwoptions='gw';
                var oldrow=angular.copy(row);
                $scope.user=row;
                /*
                $scope.user={
                    "id":row.id,		//员工编号
                    "photoUrl":row.photoUrl,		//头像地址
                    "name":row.name,		//姓名
                    "sex":row.sex,			//性别
                    "birthDate":row.birthDate,		//出生日期  yyyyMMdd
                    "university":row.university,		//毕业院校
                    "personalEmail":row.personalEmail,		//电子邮箱
                    "personalPhone":row.personalPhone,		//手机号码
                    "orgList":row.orgList,		//所属部门名称
                    "joiningDate":row.joiningDate,		//入职日期
                    "roleList":row.roleList,	//角色数组, 可多个角色
                    "contractUrl":row.contractUrl,		//合同文件地址
                    "salaryTypeList":row.salaryTypeList
                };*/
                $scope.bbbb=function(){
                    $scope.user.orgList;
                }
                $scope.ok = function (state) {
                    if(!state){return;}
                    //changeEmployeeFun('MODIFY',$scope.user);
                    $modalInstance.close($scope.user);
                };

                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //添加薪酬类
        $scope.addPayclass = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'addPayclass.html',
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
            };
        };


        //addconfigitem
        $scope.addconfigitem = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };





    }]
}

function setCtrl(){
    return['$scope', '$modal' ,'salaryService','Common',function($scope,$modal,salaryService,Common){
        $scope.initFun=function(){
            getconflistFun();//配置项列表
            getsblistFun();//社保项列表
        }
        var selectedItems=[];
        //配置项列表
        function getconflistFun(){
            var promise = salaryService.inquirySalaryType();
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    MsgService.tomsg();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };
        //社保项列表
        function getsblistFun(){
            var promise = salaryService.inquirySocialSecurity();
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    MsgService.tomsg();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };
        //新增配置项
        $scope.addconfigitem = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {

                $scope.thisform={
                    "actionType":"ADD",	//ADD, MODIFY, DELETE
                    "name":"",		//薪酬项名称
                    "newName":"",		//新薪酬名称 - MODIFY
                    "period":"",		//薪酬项周期
                    "amount":"",		//薪酬项金额
                    "payTax":"",		//是否计税
                    "startDate":""		//生效日期
                };
                //提交增加
                function submitFun(state){
                    if(!state){return;} //状态判断
                    var promise = salaryService.changeSalaryType({body:$scope.thisform});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                        }else{
                            MsgService.errormsg(data);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.errormsg(data);
                    });
                };

                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑配置项
        $scope.editconfigitem = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'editconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thisform={
                    "actionType":"MODIFY",	//ADD, MODIFY, DELETE
                    "name":"",		//薪酬项名称
                    "newName":"",		//新薪酬名称 - MODIFY
                    "period":"",		//薪酬项周期
                    "amount":"",		//薪酬项金额
                    "payTax":"",		//是否计税
                    "startDate":""		//生效日期
                };
                //提交增加
                function submitFun(state){
                    if(!state){return;} //状态判断
                    var promise = salaryService.changeSalaryType({body:$scope.thisform});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                        }else{
                            MsgService.errormsg(data);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.errormsg(data);
                    });
                };

                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //删除
        $scope.delete=function(item){
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl,
                resolve:{
                    items:function(){
                        return item;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance ,items) {
                $scope.ok = function () {
                    if(true){
                        if(items[1]){ // 单条删除
                            selectedItems.push(id);
                        }else{ // 批量删除
                            var datas = $scope.datas;
                            selectedItems = [];
                            angular.forEach(datas, function(item) {
                                if (item.checked == true) {
                                    selectedItems.push(item.id);
                                }
                            });
                        }
                        var options={
                            "actionType":"DELETE",	//ADD, MODIFY, DELETE
                            "name":""
                        };
                        var promise = salaryService.items[0]({body:options});
                        promise.success(function(data, status, headers, config){
                            var sts=data.body.status;
                            if(sts.statusCode==0){
                                MsgService.tomsg();
                            }else{
                                MsgService.errormsg(data);
                            }
                        });
                        promise.error(function(data, status, headers, config){
                            MsgService.errormsg(data);
                        });
                    }
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        //新增社保配置项
        $scope.addconfigitem2 = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem2.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.thisform={
                    "actionType":"",	//ADD, MODIFY, DELETE
                    "name":"",		//社保项名称
                    "rate":"",			//社保缴费比例
                    "amount":""		//社保缴费基数
                };
                //提交增加
                function submitFun(state){
                    if(!state){return;} //状态判断
                    var promise = salaryService.changeSalaryType({body:$scope.thisform});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                        }else{
                            MsgService.errormsg(data);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.errormsg(data);
                    });
                };
                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑社保配置项
        $scope.editconfigitem2 = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'editconfigitem2.html',
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
            };
        };


    }]
}