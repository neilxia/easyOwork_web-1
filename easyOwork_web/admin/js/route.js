function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/login");
    //$urlRouterProvider.when("/demo/ind","/demo/ind/main");

    $ocLazyLoadProvider.config({
        // 设置为真,如果你想知道,什么时候是动态加载的
        debug: false
    });

    $stateProvider
        //首页
        .state('index', {
            //abstract: true,
            url: "/index",
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@index': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@index': {
                    templateUrl: 'modules/common/menu.html'
                }
            },
            data: { pageTitle: '首页' ,specialClass: 'bg-ind'  },//,widthClass:'container'

        })
        .state('index.main', {
            url: "/main",
            templateUrl: 'modules/main.html',
            data: { pageTitle: '系统设置-企业信息'}

        })
        //首页
        .state('customer', {
            //abstract: true,
            url: "/customer",
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@customer': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@customer': {
                    templateUrl: 'modules/common/menu.html'
                }
            },
            data: { pageTitle: '客户' ,specialClass: 'bg-ind'  },//,widthClass:'container'

        })
        .state('customer.list', {
            url: "/list",
            templateUrl: 'modules/customer/tmp/customerlist.html',
            data: { pageTitle: '客户-客户查询'}

        })
        .state('sale', {
            //abstract: true,
            url: "/sale",
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@sale': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@sale': {
                    templateUrl: 'modules/common/menu.html'
                }
            },
            data: { pageTitle: '客户负责人' ,specialClass: 'bg-ind'  },//,widthClass:'container'

        })
        .state('sale.list', {
            url: "/list",
            templateUrl: 'modules/customer/tmp/salelist.html',
            data: { pageTitle: '客户-负责人'}

        })
        .state('email', {
            //abstract: true,
            url: "/email",
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@email': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@email': {
                    templateUrl: 'modules/common/menu.html'
                }
            },
            data: { pageTitle: '邮件模板' ,specialClass: 'bg-ind'  },//,widthClass:'container'

        })
        .state('email.list', {
            url: "/list",
            templateUrl: 'modules/email/tmp/emaillist.html',
            data: { pageTitle: '邮件营销-邮件模板'}

        })
        .state('email.send', {
            url: "/send",
            templateUrl: 'modules/email/tmp/send.html',
            data: { pageTitle: '邮件营销-发送邮件'}

        })
        .state('sms', {
            //abstract: true,
            url: "/sms",
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@sms': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@sms': {
                    templateUrl: 'modules/common/menu.html'
                }
            },
            data: { pageTitle: '短信模板' ,specialClass: 'bg-ind'  },//,widthClass:'container'

        })
        .state('sms.list', {
            url: "/list",
            templateUrl: 'modules/sms/tmp/smslist.html',
            data: { pageTitle: '短信营销-短信模板'}

        })
        .state('sms.send', {
            url: "/send",
            templateUrl: 'modules/sms/tmp/send.html',
            data: { pageTitle: '短信营销-发送短信'}

        })
        //登录、注册、绑定、找回密码
        .state('login', {
            url: "/login?firstTimeAccess",
            templateUrl: "modules/login/tmp/login.html",
            data: { pageTitle: '青辉阳登录',specialClass: 'bg-login'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // flexslider
                            files:['/plugins/flexslider/flexslider.css','/plugins/flexslider/jquery.flexslider.js']
                        }
                    ])

                }
            }

        })

        /*========系统设置=============================================================================================== */
        .state('sysmsg', {
            abstract: true,
            url: "/sysmsg",
            data: { pageTitle: '系统设置', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@sysmsg': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@sysmsg': {
                    templateUrl: 'modules/sysmsg/tmp/menu.html'
                }
            }
        })
        .state('sysmsg.info', {
            url: "/info",
            templateUrl: 'modules/sysmsg/tmp/list.html',
            data: { pageTitle: '系统设置-企业信息'}

        })
        .state('sysmsg.csset', {
            url: "/csset",
            templateUrl: 'modules/sysmsg/tmp/csset.html',
            data: { pageTitle: '系统设置-参数设置'}

        })

        /*========组织结构=============================================================================================== */
        .state('structuremsg', {
            abstract: true,
            url: "/structuremsg",
            data: { pageTitle: '组织结构', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@structuremsg': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@structuremsg': {
                    templateUrl: 'modules/sysmsg/tmp/menu.html'
                }
            }
        })
        .state('structuremsg.list', {
            url: "/list",
            templateUrl: 'modules/structuremsg/tmp/list.html',
            data: { pageTitle: '组织结构列表'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }/*,
                        {
                            files: ['/plugins/jquery-treetable/jquery.treetable.css','/plugins/jquery-treetable/jquery.treetable.theme.default.css','/plugins/jquery-treetable/jquery.treetable.js']
                        }*/,
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
        })

        /*========同事=============================================================================================== */
        .state('colleague', {
            abstract: true,
            url: "/colleague",
            data: { pageTitle: '同事', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@colleague': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@colleague': {
                    templateUrl: 'modules/colleague/tmp/menu.html'
                }
            }


        })
        
        .state('colleague.search', {
            url: "/search?name",
            templateUrl: 'modules/sysmsg/tmp/search.html',
            data: { pageTitle: '同事查询'}

        })
        .state('colleague.searchlist', {
            url: "/searchlist",
            templateUrl: 'modules/colleague/tmp/searchlist.html',
            data: { pageTitle: '企业通讯录'}

        })
        
        /*========员工管理=============================================================================================== */
        .state('staffmsg', {
            abstract: true,
            url: "/staffmsg",
            data: { pageTitle: '员工管理列表', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@staffmsg': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@staffmsg': {
                    templateUrl: 'modules/staffmsg/tmp/menu.html'
                }
            }


        })
        .state('staffmsg.list', {
            url: "/list",
            templateUrl: 'modules/staffmsg/tmp/list.html',
            data: { pageTitle: '员工管理列表'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
         })
        .state('staffmsg.set', {
            url: "/set",
            templateUrl: 'modules/staffmsg/tmp/set.html',
            data: { pageTitle: '配置薪酬及社保'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js'],
                        }
                    ])
                }
            }

        })
        .state('staffmsg.positionlist', {
            url: "/positionlist",
            templateUrl: 'modules/staffmsg/tmp/positionlist.html',
            data: { pageTitle: '职位设置'}
        })
        /*========角色权限=============================================================================================== */
        .state('permissions', {
            abstract: true,
            url: "/permissions",
            data: { pageTitle: '角色权限' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@permissions': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@permissions': {
                    templateUrl: 'modules/sysmsg/tmp/menu.html'
                }
            }
        })
        .state('permissions.list', {
            url: "/list",
            templateUrl: 'modules/permissions/tmp/list.html',
            data: { pageTitle: '角色权限'}

        })
        .state('permissions.addpromis', {
            url: "/addpromis",	//添加和编辑使用一个页面
            templateUrl: 'modules/permissions/tmp/addpromis.html',
            data: { pageTitle: '角色权限'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
        })
        .state('permissions.editpromis', {
            url: "/addpromis/:selectedRole",	//添加和编辑使用一个页面
            templateUrl: 'modules/permissions/tmp/addpromis.html',
            data: { pageTitle: '角色权限'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
        })
        .state('permissions.viewpromis', {
            url: "/viewpromis/:selectedRole",	//添加和编辑使用一个页面
            templateUrl: 'modules/permissions/tmp/viewpromis.html',
            data: { pageTitle: '角色权限'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
        })
        .state('permissions.accountlist', {
            url: "/accountlist",
            templateUrl: 'modules/permissions/tmp/accountlist.html',
            data: { pageTitle: '账户列表'}

        })
        /*========审批流程=============================================================================================== */
        .state('processmsg', {
            abstract: true,
            url: "/processmsg",
            data: { pageTitle: '审批流程' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@processmsg': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@processmsg': {
                    templateUrl: 'modules/processmsg/tmp/menu.html'
                }
            }
        })
        .state('processmsg.addpcs', {
            url: "/addpcs",
            templateUrl: 'modules/processmsg/tmp/addpcs.html',
            data: { pageTitle: '添加流程'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //jstree
                            files: ['/plugins/jsTree/style.css','/plugins/jsTree/jstree.min.js','/plugins/jsTree/ngJsTree.js']
                        },
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            //上传文件
                            files: ['/plugins/webuploader/webuploader.css','/plugins/webuploader/webuploader.js']
                        }
                    ]);
                }
            }
        })
        .state('processmsg.mypcs', {
            url: "/mypcs",
            templateUrl: 'modules/processmsg/tmp/mypcs.html',
            data: { pageTitle: '我的申请'}

        })
        .state('processmsg.mypcsdetail', {
            url: "/mypcsdetail?processesId",
            templateUrl: 'modules/processmsg/tmp/mypcsdetail.html',
            data: { pageTitle: '我的申请详情'}

        })
        .state('processmsg.myaudit', {
            url: "/myaudit",
            templateUrl: 'modules/processmsg/tmp/myaudit.html',
            data: { pageTitle: '我的审批'}

        })
        .state('processmsg.myauditdetail', {
            url: "/myauditdetail",
            templateUrl: 'modules/processmsg/tmp/myauditdetail.html',
            data: { pageTitle: '我的审批详情'}

        })
        .state('processmsg.addsetpcs', {
            url: "/addsetpcs:pcsRow",
            templateUrl: 'modules/processmsg/tmp/addsetpcs.html',
            data: { pageTitle: '添加流程'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //jstree
                            files: ['/plugins/jsTree/style.css','/plugins/jsTree/jstree.min.js','/plugins/jsTree/ngJsTree.js']
                        },
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            //上传文件
                            files: ['/plugins/webuploader/webuploader.css','/plugins/webuploader/webuploader.js']
                        }
                    ]);
                }
            }

        })
        .state('processmsg.setpcs', {
            url: "/setpcs",
            templateUrl: 'modules/processmsg/tmp/setpcs.html',
            data: { pageTitle: '流程设置'}

        })
        .state('processmsg.setpcsclass', {
            url: "/setpcsclass",
            templateUrl: 'modules/processmsg/tmp/setpcsclass.html',
            data: { pageTitle: '类别设置'}

        })
        /*****************工作报告***************************/
        .state('report', {
            abstract: true,
            url: "/report",
            data: { pageTitle: '工作报告' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@report': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@report': {
                    templateUrl: 'modules/report/tmp/menu.html'
                }
            }
        })
        .state('report.receivelist', {
            url: "/receivelist",
            templateUrl: 'modules/report/tmp/receivelist.html',
            data: { pageTitle: '收到的报告'}

        })
        .state('report.sendlist', {
            url: "/sendlist",
            templateUrl: 'modules/report/tmp/sendlist.html',
            data: { pageTitle: '撰写的报告'}

        })
        .state('report.addreport', {
            url: "/add",
            templateUrl: 'modules/report/tmp/addreport.html',
            data: { pageTitle: '写报告'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }

        })
        .state('report.editreport', {
            url: "/edit/:selectedReport",
            templateUrl: 'modules/report/tmp/addreport.html',
            data: { pageTitle: '修改报告'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }

        })
        .state('report.viewreport', {
            url: "/view/:selectedReport",
            templateUrl: 'modules/report/tmp/viewreport.html',
            data: { pageTitle: '查看报告'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }

        })
        /*****************工作任务***************************/
        .state('task', {
            abstract: true,
            url: "/task",
            data: { pageTitle: '工作任务' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@task': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@task': {
                    templateUrl: 'modules/task/tmp/menu.html'
                }
            }
        })
        .state('task.receivelist', {
            url: "/receivelist",
            templateUrl: 'modules/task/tmp/receivelist.html',
            data: { pageTitle: '收到的任务'}

        })
        .state('task.sendlist', {
            url: "/sendlist",
            templateUrl: 'modules/task/tmp/sendlist.html',
            data: { pageTitle: '分配的任务'}

        })
        .state('task.addtask', {
            url: "/add",
            templateUrl: 'modules/task/tmp/addtask.html',
            data: { pageTitle: '分配任务'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }

        })
        .state('task.edittask', {
            url: "/edit/:selectedTask",
            templateUrl: 'modules/task/tmp/addtask.html',
            data: { pageTitle: '修改任务'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }

        })
        .state('task.viewtask', {
            url: "/view/:selectedTask",
            templateUrl: 'modules/task/tmp/viewtask.html',
            data: { pageTitle: '查看任务'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }

        })
        /*****************决策分析***************************/
        .state('analysis', {
            abstract: true,
            url: "/analysis",
            data: { pageTitle: '决策分析' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@analysis': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@analysis': {
                    templateUrl: 'modules/analysis/tmp/menu.html'
                }
            }
        })
        .state('analysis.list', {
            url: "/list",
            templateUrl: 'modules/analysis/tmp/list.html',
            data: { pageTitle: '决策分析'}

        })
        .state('analysis.employee', {
            url: "/employee?type",
            templateUrl: 'modules/analysis/tmp/employee.html',
            data: { pageTitle: '员工分析'}
        })
        .state('analysis.employeelist', {
            url: "/employeelist",
            templateUrl: 'modules/analysis/tmp/employeelist.html',
            data: { pageTitle: '企业员工'}
        })
        .state('analysis.customer', {
            url: "/customer?type",
            templateUrl: 'modules/analysis/tmp/customer.html',
            data: { pageTitle: '客户分析'}

        })
        .state('analysis.customerlist', {
            url: "/customerlist",
            templateUrl: 'modules/analysis/tmp/customerlist.html',
            data: { pageTitle: '企业客户'}

        })
        .state('analysis.customerdetail', {
            url: "/customerdetail?name",
            templateUrl: 'modules/analysis/tmp/customerdetail.html',
            data: { pageTitle: '客户详情'}

        })
        .state('analysis.project', {
            url: "/project?type",
            templateUrl: 'modules/analysis/tmp/project.html',
            data: { pageTitle: '项目分析'}

        })
        .state('analysis.projectlist', {
            url: "/projectlist",
            templateUrl: 'modules/analysis/tmp/projectlist.html',
            data: { pageTitle: '企业项目'}

        })
        .state('analysis.projectdetail', {
            url: "/projectdetail?name",
            templateUrl: 'modules/analysis/tmp/projectdetail.html',
            data: { pageTitle: '企业项目详情'}

        })
        /*****************部门分析***************************/
        .state('org', {
            abstract: true,
            url: "/org",
            data: { pageTitle: '部门分析' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@org': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@org': {
                    templateUrl: 'modules/org/tmp/menu.html'
                }
            }
        })
        .state('org.user', {
            url: "/user",
            templateUrl: 'modules/org/tmp/user.html',
            data: { pageTitle: '部门分析'}

        })
        .state('org.useranalysis', {
            url: "/useranalysis?type",
            templateUrl: 'modules/org/tmp/useranalysis.html',
            data: { pageTitle: '部门分析'}

        })
        .state('org.project', {
            url: "/project",
            templateUrl: 'modules/org/tmp/project.html',
            data: { pageTitle: '部门分析'}

        })
        .state('org.projectdetail', {
            url: "/projectdetail?name",
            templateUrl: 'modules/org/tmp/projectdetail.html',
            data: { pageTitle: '部门分析'}

        })
        .state('org.sale', {
            url: "/sale",
            templateUrl: 'modules/org/tmp/sale.html',
            data: { pageTitle: '部门分析'}

        })
        .state('org.customerlist', {
            url: "/customerlist",
            templateUrl: 'modules/org/tmp/customerlist.html',
            data: { pageTitle: '部门分析'}

        })
        .state('org.customerdetail', {
            url: "/customerdetail?name",
            templateUrl: 'modules/org/tmp/customerdetail.html',
            data: { pageTitle: '部门分析'}

        })
        /*========公告========================================================== */
        .state('notice', {
            abstract: true,
            url: "/notice",
            data: { pageTitle: '公告'},
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@notice': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@notice': {
                    templateUrl: 'modules/notice/tmp/menu.html'
                }
            }
        })
        .state('notice.list', {
            url: "/list",
            templateUrl: 'modules/notice/tmp/list.html',
            data: { pageTitle: '公告列表'}
        })
        .state('notice.view', {
            url: "/view:data",
            templateUrl: 'modules/notice/tmp/view.html',
            data: { pageTitle: '公告详情'}
        })
        /*========薪资管理========================================================== */
        .state('salarymsg', {
            abstract: true,
            url: "/salarymsg",
            data: { pageTitle: '公告'},
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@salarymsg': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@salarymsg': {
                    templateUrl: 'modules/staffmsg/tmp/menu.html'
                }
            },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('salarymsg.issue', {
            url: "/issue",
            templateUrl: 'modules/salarymsg/tmp/issue.html',
            data: { pageTitle: '薪资发放'}
        })
        .state('salarymsg.issueview', {
            url: "/issueview?year&month",
            templateUrl: 'modules/salarymsg/tmp/view.html',
            data: { pageTitle: '薪资发放详情'}
        })
        .state('salarymsg.list', {
            url: "/list?year&month",
            templateUrl: 'modules/salarymsg/tmp/list.html',
            data: { pageTitle: '薪资查询'}
        })

        /*========考勤========================================================== */
        .state('clockingIn', {
            abstract: true,
            url: "/clockingIn",
            data: { pageTitle: '考勤'},
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@clockingIn': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@clockingIn': {
                    templateUrl: 'modules/clockingIn/tmp/menu.html'
                }
            },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }/*,
                        {
                            files: ['/plugins/jquery-treetable/jquery.treetable.css','/plugins/jquery-treetable/jquery.treetable.theme.default.css','/plugins/jquery-treetable/jquery.treetable.js']
                        }*/,
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
        })
        .state('clockingIn.list', {
            url: "/list",
            templateUrl: 'modules/clockingIn/tmp/list.html',
            data: { pageTitle: '考勤列表'}
        })
        .state('clockingIn.my', {
            url: "/my",
            templateUrl: 'modules/clockingIn/tmp/my.html',
            data: { pageTitle: '我的考勤'}
        })
        .state('clockingIn.view', {
            url: "/view:row",
            templateUrl: 'modules/clockingIn/tmp/view.html',
            data: { pageTitle: '考勤详情'}
        })
        .state('clockingIn.myview', {
            url: "/myview:row",
            templateUrl: 'modules/clockingIn/tmp/myview.html',
            data: { pageTitle: '考勤详情'}
        })
        .state('clockingIn.set', {
            url: "/set",
            templateUrl: 'modules/clockingIn/tmp/set.html',
            data: { pageTitle: '考勤设置'}
        })
        /*========我的模块========================================================== */
        .state('my', {
            abstract: true,
            url: "/my",
            data: { pageTitle: '我的', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@my': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@my': {
                    templateUrl: 'modules/my/tmp/menu.html'
                }
            },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('my.set', {
            url: "/set",
            templateUrl: 'modules/my/tmp/set.html',
            data: { pageTitle: '个人中心'}
        })
        .state('my.salary', {
            url: "/salary",
            templateUrl: 'modules/my/tmp/salary.html',
            data: { pageTitle: '我的薪资'}
        })
        .state('my.attendance', {
            url: "/attendance",
            templateUrl: 'modules/my/tmp/attendance.html',
            data: { pageTitle: '我的考勤'}
        })
        .state('my.attendanceview', {
            url: "/attendanceview:row",
            templateUrl: 'modules/my/tmp/attendanceview.html',
            data: { pageTitle: '我的考勤详情'}
        })
        .state('my.order', {
            url: "/order",
            templateUrl: 'modules/my/tmp/order.html',
            data: { pageTitle: '使用期限'}
        })

        /*========项目==================================================== */
        .state('project', {
            abstract: true,
            url: "/project",
            data: { pageTitle: '项目管理', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@project': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@project': {
                    templateUrl: 'modules/project/tmp/menu.html'
                }
            },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('project.msglist', {
            url: "/msglist",
            templateUrl: 'modules/project/tmp/msglist.html',
            data: { pageTitle: '项目管理'}
        })
        .state('project.msgdtmain', {
            url: "/msgdtmain?name",
            templateUrl: 'modules/project/tmp/msgdtmain.html',
            data: { pageTitle: '项目详情'}
        })

        .state('project.mylist', {
            url: "/mylist",
            templateUrl: 'modules/project/tmp/mylist.html',
            data: { pageTitle: '我参与的项目'}
        })
        .state('project.mydtmain', {
            url: "/mydtmain?name",
            templateUrl: 'modules/project/tmp/mydtmain.html',
            data: { pageTitle: '项目详情'}
        })

        .state('project.modellist', {
            url: "/modellist",
            templateUrl: 'modules/project/tmp/modellist.html',
            data: { pageTitle: '项目模板设置'}
        })
        .state('project.modelphase', {
            url: "/modelphase?name",
            templateUrl: 'modules/project/tmp/modephase.html',
            data: { pageTitle: '项目模板阶段设置'}
        })

        /*========销售==================================================== */
        .state('sales', {
            abstract: true,
            url: "/sales",
            data: { pageTitle: '销售管理', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@sales': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@sales': {
                    templateUrl: 'modules/sales/tmp/menu.html'
                }
            },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('sales.customerlist', {
            url: "/customerlist",
            templateUrl: 'modules/sales/tmp/customerlist.html',
            data: { pageTitle: '客户管理'}
        })
        .state('sales.customerdtmain', {
            url: "/customerdtmain?name",
            templateUrl: 'modules/sales/tmp/customerdtmain.html',
            data: { pageTitle: '客户详情'}
        })

        .state('sales.Ptcustomerlist', {
            url: "/Ptcustomerlist",
            templateUrl: 'modules/sales/tmp/Ptcustomerlist.html',
            data: { pageTitle: '潜在客户'}
        })
        .state('sales.Ptcustomerdtmain', {
            url: "/Ptcustomerdtmain?name",
            templateUrl: 'modules/sales/tmp/Ptcustomerdtmain.html',
            data: { pageTitle: '潜在客户详情'}
        })

        .state('sales.assetsmsglist', {
            url: "/assetsmsglist",
            templateUrl: 'modules/sales/tmp/assetsmsglist.html',
            data: { pageTitle: '销售过程'}
        })
        .state('sales.assetsmsgsummary', {
            url: "/assetsmsgsummary?type",
            templateUrl: 'modules/sales/tmp/assetsmsgsummary.html',
            data: { pageTitle: '销售统计'}
        })
        .state('sales.assetsmsgdtmain', {
            url: "/assetsmsgdtmain?name",
            templateUrl: 'modules/sales/tmp/assetsmsgdtmain.html',
            data: { pageTitle: '销售过程详情'}
        })

        .state('sales.assetsmpmsglist', {
            url: "/assetsmpmsglist",
            templateUrl: 'modules/sales/tmp/assetsmpmsglist.html',
            data: { pageTitle: '销售目标'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
/*        .state('sales.assetsmpmsgdtmain', {
            url: "/assetsmpmsgdtmain",
            templateUrl: 'modules/sales/tmp/assetsmpmsgdtmain.html',
            data: { pageTitle: '销售目标详情'}
        })*/

        .state('sales.activitylist', {
            url: "/activitylist",
            templateUrl: 'modules/sales/tmp/activitylist.html',
            data: { pageTitle: '营销活动'}
        })
        .state('sales.activitydtmain', {
            url: "/activitydtmain?name",
            templateUrl: 'modules/sales/tmp/activitydtmain.html',
            data: { pageTitle: '营销活动详情'}
        })

        /*========招聘==================================================== */
        .state('recruitment', {
            abstract: true,
            url: "/recruitment",
            data: { pageTitle: '招聘管理', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@recruitment': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@recruitment': {
                    templateUrl: 'modules/staffmsg/tmp/menu.html'
                }
            }
        })
        .state('recruitment.planlist', {
            url: "/planlist?type",
            templateUrl: 'modules/recruitment/tmp/planlist.html',
            data: { pageTitle: '招聘计划'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('recruitment.channemsgllist', {
            url: "/channemsgllist",
            templateUrl: 'modules/recruitment/tmp/channemsgllist.html',
            data: { pageTitle: '招聘渠道'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('recruitment.processmsg', {
            url: "/processmsg",
            templateUrl: 'modules/recruitment/tmp/processmsg.html',
            data: { pageTitle: '招聘过程'}
        })
        .state('recruitment.classlist', {
            url: "/classlist",
            templateUrl: 'modules/recruitment/tmp/classlist.html',
            data: { pageTitle: '类别设置'}
        })

        .state('planlist', {
            abstract: true,
            url: "/planlist?planName&positionName&positionCount",
            data: { pageTitle: '招聘计划', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@planlist': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@planlist': {
                    templateUrl: 'modules/recruitment/tmp/planmenu.html'
                }
            }
        })
        .state('planlist.dtplanlist', {
            url: "/dtplanlist",
            templateUrl: 'modules/recruitment/tmp/dtplanlist.html',
            data: { pageTitle: '招聘计划详情'}
        })
        .state('planlist.dtfpositions', {
            url: "/dtfpositions?type",
            templateUrl: 'modules/recruitment/tmp/dtfpositions.html',
            data: { pageTitle: '发布职位'}
        })
        .state('planlist.dtresumemsg', {
            url: "/dtresumemsg",
            templateUrl: 'modules/recruitment/tmp/dtresumemsg.html',
            data: { pageTitle: '简历管理'}
        })
        .state('planlist.dtprocess', {
            url: "/dtprocess?type&flowNodeName&flowNodeSequence",
            templateUrl: 'modules/recruitment/tmp/dtprocess.html',
            data: { pageTitle: '面试流程'}
        })
        .state('planlist.hirelist', {
            url: "/hirelist",
            templateUrl: 'modules/recruitment/tmp/hirelist.html',
            data: { pageTitle: '录用'}
        })




        .state('planlist.dtprocessoffer', {
            url: "/dtprocessoffer",
            templateUrl: 'modules/recruitment/tmp/dtprocessoffer.html',
            data: { pageTitle: 'offer'}
        })
        .state('planlist.dtprocessrz', {
            url: "/dtprocessrz",
            templateUrl: 'modules/recruitment/tmp/dtprocessrz.html',
            data: { pageTitle: '入职'}
        })

        /*========资产==================================================== */
        .state('assets', {
            abstract: true,
            url: "/assets",
            data: { pageTitle: '资产管理', specialClass: 'bgf2' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@assets': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@assets': {
                    templateUrl: 'modules/assets/tmp/menu.html'
                }
            },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        }
                    ])
                }
            }
        })
        .state('assets.assetslist', {
            url: "/assetslist?type",
            templateUrl: 'modules/assets/tmp/assetslist.html',
            data: { pageTitle: '资产库'}
        })
        .state('assets.assetsview', {
            url: "/assetsview?data",
            templateUrl: 'modules/assets/tmp/assetsview.html',
            data: { pageTitle: '资产详情'}
        })
        .state('assets.dbtassets', {
            url: "/dbtassets",
            templateUrl: 'modules/assets/tmp/dbtassets.html',
            data: { pageTitle: '分配资产'}
        })
        .state('assets.recyclingassets', {
            url: "/recyclingassets",
            templateUrl: 'modules/assets/tmp/recyclingassets.html',
            data: { pageTitle: '回收资产'}
        })
        .state('assets.assetsclass', {
            url: "/assetsclass",
            templateUrl: 'modules/assets/tmp/assetsclass.html',
            data: { pageTitle: '资产类别'}
        })

        /*========demo============================================================== */
        .state('demo1', {
            //abstract: true,
            url: "/demo1",
            templateUrl: "modules/demo/tmp/demo1.html",
            data: { pageTitle: '这是一个demo', specialClass: 'bg-silver'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // demo
                            files: ['css/demo.css']
                        },
/*                        {
                             //单选框
                            files: ['/plugins/iCheck/custom.css','/plugins/iCheck/icheck.min.js']
                        },*/
                        {
                            //消息
                            name: 'cgNotify',
                            files: ['/plugins/angular-notify/angular-notify.min.css','/plugins/angular-notify/angular-notify.min.js']
                        },
                        {
                            //chosen自动选择选择
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['/plugins/chosen/chosen.css','/plugins/chosen/chosen.jquery.js','/plugins/chosen/chosen.js']
                        },

                        {
                            //范围滑动
                            name: 'nouislider',
                            files: ['/plugins/nouslider/jquery.nouislider.css','/plugins/nouslider/jquery.nouislider.min.js','/plugins/nouslider/angular-nouislider.js']
                        },
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['/plugins/datapicker/angular-datapicker.css','/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['/plugins/switchery/switchery.css','/plugins/switchery/switchery.js','/plugins/switchery/ng-switchery.js']
                        },
                        //{
                        //    name: 'ngImgCrop',
                        //    files: ['/plugins/ngImgCrop/ng-img-crop.css','/plugins/ngImgCrop/ng-img-crop.js']
                        //}

                    ]);
                }
            }
        })
        .state('demo2', {
            url: "/demo2",
            templateUrl: "modules/demo/tmp/demo2.html",
            data: { pageTitle: '这是一个demo', specialClass: 'bg-silver'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // demo
                            files: ['css/demo.css']
                        }

                    ]);
                }
            }
        })
        .state('demo3', {
            url: "/demo3",
            templateUrl: "modules/demo/tmp/demo3.html",
            data: { pageTitle: '这是一个demo', specialClass: 'bg-silver'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // demo
                            files: ['css/demo.css']
                        }

                    ]);
                }
            }
        })
        .state('demo4', {
            url: "/demo4",
            templateUrl: "modules/demo/tmp/demo4.html",
            data: { pageTitle: '这是一个demo', specialClass: 'bg-silver'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // demo
                            files: ['css/demo.css']
                        }

                    ]);
                }
            }
        })
        .state('demo5', {
            url: "/demo5",
            templateUrl: "modules/demo/tmp/demo5.html",
            data: { pageTitle: '这是一个demo', specialClass: 'bg-silver'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // demo
                            files: ['css/demo.css']
                        },
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ]);
                }
            }
        })
        .state('demo6', {
            url: "/demo6",
            templateUrl: "modules/demo/tmp/demo6.html",
            data: { pageTitle: '这是一个demo', specialClass: 'bg-silver'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // demo
                            files: ['css/demo.css']
                        },
                        {
                            // TreeGrid
                            files: ['/plugins/TreeGrid/TreeGrid.css','/plugins/TreeGrid/TreeGrid-1.1.js']
                        },
/*                        {
                            //单选框
                            files: ['/plugins/iCheck/custom.css','/plugins/iCheck/icheck.min.js']
                        },*/
                        {
                            //jstree
                            files: ['/plugins/jsTree/style.css','/plugins/jsTree/jstree.min.js','/plugins/jsTree/ngJsTree.js']
                        }


                    ]);
                }
            }
        })

    ;




/*    function getTemplateUrl(){
        return ('views/common/' + $params.name + '.html');
    }*/

}
angular
    .module('qiyi.route',[])
    .config(config)
    .run(function($rootScope, $state,$stateParams,editableOptions) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
