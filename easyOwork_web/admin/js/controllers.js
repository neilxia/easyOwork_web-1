/**
 * MainCtrl - controller--by Nose
 */
angular.module('qiyi')
    .controller('MainCtrl', ['$rootScope','$scope','$timeout','$modal','$state','LocalStorage','roleService','accessService','OSSService','MsgService','processService','Common','attendanceService','MemoService','noticeService','publicService',function($rootScope,$scope,$timeout,$modal,$state,LocalStorage,roleService,accessService,OSSService,MsgService,processService,Common,attendanceService,MemoService,noticeService,publicService) {
    $scope.collapsehset={toggleclick:"#infobtn",togglecom:".topinfo-com",setcomH:"-330px",openArrow:'right'};
/*    $scope.$on('$viewContentLoaded', function(){});*/

        $scope.initFun=function(){
            //if(!userinfo.tokenId){$state.go('login');return;}
            //初始化阿里云OSS参数
            //OSSService.inquiryOSSInfo({body:{}});
            //getduanDateFun();//当前日期
            //inquiryAnnouncementsFun();//公告
            $scope.initCustomer();
            $scope.initIncome();
        }
        $scope.initCustomer = function(){
            var myChart = echarts.init(document.getElementById('customerChart'));
            var option = {
                        title: {
                            text: '客户'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['客户数量']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: ['2017/04/01','2017/04/02','2017/04/03','2017/04/04','2017/04/05','2017/04/06','2017/04/07']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [
                            {
                                name:'客户数量',
                                type:'line',
                                data:[120, 130, 140, 150, 160, 170, 180],
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'}
                                    ]
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);

        }
        $scope.initIncome = function(){
            var myChart = echarts.init(document.getElementById('incomeChart'));
            var option = {
                        title: {
                            text: '收入(单位: 万元)'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['收入金额']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: ['2017/04/01','2017/04/02','2017/04/03','2017/04/04','2017/04/05','2017/04/06','2017/04/07']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [
                            {
                                name:'收入金额',
                                type:'line',
                                data:[120, 130, 140, 150, 160, 170, 180],
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'}
                                    ]
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);

        }
        
        /**
        $scope.$on('to-parent2', function(event,data) {
            $scope.userinfoall=LocalStorage.getObject('userinfo');
            inquiryCreatedProcessesFun();//查询发起的流程
            inquiryHandlingProcessesFun();//查询审批
            inquiryMemosFun(); //查询备忘录
            inquiryAttendanceFun();//获取当前签到信息
        });*/

        


    }])
    .controller('headerCtrl',['$rootScope','$scope','$state','LocalStorage','publicService','MsgService','companyService','employeesService','$timeout',function($rootScope,$scope,$state,LocalStorage,publicService,MsgService,companyService,employeesService,$timeout){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.inithdFun=function(){
            //getCompanyInfo();
            //getUserInfo();
            //getNotes();
        	//initMain();
        };
        

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
            $state.go("colleague.search",{name:$scope.searchText})
        }
    }])
;