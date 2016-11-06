(function () {
    angular.module('qiyi', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'xeditable',                 // xeditable
        'ngJsTree',                 // ngJsTree
        'cgNotify',                 // cgNotify
        //'ngTagsInput',                 // ngTagsInput
        //'treeGrid',                 // treeGrid
        //'ngTreetable',                 // ngTreetable
        //'jqxTreeGrid',                 // jqxTreeGrid
        'qiyi.config',
        'qiyi.route',
        'qiyi.services',
        'qiyi.servicesRest',
        'qiyi.interceptors',
        'qiyi.filters',
        'qiyi.staffmsg',//员工
        //'qiyi.enterprisemsg', //组织结构
        'qiyi.structuremsg', //组织结构
        'qiyi.sysmsg', //系统设置
        'qiyi.processmsg', //审批流程
        //'qiyi.processAudit', //审批流程
        'qiyi.permissions', //权限
        'qiyi.login',
        //'qiyi.demo',
        'qiyi.directives'

    ]);
    //var myApp= angular.module("demo", [ 'ui.router', 'oc.lazyLoad', 'ui.bootstrap']);
})();

