/**
 * Created by Nose on 2016/8/30.
 */
function loginCtrl(){
    return['$scope','$modal','$state','publicService',function($scope,$modal,$state,publicService){
        //登录
        $scope.login=function login(){
            var options={
                "header":{
                    "requestId":"12345678900987654321123456789009",
                    "timeStamp":"20160918080808",
                    "applicationId":"ezKompany-work",
                    "ip":"127.0.0.1",
                    "tokenId":"I0tGIIjMlyAXxs0ojhCJ4b7mHk3xzqSo",
                    "entId":"00000006"
                },
                "body":{
                    "type":"EMAIL",
                    "id":"",
                    "personalEmail":"chenjian407@163.com",
                    "personalPhoneCountryCode":"",
                    "personalPhone":"",
                    "password":"123456"
                }
            };
            debugger;
            var promise = publicService.login(options);
            promise.success(function(data, status, headers, config){
                if(data.data !=null){

                }else{
                    $scope.foodnearmeShop='';
                }
            });
            promise.error(function(data, status, headers, config){
                debugger;
                console.log(data.msg);
            });

        };

        function loginbox() {
            var modalInstance = $modal.open({
                templateUrl: 'modules/login/tmp/login_modal.html',
                controller: loginModalCtrl
            });
            function loginModalCtrl ($scope, $modalInstance) {



                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.findpwd=function(){
                    findpwd();
                    $modalInstance.close();
                };
                $scope.register=function(){
                    registerModal();
                    $modalInstance.close();
                };
                $scope.states = [
                    'Alabama'
                ];

            };
        };
        $scope.loginModal=loginbox;
        //注册
         function registerModal(option) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/login/tmp/register_modal.html',
                controller: registerModalCtrl,
                windowClass: "animated fadeIn"
            });

            function registerModalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.loginbox=function(){
                    loginbox();
                    $modalInstance.close();
                };
                if(option=='invite'){
                    $scope.invite = true
                }
                $scope.firstbox=true;
                $scope.secondbox=false;
                $scope.secondStep=function(){
                    $scope.firstbox =! $scope.firstbox;
                    $scope.secondbox =! $scope.secondbox;
                }

            };

        };
        $scope.registerModal=registerModal;
        //找回密码
        function findpwd() {
            var modalInstance = $modal.open({
                templateUrl: 'modules/login/tmp/findpwd_modal.html',
                controller: findpwdModalCtrl,
                windowClass: "animated fadeIn"
            });

            function findpwdModalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    //loginbox();
                    $modalInstance.close();
                    $state.go('index');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.step1=true;
                $scope.step2=false;
                $scope.step3=false;
                $scope.firstStep=function(){
                    $scope.step1 =false;
                    $scope.step2 =true;
                }
                $scope.secondStep=function(){
                    $scope.step2 =false;
                    $scope.step3 =true;
                }

            };
        };

        $scope.findpwdModal=findpwd;


    }]
}

