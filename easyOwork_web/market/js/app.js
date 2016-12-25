(function () {
    angular.module('market', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'cgNotify',
        'market.config',
        'market.route',
        'market.directives',
        'market.product',
        'market.price',
        'market.buy',
        'market.pay',
        'market.complete',
        'market.customize',
        'market.login',
        'market.service'
    ]);
})();

