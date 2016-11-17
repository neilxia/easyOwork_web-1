/**
 * --by Nose
 */

/**
 * pageTitle - 指令设置页面标题
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = '企易';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = '企易-' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};


/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
};

/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    }
}





/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                });

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green icheck-sm',
                    radioClass: 'iradio_square-green icheck-sm'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                    // 全选、反选
                    if($attrs['ngModel'] === 'main.checkAll'){
                        $("input[name='chkList']:checkbox").each(function(){
                            if(true == $(element).is(':checked')){
                                $(this).iCheck('check');
                            }else{
                                $(this).iCheck('uncheck');
                            }
                        });
                    }
                });
            });
        }
    };
};
/**
 * 树形菜单
 */
function jsonTree(){
    return {
        restrict: 'A',
        jstree: '=',
        link:function(scope, element, attrs){
            scope.$watch('jstree', function(){
                $(element).jstree(
                    //  try{

                    scope.jstree.datas
                    // }catch(exception){}
                );
            },true);
            element.bind('click.jstree',function(event){
                var resourceId =$(event.target).parents('li').attr('id');
                var text='根目录';
                if(resourceId>0){
                    text = $(element).jstree("get_node", resourceId).text;
                }

                scope.changes(resourceId,text);
            });
            element.bind('ready.jstree',function(event){
                scope.jsTreeReady();
            });
            scope.$watch(attrs['ngModel'], function(newValue){
                if(newValue >0){
                    $('#jsonTree').data('jstree', false).empty().jstree(scope.jstree.datas);
                    //  alert('');
                    // $(element).jstree(true).reload();
                }
            });
        }
    };
};
/**
 * 上传
 */
