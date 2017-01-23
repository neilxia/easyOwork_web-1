/**
 * MainCtrl - controller--by Nose
 */
angular.module('qiyi')
    .controller('MainCtrl', ['$rootScope','$scope','$timeout','$modal','$state','LocalStorage','roleService','accessService','OSSService','MsgService','processService','Common','attendanceService','MemoService','noticeService','publicService',function($rootScope,$scope,$timeout,$modal,$state,LocalStorage,roleService,accessService,OSSService,MsgService,processService,Common,attendanceService,MemoService,noticeService,publicService) {
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
            getduanDateFun();//当前日期
            inquiryAnnouncementsFun();//公告
        }
        $scope.$on('to-parent1', function(event,data) {
            $scope.companyinfo=LocalStorage.getObject('companyinfo');
        });
        $scope.$on('to-parent2', function(event,data) {
            $scope.userinfoall=LocalStorage.getObject('userinfo');
            inquiryCreatedProcessesFun();//查询发起的流程
            inquiryHandlingProcessesFun();//查询审批
            inquiryMemosFun(); //查询备忘录
            inquiryWorkingTimeFun();//查询工作时间
            inquiryAttendanceFun();//获取当前签到信息
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
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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
                    MsgService.tomsg(sts.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
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

        //当前日期
        function getduanDateFun(){
           $scope.currentDate= Common.getduanDate(0,1)[0];
        }
        
        //获取工作时间
        function inquiryWorkingTimeFun(){
            var promise = publicService.inquiryParameter({body:{}});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.settings;
                    var datalistnew=[];
                    angular.forEach(datalist,function(val,ind){
                        if(val.name=='WORKING_FROM_TIME'){
                            $scope.fromTime = val.value;
                        }else if(val.name=='WORKING_TO_TIME'){
                        	$scope.toTime = val.value;
                        }
                    })
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            
            });
            promise.error(function(data, status, headers, config){
            	
            });
        }
        
        //获取当天签到记录
        function inquiryAttendanceFun(){
        	var date = new Date();
            var currentDay={
                attendanceYear:date.getFullYear(),
                attendanceMonth:date.getMonth()+1,
                attendanceDay:date.getDate()
            }
        	$scope.options={
                "attendanceYear":currentDay.attendanceYear,	//签到或签退年份
                "attendanceMonth":currentDay.attendanceMonth,	//签到或签退月份
                "attendanceDay":currentDay.attendanceDay,		//签到或签退天
                "userDTO":{
                    "id":$scope.userinfoall.id || "",	//员工号
                    "personalEmail":$scope.userinfoall.personalEmail || "",	//邮件地址
                    "personalPhoneCountryCode":$scope.userinfoall.personalPhoneCountryCode || "",	//电话号码国家代码
                    "personalPhone":$scope.userinfoall.personalPhone || ""		//电话号码
                }
            };
            var promise = attendanceService.inquiryAttendance({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	if(data.body.data.attendances.length>0){
                		$scope.attendance = data.body.data.attendances[0];
                	}else{
                		$scope.attendance = {};
                	}
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        
        //签到/签退

        $scope.signInOutFun=function (actionType){
        	var date = new Date();
            var currentDay={
                attendanceYear:date.getFullYear(),
                attendanceMonth:date.getMonth()+1,
                attendanceDay:date.getDate()
            }
        	$scope.options={
                    "actionType":actionType,	//IN(签到),OUT(签退)
                    "attendanceYear":currentDay.attendanceYear,	//签到或签退年份
                    "attendanceMonth":currentDay.attendanceMonth,	//签到或签退月份
                    "attendanceDay":currentDay.attendanceDay,		//签到或签退天
                    "userDTO":{
                        "id":$scope.userinfoall.id || '',	//员工号
                        "personalEmail":$scope.userinfoall.personalEmail || '',	//邮件地址
                        "personalPhoneCountryCode":$scope.userinfoall.personalPhoneCountryCode || '',	//电话号码国家代码
                        "personalPhone":$scope.userinfoall.personalPhone || ''		//电话号码
                    }

                };
        	var promise = attendanceService.signInOut({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                	inquiryAttendanceFun();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        };

        //查询备忘录
        function inquiryMemosFun(){
            $scope.options={
                "userDTO":{
                    "id":$scope.userinfoall.id || "",	//员工号
                    "personalEmail":$scope.userinfoall.personalEmail || "",	//邮件地址
                    "personalPhoneCountryCode":"86",	//电话号码国家代码
                    "personalPhone":$scope.userinfoall.personalPhone || ""		//电话号码
                }
            };
            var promise = MemoService.inquiryMemo({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.memoslist=data.body.data.memos;
                    $scope.thispages.total=$scope.datalist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }

        //添加/修改/删除备忘录
        function changeMemoFun(change,row,$modalInstance,oldrow){
            if(oldrow==undefined){oldrow=row}
            if(change!='DELETE'){
                $scope.options={
                    "actionType":change,		//ADD, DELETE
                    "content":row.content,		//公告内容
                    "userDTO":{		//员工
                        "id":$scope.userinfoall.id || "",	//员工号
                        "personalEmail":$scope.userinfoall.personalEmail || "",	//邮件地址
                        "personalPhoneCountryCode":"86",	//电话号码国家代码
                        "personalPhone":$scope.userinfoall.personalPhone || ""		//电话号码
                    }
                };
            }else{
                $scope.options={
                    "actionType":change,		//ADD, DELETE
                    "memoUuid":row.memoUuid
                };
            }
            debugger;

            var promise = MemoService.changeMemo({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    inquiryMemosFun();
                    $modalInstance.close();
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
            return promise;
        }

        //新增
        $scope.addmemosFun = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addmemos.html',
                size:'sm',
                controller: modalCtrl,
                resolve:{
                    Types : function() {
                        return $scope.projectDefTypes;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,Types) {
                $scope.thename='新增';
                $scope.modalform={};
                //提交增加
                $scope.ok = function (state) {
                    if(!state){return;} //状态判断
                    changeMemoFun('ADD',$scope.modalform,$modalInstance);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };

        //删除
        $scope.deletememosFun=function(row){
            Common.openConfirmWindow().then(function() {
                changeMemoFun('DELETE',row);
            });
        };

        //查询公告
        function inquiryAnnouncementsFun(){
            var promise = noticeService.inquiryAnnouncements({body:{}});
            promise.success(function(data, status, headers, config){
                //远程开启下面的
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.inquiryAnnouncementsData=data.body.data.announcements;
                }else{
                    MsgService.tomsg(sts.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                var sts=data.body.status;
                MsgService.tomsg(sts.errorDesc);
            });
        };
        
      //公司设置帮助
        $scope.initCompanyHelp = function () {
            var modalInstance = $modal.open({
                templateUrl: 'init.html',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
            	
            	$scope.currentStep = 'step1';
                $scope.goStep = function (step) {
                    $scope.currentStep = 'step'+step;
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };


    }])
    .controller('headerCtrl',['$rootScope','$scope','$state','LocalStorage','publicService','MsgService','companyService','employeesService','$timeout',function($rootScope,$scope,$state,LocalStorage,publicService,MsgService,companyService,employeesService,$timeout){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.inithdFun=function(){
            getCompanyInfo();
            getUserInfo();
            getNotes();
        };
        function getNotes(){
        	var options={
                        "id":userinfo.id,	//员工号
                        "personalEmail":userinfo.personalEmail,	//邮件地址
                        "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                        "personalPhone":userinfo.personalPhone		//电话号码
                };
        	var promise = publicService.inquiryNotes({body:options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.notes=data.body.data.notes;
                    $scope.unreadCount = data.body.data.unreadCount;
                }
            });
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
                    //MsgService.tomsg(data.body.status.errorDesc);
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
                    //MsgService.tomsg(data.body.status.errorDesc);
                }
            });
        }
        $scope.markRead = function(note){
        	if(note.noteStatus=='UNREAD'){
        		note.noteStatus='READ';
        		$scope.unreadCount = $scope.unreadCount - 1;
            	publicService.markNoteRead({body:{"noteUuid":note.noteUuid}});
        	}
        }
        $scope.deleteNote = function(note,$index){
        	$scope.notes.splice($index, 1);
        	if(note.noteStatus=='UNREAD')
        		$scope.unreadCount = $scope.unreadCount - 1;
            publicService.deleteNote({body:{"noteUuid":note.noteUuid}});
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
                    MsgService.tomsg(data.body.status.errorDesc);
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