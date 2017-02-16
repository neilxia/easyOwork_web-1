/**
 * Created by Nose on 2016/8/30.
 */
var app =angular.module('qiyi.servicesRest',[]);
app.factory('publicService', publicService()); //公共接口
app.factory('companyService', companyService()); //公司
app.factory('employeesService', employeesService()); //员工
app.factory('noticeService', noticeService());//公告
app.factory('MemoService', MemoService());//备忘录
app.factory('roleService', roleService());//权限
app.factory('processService', processService());//流程
app.factory('salaryService', salaryService());//薪酬
app.factory('assetService', assetService());//资产
app.factory('attendanceService', attendanceService());//考勤
app.factory('CustomerService', CustomerService());//客户/销售
app.factory('projectService', projectService());//项目
app.factory('RecruitFlowService', RecruitFlowService());//招聘
app.factory('OSSService',OSSService());//阿里云OSS服务
app.factory('reportService',reportService());//工作报告
app.factory('taskService',taskService());//工作任务
app.factory('analysisService',analysisService());//决策分析
app.factory('orderService',orderService());//订单及使用期限
/*========公共接口=====================================================================*/
function publicService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST /work/rest/sendVerificationCode	G0001-发送验证码
            sendVerificationCode:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/sendVerificationCode',form)
            },
            //POST work/rest/verifyCode	G0002-校验验证码
            verifyCode:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/verifyCode',form)
            },
            //POST work/rest/login	G0004-登录
            login:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/login',form)
            },
            //POST work/rest/logout	G0005-登出
            logout:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/logout',form)
            },
            //POST work/rest/resetPassword	G0006-重置密码
            resetPassword:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/resetPassword',form)
            },
            //POST /work/rest/changePassword	G0007-修改密码
            changePassword:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changePassword',form)
            },
            //POST work/rest/changeParameter	G0008-修改系统参数
            changeParameter:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeParameter',form)
            },
            //POST /work/rest/inquiryParameter	G0009-查询系统参数
            inquiryParameter:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryParameter',form)
            },
            //POST /work/rest/inquiryNotes  G0010-查询消息
            inquiryNotes:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryNotes',form)
            },
            //POST  /work/rest/markNoteRead	G0011-修改消息为已读状态
            markNoteRead:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/markNoteRead',form)
            },
            //POST  /work/rest/deleteNote	删除消息
            deleteNote:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteNote',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/registerCompany',form)
            },
            //POST B0001-修改公司基本信息
            changeCompanyInfo:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeCompanyInfo',form)
            },
            //POST	B0002-查询公司基本信息
            inquiryCompanyInfo:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCompanyInfo',form)
            },
            //POST  B0003-查询公司组织架构
            inquiryCompanyOrg:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCompanyOrg',form)
            },
            //POST 	B0004-修改公司部门
            changeCompanyOrg:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeCompanyOrg',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/changeEmployee',form)
            },
            //POST 5.4.2	B0006-批量删除员工
            deleteEmployees:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteEmployees',form)
            },
            //POST 5.4.3	B0006-查询本人/其他员工信息
            inquiryEmployee:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryEmployee',form)
            },
            initMain:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/initMain',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/changeAnnouncement',form)
            },
            //POST 5.2.2	B0024-查询公告
            inquiryAnnouncements:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAnnouncements',form)
                //return $http.get('./modules/notice/json/list.json',form)
            }
        }
    }];
}
/*========备忘录=====================================================================*/
function MemoService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //5.3.1	B0074-添加/删除备忘录
            changeMemo:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeMemo',form)
            },
            //5.3.2	B0075-查询备忘录
            inquiryMemo:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryMemo',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRole',form)
            },
            //POST 5.5.2	B0008-添加/修改/删除角色
            changeRole:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRole',form)
            },
            //POST 5.5.3	B0009-1-查询功能列表(职位)
            inquiryFunction:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryFunction',form)
            },
            //POST 	B0009-2-查询功能列表(员工)
            inquiryUserFunction:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryUserFunction',form)
            },
            //POST 5.5.4	B0010-删除权限列表
            deleteRoles:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteRoles',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProcessModelType',form)
            },
            //POST 5.6.2	B0012-查询流程模板类型
            inquiryProcessModelType:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProcessModelType',form)
            },
            //POST 5.6.3	B0013-添加/修改/删除流程模板
            changeProcessModel:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProcessModel',form)
                //return $http.post('./modules/processmsg/json/changeProcessModel.json',form)
                //return $http.post('http://192.168.1.102:801/modules/processmsg/json/changeProcessModel.json',form)
            },
            //POST 5.6.4	B0014-查询流程模板
            inquiryProcessModel:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProcessModel',form);
                //return $http.get('./modules/processmsg/json/changeProcessModel.json',form)
            },
            //POST 5.6.5	B0015-发起流程
            createProcess:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/createProcess',form)
            },
            //POST 5.6.6	B0016-批准/拒绝/撤回流程
            changeProcess:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProcess',form)
            },
            //POST 5.6.7	B0017-查询发起的流程
            inquiryCreatedProcesses:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCreatedProcesses',form)
                //return $http.get('./modules/processmsg/json/inquiryCreatedProcesses.json',form)
            },
            //POST 5.6.8	B0018-查询待审批的流程
            inquiryHandlingProcesses:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryHandlingProcesses',form)
                //return $http.get('./modules/processmsg/json/inquiryHandlingProcesses.json',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/inquirySalaryType',form)
            },
            //POST 5.7.2	B0020-添加/修改/删除薪酬类型
            changeSalaryType:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeSalaryType',form)
            },
            //POST 5.7.3	B0021-查询社保项列表
            inquirySocialSecurity:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquirySocialSecurity',form)
            },
            //POST 5.7.4	B0022-添加/修改/删除社保类型
            changeSocialSecurity:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeSocialSecurity',form)
            },
            //POST 5.7.5	B0025-生成工资单
            createPayroll:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/createPayroll',form)
            },
            //POST 5.7.6	B0026-修改工资单
            changePayroll:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changePayroll',form)
            },
            //POST 5.7.7	B0027-查询工资单
            inquiryPayroll:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryPayroll',form)
            },
            //POST 5.7.8	B0028-查询薪酬总额
            inquiryPayrollSummary:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryPayrollSummary',form)
            }
        }
    }];
}
/*========资产=====================================================================*/
function assetService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            //POST 5.8.1	B0029-创建/更新/删除资产
            changeAsset:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeAsset',form)
            },
            //POST 5.8.2	B0030-分配/归还资产
            assignWithdrawAsset:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/assignWithdrawAsset',form)
            },
            //POST 5.8.3	B0031-查询公司/员工资产
            inquiryAssets:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAssets',form)
            },
            //POST 5.8.3	创建/更新/删除资产类型
            changeAssetType:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeAssetType',form)
            },
            //POST 5.8.3	查询资产类型
            inquiryAssetTypes:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAssetTypes',form)
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
                return $http.post(AppConfig.BASE_URL+'work/rest/setWorkingTime',form)
            },
            //POST 5.9.2	B0033-签到/签退
            signInOut:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/signInOut',form)
            },
            //POST 5.9.3	B0034-查询考勤记录
            inquiryAttendance:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAttendance',form)
            },
            inquiryAttendanceSummary:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAttendanceSummary',form)
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
            //POST 5.10.1	添加/修改/删除客户联系人
            changeCustomerContact:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeCustomerContact',form)
            },
            //POST 5.10.2	B0036-查询(潜在)客户
            inquiryCustomer:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCustomer',form)
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
            changeContract:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeContract',form)
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
            },
            //POST 5.10.16	添加/修改/删除 销售目标
            changeSaleTarget:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeSaleTarget',form)
            },
            //POST 5.10.16	查询销售目标
            inquirySaleTarget:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquirySaleTarget',form)
            },
            inquiryCustomerHistory:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCustomerHistory',form)
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
            //POST 5.11.1	批量删除项目模板
            deleteProjectDefs:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteProjectDefs',form)
            },
            //POST 5.11.2	B0052-查询项目模板
            inquiryProjectDef:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProjectDef',form)
            },
            //POST 5.11.2	B0052-查询项目模板类型
            inquiryProjectDefType:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProjectDefType',form)
            },
            //POST 5.11.3	B0053-添加/修改/删除项目
            changeProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProject',form)
            },
            //POST 5.11.3	批量删除项目
            deleteProjects:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteProjects',form)
            },
            //POST 5.11.4	B0054-添加/删除项目参与人员
            changeUserProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeUserProject',form)
            },
            //POST 5.11.4	批量删除项目参与人员
            deleteProjectUsers:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteProjectUsers',form)
            },
            /*//POST 5.11.5	B0055-添加/删除项目阶段参与人员
            changeUserProjectStage:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeUserProjectStage',form)
            },
            //POST 5.11.5	批量删除项目阶段参与人员
            deleteProjectStageUsers:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteProjectStageUsers',form)
            },*/
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
            //POST 5.11.8	批量删除项目任务
            deleteProjectTasks:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteProjectTasks',form)
            },
            //POST 5.11.9	B0059-添加项目任务评论
            addCommentToProjectTask:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/addCommentToProjectTask',form)
            },
            //POST 5.11.10	B0060-添加/修改/删除项目文档
            changeProjectDocument:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeProjectDocument',form)
            },
            //POST 5.11.10	批量删除项目文档
            deleteProjectDocuments:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteProjectDocuments',form)
            },
            //POST 5.11.11	B0061-查询项目
            inquiryProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryProject',form)
            },
            //POST 5.11.11	查询我参与的项目
            inquiryMyProject:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryMyProject',form)
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
            //POST 5.13.7	查询发布的招聘计划职位
            inquiryRecruitPositionChannel:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitPositionChannel',form)
            },
            //POST 5.13.8	B0069-查询招聘计划
            inquiryRecruitPlan:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitPlan',form)
            },
            //POST 5.13.9	B0070-添加/修改/删除简历
            changeRecruitResume:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeRecruitResume',form)
            },
            //POST 5.13.9	批量删除简历
            deleteRecruitResumes:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteRecruitResumes',form)
            },
            //POST 5.13.10	B0071-查询简历
            inquiryRecruitResume:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitResume',form)
            },
            //POST 5.13.10	B0071-1查询已录用的简历
            inquiryRecruitHiredResume:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitHiredResume',form)
            },
            //POST 5.13.11	B0072-启动招聘流程
            startRecruitFlow:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/startRecruitFlow',form)
            },
            //POST 5.13.12	B0073-通过/拒绝/待定招聘职位
            tellResumeForPosition:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/tellResumeForPosition',form)
            },
            //POST 5.13.12	查询招聘流程中简历
            inquiryRecruitResumeByFlowNode:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryRecruitResumeByFlowNode',form)
            }

        }
    }];
}


