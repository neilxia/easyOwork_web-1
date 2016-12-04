/**
 * Created by Nose on 2016/9/7.
 */
function staffmsgCtrl(){
    return['$scope', '$modal','$filter' ,'companyService','LocalStorage','Common','employeesService','MsgService','salaryService','FileUploader','OSSService',function($scope,$modal,$filter,companyService,LocalStorage,Common,employeesService,MsgService,salaryService,FileUploader,OSSService){
        $scope.singleModel = 1;
        $scope.initFun=function(){
            inquiryEmployeeFun();
        }
        $scope.orgListFilter = function (item) {
            return item.orgList[0].name === $scope.sltorgList[0].text || null;
        };
        $scope.roleListFilter = function (item) {
            return item.roleList[0].name === $scope.sltroleList[0].text;
        };

        //查询本人/其他员工信息列表
        //分页
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        function inquiryEmployeeFun(){
            $scope.options={
                "type":"ALL"
            };
            var promise = employeesService.inquiryEmployee({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.userList;
                    for(d in datalist){
                        datalist[d].checked = false;
                    }
                    $scope.datalist=datalist;
                    $scope.thispages.total=$scope.datalist.length;//分页总数
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //实现添加/修改/删除员工
        function changeEmployeeFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var personalEmail = row.personalEmail;
            var personalPhone = row.personalPhone;
            var id = row.id;
            if(personalEmail==''&&personalPhone==''&&id==''){
                MsgService.tomsg('邮箱|电话|员工编号选一必填');
                return;
            }
            var orgList=row.orgList.length == 0 ?[]:[{"name":row.orgList[0].text || row.orgList[0].name}];
            var roleList=row.roleList.length == 0?[]:[{"name":row.roleList[0].text || row.roleList[0].name}];
            var salaryTypeList=getsalaryTypeList(row.salaryTypeList);
            salaryTypeList= salaryTypeList.length == 0?[]:salaryTypeList;

            var birthDate=$filter('date')(row.birthDate,'yyyy-MM-dd');
            var joiningDate=$filter('date')(row.joiningDate,'yyyy-MM-dd');
            $scope.options={
                "actionType":change,			// ADD, MODIFY, DELETE
                "userUuid":row.userUuid || null,
                "id":row.id || "",		//员工编号
                "photoUrl":row.photoUrl || "",		//头像地址
                "name":row.name,		//姓名
                "sex":row.sex,			//性别
                "birthDate":birthDate || "",		//出生日期  yyyyMMdd
                "university":row.university || "",		//毕业院校
                "personalEmail":row.personalEmail || "",		//电子邮箱
                "personalPhone":row.personalPhone || "",		//手机号码
                "orgList":orgList,		//所属部门名称
                "joiningDate":joiningDate || "",		//入职日期
                "roleList":roleList,	//角色数组, 可多个角色
                "contractUrl":row.contractUrl || "",		//合同文件地址
                "salaryTypeList":salaryTypeList
            };
            var promise = employeesService.changeEmployee({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    //MsgService.tomsg();
                    inquiryEmployeeFun();
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
        function getsalaryTypeList(datalist){
            var showndlist=[];
            angular.forEach(datalist, function(item) {
                if (item.shownd == true) {
                    showndlist.push({"name":item.name,"amount":item.amount,"period":item.period,"payTax":item.payTax=='是'?true:false,"startDate":item.startDate});
                }
            });
            return showndlist;
        }
        //删除
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeEmployeeFun('DELETE',row);
            });
        };
        //批量删除
        $scope.deleteAll=function(){
            Common.openConfirmWindow().then(function() {
                deleteAllEmployees();
            });
        };
        var selectedItems=[];
        function deleteAllEmployees(){
            var datalist = $scope.datalist;
            angular.forEach(datalist, function(item) {
                if (item.checked == true) {
                    selectedItems.push({"userUuid":item.userUuid});
                }
            });
            $scope.options={
                userList:selectedItems
            };
            var promise = employeesService.deleteEmployees({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryEmployeeFun();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        }
        //增加员工
        $scope.addstaff=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance,FileUploader) {
                var htUploader = $scope.htUploader = new FileUploader({
                    url: '', //不使用默认URL上传
                    queueLimit: 1,     //文件个数
                    removeAfterUpload: true,   //上传后删除文件
                    autoUpload:false
                });
                htUploader.onAfterAddingFile = function(fileItem){
                    debugger;
                    htUploader.cancelAll();
                     var file = $("#contract").get(0).files[0];
                     var filePath = LocalStorage.getObject('userinfo').entId+'/employee/contract/';
                     var key= filePath+file.name;
                     var promise = OSSService.uploadFile(filePath,file);
                     promise.success(function (data, status, headers, config) {
	                     var urlPromise = OSSService.getUrl({'body':{'key':key}});
	                     urlPromise.success(function (data, status, headers, config) {
	                     var sts=data.body.status;
	                     if(sts.statusCode==0){
	                    	 $scope.user.contractUrl = data.body.data.url;
	                     }
	                     });
                     })
                };

                 $scope.user={
                     "id":"",		//员工编号
                     "photoUrl":"",		//头像地址
                     "name":"",		//姓名
                     "sex":"男",			//性别
                     "birthDate":"",		//出生日期  yyyyMMdd
                     "university":"",		//毕业院校
                     "personalEmail":"",		//电子邮箱
                     "newPersonalEmail":"",		//电子邮箱
                     "personalPhone":"",		//手机号码
                     "newPersonalPhone":"",		//手机号码
                     "orgList":[],		//所属部门名称
                     "joiningDate":"",		//入职日期
                     "roleList":[],	//角色数组, 可多个角色
                     "contractUrl":"",		//合同文件地址
                     "salaryTypeList":[]
                 };

                $scope.ok = function(state) {
                    if(!state){return;}

                    changeEmployeeFun('ADD',$scope.user,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };


            }

        };


        //修改员工
        $scope.editstaff = function (row) {
            var modalInstance = $modal.open({
                templateUrl: 'addstaff.html',
                size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.depoptions='bm';
                $scope.gwoptions='gw';
                var oldrow=angular.copy(row);
                var htUploader = $scope.htUploader = new FileUploader({
                    url: '', //不使用默认URL上传
                    queueLimit: 1,     //文件个数
                    removeAfterUpload: true,   //上传后删除文件
                    autoUpload:false
                });
                htUploader.onAfterAddingFile = function(fileItem){
                    debugger;
                    htUploader.cancelAll();
                     var file = $("#contract").get(0).files[0];
                     var filePath = LocalStorage.getObject('userinfo').entId+'/employee/contract/';
                     var key= filePath+file.name;
                     var promise = OSSService.uploadFile(filePath,file);
                     promise.success(function (data, status, headers, config) {
	                     var urlPromise = OSSService.getUrl({'body':{'key':key}});
	                     urlPromise.success(function (data, status, headers, config) {
	                     var sts=data.body.status;
	                     if(sts.statusCode==0){
	                    	 $scope.user.contractUrl = data.body.data.url;
	                     }
	                     });
                     })
                };
                
                $scope.user=row;
/*                $scope.bbbb=function(){
                    $scope.user.orgList;
                }*/
                $scope.ok = function (state) {
                    if(!state){return;}
                    changeEmployeeFun('MODIFY',$scope.user,$modalInstance,oldrow);
                    //$modalInstance.close($scope.user);
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
                controller: modalCtrl,
                resolve:{
                    configlist: function () {
                        return $scope.user.salaryTypeList;
                    },
                    sblist: function () {
                        return $scope.datalist2;
                    }
                }

            });
            function modalCtrl ($scope, $modalInstance,configlist,sblist) {
                $scope.configlist=configlist;
                $scope.sblist=sblist;
                $scope.ok = function () {
                    $modalInstance.close($scope.configlist);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
            /*modalInstance.result.then(function(configlist){
                var newconfiglist=getsalaryTypeList(configlist);
                debugger;
                $scope.user.salaryTypeList=newconfiglist;
            })*/

        };


        getconflistFun();
        //配置项列表
        function getconflistFun(){
            var promise = salaryService.inquirySalaryType({body:null});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.salaryTypes;
                    angular.forEach(datalist,function(obj,i){
                        angular.forEach($scope.user.salaryTypeList,function(val,ind){
                            if(obj.name==val.name){
                                datalist[i].shownd = true;
                            }
                        });
                        obj.payTax=obj.payTax?'是':'否';
                    });
                    $scope.user.salaryTypeList=datalist;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //编辑配置项
        $scope.editconfigitem = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'editconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform=row;
/*                $scope.addconfigform={
                    "name":row.name,		//薪酬项名称
                    "newName":row.newName,		//新薪酬名称 - MODIFY
                    "period":row.period,		//薪酬项周期
                    "amount":row.amount,		//薪酬项金额
                    "payTax":row.payTax,		//是否计税
                    "startDate":row.startDate		//生效日期
                };*/
                //提交编辑
                $scope.ok=function(state){
                    if(!state){return;} //状态判断
                    //changeconfigFun('MODIFY',$scope.addconfigform,$modalInstance,oldrow);
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    angular.copy(oldrow, row);
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.deleteconfig=function(row){
            Common.openConfirmWindow().then(function() {
                row.shownd=false;
            });
        };


        //getsblistFun();
        //社保项列表
        function getsblistFun(){
            var promise = salaryService.inquirySocialSecurity({body:null});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.socialSecurityTypes;
                    for(d in datalist){
                        datalist[d].shownd = false;
                    }
                    $scope.datalist2=datalist;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };




    }]
}

function setCtrl(){
    return['$scope', '$modal','$filter' ,'salaryService','MsgService','Common',function($scope,$modal,$filter,salaryService,MsgService,Common){
        $scope.initFun=function(){
            getconflistFun();//配置项列表
            getsblistFun();//社保项列表
        }
        var selectedItems=[];
        //配置项列表
        function getconflistFun(){
            var promise = salaryService.inquirySalaryType({body:null});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.salaryTypes;
                    for(d in datalist){
                        datalist[d].payTax=datalist[d].payTax?'是':'否';
                        datalist[d].checked = false;
                    }
                    $scope.datalist=datalist;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };
        //社保项列表
        $scope.checkAll2=false;
        function getsblistFun(){
            var promise = salaryService.inquirySocialSecurity({body:null});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.socialSecurityTypes;
                    for(d in datalist){
                        //datalist[d].payTax=datalist[d].payTax?'是':'否';
                        datalist[d].checked = false;
                    }
                    $scope.datalist2=datalist;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //实现添加/修改/删除配置项
        function changeconfigFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            var startDate=$filter('date')(row.startDate,'yyyy-MM-dd');
            var payTax=row.payTax=='是'?true:false;
            $scope.options={
                "actionType":change,			// ADD, MODIFY, DELETE
                "name":oldrow.name,		//薪酬项名称
                "newName":row.name,		//新薪酬名称 - MODIFY
                "period":row.period,		//薪酬项周期
                "amount":row.amount,		//薪酬项金额
                "payTax":payTax,		//是否计税
                "startDate":startDate		//生效日期
            };
            var promise = salaryService.changeSalaryType({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    getconflistFun();
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
        //新增配置项
        $scope.addconfigitem = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform={
                    "name":"",		//薪酬项名称
                    "newName":"",		//新薪酬名称 - MODIFY
                    "period":"",		//薪酬项周期
                    "amount":"",		//薪酬项金额
                    "payTax":"",		//是否计税
                    "startDate":""		//生效日期
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeconfigFun('ADD',$scope.addconfigform,$modalInstance);
                    //$modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑配置项
        $scope.editconfigitem = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'editconfigitem.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform={
                    "name":row.name,		//薪酬项名称
                    "newName":row.newName,		//新薪酬名称 - MODIFY
                    "period":row.period,		//薪酬项周期
                    "amount":row.amount,		//薪酬项金额
                    "payTax":row.payTax,		//是否计税
                    "startDate":row.startDate		//生效日期
                };
                //提交编辑
                $scope.ok=function(state){
                    if(!state){return;} //状态判断
                    changeconfigFun('MODIFY',$scope.addconfigform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.delete=function(row){
            Common.openConfirmWindow().then(function() {
                changeconfigFun('DELETE',row);
            });
        };






        //实现添加/修改/删除社保
        function changeshebaoFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            $scope.options={
                "actionType":change,			// ADD, MODIFY, DELETE
                "name":oldrow.name,		//项名
                "newName":row.name,		//项名 - MODIFY
                "rate":row.rate,		//比例
                "amount":row.amount		//基数
            };
            var promise = salaryService.changeSocialSecurity({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    getsblistFun();
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
        //新增社保
        $scope.addconfigitem2 = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem2.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform={
                    "name":"",		//项名
                    "rate":"",		//比例
                    "amount":""		//基数
                };
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeshebaoFun('ADD',$scope.addconfigform,$modalInstance);
                    //$modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //编辑社保
        $scope.editconfigitem2 = function (row) {
            var oldrow=angular.copy(row);
            var modalInstance = $modal.open({
                templateUrl: 'addconfigitem2.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.addconfigform={
                    "name":row.name,		//项名称
                    "newName":row.newName,		//项名称 - MODIFY
                    "rate":row.rate,		//比例
                    "amount":row.amount		//基数
                };
                //提交编辑
                $scope.ok=function(state){
                    if(!state){return;} //状态判断
                    changeshebaoFun('MODIFY',$scope.addconfigform,$modalInstance,oldrow);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };
        //删除
        $scope.delete2=function(row){
            Common.openConfirmWindow().then(function() {
                changeshebaoFun('DELETE',row);
            });
        };



    }]
}
