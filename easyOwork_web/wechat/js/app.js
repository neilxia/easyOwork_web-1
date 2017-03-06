(function () {
    angular.module('wechat', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'cgNotify',
        'ngCookies',
        'wechat.service',
        'wechat.config',
        'wechat.route',
        'wechat.directives',
        'wechat.interceptors',
        'wechat.filters',
        'wechat.servicesRest',
        'wechat.login',
        'wechat.logout',
        'wechat.main',
        'wechat.process',
        'wechat.announcement',
        'wechat.task',
        'wechat.projecttask',
        'wechat.report',
        'wechat.staff',
        'wechat.myinfo',
        'wechat.jssdk'
        
    ]);
})();