/*========OSS服务=======================================================*/
/*
OSSService.inquiryOSSInfo
//获取上传文件所需的accessKeyId, signature, policy

OSSService.uploadFile(filePath, uploadFile);	
//filePath: 为上传的文件路径, 如果没有会自动创建
//uploadFile: 为文件元素,可以用$("#uploadFile").get(0).files[0]得到该参数值 - uploadFile为html中为file设置的id值
*/
function OSSService(){
    return ['$http','AppConfig','LocalStorage',function($http,AppConfig,LocalStorage){
        return {
            uploadFile:function(filePath,file){
            	var ossBucketUrl = AppConfig.OSS_BUCKET_URL;
            	var ossInfo = this.getOssInfo();
            	return $http.post(ossBucketUrl,null,{
               	 "headers":{'Content-Type':undefined},
               	 "transformRequest":function(data) {
                   		 var fd = new FormData();
                       	 fd.append('key', filePath+"${filename}");
                       	 fd.append('Content-Type', file.type);      
                       	 fd.append('OSSAccessKeyId', ossInfo.ossaccessKeyId);
                       	 fd.append('policy', ossInfo.policy)
                            fd.append('signature', ossInfo.signature);
                       	 fd.append("file",file);
                       	 return fd;
               		  }
                })
            },
            inquiryOSSInfo:function(form){
            	return $http.post(AppConfig.BASE_URL+'work/rest/inquiryOSSInfo',form)
            				.success(function(data, status, headers, config){
            					var sts=data.body.status;
            	                var data=data.body.data;
            	                if(sts.statusCode==0){
            	                	LocalStorage.setObject('ossInfo',data);
            	                }
            				})
            				.error(function(data, status, headers, config){
            					
            				})
            },
            getOssInfo:function(){
            	return LocalStorage.getObject('ossInfo');
            },
            getUrl:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getUrl',form)
            }
        }
    }];
}

