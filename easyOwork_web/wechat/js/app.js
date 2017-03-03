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
        'wechat.servicesRest',
        'wechat.login',
        'wechat.logout',
        'wechat.main',
        'wechat.process',
        'wechat.announcement',
        'wechat.task',
        'wechat.report',
        'wechat.staff',
        'wechat.myinfo'
    ]);
})();

