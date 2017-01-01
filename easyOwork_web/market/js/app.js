(function () {
    angular.module('market', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'cgNotify',
        'ngCookies',
        'market.main',
        'market.config',
        'market.route',
        'market.directives',
        'market.product',
        'market.price',
        'market.buy',
        'market.pay',
        'market.payTab',
        'market.qrcode',
        'market.complete',
        'market.customize',
        'market.login',
        'market.service',
        'market.header',
        'market.findpwd',
        'market.register'
    ]);
})();

