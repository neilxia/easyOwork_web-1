/**
 * Created by Nose on 2016/9/7.
 */
function mySetCtrl(){
    return['$scope','$filter', 'employeesService' ,'LocalStorage','MsgService','publicService',function($scope,$filter,employeesService,LocalStorage,MsgService,publicService){
        $scope.initFun=function(){
            //inquiryEmployeeFun();
            var userinfo=LocalStorage.getObject('userinfo');
            $scope.userinfo={
                "actionType":"MODIFY",			// ADD, MODIFY, DELETE
                "userUuid":userinfo.userUuid || null,
                "id":userinfo.id || "",		//员工编号
                "photoUrl":userinfo.photoUrl || "",		//头像地址
                "name":userinfo.name,		//姓名
                "sex":userinfo.sex,			//性别
                "birthDate":userinfo.birthDate || "",		//出生日期  yyyyMMdd
                "university":userinfo.university || "",		//毕业院校
                "personalEmail":userinfo.personalEmail || "",		//电子邮箱
                "personalPhone":userinfo.personalPhone || "",		//手机号码
                "orgList":userinfo.orgList,		//所属部门名称
                "joiningDate":userinfo.joiningDate || "",		//入职日期
                "roleList":userinfo.roleList	//角色数组, 可多个角色
                //"contractUrl":row.contractUrl || "",		//合同文件地址
                //"contract":row.contract,
                //"salaryTypeList":userinfo.salaryTypeList
            }
        }

        $scope.birthDateshow=true;
        $scope.birthDatetoggle=function(){
            $scope.birthDateshow = !$scope.birthDateshow;
        }

        $scope.joiningDateshow=true;
        $scope.joiningDatetoggle=function(){
            $scope.joiningDateshow = !$scope.joiningDateshow;
        }

        $scope.userpw=true;
        $scope.userpwtoggle=function(){
            $scope.userpw = !$scope.userpw;
        }

        //修改公司基本信息
        $scope.changeEmployeeFun=function (data,name){
            if(!data){return;}
            switch(name){
                case 'birthDate':{
                    var birthDate=$filter('date')(data,'yyyy-MM-dd');
                    $scope.userinfo.birthDate=birthDate;
                    break;
                }
                case 'joiningDate':{
                    var joiningDate=$filter('date')(data,'yyyy-MM-dd');
                    $scope.userinfo.joiningDate=joiningDate;
                    break;
                }
                case 'university':{
                    if(data.length>40){
                        MsgService.tomsg('最大40个字符！');
                        return false;
                    }else {
                        $scope.userinfo.university=data;
                        break;
                    }
                }
                case 'personalEmail':{
                    var regexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
                    debugger;
                    if(!regexp.test(data)){
                        MsgService.tomsg('请输入正确的邮箱！');
                        return false;
                    }else {
                        $scope.userinfo.personalEmail=data;
                        break;
                    }
                }
                case 'personalPhone':{
                    var regexp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    if(!regexp.test(data)){
                        MsgService.tomsg('请输入正确的手机号码！');
                        return false;
                    }else {
                        $scope.userinfo.personalPhone=data;
                        break;
                    }
                }
                case 'photoUrl':{$scope.userinfo.photoUrl=data; break;}
            }
            var promise = employeesService.changeEmployee({body:$scope.userinfo});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    LocalStorage.setObject('userinfo',$scope.userinfo);
                    $scope.birthDateshow=true;
                    $scope.joiningDateshow=true;
                    //MsgService.tomsg();
                }else{
                    MsgService.tomsg(sts.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                var sts=data.body.status;
                MsgService.tomsg(sts.errorDesc);
            });
            return promise;
        };

        //修改密码
        $scope.userchangepw={
            "password":"",		//必填项 , 旧密码
            "newPassword":""	//必填项 , 新密码
        };
        $scope.changePasswordFun=function (state){
            if(!state){return;}
            var promise = publicService.changePassword({body:$scope.userchangepw});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.userpw=true;
                }else{
                    MsgService.tomsg(sts.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                var sts=data.body.status;
                MsgService.tomsg(sts.errorDesc);
            });
        };



        //查询本人/其他员工信息列表
        function inquiryEmployeeFun(){
            var options={};
            if(userinfo.id){
                options.type="ID";
                options.id=userinfo.id;
            }else {
                switch (userinfo.type){
                    case "EMAIL":{
                        options.type="EMAIL";
                        options.personalEmail=userinfo.personalEmail;
                        break;
                    }
                    case "MOBILE":{
                        options.type="EMAIL";
                        options.personalPhone=userinfo.personalPhone;
                        break;
                    }
                }
            }
            var promise = employeesService.inquiryEmployee({body:options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.userList;
                    $scope.searchcount=$scope.datalist.length;
                    //$scope.thispages.total=$scope.datalist.length;//分页总数
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

function ModalInstanceCtrl ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