function websimUploader($timeout){
    return{
        restrict:"A",
        scope:{
            divid:'@',
            btnname:'@',
            options:"=",
            uploadSuccess:"&",
            uploadError:"&"
        },
        repeat:true,
        template:'<div>本地上传</div>',
        link:function(scope,element,attrs){
            $timeout(function(){
                element.attr({'id':attrs.divid});
                //配置允许上传的类型   图片/音视频/flash/文件
                var accept = {
                    //图片
                    image: {
                        title : 'Images',//标题
                        extensions : 'gif,jpg,jpeg,bmp,png,ico',//允许上传文件的后缀
                        mimeTypes : 'image/*'//允许的mimetype
                    },
                    //音视频
                    video: {
                        title : 'Videos',
                        extensions : 'wmv,asf,asx,rm,rmvb,ram,avi,mpg,dat,mp4,mpeg,divx,m4v,mov,qt,flv,f4v,mp3,wav,aac,m4a,wma,ra,3gp,3g2,dv,vob,mkv,ts',
                        mimeTypes : 'video/*,audio/*'
                    },
                    //flash
                    flash: {
                        title : 'Flashs',
                        extensions : 'swf,fla',
                        mimeTypes : 'application/x-shockwave-flash'
                    },
                    //办公文档，压缩文件等等
                    file: {
                        title : 'Files',
                        extensions : 'zip,rar,ppt,pptx,doc,docx,xls,xlsx,pdf',
                        mimeTypes : 'application/zip,application/x-rar-compressed,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf'
                    }
                };
                // 实例化
                var defaults={
                    auto: true, // 选完文件后，是否自动上传。
                    pick : {
                        id : '#'+attrs.divid,
                        //label : '点击选择图片'
                        //innerHTML: '<i class="iconfont icon-fujian blue"></i> 本地上传',
                        innerHTML: attrs.btnname || '本地上传',
                        multiple: false //multiple是否开启多文件上传，默认为true
                    },
                    accept : accept[attrs.type], //指定接受哪些类型的文件
                    //upProgressGoal:"#boxs",
                    upimgbox:"#thelist",
                    // swf文件路径
                    swf : 'Uploader.swf',
                    disableGlobalDnd : true, //禁用全局拖动
                    chunked : true,        //是否分片
                    //chunkSize: 700000,  //每个分片的大小，默认为5M
                    server : '../demo',
                    //文件最大数量
                    fileNumLimit : 30,
                    //验证文件总大小是否超出限制
                    fileSizeLimit : 5 * 1024 * 1024, // 200 M
                    //验证单个文件大小是否超出限制
                    fileSingleSizeLimit : 1 * 1024 * 1024
                    // 50 M
                };
                var opt = $.extend({},defaults,scope.options);
                var $list=$(opt.upimgbox).css({"position":"relative"});
                //创建
                var uploader = WebUploader.create(opt);

                // 当有文件添加进来的时候
                /*            uploader.on( 'fileQueued', function( file ) {
                 debugger;
                 /!*var $li = $('<div id="' + file.id + '"><div class="info">' + file.name + '</div></div>');
                 //$img = $li.find('img');


                 // $list为容器jQuery实例
                 $list.append( $li );*!/

                 });*/

                // 文件上传过程中创建进度条实时显示。
                uploader.on( 'uploadProgress', function( file, percentage ) {
                    //var $li = $( '#'+file.id ),
                    var $li = $list,
                        $percent = $li.find('.progress .progress-bar');
                    // 避免重复创建
                    if ( !$percent.length ) {
                        $percent = $('<div class="progress progress-striped progress-mini active">' +
                            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                            '</div>' +
                            '</div>').appendTo( $li ).find('.progress-bar');
                    }


                    /*                // 避免重复创建
                     if ( !$percent.length ) {
                     $percent = $('<p style="position: absolute; width: 100%; height: 5px; background-color:blue;"><span style="background-color: red;display:block; height: 5px;"></span></p>')
                     .appendTo( $li )
                     .find('span');
                     }

                     var $li = $( '#'+file.id ),
                     $percent = $li.find('.progress .progress-bar');*/



                    $percent.css( 'width', percentage * 100 + '%' );
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on( 'uploadSuccess', function( file,response ) {
                    $( '#'+file.id ).addClass('upload-state-done');
                    scope.uploadSuccess(file,response);
                });

                // 文件上传失败，显示上传出错。
                uploader.on( 'uploadError', function( file,reason ) {
                    var $li = $list,
                        $error = $li.find('div.uploaderror');
                    //debugger;
                    // 避免重复创建
                    if ( !$error.length ) {
                        $error = $('<div class="uploaderror" style="width: 100%; background-color:#999; background-color:rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; left: 0; top: 0;"></div>').appendTo( $li );
                    }
                    $error.text('上传失败');
                    scope.uploadError(file,reason);
                });

                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on( 'uploadComplete', function( file ) {
                    //$( '#'+file.id ).find('.progress').remove();
                    $list.find('.progress').fadeOut();
                });
            },0)

        }
    }
}



/**
 * slimScroll - 指令与定制slimScroll高度
 */
function slimScroll($timeout){
    return {
        restrict: 'A',
        scope: {
            boxHeight: '@'
        },
        link: function(scope, element) {
            $timeout(function(){
                element.slimScroll({
                    height: scope.boxHeight,
                    alwaysVisible: true,
                    position : 'right',
                    size: '4px',
                    color: '#e5e5e5',
                    railOpacity: 0.9
                });

            });
        }
    };
}

function multipleEmail(){
    return {
        require: "ngModel",
        link: function (scope, element, attr, ngModel) {
            if (ngModel) {
                var mobileRegexp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                var emailsRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
            }
            var customValidator = function (value) {
                var validity = ngModel.$isEmpty(value) || (mobileRegexp.test(value) || emailsRegexp.test(value));
                ngModel.$setValidity("multipleEmail", validity);
                return validity ? value : undefined;
            };
            ngModel.$formatters.push(customValidator);
            ngModel.$parsers.push(customValidator);
        }
    };
}
function isnumber(){
    return {
        require: "ngModel",
        link: function (scope, element, attr, ngModel) {
            if (ngModel) {
                var idRegexp= /^\d+(\.\d+)?$/;
            }
            var customValidator = function (value) {
                var validity = ngModel.$isEmpty(value) || idRegexp.test(value);
                ngModel.$setValidity("multipleEmail", validity);
                return validity ? value : undefined;
            };
            ngModel.$formatters.push(customValidator);
            ngModel.$parsers.push(customValidator);
        }
    };
}

function onFinishRender($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished'); //事件通知
                    /*
                     var fun = $scope.$eval(attrs.onFinishRender);
                     if(fun && typeof(fun)=='function'){
                     fun();  //回调函数
                     }
                    */
                });
            }
        }
    };
}

