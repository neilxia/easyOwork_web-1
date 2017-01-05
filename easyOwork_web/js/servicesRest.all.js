/**
 * Created by Nose on 2016/8/30.
 */
var app =angular.module('qiyi.servicesRest',[]);
app.factory('publicService', publicService()); //公共接口
app.factory('companyService', companyService()); //公司
app.factory('employeesService', employeesService()); //员工
app.factory('noticeService', noticeService());//公告
app.factory('roleService', roleService());//权限
app.factory('processService', processService());//流程
app.factory('salaryService', salaryService());//薪酬
app.factory('assetService', assetService());//资产
app.factory('attendanceService', attendanceService());//考勤
app.factory('CustomerService', CustomerService());//客户/销售
app.factory('projectService', projectService());//项目
/*========公共接口=====================================================================*/
function publicService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST /work/rest/sendVerificationCode	G0001-发送验证码
            sendVerificationCode:function(form){

                //发送验证码
                $scope.options={
                    "type":"",		//必填项,EMAIL 或者 MOBILE, 标记发送到邮件或手机
                    "email":"",	//type为EMAIL时必填, 邮件地址
                    "mobileNo":"",	//type为MOBILE时必填, 电话号码
                    "mobileCountryCode":""	//type为MOBILE时必填, 电话号码国家代码
                };
                function sendVerificationCodeFun(state){
                    if(!state){return;}
                    var promise = publicService.sendVerificationCode({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST work/rest/verifyCode	G0002-校验验证码
            verifyCode:function(form){
                //校验验证码
                $scope.options={
                    "type":"",		//必填项,EMAIL 或者 MOBILE, 标记发送到邮件或手机
                    "email":"",	//type为EMAIL时必填, 邮件地址
                    "mobileNo":"",	//type为MOBILE时必填, 电话号码
                    "mobileCountryCode":"",	//type为MOBILE时必填, 电话号码国家代码
                    "verificationCode":""		//客户通过邮件或手机接收到的校验码
                };
                function verifyCodeFun(state){
                    if(!state){return;}
                    var promise = publicService.verifyCode({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST work/rest/login	G0004-登录
            login:function(form){
                //登录
                $scope.options={
                    "type":"",		//必填项,ID, EMAIL 或者 MOBILE, 标记通过员工号, 邮件或手机登录
                    "id":"",	//type为ID时必填, 员工号
                    "personalEmail":"",	//type为EMAIL时必填, 邮件地址
                    "personalPhoneCountryCode":"",	//type为MOBILE时必填, 电话号码
                    "personalPhone":"",		//type为MOBILE时必填, 电话号码
                    "password":""	//登录密码
                };
                function loginFun(state){
                    if(!state){return;}
                    var promise = publicService.login({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST work/rest/logout	G0005-登出
            logout:function(form){
                //登出
                function logoutFun(state){
                    if(!state){return;}
                    var promise = publicService.logout();
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST work/rest/resetPassword	G0006-重置密码
            resetPassword:function(form){
                //重置密码
                $scope.options={
                    "type":"",		//必填项,EMAIL 或者 MOBILE, 标记通过员工号, 邮件或手机登录
                    "personalEmail":"",	//type为EMAIL时必填, 邮件地址
                    "personalPhoneCountryCode":"",	//type为MOBILE时必填, 电话号码
                    "personalPhone":"",		//type为MOBILE时必填, 电话号码
                    "verificationCode":"",	//验证码
                    "newPassword":""		//重置的新密码

                };
                function resetPasswordFun(state){
                    if(!state){return;}
                    var promise = publicService.resetPassword({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST /work/rest/changePassword	G0007-修改密码
            changePassword:function(form){
                //修改密码
                $scope.options={
                    "password":"",		//必填项 , 旧密码
                    "newPassword":""	//必填项 , 新密码
                };
                function changePasswordFun(state){
                    if(!state){return;}
                    var promise = publicService.changePassword({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST work/rest/changeParameter	G0008-修改系统参数
            changeParameter:function(form){
                //修改系统参数
                $scope.options={
                    "settings":[		//数组, 一次可修改多个参数
                        {
                            "name":"",	//必填项 , 参数名
                            "value":""		//必填项 , 参数值
                        },
                        {
                            "name":"",
                            "value":""
                        }
                    ]
                };
                function changeParameterFun(state){
                    if(!state){return;}
                    var promise = publicService.changeParameter({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST /work/rest/inquiryParameter	G0009-查询系统参数
            inquiryParameter:function(form){
                //查询系统参数
                $scope.options={
                    "name":""	//如为空则查询所有系统参数, 如有值则查询该参数
                };
                function inquiryParameterFun(state){
                    if(!state){return;}
                    var promise = publicService.inquiryParameter({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST /work/rest/inquiryNotes  G0010-查询消息
            inquiryNotes:function(form){
                //查询消息
                $scope.options={
                    "id":"",	//员工号
                    "personalEmail":"",	//邮件地址
                    "personalPhoneCountryCode":"",//电话号码国家代码
                    "personalPhone":""		//电话号码
                };
                function inquiryNotesFun(state){
                    if(!state){return;}
                    var promise = publicService.inquiryNotes({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST  /work/rest/markNoteRead	G0011-修改消息为已读状态
            markNoteRead:function(form){
                //修改消息为已读状态
                $scope.options={
                    "noteUuid":""	//note id号
                };
                function markNoteReadFun(state){
                    if(!state){return;}
                    var promise = publicService.markNoteRead({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========公司======================================================================*/
function companyService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST  G0003-企业注册
            registerCompany:function(form){
                //企业注册
                $scope.options={
                    "name":"",		//必填项,企业名称
                    "registerEmail":"",	//邮件和电话号码至少有一项必填
                    "registerMobileCountryCode":"",	//邮件和电话号码至少有一项必填、
                    "registerMobileNo":"",		//邮件和电话号码至少有一项必填
                    "verificationCode":"",	// 必填项, 验证码
                    "registerPassword":""	//客户端输入的密码
                };
                function registerCompanyFun(state){
                    if(!state){return;}
                    var promise = companyService.registerCompany({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST B0001-修改公司基本信息
            changeCompanyInfo:function(form){
                //修改公司基本信息
                $scope.options={
                    "entId":"",		//必填项, 8位企业代码
                    "name":"",		//公司名称
                    "shortName":"",	//公司简称
                    "entPhone":"",	//公司电话
                    "entEmail":"",	//公司电子邮箱
                    "contactName":"",		//联系人姓名
                    "contactPhone":"",	//联系人电话
                    "logoUrl":"",		//logo图片地址
                    "licenceUrl":''		//营业执照图片地址
                };
                function changeCompanyInfoFun(state){
                    if(!state){return;}
                    var promise = companyService.changeCompanyInfo({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST	B0002-查询公司基本信息
            inquiryCompanyInfo:function(form){
                //查询公司基本信息
                $scope.options={
                    "entId":""	//必填项, 8位企业代码
                };
                function inquiryCompanyInfoFun(state){
                    if(!state){return;}
                    var promise = companyService.inquiryCompanyInfo({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };


            },
            //POST  B0003-查询公司组织架构
            inquiryCompanyOrg:function(form){

                //查询公司组织架构
                $scope.options={
                    "entId":""	//必填项, 8位企业代码
                };
                function inquiryCompanyOrgFun(state){
                    if(!state){return;}
                    var promise = companyService.inquiryCompanyOrg({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };

            },
            //POST 	B0004-修改公司部门
            changeCompanyOrg:function(form){

                //修改公司部门
                $scope.options={
                    "entId":"",		//必填项, 8位企业代码
                    "actionType": "",		//必填项, ADD, MODIFY, DELETE
                    "name":"",		//部门名称,必填项
                    "newName":"",		//新部门名称, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                    "desc":"",			//新部门描述
                    "parentOrgName":"",		//上级部门名称, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                    "managerUserId":"",		//部门经理员工号, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                    "managerEmail":"",		//部门经理邮件, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                    "managerMobileCountryCode":"",	//部门经理电话国家代码, 如有修改传入修改后的值, 如没有修改则不要包含在request里
                    "managerMobileNo":""	//部门经理电话号码, 如有修改传入修改后的值, 如没有修改则不要包含在request里

                };
                function changeCompanyOrgFun(state){
                    if(!state){return;}
                    var promise = companyService.changeCompanyOrg({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };

            }
        }
    }];
}
/*========员工=====================================================================*/
function employeesService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.4.1	B0005-添加/修改/删除员工
            changeEmployee:function(form){

                //添加/修改/删除员工
                $scope.options={
                    "actionType":"",			// ADD, MODIFY, DELETE
                    "id":"",		//员工编号
                    "newId":"",	//新员工编号
                    "photoUrl":"",		//头像地址
                    "name":"",		//姓名
                    "sex":"",			//性别
                    "birthDate":"",		//出生日期  yyyyMMdd
                    "university":"",		//毕业院校
                    "personalEmail":"",		//电子邮箱
                    "newPersonalEmail":"",	//新电子邮箱
                    "entEmail":"",		//公司邮箱
                    "personalPhone":"",		//手机号码
                    "newPersonalPhone":"",	//新手机号码
                    "newPersonalPhoneCountryCode":"",	//新手机号码国家代码
                    "entPhoneCountryCode":"",		//公司号码国家代码
                    "entPhone":"",		//公司电话号码
                    "orgList":[{"name":""}],		//所属部门名称
                    "joiningDate":"",		//入职日期
                    "roleList":[{"name":""}],	//角色数组, 可多个角色
                    "contractUrl":"",		//合同文件地址
                    "salaryTypeList":[{"name":"","amount":"","period":"","payTax":"","startDate":""}]	//薪资, period可为日, 周, 月, 季度, 半年,年
            };
                function changeEmployeeFun(state){
                    if(!state){return;}
                    var promise = employeesService.changeEmployee({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };

            },
            //POST 5.4.2	B0006-查询本人/其他员工信息
            inquiryEmployee:function(form){

                //查询本人/其他员工信息
                $scope.options={
                    "type":"",		//必填项,ID(员工号), EMAIL(电子邮件),MOBILE(手机号码),NAME(名字),ORG(部门名称),ROLE(职位),ALL(查询所有员工)
                    "id":"",	//type为ID时必填, 员工号
                    "personalEmail":"",	//type为EMAIL时必填, 邮件地址
                    "personalPhoneCountryCode":"",	//type为MOBILE时必填, 电话号码
                    "personalPhone":"",		//type为MOBILE时必填, 电话号码
                    "name":"",	//type为NAME时必填, 姓名
                    "orgName":"",	//type为ORG时必填, 部门名称
                    "roleName":""	//type为职位时必填, 职位名称
                };
                function inquiryEmployeeFun(state){
                    if(!state){return;}
                    var promise = employeesService.inquiryEmployee({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };

            }
        }
    }];
}
/*========公告=====================================================================*/
function noticeService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.2.1	B0023-添加/修改公告
            changeAnnouncement:function(form){
                //添加/修改公告
                $scope.options={
                    "actionType":"",	//ADD, MODIFY, DELETE
                    "name":"",		//公告名称
                    "newName":"",		//新公告名称
                    "content":"",		//公告内容
                    "newContent":"",		//新公告内容
                    "sentName":"",		//发送者名称
                    "newSentName":""		//新发送者名称
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
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.2.2	B0024-查询公告
            inquiryAnnouncements:function(form){
                //查询公告
                function inquiryAnnouncementsFun(state){
                    if(!state){return;}
                    var promise = noticeService.inquiryAnnouncements();
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========权限=====================================================================*/
function roleService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.5.1	B0007-查询公司角色列表
            inquiryRole:function(form){
                //查询公司角色列表
                $scope.options={
                    "entId":""		//8位企业号
                };
                function inquiryRoleFun(state){
                    if(!state){return;}
                    var promise = roleService.inquiryRole({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.5.2	B0008-添加/修改/删除角色
            changeRole:function(form){
                //添加/修改/删除角色
                $scope.options={
                    "actionType":"",		//ADD, MODIFY, DELETE
                    "roleName":"",
                    "newRoleName":"",		//新角色名称, 必填当actionType为MODIFY时
                    "roleDesc":"",		//角色描述
                    "functionList":[{
                        "applicationCode":"",		//可访问的应用代码
                        "applicationName":"",		//可访问的应用名称
                        "functionCode":"",		//可访问的功能代码
                        "functionName":""		//可访问的功能名称
                    }]
                };
                function changeRoleFun(state){
                    if(!state){return;}
                    var promise = roleService.changeRole({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.5.3	B0009-查询功能列表
            inquiryFunction:function(form){
                //查询功能列表
                $scope.options={
                    "roleName":""	//不为空查询该职位的所有功能列表,  如为空查询所有功能
                };
                function inquiryFunctionFun(state){
                    if(!state){return;}
                    var promise = roleService.inquiryFunction({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.5.4	B0010-删除权限列表
            deleteRoles:function(form){
                //删除权限列表
                $scope.options={
                    "roles":[{
                        "roleName":""
                    }]
                };
                function deleteRolesFun(state){
                    if(!state){return;}
                    var promise = roleService.deleteRoles({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========流程=====================================================================*/
function processService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.6.1	B0011-添加/修改/删除流程模板类型
            changeProcessModelType:function(form){
                //添加/修改/删除流程模板类型
                $scope.options={
                    "actionType":"",		//ADD, MODIFY, DELETE
                    "name":"",		//角色名称
                    "newName":""		//新角色名称, 必填当actionType为MODIFY时
                };
                function changeProcessModelTypeFun(state){
                    if(!state){return;}
                    var promise = processService.changeProcessModelType({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.2	B0012-查询流程模板类型
            inquiryProcessModelType:function(form){
                //查询流程模板类型
                $scope.options={
                    "entId":""		//8位企业号
                };
                function inquiryProcessModelTypeFun(state){
                    if(!state){return;}
                    var promise = processService.inquiryProcessModelType({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.3	B0013-添加/修改/删除流程模板
            changeProcessModel:function(form){
                //添加/修改/删除流程模板
                $scope.options={
                    "actionType":"",		//ADD, MODIFY, DELETE
                    "name":"",		//数据模板名称
                    "description":"",		//数据模板描述
                    "userDTO":{
                    "id":"",		//模板使用员工号
                    "personalEmail":"",	// 模板使用邮件地址
                    "personalPhoneCountryCode":"",	//模板使用电话号码国家代码
                    "personalPhone":""		// 模板使用电话号码
                    },
                    "roleDTO":{
                        "name":"",		//模板使用角色名称
                    },
                    "processDefStepDTOList":[{
                            "isEnd":"",	//是否结束节点
                            "stepName":"",	//节点名称
                            "stepNo":"",	//节点顺序号
                            "end":"",		//是否最后一个节点 TRUE or FALSE
                            "userDTO":{
                            "id":"",		//节点处理员工号
                            "personalEmail":"",	// 节点处理邮件地址
                            "personalPhoneCountryCode":"",	//节点处理电话号码国家代码
                            "personalPhone":"",		// 节点处理电话号码
                        },
                        "roleDTO":{
                            "name":"",		//节点处理角色名称
                        }
                    }],
                    "processDefFieldDTOList":[{
                        "name":"",	//数据域名
                        "seqNo":"",	//数据域序列号
                        "type":"",		//数据域类型 TEXT, TEXTAREA, DATE, CHECKBOX, RADIO, ATTACHMENT, NUMBER, SELECTION
                        "length":"",	//数据域长度
                        "isMandatory":"",	//数据域是否必填
                        "valueList":"",	//数据域可选值, 用于type为SELECTION, CHECKBOX, RADIO
                        "defaultValue":""	//数据域默认值
                    }]

                };
                function changeProcessModelFun(state){
                    if(!state){return;}
                    var promise = processService.changeProcessModel({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.4	B0014-查询流程模板
            inquiryProcessModel:function(form){
                //查询流程模板
                $scope.options={
                    "name":""		//流程模板名称, 如查询所有模板就不用传入该值
                };
                function inquiryProcessModelFun(state){
                    if(!state){return;}
                    var promise = processService.inquiryProcessModel({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.5	B0015-发起流程
            createProcess:function(form){
                //发起流程
                $scope.options={
                    "name":"",	//流程模板名称
                    "title":"",		//流程实例Title
                    "launchUserDTO":{	//发起员工
                    "id":"",	//员工号
                    "personalEmail":"",	//邮件地址
                    "personalPhoneCountryCode":"",	//电话号码
                    "personalPhone":""		//电话号码
                    },
                    processFieldDTOList:[{	//流程数据
                        "name":"",	//数据名称
                        "value":"",	//数据值
                        "seqNo":""	//数据序列号
                    }]
                };
                function createProcessFun(state){
                    if(!state){return;}
                    var promise = processService.createProcess({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.6	B0016-批准/拒绝/撤回流程
            changeProcess:function(form){
                //批准/拒绝/撤回流程
                $scope.options={
                    "actionType":""	,	//APPROVE, REJECT, WITHDRAW
                    "name":""	,	//流程模板名称
                    "title":"",		//流程实例Title
                    "message":""	//批准拒绝时添加的信息
                };
                function changeProcessFun(state){
                    if(!state){return;}
                    var promise = processService.changeProcess({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.7	B0017-查询发起的流程
            inquiryCreatedProcesses:function(form){
                //查询发起的流程
                $scope.options={
                    "launchUserDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码
                        "personalPhone":"",		//电话号码
                    }
                };
                function inquiryCreatedProcessesFun(state){
                    if(!state){return;}
                    var promise = processService.inquiryCreatedProcesses({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.6.8	B0018-查询待审批的流程
            inquiryHandlingProcesses:function(form){
                //查询待审批的流程
                $scope.options={
                    "launchUserDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码
                        "personalPhone":""		//电话号码
                    }
                };
                function inquiryHandlingProcessesFun(state){
                    if(!state){return;}
                    var promise = processService.inquiryHandlingProcesses({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========薪酬=====================================================================*/
function salaryService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.7.1	B0019-查询薪酬类型列表
            inquirySalaryType:function(form){
                //查询薪酬类型列表
                function inquirySalaryTypeFun(state){
                    if(!state){return;}
                    var promise = salaryService.inquirySalaryType();
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.2	B0020-添加/修改/删除薪酬类型
            changeSalaryType:function(form){
                //添加/修改/删除薪酬类型
                $scope.options={
                    "actionType":"",	//ADD, MODIFY, DELETE
                    "name":"",		//薪酬项名称
                    "newName":"",		//新薪酬名称 - MODIFY
                    "period":"",		//薪酬项周期
                    "amount":"",		//薪酬项金额
                    "payTax":"",		//是否计税
                    "startDate":""		//生效日期
                };
                function changeSalaryTypeFun(state){
                    if(!state){return;}
                    var promise = salaryService.changeSalaryType({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.3	B0021-查询社保项列表
            inquirySocialSecurity:function(form){
                //查询社保项列表
                function inquirySocialSecurityFun(state){
                    if(!state){return;}
                    var promise = salaryService.inquirySocialSecurity();
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.4	B0022-添加/修改/删除社保类型
            changeSocialSecurity:function(form){
                //添加/修改/删除社保类型
                $scope.options={
                    "actionType":"",	//ADD, MODIFY, DELETE
                    "name":"",		//社保项名称
                    "rate":"",			//社保缴费比例
                    "amount":"",		//社保缴费基数
                };
                function changeSocialSecurityFun(state){
                    if(!state){return;}
                    var promise = salaryService.changeSocialSecurity({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.5	B0025-生成工资单
            createPayroll:function(form){
                //生成工资单
                $scope.options={
                    "userDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码国家代码
                        "personalPhone":"",		//电话号码
                    },
                    "year":"",		//工资单年份
                    "month":""	//工资单月份
                };
                function createPayrollFun(state){
                    if(!state){return;}
                    var promise = salaryService.createPayroll({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.6	B0026-修改工资单
            changePayroll:function(form){
                //修改工资单
                $scope.options={
                    "userDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码
                        "personalPhone":"",		//电话号码
                    },
                    "totalIncome":"",	//总收入
                    "totalDeduction":"",	//总扣缴
                    "year":"",		//年
                    "month":"",	//月
                    "status":"",	//CREATED(已生成未确认), CONFIRMED(已确认)
                    "payrollItems":[{
                        "itemNo":"",	//薪酬项序列号
                        "itemName":"",	//薪酬项名称
                        "itemAmount":"",	//薪酬项金额
                        "income":""	// true or false(收入项或者是扣缴项)
                    }]
                };
                function changePayrollFun(state){
                    if(!state){return;}
                    var promise = salaryService.changePayroll({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.7	B0027-查询工资单
            inquiryPayroll:function(form){
                //查询工资单
                $scope.options={
                    "userDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码
                        "personalPhone":"",		//电话号码
                    },
                    "year":"",		//工资年份
                    "month":""	//工资月份
                };
                function inquiryPayrollFun(state){
                    if(!state){return;}
                    var promise = salaryService.inquiryPayroll({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.7.8	B0028-查询薪酬总额
            inquiryPayrollSummary:function(form){
                //查询薪酬总额
                $scope.options={
                    "year":"",		//年
                    "month":""	//如查询某月总额, 则需传入该值, 否则不需传入
                };
                function inquiryPayrollSummaryFun(state){
                    if(!state){return;}
                    var promise = salaryService.inquiryPayrollSummary({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========资产=====================================================================*/
function assetService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.8.1	B0029-创建/更新/删除资产
            createAsset:function(form){
                //创建/更新/删除资产
                $scope.options={
                    "actionType":"",	//ADD, MODIFY, DELETE
                    "assetModel":"",	//资产型号
                    "assetName":"",	//资产名称
                    "assetType":"",	//资产类型
                    "id":"",		//资产编号
                    "newId":""	//资产编号 for MODIFYs
                };
                function createAssetFun(state){
                    if(!state){return;}
                    var promise = assetService.createAsset({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.8.2	B0030-分配/归还资产
            assignWithdrawAsset:function(form){
                //分配/归还资产
                $scope.options={
                    "actionType":"",	//ASSIGN, WITHDRAW
                    "userDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码
                        "personalPhone":""		//电话号码
                    },
                    "id":""	//资产号
                };
                function assignWithdrawAssetFun(state){
                    if(!state){return;}
                    var promise = assetService.assignWithdrawAsset({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.8.3	B0031-查询公司/员工资产
            inquiryAssets:function(form){
                //查询公司/员工资产
                $scope.options={
                    "userDTO":{	//如果查询员工资产传入userDTO, 查询公司资产则不用传入
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码
                        "personalPhone":""		//电话号码
                    }
                };
                function inquiryAssetsFun(state){
                    if(!state){return;}
                    var promise = assetService.inquiryAssets({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========考勤=====================================================================*/
function attendanceService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.9.1	B0032-设置工作时间
            setWorkingTime:function(form){
                //设置工作时间
                $scope.options={
                    "workingFromHour":"",	//工作起始时间-小时
                    "workingFromMin":"",	//工作起始时间-分钟
                    "workingToHour":"",	//工作结束时间-小时
                    "workingToMin":""		//工作结束时间-分钟
                };
                function setWorkingTimeFun(state){
                    if(!state){return;}
                    var promise = attendanceService.setWorkingTime({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.9.2	B0033-签到/签退
            signInOut:function(form){
                //签到/签退
                $scope.options={
                    "actionType":"",	//IN(签到),OUT(签退)
                    "attendanceYear":"",	//签到或签退年份
                    "attendanceMonth":"",	//签到或签退月份
                    "attendanceDay":"",		//签到或签退天
                    "userDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码国家代码
                        "personalPhone":""		//电话号码
                    }

                };
                function signInOutFun(state){
                    if(!state){return;}
                    var promise = attendanceService.signInOut({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            },
            //POST 5.9.3	B0034-查询考勤记录
            inquiryAttendance:function(form){
                //查询考勤记录
                $scope.options={
                    "attendanceYear":"",	//签到或签退年份
                    "attendanceMonth":"",	//签到或签退月份
                    "attendanceDay":"",		//签到或签退天
                    "userDTO":{
                        "id":"",	//员工号
                        "personalEmail":"",	//邮件地址
                        "personalPhoneCountryCode":"",	//电话号码国家代码
                        "personalPhone":"",		//电话号码
                    }
                };
                function inquiryAttendanceFun(state){
                    if(!state){return;}
                    var promise = attendanceService.inquiryAttendance({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var sts=data.body.status;
                        if(sts.statusCode==0){
                            MsgService.tomsg();
                            $modalInstance.close();
                        }else{
                            MsgService.tomsg(data.body.status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        MsgService.tomsg(data.body.status.errorDesc);
                    });
                };
            }
        }
    }];
}
/*========客户/销售=====================================================================*/
function CustomerService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.10.1	B0035-添加/修改/删除 (潜在)客户
            changeCustomer:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeCustomer',form)
            },
            //POST 5.10.2	B0036-查询(潜在)客户
            inquiryCustomer:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeCustomer',form)
            },
            //POST 5.10.3	B0037-添加/修改/删除 销售活动
            changeSale:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeSale',form)
            },
            //POST 5.10.4	B0038-查询销售活动
            inquirySale:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquirySale',form)
            },
            //POST 5.10.5	B0039-添加/修改/删除 营销
            changeCampaign:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeCampaign',form)
            },
            //POST 5.10.6	B0040-查询营销
            inquiryCampaign:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCampaign',form)
            },
            //POST 5.10.7	B0041-添加/修改/删除 日程活动
            changeActivity:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeActivity',form)
            },
            //POST 5.10.8	B0042-查询日程活动
            inquiryActivity:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryActivity',form)
            },
            //POST 5.10.9	B0043-添加/修改/删除 合同
            changeActivity:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeActivity',form)
            },
            //POST 5.10.10	B0044-查询合同
            inquiryContract:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryContract',form)
            },
            //POST 5.10.11	B0045-添加/修改/删除 文档
            changeDocument:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeDocument',form)
            },
            //POST 5.10.12	B0046-查询文档
            inquiryDocument:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryDocument',form)
            },
            //POST 5.10.13	0047-添加/修改/删除 产品
            changeProduct:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProduct',form)
            },
            //POST 5.10.14	B0048-查询产品
            inquiryProduct:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProduct',form)
            },
            //POST 5.10.15	0049-添加/修改/删除 竞争对手
            changeRival:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRival',form)
            },
            //POST 5.10.16	B0050-查询竞争对手
            inquiryRival:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRival',form)
            }
        }
    }];
}
/*========项目=====================================================================*/
function projectService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.11.1	B0051-添加/修改/删除项目模板
            changeProjectDef:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProjectDef',form)
            },
            //POST 5.11.2	B0052-查询项目模板
            inquiryProjectDef:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProjectDef',form)
            },
            //POST 5.11.3	B0053-添加/修改/删除项目
            changeProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProject',form)
            },
            //POST 5.11.4	B0054-添加/删除项目参与人员
            changeUserProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeUserProject',form)
            },
            //POST 5.11.5	B0055-添加/删除项目阶段参与人员
            changeUserProjectStage:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeUserProjectStage',form)
            },
            //POST 5.11.6	B0056-更新项目阶段信息
            updateProjectStage:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/updateProjectStage',form)
            },
            //POST 5.11.7	B0057-添加项目评论
            addCommentToProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/addCommentToProject',form)
            },
            //POST 5.11.8	B0058-添加/修改/删除项目任务
            changeProjectTask:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProjectTask',form)
            },
            //POST 5.11.9	B0059-添加项目任务评论
            addCommentToProjectTask:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/addCommentToProjectTask',form)
            },
            //POST 5.11.10	B0060-添加/修改/删除项目文档
            changeProjectDocument:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProjectDocument',form)
            },
            //POST 5.11.11	B0061-查询项目
            inquiryProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProject',form)
            }
        }
    }];
}
/*========招聘=======================================================*/
function RecruitFlowService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.13.1	B0062-添加/修改/删除招聘流程
            changeRecruitFlow:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRecruitFlow',form)
            },
            //POST 5.13.2	B0063-查询招聘流程
            inquiryRecruitFlow:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitFlow',form)
            },
            //POST 5.13.3	B0064-添加/修改/删除招聘渠道
            changeRecruitChannel:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRecruitChannel',form)
            },
            //POST 5.13.4	B0065-查询招聘渠道
            inquiryRecruitChannel:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitChannel',form)
            },
            //POST 5.13.5	B0066-添加/修改/删除招聘计划
            changeRecruitPlan:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRecruitPlan',form)
            },
            //POST 5.13.6	B0067-添加/修改/删除招聘计划职位
            changeRecruitPosition:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRecruitPosition',form)
            },
            //POST 5.13.7	B0068-发布招聘计划职位
            sendRecruitPosition:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/sendRecruitPosition',form)
            },
            //POST 5.13.8	B0069-查询招聘计划
            inquiryRecruitPlan:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitPlan',form)
            },
            //POST 5.13.9	B0070-添加/修改/删除简历
            changeRecruitResume:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRecruitResume',form)
            },
            //POST 5.13.10	B0071-查询简历
            inquiryRecruitResume:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitResume',form)
            },
            //POST 5.13.11	B0072-启动招聘流程
            startRecruitFlow:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/startRecruitFlow',form)
            },
            //POST 5.13.12	B0073-通过/拒绝/待定招聘职位
            tellResumeForPosition:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/tellResumeForPosition',form)
            }
        }
    }];
}
