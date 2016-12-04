/**
 * MainCtrl - controller--by Nose
 */
angular.module('qiyi')
    .controller('MainCtrl', ['$rootScope','$scope','$timeout','$modal','$state','LocalStorage','roleService','accessService','OSSService','MsgService','processService',function($rootScope,$scope,$timeout,$modal,$state,LocalStorage,roleService,accessService,OSSService,MsgService,processService) {
    $scope.collapsehset={toggleclick:"#infobtn",togglecom:".topinfo-com",setcomH:"-330px",openArrow:'right'};
/*    $scope.$on('$viewContentLoaded', function(){});*/
        $scope.$on('$stateChangeSuccess', function(){
            $timeout(function(){
                fix_height();
            },0);
        });
        $scope.initFun=function(){
            //if(!userinfo.tokenId){$state.go('login');return;}
            //初始化阿里云OSS参数
            OSSService.inquiryOSSInfo({body:{}});
        }
        $scope.$on('to-parent1', function(event,data) {
            $scope.companyinfo=LocalStorage.getObject('companyinfo');
        });
        $scope.$on('to-parent2', function(event,data) {
            $scope.userinfoall=LocalStorage.getObject('userinfo');
            inquiryCreatedProcessesFun();//查询发起的流程
            inquiryHandlingProcessesFun();//查询审批
        });

        function inquiryCreatedProcessesFun(){
            //查询发起的流程
            $scope.options={
                "launchUserDTO":{
                    "id":$scope.userinfoall.id,	//员工号
                    "personalEmail":$scope.userinfoall.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":$scope.userinfoall.personalPhoneCountryCode,	//电话号码
                    "personalPhone":$scope.userinfoall.personalPhone		//电话号码
                }
            };
            var promise = processService.inquiryCreatedProcesses({body:$scope.options});
            promise.success(function(data, status, headers, config){
                /*if(status==200){
                 $scope.inquiryProcessesData=data.processes;
                 }*/
                //远程开启下面的
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryProcessesData=data.body.data.processes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        function inquiryHandlingProcessesFun(){
            //查询待审批的流程
            $scope.options={
                "launchUserDTO":{
                    "id":$scope.userinfoall.id,	//员工号
                    "personalEmail":$scope.userinfoall.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":$scope.userinfoall.personalPhoneCountryCode,	//电话号码
                    "personalPhone":$scope.userinfoall.personalPhone		//电话号码
                }
            };
            var promise = processService.inquiryHandlingProcesses({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryHandData=data.body.data.processes;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //查看流程详情
        $scope.chakanpcsFun=function(row){
            LocalStorage.setObject('pcsdetail',row);
            $rootScope.$state.go('processmsg.mypcsdetail',{processesId:row.processesId})
        }
        //查看审批流程详情
        $scope.chakanauditFun=function(row){
            LocalStorage.setObject('pcsdetail',row);
            $rootScope.$state.go('processmsg.myauditdetail',{processesId:row.processesId})
        }




    }])
    .controller('headerCtrl',['$rootScope','$scope','$state','LocalStorage','publicService','MsgService','companyService','employeesService',function($rootScope,$scope,$state,LocalStorage,publicService,MsgService,companyService,employeesService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.inithdFun=function(){
            getCompanyInfo();
            getUserInfo()

        };
        function getCompanyInfo(){
            $scope.userinfo=userinfo;
            $scope.options={
                "entId":userinfo.entId
            }
            var promise = companyService.inquiryCompanyInfo({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var datas=data.body.data;
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.companyinfo=datas;
                    LocalStorage.setObject('companyinfo',datas);

                    $scope.$emit('to-parent1', 'parent');//父级
                }else{
                    //MsgService.errormsg(data);
                }
            });

        }
        function getUserInfo(){
            var options={
                "type":userinfo.type,
                "id":userinfo.id,
                "personalEmail":userinfo.personalEmail,
                "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,
                "personalPhone":userinfo.personalPhone
            }
            var promise = employeesService.inquiryEmployee({body:options});
            promise.success(function(data, status, headers, config){
                var datas=data.body.data;
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var userinfoall=angular.extend({},userinfo,datas.userList[0]);
                    $scope.userinfoall=userinfoall;
                    LocalStorage.setObject('userinfo',userinfoall);
                    $scope.$emit('to-parent2', 'parent');//父级
                }else{
                    //MsgService.errormsg(data);
                }
            });
        }

        $scope.logout=function(){
            var promise = publicService.logout({});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    LocalStorage.setObject('userinfo','');
                    LocalStorage.setObject('companyinfo','');
                    $state.go('login');
                }else{
                    MsgService.errormsg(data);
                }
            });
        }
        //$scope.searchText=$rootScope.$stateParams.name;
        $scope.searchFun=function(){
            if(!$scope.searchText)return;
            $state.go("staffmsg.search",{name:$scope.searchText})
        }
    }])
;