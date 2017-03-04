function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/login");
    $ocLazyLoadProvider.config({
        // 设置为真,如果你想知道,什么时候是动态加载的
        debug: false
    });

    $stateProvider
        //首页
        .state('login', {
            url: "/login?openid",
            views: {
                '': {
                    templateUrl: 'wechat/view/login.html'
                }
            }

        })
    ;
    $stateProvider
    //首页
    .state('main', {
        url: "/main",
        views: {
            '': {
                templateUrl: 'wechat/view/main.html'
            }
        }

    });
    $stateProvider
    .state('myprocesslist', {
        url: "/myprocesslist",
        views: {
            '': {
                templateUrl: 'wechat/view/myprocesslist.html'
            }
        }

    });
    $stateProvider
    .state('myprocessdetail', {
        url: "/myprocessdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/myprocessdetail.html'
            }
        }

    });
    $stateProvider
    .state('createdprocesslist', {
        url: "/createdprocesslist",
        views: {
            '': {
                templateUrl: 'wechat/view/createdprocesslist.html'
            }
        }

    });
    $stateProvider
    .state('createdprocessdetail', {
        url: "/createdprocessdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/createdprocessdetail.html'
            }
        }

    });
    $stateProvider
    .state('tasklist', {
        url: "/tasklist?status",
        views: {
            '': {
                templateUrl: 'wechat/view/tasklist.html'
            }
        }

    });
    $stateProvider
    .state('taskdetail', {
        url: "/taskdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/taskdetail.html'
            }
        }

    });
    $stateProvider
    .state('projecttasklist', {
        url: "/projecttasklist?status",
        views: {
            '': {
                templateUrl: 'wechat/view/projecttasklist.html'
            }
        }

    });
    $stateProvider
    .state('projecttaskdetail', {
        url: "/projecttaskdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/projecttaskdetail.html'
            }
        }

    });
    $stateProvider
    .state('reportlist', {
        url: "/reportlist",
        views: {
            '': {
                templateUrl: 'wechat/view/reportlist.html'
            }
        }

    });
    $stateProvider
    .state('reportdetail', {
        url: "/reportdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/reportdetail.html'
            }
        }

    });
    $stateProvider
    .state('announcementlist', {
        url: "/announcementlist",
        views: {
            '': {
                templateUrl: 'wechat/view/announcementlist.html'
            }
        }

    });
    $stateProvider
    .state('announcementdetail', {
        url: "/announcementdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/announcementdetail.html'
            }
        }

    });
    $stateProvider
    .state('stafflist', {
        url: "/stafflist",
        views: {
            '': {
                templateUrl: 'wechat/view/stafflist.html'
            }
        }

    });
    $stateProvider
    .state('staffdetail', {
        url: "/staffdetail?data",
        views: {
            '': {
                templateUrl: 'wechat/view/staffdetail.html'
            }
        }

    });
    $stateProvider
    .state('mylist', {
        url: "/mylist",
        views: {
            '': {
                templateUrl: 'wechat/view/mylist.html'
            }
        }

    });
    $stateProvider
    .state('myinfo', {
        url: "/myinfo",
        views: {
            '': {
                templateUrl: 'wechat/view/myinfo.html'
            }
        }

    });



}
angular
    .module('wechat.route',[])
    .config(config)
    .run(function($rootScope, $state,$stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