/*===============================工作报告========================================*/
function reportService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            changeReport:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeReport',form)
            },
            deleteReports:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteReports',form)
            },
            inquiryCreatedReports:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCreatedReports',form)
            },
            inquiryAssignedReports:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAssignedReports',form)
            }
        }
    }];
}
/*===============================工作任务========================================*/
function taskService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
            changeTask:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/changeTask',form)
            },
            deleteTasks:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/deleteTasks',form)
            },
            inquiryCreatedTasks:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryCreatedTasks',form)
            },
            inquiryAssignedTasks:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/inquiryAssignedTasks',form)
            }
        }
    }];
}
/*===============================决策分析========================================*/
function analysisService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
        	getOrgEmployeeChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getOrgEmployeeChart',form)
            },
            getSalaryEmployeeChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getSalaryEmployeeChart',form)
            },
            getRoleEmployeeChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getRoleEmployeeChart',form)
            },
            getProjectStatusChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getProjectStatusChart',form)
            },
            getProjectHealthChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getProjectHealthChart',form)
            },
            getCustomerCustomerChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getCustomerCustomerChart',form)
            },
            getCustomerSaleChart:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getCustomerSaleChart',form)
            },
            getAnalysisSummary:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getAnalysisSummary',form)
            }
        }
    }];
}
/*===============================订单及使用期限========================================*/
function orderService(){
    return ['$http','AppConfig',function($http,AppConfig){
        return {
        	getOrders:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getOrders',form)
            },
            getDueDate:function(form){
                return $http.post(AppConfig.BASE_URL+'work/rest/getDueDate',form)
            }
        }
    }];
}