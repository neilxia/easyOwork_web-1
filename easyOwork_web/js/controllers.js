/**
 * MainCtrl - controller--by Nose
 */
angular.module('qiyi')
    .controller('MainCtrl', ['$scope','$timeout','$modal','$state','LocalStorage','companyService','employeesService',function($scope,$timeout,$modal,$state,LocalStorage,companyService,employeesService) {
    $scope.collapsehset={toggleclick:"#infobtn",togglecom:".topinfo-com",setcomH:"-330px",openArrow:'right'};
/*    $scope.$on('$viewContentLoaded', function(){});*/
    $scope.$on('$stateChangeSuccess', function(){
        //alert(11);
        $timeout(function(){
            fix_height();
        },0);
    });
    var userinfo=LocalStorage.getObject('userinfo');
    $scope.initFun=function(){
        //if(!userinfo.tokenId){$state.go('login');return;}
        getCompanyInfo();
        getUserInfo()
    }
    function getCompanyInfo(){
        $scope.options={
            "entId":userinfo.entId
        }
        var promise = companyService.inquiryCompanyInfo({body:$scope.options});
        promise.success(function(data, status, headers, config){
            debugger;
            var datas=data.body.data;
            var status=data.body.status;
            if(status.statusCode==0){
                //getusrinfo();
                $scope.companyinfo=datas;
                LocalStorage.setObject('companyinfo',datas);
            }else{
                alert(status.errorDesc);
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
                alert(status.errorDesc);
            }
        });
    }

}])
    .controller('headerCtrl',['$scope','LocalStorage','publicService',function($scope,LocalStorage,publicService){
        $scope.inithdFun=function(){
            loginstate(); //登录状态设置
        };
        //登录状态设置
        function loginstate(){
            // 写入userinfo companyinfo
            $scope.userinfoall=LocalStorage.getObject('userinfo');
            $scope.companyinfo=LocalStorage.getObject('companyinfo');
            debugger;
        }
        $scope.logout=function(){
            var promise = publicService.logout({});
            promise.success(function(data, status, headers, config){
                var status=data.body.status;
                debugger;
                if(status.statusCode==0){
                    LocalStorage.setObject('uesrinfo','');
                    LocalStorage.setObject('companyinfo','');
                    $state.go('login');
                }else{
                    alert(status.errorDesc);
                }
            });
        }
    }])
;