/*function onloadFinishset($timeout,$window) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            $timeout(function() {
                debugger;

                scope.$on('$viewContentLoaded', function(){

                    fix_height();
                    function fix_height() {
                        var navbar = $('nav.navbar-default');
                        var pagewrapper = $('#page-wrapper');
                        pagewrapper.css("min-height", $(window).height()-98  + "px");
                        navbar.css("min-height", $(window).height()-98  + "px");

                    }
                    //$(window).bind("load resize scroll", function() {
                    $window.bind("resize scroll", function() {
                        if(!$("body").hasClass('body-small')) {
                            fix_height();
                        }
                    });

                });
            });
        }
    };
}*/

/**
 * 获取验证码
 */

function getCode(){
    return {
        restrict: 'A',
        scope: {},
        //template:'<button type="button" class="btn btn-primary btn-verification" ng-click="sendMSG">获取验证码</button>',
        link: function(scope, element,attr) {
            element.bind('click',function(){
                var countdown=60;
                function settime(obj) {
                    if (countdown == 0) {
                        obj.attr("disabled",false);
                        obj.text("获取验证码");
                        countdown = 60;
                        return;
                    } else {
                        obj.attr("disabled", true);
                        obj.text("重新获取" + countdown);
                        countdown--;
                    }
                    setTimeout(function() {
                        settime(obj)
                    },1000)
                }
                settime(element);
            });


        }
    };
}
/*=========返回==============================*/
function backButton($window){
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    }
}

/*=========刷新当前页==============================*/
function reloadRoute($window){
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.location.reload();
            });
        }
    }
}
/*=========验证两次密码是否一致==============================*/
function pwCheck($timeout){
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () { //keyup blur
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    $timeout(function() {
                        ctrl.$setValidity('pwmatch', v);
                    });

                });
            });
        }
    }
}


/*=========展开关闭collapseH========================================================================*/
function collapseH(){
    return{
        restrict: 'A',
        scope: {
            options:'='
        },
        link:function(scope,element,attr){
            var defaults ={
                //controlbox:"#box",
                toggleclick:".btn",
                cancel:".cancel",
                togglecom:".dropdown-menu",
                setcomH:"30",
                openclass:"aa",
                closeclass:"bb",
                activeclass:"active",
                EveObj:"click",
                Eveone:"toggle",
                openArrow:"down",
                clickEve:null

            };
            var opt = $.extend(defaults,scope.options);
            //var toggleboxObj=$(opt.controlbox);
            var toggleboxObj=element;
            var clickObj=$(opt.toggleclick,toggleboxObj);
            var cancelObj=$(opt.cancel,toggleboxObj);
            var comObj=$(opt.togglecom,toggleboxObj);
            if(opt.openArrow=='down'){
                clickObj.on(opt.EveObj,function(){
                    var that=$(this);
                    if(opt.Eveone=="toggle"){
                        if(comObj.hasClass(opt.activeclass)){
                            that.removeClass(opt.openclass).addClass(opt.closeclass);
                            comObj.removeClass(opt.activeclass);
                            comObj.stop().animate({
                                height: opt.setcomH,
                            }, 250);
                        }else{
                            that.removeClass(opt.closeclass).addClass(opt.openclass);
                            comObj.addClass(opt.activeclass);
                            comObj.stop().animate({
                                height: comObj[0].scrollHeight,
                            }, 250);

                        }
                    }else{
                        that.removeClass(opt.closeclass).addClass(opt.openclass);
                        comObj.addClass(opt.activeclass);
                    }
                });
            }else if(opt.openArrow=='right'){
                clickObj.on(opt.EveObj,function(){
                    var that=$(this);
                    if(opt.Eveone=="toggle"){
                        if(comObj.hasClass(opt.activeclass)){
                            that.removeClass(opt.openclass).addClass(opt.closeclass);
                            comObj.removeClass(opt.activeclass);
                            comObj.stop().animate({
                                right: opt.setcomH,
                            }, 250);
                        }else{
                            that.removeClass(opt.closeclass).addClass(opt.openclass);
                            comObj.addClass(opt.activeclass);
                            comObj.stop().animate({
                                right: 0,
                            }, 250);

                        }
                    }else{
                        that.removeClass(opt.closeclass).addClass(opt.openclass);
                        comObj.addClass(opt.activeclass);
                    }
                });
            }
            cancelObj.on("click",function(){
                cancelObj.removeClass(opt.openclass).addClass(opt.closeclass);
                comObj.removeClass(opt.activeclass);
                comObj.stop().animate({
                    right: opt.setcomH
                }, 250);
            });
        }
    }
}


