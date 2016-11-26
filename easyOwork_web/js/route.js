function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index");
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
                    templateUrl: 'modules/main.html'
                }
            },
            data: { pageTitle: '首页' ,specialClass: 'bg-ind' ,widthClass:'container' },
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // flexslider
                            files:['plugins/flexslider/flexslider.css','plugins/flexslider/jquery.flexslider.js']
                        }
                    ])

                }
            }

        })
        //登录、注册、绑定、找回密码
        .state('login', {
            url: "/login",
            templateUrl: "modules/login/tmp/login.html",
            data: { pageTitle: '这是一个登录页面',specialClass: 'bg-login'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // flexslider
                            files:['plugins/flexslider/flexslider.css','plugins/flexslider/jquery.flexslider.js']
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
        .state('sysmsg.search', {
            url: "/search",
            templateUrl: 'modules/sysmsg/tmp/search.html',
            data: { pageTitle: '员工搜索'}

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
                    templateUrl: 'modules/structuremsg/tmp/menu.html'
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
                            files: ['plugins/datapicker/angular-datapicker.css','plugins/datapicker/angular-datepicker.js']
                        }/*,
                        {
                            files: ['plugins/jquery-treetable/jquery.treetable.css','plugins/jquery-treetable/jquery.treetable.theme.default.css','plugins/jquery-treetable/jquery.treetable.js']
                        }*/,
                        {
                            // TreeGrid
                            files: ['plugins/TreeGrid/TreeGrid.css','plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
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
                            files: ['plugins/datapicker/angular-datapicker.css','plugins/datapicker/angular-datepicker.js'],
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
                            files: ['plugins/datapicker/angular-datapicker.css','plugins/datapicker/angular-datepicker.js'],
                        }
                    ])
                }
            }

        })
        /*========职务权限=============================================================================================== */
        .state('permissions', {
            abstract: true,
            url: "/permissions",
            data: { pageTitle: '职务权限' },
            views: {
                '': {
                    templateUrl: 'modules/common/content.html'
                },
                'main@permissions': {
                    templateUrl: 'modules/common/myContent.html'
                },
                'menu@permissions': {
                    templateUrl: 'modules/permissions/tmp/menu.html'
                }
            }
        })
        .state('permissions.list', {
            url: "/list",
            templateUrl: 'modules/permissions/tmp/list.html',
            data: { pageTitle: '职务权限'}

        })
        .state('permissions.addpromis', {
            url: "/addpromis",	//添加和编辑使用一个页面
            templateUrl: 'modules/permissions/tmp/addpromis.html',
            data: { pageTitle: '职务权限'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // TreeGrid
                            files: ['plugins/TreeGrid/TreeGrid.css','plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
        })
        .state('permissions.editpromis', {
            url: "/addpromis/:selectedRole",	//添加和编辑使用一个页面
            templateUrl: 'modules/permissions/tmp/addpromis.html',
            data: { pageTitle: '职务权限'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            // TreeGrid
                            files: ['plugins/TreeGrid/TreeGrid.css','plugins/TreeGrid/TreeGrid-1.1.js']
                        }

                    ])
                }
            }
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
                            files: ['plugins/jstree/style.css','plugins/jstree/jstree.min.js','plugins/jstree/ngJsTree.js']
                        },
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['plugins/datapicker/angular-datapicker.css','plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            //上传文件
                            files: ['plugins/webuploader/webuploader.css','plugins/webuploader/webuploader.js']
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
            url: "/addsetpcs",
            templateUrl: 'modules/processmsg/tmp/addsetpcs.html',
            data: { pageTitle: '添加流程'},
            resolve:{
                loadPlugin:function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        {
                            //jstree
                            files: ['plugins/jstree/style.css','plugins/jstree/jstree.min.js','plugins/jstree/ngJsTree.js']
                        },
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['plugins/datapicker/angular-datapicker.css','plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            //上传文件
                            files: ['plugins/webuploader/webuploader.css','plugins/webuploader/webuploader.js']
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

        /*========我的模块=============================================================================================== */
       /* .state('my', {
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
                    templateUrl: 'modules/my/tmp/myMenu.html'
                }
            }
        })
        .state('my.set', {
            url: "/set",
            templateUrl: 'modules/my/tmp/mySet.html',
            data: { pageTitle: '我的账户设置'}
        })*/

        /*========demo=============================================================================================== */
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
                            files: ['plugins/iCheck/custom.css','plugins/iCheck/icheck.min.js']
                        },*/
                        {
                            //消息
                            name: 'cgNotify',
                            files: ['plugins/angular-notify/angular-notify.min.css','plugins/angular-notify/angular-notify.min.js']
                        },
                        {
                            //chosen自动选择选择
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['plugins/chosen/chosen.css','plugins/chosen/chosen.jquery.js','plugins/chosen/chosen.js']
                        },

                        {
                            //范围滑动
                            name: 'nouislider',
                            files: ['plugins/nouslider/jquery.nouislider.css','plugins/nouslider/jquery.nouislider.min.js','plugins/nouslider/angular-nouislider.js']
                        },
                        {
                            //时间控件
                            name: 'datePicker',
                            files: ['plugins/datapicker/angular-datapicker.css','plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['plugins/switchery/switchery.css','plugins/switchery/switchery.js','plugins/switchery/ng-switchery.js']
                        },
                        //{
                        //    name: 'ngImgCrop',
                        //    files: ['plugins/ngImgCrop/ng-img-crop.css','plugins/ngImgCrop/ng-img-crop.js']
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
                            files: ['plugins/TreeGrid/TreeGrid.css','plugins/TreeGrid/TreeGrid-1.1.js']
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
                            files: ['plugins/TreeGrid/TreeGrid.css','plugins/TreeGrid/TreeGrid-1.1.js']
                        },
/*                        {
                            //单选框
                            files: ['plugins/iCheck/custom.css','plugins/iCheck/icheck.min.js']
                        },*/
                        {
                            //jstree
                            files: ['plugins/jstree/style.css','plugins/jstree/jstree.min.js','plugins/jstree/ngJsTree.js']
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
    .run(function($rootScope, $state,editableOptions) {
        $rootScope.$state = $state;
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
