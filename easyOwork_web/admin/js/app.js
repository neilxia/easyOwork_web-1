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
        'qiyi.customer',
        'qiyi.email',
        'qiyi.sms'
    ]);
    //var myApp= angular.module("demo", [ 'ui.router', 'oc.lazyLoad', 'ui.bootstrap']);
})();

