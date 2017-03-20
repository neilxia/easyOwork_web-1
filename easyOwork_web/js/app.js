(function () {
    angular.module('qiyi', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'xeditable',                 // xeditable
        //'ngJsTree',                 // ngJsTree
        'cgNotify',                 // cgNotify
        //'angularFileUpload',


        //'ngTagsInput',                 // ngTagsInput
        //'treeGrid',                 // treeGrid
        //'ngTreetable',                 // ngTreetable
        //'jqxTreeGrid',                 // jqxTreeGrid
        'qiyi.config',
        'qiyi.route',
        'qiyi.servicesRest',
        'qiyi.services',
        'qiyi.interceptors',
        'qiyi.filters',
        'qiyi.directives',
        'qiyi.login',

        'qiyi.staffmsg',//员工管理
        'qiyi.colleague',//同事
        //'qiyi.enterprisemsg', //组织结构
        'qiyi.structuremsg', //组织结构
        'qiyi.sysmsg', //系统设置
        'qiyi.processmsg', //审批流程
        //'qiyi.processAudit', //审批流程
        'qiyi.permissions', //权限
        //'qiyi.demo',
        'qiyi.analysis',
        'qiyi.org',
        'qiyi.report',
        'qiyi.task',
        'qiyi.notice',
        'qiyi.salarymsg',
        'qiyi.clockingIn',
        'qiyi.my',

        'qiyi.project', //项目
        'qiyi.sales',//销售
        'qiyi.recruitment',//招聘
        'qiyi.assets'//资产
    ]);
    //var myApp= angular.module("demo", [ 'ui.router', 'oc.lazyLoad', 'ui.bootstrap']);
})();