/*=========nosetreeGrid========================================================================*/
function nosetreeGrid($timeout,$compile){
    return{
        restrict: 'A',
        scope: {
            options:'=',
            thistree:'='
        },
        link:function(scope,element,attr){
            $timeout(function(){
                element.TreeGrid(scope.options);
                scope.thistree=element;

            });


        }
    }
}

/*=========ngenter========================================================================*/
function ngenter($timeout,$compile){
	return {
        restrict: 'A',
        link: function ($scope, element, attrs, controller) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    $scope.$apply(function (){
                        $scope.$eval(attrs.ngenter);
                    });
                    event.preventDefault();
                }
            });
        }
    }
}
/*==============选择部门=====================================================*/
function selectdep($timeout){
    return {
        restrict: 'A',
        scope:{
            options:'=',
            myselected:'=',
            title:'@'
        },
        template:'<div class="input-group">' +
        '<div class="form-control"><span ng-repeat="sele2 in myselected" ng-model="myselected" class="bdrs4 mr5" id="{{sele2.id}}">{{sele2.text}}{{sele2.name}}</span></div>' +
        '<a class="input-group-addon" ng-click="selectstaff()">{{title}}</a>' +
        '</div>',
        /*link: function ($scope, element, attrs) {
            $timeout(function(){
                //$scope.myselected
                $scope.myselected=attrs.myselected;
            })
        },*/
        //replace: true,
        controller:['$scope','$attrs','$modal',function($scope,$attrs,$modal){
            $scope.selectstaff=function(){
                $scope.treeData=$scope.options;
                var modalInstance = $modal.open({
                    templateUrl: 'selectdep.html',
                    size:'sm',
                    controller: modalCtrl,
                    resolve:{
                        items : function() {
                            return $scope.options;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.myselected  = selectedItem;
                    //$scope.selected  = selectedItem;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
                function modalCtrl ($scope, $modalInstance,items,companyService) {

                    if(items=='bm'){
                        getCompanyOrg();

                    }else if(items=='gw'){
                        inquiryRoleFun();
                    }
                    //查询部门
                    function getCompanyOrg(){
                        $scope.treeData=[
                            { id : 'ajson1', parent : '#', text : '销售部', state: { opened: true} },
                            { id : 'ajson2', parent : '#', text : '开发部', state: { opened: true} },
                            { id : 'ajson3', parent : '#', text : '测试部', state: { opened: true} }
                        ];
                        /*
                        var userinfo=LocalStorage.getObject('userinfo');
                        var options={
                            entId:userinfo.entId //必填项, 8位企业代码
                        }
                        var promise = companyService.inquiryCompanyOrg({body:options});
                        promise.success(function(data, status, headers, config){
                            var status=data.body.status;
                            if(status.statusCode==0){

                                $modalInstance.close();

                            }else{
                                MsgService.errormsg(data);
                            }
                        });
                        promise.error(function(data, status, headers, config){
                            MsgService.errormsg(data);
                        });*/
                    }
                    //查询公司角色列表
                    function inquiryRoleFun(){
                        $scope.treeData=[
                            { id : 'id1', text : '平台管理员'},
                            { id : 'id2', text : '人力资源'},
                            { id : 'id3', text : '项目经理'},
                            { id : 'id4', text : '销售人员'},
                            { id : 'id5', text : '部门经理'},
                            { id : 'id6', text : '资产管理员'},
                            { id : 'id7', text : '总经理'},
                            { id : 'id8', text : '财务人员'},
                            { id : 'id9', text : '行政人员'}
                        ];
                        /*
                        $scope.options={
                            "entId":""		//8位企业号
                        };
                        var promise = roleService.inquiryRole({body:$scope.options});
                        promise.success(function(data, status, headers, config){
                            var sts=data.body.status;
                            if(sts.statusCode==0){
                                MsgService.tomsg();
                                $modalInstance.close();
                            }else{
                                MsgService.errormsg(data);
                            }
                        });
                        promise.error(function(data, status, headers, config){
                            MsgService.errormsg(data);
                        });*/
                    };

                    $scope.selected = [];
                    //c = a.concat(b);
                    $scope.ok = function () {
                        //$modalInstance.close();
                        //$scope.yourCtrl();
                        $modalInstance.close($scope.selected);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    //tree
                    //$scope.ignoreChanges = false;
                    //$scope.treeData=items;

                    $scope.treeConfig = {
                        core : {
                            multiple : false, //多选
                            animation: true,
                            error : function(error) {
                                $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                            },
                            worker : true,  //工人
                            "themes":{
                                "dots" : false, //链接接线
                                "icons" : false //文件图标
                            }
                        },
                        types : {
                            "default" : {
                                "icon" : "dn"
                            }
                        },
                        version : 1,
                        //plugins : ['checkbox']
                        plugins : ["wholerow"]
                    };
                    $scope.changedCB=function(e,item){
                        $scope.selected=[item.node];
                    };
                    $scope.yourCtrl=function ()  {
                        var selected_nodes = $scope.treeInstance.jstree(true).get_checked('full');
                        debugger;
                        $scope.selected=selected_nodes;
                    }
                }
            }
        }]
    }
}
angular.module("nose.tpls", ["selectdep.html","custom-template"]);

angular.module("selectdep.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("selectdep.html",
        '<div class="whitemodal smbox">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" ng-click="cancel()"><span aria-hidden="true">&times;</span></button>' +
        '<div class="f16">请选择</div>' +
        '</div>' +
        '<div class="modal-body cf bte bbe">' +
        '<div class="row">' +
        '<div slim-scroll box-height="280">' +
        '<div style="outline: none" js-tree="treeConfig" should-apply="applyModelChanges()" ng-model="treeData" tree="treeInstance" tree-events="changed:changedCB"></div>' +
        '</div></div></div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-white wd80" ng-click="cancel()">取消</button>' +
        '<button type="button" class="btn btn-primary wd80" ng-click="ok()">确定</button>' +
        '</div>' +
        '</div>');
}]);
angular.module('custom-template', []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/modal/confirmModelTemplate.html",
        '<div class="inmodal bdrs8 ovh">' +
        '<div class="modal-body t_c">' +
        '<div class="pt20"><i class="iconfont icon-tishi f18 orange mr5"></i>{{content || "您确定要删除选择项么？"}}</div>' +
        '<div class="p10 mt30">' +
        '<button type="button" class="btn btn-white btn-sm wd80" ng-click="cancel()">取消</button>' +
        '<button type="button" class="btn btn-primary btn-sm wd80 ml10" ng-click="ok()">确定</button>' +
        '</div></div></div>');
}]);

/**
 *
 * Pass all functions into module
 */
angular
    .module('qiyi.directives',['nose.tpls'])
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('landingScrollspy', landingScrollspy)
    .directive('jsonTree', jsonTree) // jsonTree
    .directive('icheck', icheck)   // 单选框
    .directive('slimScroll', slimScroll)   // 简单的滚动条
    .directive('websimUploader', websimUploader)   // 文件上传
    .directive('multipleEmail', multipleEmail) // 手机和邮箱验证
    .directive('isnumber', isnumber) // 是数字验证
    .directive('onFinishRender', onFinishRender)
    .directive('getCode', getCode) //获取验证码
    .directive('backButton', backButton) //返回
    .directive('reloadRoute', reloadRoute) //刷新当前页
    .directive('pwCheck', pwCheck) //验证两次密码是否一致
    .directive('collapseH', collapseH) //展开关闭collapseH
    .directive('nosetreeGrid', nosetreeGrid) //nosetreeGrid
    .directive('ngenter', ngenter) //回车事件
    .directive('selectdep', selectdep) //选择部门
;
