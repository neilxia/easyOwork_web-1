function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index");
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
                    templateUrl: 'market/view/product.html'
                }
            }
        })
        .state('login', {
            url: "/login?redirect_url",
            views: {
                '': {
                    templateUrl: 'market/view/login.html'
                }
            }

        })
        .state('product', {
            url: "/product",
            views: {
                '': {
                    templateUrl: 'market/view/product.html'
                }
            }

        })
        .state('price', {
            url: "/price",
            templateUrl: "market/view/price.html",

        })
        .state('customize', {
            url: "/customize",
            templateUrl: "market/view/customize.html",

        })
        .state('buy', {
            url: "/buy",
            templateUrl: "market/view/buy.html",

        })
        .state('pay', {
            url: "/pay",
            templateUrl: "market/view/pay.html",

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
    ;



}
angular
    .module('market.route',[])
    .config(config)
    .run(function($rootScope, $state,$stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
