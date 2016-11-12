/**
 * Created by Nose on 2016/9/7.
 */
function staffmsgCtrl(){
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        //增加员工
        $scope.addstaff=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.user={
                    "actionType":"",			// ADD, MODIFY, DELETE
                    "id":"",		//actionType为ADD或者DELETE时必填
                    "photoUrl":"",		//头像地址
                    "name":"",		//姓名
                    "sex":"",			//性别
                    "birthDate":"",		//出生日期  yyyyMMdd
                    "university":"",		//毕业院校
                    "personalEmail":"",		//私人邮箱
                    "entEmail":"",		//公司邮箱
                    "personalPhone":"",		//手机号码
                    "personalPhoneCountryCode":"",	//手机国家代码
                    "entPhoneCountryCode":"",		//公司号码国家代码
                    "entPhone":"",		//公司电话号码
                    "orgList":[{"name":""},{"name":""}],		//所属部门名称
                    "joiningDate":"",		//入职日期
                    "roleList":[{"name":""},{"name":""}],	//角色数组, 可多个角色
                    "contractUrl":"",		//合同文件地址
                    "salaryTypeList":[{"name":"","amount":"","period":"","payTax":"","startDate":""},{"name":"","amount":"","period":"","isPayTax":"","startDate":""}]	//薪资, period可为ONCE, DAY, WEEK, MONTH, HALFYEAR, FULLYEAR
            };
                //提交增加
                function submitFun(){
                    var typearr=noseService.judgeloginClass($scope.fdfirst.registername);
                    var options = {
                        type:typearr[0],
                        email:typearr[1][0],
                        mobileNo:typearr[1][1],
                        mobileCountryCode:'86'
                    };
                    var promise = publicService.sendVerificationCode({body:options});
                    promise.success(function(data, status, headers, config){
                        var status=data.body.status;
                        if(status.statusCode==0){
                            MsgService.successmsg();
                        }else{
                            MsgService.errormsg(data);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.errormsg(data);
                    });
                };

                $scope.ok = function (state) {
                    if(!state){return;}
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        //修改员工
        $scope.editstaff = function () {
            var modalInstance = $modal.open({
                templateUrl: 'editstaff.html',
                size:'md',
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
    return['$scope', '$modal' ,'$compile',function($scope,$modal,$compile){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;

        //新增配置项
        $scope.addconfigitem = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {

                $scope.thisform={
                    "actionType":"",	//ADD, MODIFY, DELETE
                    "name":"",		//薪酬项名称
                    "period":"",		//薪酬项周期
                    "amount":"",		//薪酬项金额
                    "payTax":""//是否计税
                };
                //提交增加
                function submitFun(){
                    var typearr=noseService.judgeloginClass($scope.fdfirst.registername);
                    var options = {
                        type:typearr[0],
                        email:typearr[1][0],
                        mobileNo:typearr[1][1],
                        mobileCountryCode:'86'
                    };
                    var promise = publicService.sendVerificationCode({body:options});
                    promise.success(function(data, status, headers, config){
                        var status=data.body.status;
                        if(status.statusCode==0){
                            MsgService.successmsg();
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
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };


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



        //新增社保配置项
        $scope.addconfigitem2 = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem2.html',
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