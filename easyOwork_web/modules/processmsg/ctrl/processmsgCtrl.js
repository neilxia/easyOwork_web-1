/**
 * Created by Nose on 2016/9/7.
 */
/*====================我的申请=================================*/
function addpcsCtrl(){
    return['$scope','$modal','editableOptions',function($scope,$modal,editableOptions){

        //删除
        $scope.delete=function(){
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        $scope.pcsclass=1;
        $scope.pcsitem=0;
        //增加框
        $scope.objs = new Object();
        //$scope.objs.datas = [{clas:'select', title:'下拉选择框',selectItem:[{id:1,value:'选择1'},{id:2,value:'选择2'}]}];
        $scope.objs.datas = [];
        // 增加
        $scope.objs.addFun = function(classname) {
            switch(classname){

                case 'input':{
                    //$scope.objs.datas.push({clas:'input',key:'',value:''});
                    $scope.objs.datas.push({clas:classname, title:'单行文本框',placeholder:'请输入',value:''});
                    break;
                }
                case 'textarea':{
                    $scope.objs.datas.push({clas:classname, title:'多行文本框',placeholder:'请输入',value:''});
                    break;
                }
                case 'select':{
                    $scope.objs.datas.push({clas:classname, title:'下拉选择框',selectItem:[{id:1,value:'选择项1'},{id:2,value:'选择项2'}],value:''});
                    break;
                }
                case 'datetime':{
                    $scope.objs.datas.push({clas:classname, title:'时间选择',placeholder:'请选择时间',value:''});
                    break;
                }
                case 'daterange':{
                    $scope.objs.datas.push({clas:classname, title:'时间范围选择',sctitema:'选择开始时间',sctitemb:'选择结束时间',valuea:'',valueb:''});

                    break;
                }
                case 'upload':{
                    $scope.objs.datas.push({clas:classname, title:'附件上传',placeholder:'上传',value:''});
                    break;
                }
                case 'checkbox':{
                    $scope.objs.datas.push({clas:classname, title:'流程名称',sctitema:'选择项1',sctitemb:'选择项2',valuea:'',valueb:''});
                    break;
                }
                case 'radio':{
                    $scope.objs.datas.push({clas:classname, title:'流程名称',sctitema:'选择项1',sctitemb:'选择项2',value:''});
                    break;
                }
            }
        };
        // select选项增加
        $scope.addselectItem = function(hashkey) {
            angular.forEach($scope.objs.datas, function(obj, key) {
                if(obj.$$hashKey===hashkey){
                    obj.selectItem.push({id: obj.selectItem.length+1,value: ''});
                }
            })
        };
        // select选项减少
        $scope.deleselectItem = function($index) {
            angular.forEach($scope.objs.datas, function(obj, key) {
                if(obj.selectItem.length > 1){
                    obj.selectItem.splice($index, 1);
                }
            })

        };
        // 减少
        $scope.objs.deleFun = function($index) {
            //if ($scope.objs.datas.length > 1) {
                $scope.objs.datas.splice($index, 1);
            //}
        };

        $scope.DisabledFun=function(data){
            //return false;
        };
        $scope.tableisDisabled=false;
        $scope.changeeditable=function(){
            $scope.tableisDisabled = !$scope.tableisDisabled;
        };
        $scope.user={name:'王晓尔'};

        //头像上传
        $scope.upheadoptions={
            upimgbox:"#headimgbox",
            server : './xxxx'
        };
        $scope.uploadSuccess=function(file,response){
            debugger;
        };
        $scope.uploadError=function(file,reason){
            debugger;
            //angular.element("#uploadCon").prepend(el);
        };

        //增加流程数据
        $scope.addpcsdata=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addpcsdata.html',
                size:'md',
                controller: modalCtrl
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.objs.addFun(selectedItem);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });

            function modalCtrl ($scope, $modalInstance) {
                $scope.selected = {
                    item: ''
                };
                $scope.radioitem='';
                $scope.ok = function () {
                    //$scope.radioitem;
                    $modalInstance.close($scope.selected.item);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

/*        angular.element('body').click(function(){
            $scope.inputForm.$hide();
        });*/
        $scope.checkName=function(data){
            if (data !== 'awesome') {
            }
        };


        //选择部门/员工
        $scope.selectstaff=function(){
            var modalInstance = $modal.open({
                templateUrl: 'selectstaff.html',
                //size:'md',
                controller: modalCtrl
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.staffselected  = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.selected = [];

                //c = a.concat(b);
                $scope.ok = function () {
                    //$modalInstance.close();
                    $scope.yourCtrl();
                    $modalInstance.close($scope.selected);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };


                //tree
                $scope.ignoreChanges = false;
                $scope.newNode = {};
                $scope.originalData = [
                    { id : 'ajson1', parent : '#', text : '成都尔康互动有限公司', state: { opened: true} },
                    { id : 'ajson1-1', parent : 'ajson1', text : '行政部', state: { opened: true} },
                    { id : 'ajson1-2', parent : 'ajson1', text : '产品中心' , state: { opened: true}},
                    { id : 'ajson1-2-1', parent : 'ajson1-2', text : '产品一部' , state: { opened: true}},
                    { id : 'ajson1-2-2', parent : 'ajson1-2', text : '产品二部' , state: { opened: true}},
                    { id : 'ajson1-2-3', parent : 'ajson1-2', text : '用户体验部' , state: { opened: true}},
                    { id : 'ajson1-2-4', parent : 'ajson1-2', text : '用户研究部' , state: { opened: true}},
                    { id : 'ajson1-3', parent : 'ajson1', text : '人事部' , state: { opened: true}},
                    { id : 'ajson1-4', parent : 'ajson1', text : '市场部' , state: { opened: true}}
                ];
                $scope.treeData = [];
                angular.copy($scope.originalData,$scope.treeData);
                $scope.treeConfig = {
                    core : {
                        multiple : true, //多选
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
                    checkbox : {
                        "whole_node" : false,
                        "tie_selection": false
                    },
                    plugins : ['checkbox']
                    //plugins : ["wholerow",'checkbox']
                };
                $scope.changedCB=function(e,item,n,b){
                    alert(e+','+item+','+n+','+b);
                };

                $scope.applyModelChanges = function() {
                    //return !vm.ignoreChanges;
                    //return false;
                };



                //员工选择
                $scope.stafforiginalData = [
                    { id : 'id1', parent : '#', text : '王晓红'},
                    { id : 'id2', parent : '#', text : '王晓红'},
                    { id : 'id3', parent : '#', text : '王晓红'},
                    { id : 'id4', parent : '#', text : '王晓红'},
                    { id : 'id5', parent : '#', text : '王晓红'},
                    { id : 'id6', parent : '#', text : '王晓红'},
                    { id : 'id7', parent : '#', text : '王晓红'},
                    { id : 'id8', parent : '#', text : '王晓红'},
                    { id : 'id9', parent : '#', text : '王晓红'},
                    { id : 'id10', parent : '#', text : '王晓红'},
                    { id : 'id11', parent : '#', text : '王晓红'},
                    { id : 'id12', parent : '#', text : '王晓红'}
                ];
                $scope.stafftreeData = [];
                angular.copy($scope.stafforiginalData,$scope.stafftreeData);
                $scope.staffConfig = {
                    core : {
                        multiple : true, //多选
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
                    plugins : ["wholerow",'checkbox']
                };
                $scope.changedstaff=function(e,item,n,b){
                    //alert(e+','+item+','+n+','+b);
                };

                $scope.yourCtrl=function ()  {
                    //var selected_nodes = this.treeInstance.jstree(true).get_selected('full');
                    var selected_nodes = $scope.treeInstance.jstree(true).get_checked('full');
                    var selected_nodes2 = $scope.stafftree.jstree(true).get_checked('full');
                    $scope.selected=selected_nodes.concat(selected_nodes2);
                    //Array.prototype.push.apply(selected_nodes, selected_nodes2);
                    //var a = [1,2], b = [3,4], c = a.concat(b);
                    //alert(selected_nodes);
                }
            }
        };

    }]
}

/*====================我的申请=================================*/
function mypcsCtrl(){
    return['$scope', '$modal',function($scope,$modal){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        //$scope.active=true;
        //删除
        $scope.delete=function(){
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };


    }]
}
/*====================我的申请详情=================================*/
function mypcsdetailCtrl(){
    return['$scope',function($scope){

    }]
}
/*====================我的审批=================================*/
function myauditCtrl(){
    return['$scope',function($scope){

    }]
}
/*====================审批详情=================================*/
function myauditdetailCtrl(){
    return['$scope',function($scope){
        $scope.jujue=false;
        $scope.jujuetoggle=function(){
            $scope.jujue = !$scope.jujue;
        }
    }]
}
/*====================添加流程=================================*/
function addsetpcsCtrl(){
    return['$scope','$modal','editableOptions',function($scope,$modal,editableOptions){

        //增加框
        $scope.objs = new Object();
        //$scope.objs.datas = [{clas:'select', title:'下拉选择框',selectItem:[{id:1,value:'选择1'},{id:2,value:'选择2'}]}];
        $scope.objs.datas = [];
        // 增加
        $scope.objs.addFun = function(classname) {
            switch(classname){

                case 'input':{
                    //$scope.objs.datas.push({clas:'input',key:'',value:''});
                    $scope.objs.datas.push({clas:classname, title:'单行文本框',placeholder:'请输入',value:''});
                    break;
                }
                case 'textarea':{
                    $scope.objs.datas.push({clas:classname, title:'多行文本框',placeholder:'请输入',value:''});
                    break;
                }
                case 'select':{
                    $scope.objs.datas.push({clas:classname, title:'下拉选择框',selectItem:[{id:1,value:'选择项1'},{id:2,value:'选择项2'}],value:''});
                    break;
                }
                case 'datetime':{
                    $scope.objs.datas.push({clas:classname, title:'时间选择',placeholder:'请选择时间',value:''});
                    break;
                }
                case 'daterange':{
                    $scope.objs.datas.push({clas:classname, title:'时间范围选择',sctitema:'选择开始时间',sctitemb:'选择结束时间',valuea:'',valueb:''});

                    break;
                }
                case 'upload':{
                    $scope.objs.datas.push({clas:classname, title:'附件上传',placeholder:'本地上传',value:''});
                    break;
                }
                case 'checkbox':{
                    $scope.objs.datas.push({clas:classname, title:'流程名称',sctitema:'选择项1',sctitemb:'选择项2',valuea:'',valueb:''});
                    break;
                }
                case 'radio':{
                    $scope.objs.datas.push({clas:classname, title:'流程名称',sctitema:'选择项1',sctitemb:'选择项2',value:''});
                    break;
                }
            }
        };
        // select选项增加
        $scope.addselectItem = function(hashkey) {
            angular.forEach($scope.objs.datas, function(obj, key) {
                if(obj.$$hashKey===hashkey){
                    obj.selectItem.push({id: obj.selectItem.length+1,value: ''});
                }
            })
        };
        // select选项减少
        $scope.deleselectItem = function($index) {
            angular.forEach($scope.objs.datas, function(obj, key) {
                if(obj.selectItem.length > 1){
                    obj.selectItem.splice($index, 1);
                }
            })

        };
        // 减少
        $scope.objs.deleFun = function($index) {
            //if ($scope.objs.datas.length > 1) {
            $scope.objs.datas.splice($index, 1);
            //}
        };

        $scope.DisabledFun=function(data){
            //return false;
        };
        //配置开关
        $scope.tableisDisabled=true; //false
        $scope.changeeditable=function(){
            $scope.tableisDisabled = !$scope.tableisDisabled;
        };
        $scope.user={name:'王晓尔'};

        //头像上传
        $scope.upheadoptions={
            upimgbox:"#headimgbox",
            server : './xxxx'
        };
        $scope.uploadSuccess=function(file,response){
            debugger;
        };
        $scope.uploadError=function(file,reason){
            debugger;
            //angular.element("#uploadCon").prepend(el);
        };

        //增加流程数据
        $scope.addpcsdata=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addpcsdata.html',
                size:'md',
                controller: modalCtrl
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.objs.addFun(selectedItem);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });

            function modalCtrl ($scope, $modalInstance) {
                $scope.selected = {
                    item: ''
                };
                $scope.radioitem='';
                $scope.ok = function () {
                    //$scope.radioitem;
                    $modalInstance.close($scope.selected.item);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };

        /*        angular.element('body').click(function(){
         $scope.inputForm.$hide();
         });*/
        $scope.checkName=function(data){
            if (data !== 'awesome') {
            }
        };

        //选择部门/员工
        $scope.selectstaff=function(){
            var modalInstance = $modal.open({
                templateUrl: 'selectstaff.html',
                //size:'md',
                controller: modalCtrl
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.staffselected  = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.selected = [];

                //c = a.concat(b);
                $scope.ok = function () {
                    //$modalInstance.close();
                    $scope.yourCtrl();
                    $modalInstance.close($scope.selected);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };


                //tree
                $scope.ignoreChanges = false;
                $scope.newNode = {};
                $scope.originalData = [
                    { id : 'ajson1', parent : '#', text : '成都尔康互动有限公司', state: { opened: true} },
                    { id : 'ajson1-1', parent : 'ajson1', text : '行政部', state: { opened: true} },
                    { id : 'ajson1-2', parent : 'ajson1', text : '产品中心' , state: { opened: true}},
                    { id : 'ajson1-2-1', parent : 'ajson1-2', text : '产品一部' , state: { opened: true}},
                    { id : 'ajson1-2-2', parent : 'ajson1-2', text : '产品二部' , state: { opened: true}},
                    { id : 'ajson1-2-3', parent : 'ajson1-2', text : '用户体验部' , state: { opened: true}},
                    { id : 'ajson1-2-4', parent : 'ajson1-2', text : '用户研究部' , state: { opened: true}},
                    { id : 'ajson1-3', parent : 'ajson1', text : '人事部' , state: { opened: true}},
                    { id : 'ajson1-4', parent : 'ajson1', text : '市场部' , state: { opened: true}}
                ];
                $scope.treeData = [];
                angular.copy($scope.originalData,$scope.treeData);
                $scope.treeConfig = {
                    core : {
                        multiple : true, //多选
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
                    checkbox : {
                        "whole_node" : false,
                        "tie_selection": false
                    },
                    plugins : ['checkbox']
                    //plugins : ["wholerow",'checkbox']
                };
                $scope.changedCB=function(e,item,n,b){
                    alert(e+','+item+','+n+','+b);
                };

                $scope.applyModelChanges = function() {
                    //return !vm.ignoreChanges;
                    //return false;
                };



                //员工选择
                $scope.stafforiginalData = [
                    { id : 'id1', parent : '#', text : '王晓红'},
                    { id : 'id2', parent : '#', text : '王晓红'},
                    { id : 'id3', parent : '#', text : '王晓红'},
                    { id : 'id4', parent : '#', text : '王晓红'},
                    { id : 'id5', parent : '#', text : '王晓红'},
                    { id : 'id6', parent : '#', text : '王晓红'},
                    { id : 'id7', parent : '#', text : '王晓红'},
                    { id : 'id8', parent : '#', text : '王晓红'},
                    { id : 'id9', parent : '#', text : '王晓红'},
                    { id : 'id10', parent : '#', text : '王晓红'},
                    { id : 'id11', parent : '#', text : '王晓红'},
                    { id : 'id12', parent : '#', text : '王晓红'}
                ];
                $scope.stafftreeData = [];
                angular.copy($scope.stafforiginalData,$scope.stafftreeData);
                $scope.staffConfig = {
                    core : {
                        multiple : true, //多选
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
                    plugins : ["wholerow",'checkbox']
                };
                $scope.changedstaff=function(e,item,n,b){
                    //alert(e+','+item+','+n+','+b);
                };

                $scope.yourCtrl=function ()  {
                    //var selected_nodes = this.treeInstance.jstree(true).get_selected('full');
                    var selected_nodes = $scope.treeInstance.jstree(true).get_checked('full');
                    var selected_nodes2 = $scope.stafftree.jstree(true).get_checked('full');
                    $scope.selected=selected_nodes.concat(selected_nodes2);
                    //Array.prototype.push.apply(selected_nodes, selected_nodes2);
                    //var a = [1,2], b = [3,4], c = a.concat(b);
                    //alert(selected_nodes);
                }
            }
        };
        //新增审批人
        $scope.addapprover=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addapprover.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                //选择部门/员工
                $scope.selectstaff=function(){
                    var modalInstance = $modal.open({
                        templateUrl: 'selectstaff.html',
                        //size:'md',
                        controller: modalCtrl
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.staffselected  = selectedItem;
                    }, function () {
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                    function modalCtrl ($scope, $modalInstance) {
                        $scope.selected = [];

                        //c = a.concat(b);
                        $scope.ok = function () {
                            //$modalInstance.close();
                            $scope.yourCtrl();
                            $modalInstance.close($scope.selected);
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };


                        //tree
                        $scope.ignoreChanges = false;
                        $scope.newNode = {};
                        $scope.originalData = [
                            { id : 'ajson1', parent : '#', text : '成都尔康互动有限公司', state: { opened: true} },
                            { id : 'ajson1-1', parent : 'ajson1', text : '行政部', state: { opened: true} },
                            { id : 'ajson1-2', parent : 'ajson1', text : '产品中心' , state: { opened: true}},
                            { id : 'ajson1-2-1', parent : 'ajson1-2', text : '产品一部' , state: { opened: true}},
                            { id : 'ajson1-2-2', parent : 'ajson1-2', text : '产品二部' , state: { opened: true}},
                            { id : 'ajson1-2-3', parent : 'ajson1-2', text : '用户体验部' , state: { opened: true}},
                            { id : 'ajson1-2-4', parent : 'ajson1-2', text : '用户研究部' , state: { opened: true}},
                            { id : 'ajson1-3', parent : 'ajson1', text : '人事部' , state: { opened: true}},
                            { id : 'ajson1-4', parent : 'ajson1', text : '市场部' , state: { opened: true}}
                        ];
                        $scope.treeData = [];
                        angular.copy($scope.originalData,$scope.treeData);
                        $scope.treeConfig = {
                            core : {
                                multiple : true, //多选
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
                            checkbox : {
                                "whole_node" : false,
                                "tie_selection": false
                            },
                            plugins : ['checkbox']
                            //plugins : ["wholerow",'checkbox']
                        };
                        $scope.changedCB=function(e,item,n,b){
                            alert(e+','+item+','+n+','+b);
                        };

                        $scope.applyModelChanges = function() {
                            //return !vm.ignoreChanges;
                            //return false;
                        };



                        //员工选择
                        $scope.stafforiginalData = [
                            { id : 'id1', parent : '#', text : '王晓红'},
                            { id : 'id2', parent : '#', text : '王晓红'},
                            { id : 'id3', parent : '#', text : '王晓红'},
                            { id : 'id4', parent : '#', text : '王晓红'},
                            { id : 'id5', parent : '#', text : '王晓红'},
                            { id : 'id6', parent : '#', text : '王晓红'},
                            { id : 'id7', parent : '#', text : '王晓红'},
                            { id : 'id8', parent : '#', text : '王晓红'},
                            { id : 'id9', parent : '#', text : '王晓红'},
                            { id : 'id10', parent : '#', text : '王晓红'},
                            { id : 'id11', parent : '#', text : '王晓红'},
                            { id : 'id12', parent : '#', text : '王晓红'}
                        ];
                        $scope.stafftreeData = [];
                        angular.copy($scope.stafforiginalData,$scope.stafftreeData);
                        $scope.staffConfig = {
                            core : {
                                multiple : true, //多选
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
                            plugins : ["wholerow",'checkbox']
                        };
                        $scope.changedstaff=function(e,item,n,b){
                            //alert(e+','+item+','+n+','+b);
                        };

                        $scope.yourCtrl=function ()  {
                            //var selected_nodes = this.treeInstance.jstree(true).get_selected('full');
                            var selected_nodes = $scope.treeInstance.jstree(true).get_checked('full');
                            var selected_nodes2 = $scope.stafftree.jstree(true).get_checked('full');
                            $scope.selected=selected_nodes.concat(selected_nodes2);
                            //Array.prototype.push.apply(selected_nodes, selected_nodes2);
                            //var a = [1,2], b = [3,4], c = a.concat(b);
                            //alert(selected_nodes);
                        }
                    }
                };
            }
        }

        //编辑审批人
        $scope.editapprover=function(){
            var modalInstance = $modal.open({
                templateUrl: 'eidtapprover.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                //选择部门/员工
                $scope.selectstaff=function(){
                    var modalInstance = $modal.open({
                        templateUrl: 'selectstaff.html',
                        //size:'md',
                        controller: modalCtrl
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.staffselected  = selectedItem;
                    }, function () {
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                    function modalCtrl ($scope, $modalInstance) {
                        $scope.selected = [];

                        //c = a.concat(b);
                        $scope.ok = function () {
                            //$modalInstance.close();
                            $scope.yourCtrl();
                            $modalInstance.close($scope.selected);
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };


                        //tree
                        $scope.ignoreChanges = false;
                        $scope.newNode = {};
                        $scope.originalData = [
                            { id : 'ajson1', parent : '#', text : '成都尔康互动有限公司', state: { opened: true} },
                            { id : 'ajson1-1', parent : 'ajson1', text : '行政部', state: { opened: true} },
                            { id : 'ajson1-2', parent : 'ajson1', text : '产品中心' , state: { opened: true}},
                            { id : 'ajson1-2-1', parent : 'ajson1-2', text : '产品一部' , state: { opened: true}},
                            { id : 'ajson1-2-2', parent : 'ajson1-2', text : '产品二部' , state: { opened: true}},
                            { id : 'ajson1-2-3', parent : 'ajson1-2', text : '用户体验部' , state: { opened: true}},
                            { id : 'ajson1-2-4', parent : 'ajson1-2', text : '用户研究部' , state: { opened: true}},
                            { id : 'ajson1-3', parent : 'ajson1', text : '人事部' , state: { opened: true}},
                            { id : 'ajson1-4', parent : 'ajson1', text : '市场部' , state: { opened: true}}
                        ];
                        $scope.treeData = [];
                        angular.copy($scope.originalData,$scope.treeData);
                        $scope.treeConfig = {
                            core : {
                                multiple : true, //多选
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
                            checkbox : {
                                "whole_node" : false,
                                "tie_selection": false
                            },
                            plugins : ['checkbox']
                            //plugins : ["wholerow",'checkbox']
                        };
                        $scope.changedCB=function(e,item,n,b){
                            alert(e+','+item+','+n+','+b);
                        };

                        $scope.applyModelChanges = function() {
                            //return !vm.ignoreChanges;
                            //return false;
                        };



                        //员工选择
                        $scope.stafforiginalData = [
                            { id : 'id1', parent : '#', text : '王晓红'},
                            { id : 'id2', parent : '#', text : '王晓红'},
                            { id : 'id3', parent : '#', text : '王晓红'},
                            { id : 'id4', parent : '#', text : '王晓红'},
                            { id : 'id5', parent : '#', text : '王晓红'},
                            { id : 'id6', parent : '#', text : '王晓红'},
                            { id : 'id7', parent : '#', text : '王晓红'},
                            { id : 'id8', parent : '#', text : '王晓红'},
                            { id : 'id9', parent : '#', text : '王晓红'},
                            { id : 'id10', parent : '#', text : '王晓红'},
                            { id : 'id11', parent : '#', text : '王晓红'},
                            { id : 'id12', parent : '#', text : '王晓红'}
                        ];
                        $scope.stafftreeData = [];
                        angular.copy($scope.stafforiginalData,$scope.stafftreeData);
                        $scope.staffConfig = {
                            core : {
                                multiple : true, //多选
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
                            plugins : ["wholerow",'checkbox']
                        };
                        $scope.changedstaff=function(e,item,n,b){
                            //alert(e+','+item+','+n+','+b);
                        };

                        $scope.yourCtrl=function ()  {
                            //var selected_nodes = this.treeInstance.jstree(true).get_selected('full');
                            var selected_nodes = $scope.treeInstance.jstree(true).get_checked('full');
                            var selected_nodes2 = $scope.stafftree.jstree(true).get_checked('full');
                            $scope.selected=selected_nodes.concat(selected_nodes2);
                            //Array.prototype.push.apply(selected_nodes, selected_nodes2);
                            //var a = [1,2], b = [3,4], c = a.concat(b);
                            //alert(selected_nodes);
                        }
                    }
                };
            }
        }

    }]
}
/*====================流程设置=================================*/
function setpcsCtrl(){
    return['$scope','$modal',function($scope,$modal){
        //删除
        $scope.delete=function(){
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
    }]
}

/*====================类别设置=================================*/
function setpcsclassCtrl(){
    return['$scope', '$modal',function($scope,$modal){
        $scope.bigTotalItems = 11;
        $scope.bigCurrentPage = 1;
        $scope.maxSize = 5;
        $scope.singleModel = 1;
        //$scope.active=true;
        //增加部门
        $scope.addclass=function(){
            var modalInstance = $modal.open({
                templateUrl: 'addclass.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        //编辑部门
        $scope.editclass=function(){
            var modalInstance = $modal.open({
                templateUrl: 'editclass.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };


    }]
}
