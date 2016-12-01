/**
 * MainCtrl - controller--by Nose
 */
angular.module('qiyi')
    .controller('MainCtrl', ['$scope','$timeout','$modal','$state','LocalStorage','companyService','employeesService','roleService','accessService','OSSService','MsgService',function($scope,$timeout,$modal,$state,LocalStorage,companyService,employeesService,roleService,accessService,OSSService,MsgService) {
    $scope.collapsehset={toggleclick:"#infobtn",togglecom:".topinfo-com",setcomH:"-330px",openArrow:'right'};
/*    $scope.$on('$viewContentLoaded', function(){});*/
    $scope.$on('$stateChangeSuccess', function(){
        //alert(11);
        $timeout(function(){
            fix_height();
        },0);
    });
    var userinfo;
    $scope.initFun=function(){
        userinfo=LocalStorage.getObject('userinfo');
        //if(!userinfo.tokenId){$state.go('login');return;}
        getCompanyInfo();
        //getUserInfo()
        getUserFunction();
        //初始化阿里云OSS参数
        OSSService.inquiryOSSInfo({body:{}});
    }
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
                //getusrinfo();
                $scope.companyinfo=datas;
                LocalStorage.setObject('companyinfo',datas);
            }else{
                MsgService.errormsg(data);
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
            var status=data.body.status;
            var header=data.header;
            if(status.statusCode==0){
                var userinfoall=angular.extend({},userinfo,datas.userList[0]);
                $scope.userinfoall=userinfoall;
                LocalStorage.setObject('userinfo',userinfoall);
            }else{
                MsgService.errormsg(data);
            }
        });
    }
    function getUserFunction(){	//得到用户所有权限并用于权限控制
        var options={
            "id":userinfo.id,
            "personalEmail":userinfo.personalEmail,
            "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,
            "personalPhone":userinfo.personalPhone
        }
        var promise = roleService.inquiryUserFunction({body:options});
        promise.success(function(data, status, headers, config){
            var datas=data.body.data;
            var status=data.body.status;
            var header=data.header;
            if(status.statusCode==0){
                accessService.setAccessList(datas.functionList);
            }else{
                MsgService.errormsg("获取用户权限失败");
            }
        });
    }

}])
    .controller('headerCtrl',['$rootScope','$scope','$state','LocalStorage','publicService','MsgService',function($rootScope,$scope,$state,LocalStorage,publicService,MsgService){
        $scope.inithdFun=function(){
            loginstate(); //登录状态设置
        };
        //登录状态设置
        function loginstate(){
            // 写入userinfo companyinfo
            $scope.userinfoall=LocalStorage.getObject('userinfo');
            $scope.companyinfo=LocalStorage.getObject('companyinfo');
        }
        $scope.logout=function(){
            var promise = publicService.logout({});
            promise.success(function(data, status, headers, config){
                var status=data.body.status;
                if(status.statusCode==0){
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