/**
 * Created by Nose on 2016/8/30.
 */
function loginCtrl(){
    return['$scope','$modal','$state','publicService','noseService','LocalStorage','notify',function($scope,$modal,$state,publicService,noseService,LocalStorage,notify){
        //公用登录方法
        function Funlogin(options,$modalInstance){
            var promise = publicService.login({body:options});
            promise.success(function(data, status, headers, config){
                var status=data.body.status;
                var header=data.header;
                if(status.statusCode==0){
                    //getusrinfo();
                    $scope.Perdata={
                        "tokenId":header.tokenId,
                        "entId":header.entId,
                        "type":options.type,
                        "id":options.id,
                        "personalEmail":options.personalEmail,
                        "personalPhoneCountryCode":options.personalPhoneCountryCode,
                        "personalPhone":options.personalPhone
                    };
                    LocalStorage.setObject('userinfo',$scope.Perdata);
                    $state.go('index');
                    $modalInstance.close();
                }else{
                    notify({ message: status.errorDesc, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
                }
            });
        }
        //登录
        function loginbox() {
            var modalInstance = $modal.open({
                templateUrl: 'modules/login/tmp/login_modal.html',
                controller: loginModalCtrl
            });
            function loginModalCtrl ($scope, $modalInstance) {
                $scope.Zh={
                    registername:null,
                    registerPassword:null
                };

                $scope.ok = function (state) {
                    if(!state){return;}
                    var typearr=noseService.judgeloginClass($scope.Zh.registername);
                    $scope.options={
                        "type":typearr[0],
                        "id":typearr[1][2],
                        "personalEmail":typearr[1][0],
                        "personalPhoneCountryCode":"86",
                        "personalPhone":typearr[1][1],
                        "password":$scope.Zh.registerPassword
                    };
                    Funlogin($scope.options,$modalInstance)
                };
                //获取用户基本信息存储在LocalStorage
/*                function getusrinfo(){
                    var promise = privatesCustomersService.getcustomer();
                    promise.success(function(data, status, headers, config){
                        if(data != null){
                            var Perdata=data.data;
                            $scope.Perdata={
                                birthday:Perdata.birthday || '无', //生日
                            };
                            LocalStorage.setObject('usrinfo',$scope.Perdata);

                        }
                    });
                }*/

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

            };
        };
        $scope.loginModal=loginbox;

        //注册
        $scope.cpname=null;
        function registerModal(option) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/login/tmp/register_modal.html',
                controller: registerModalCtrl,
                resolve:{
                    items: function () {
                        return $scope.cpname;
                    }
                }
            });

            function registerModalCtrl ($scope, $modalInstance,items ,companyService) {
                $scope.user = {
                    name:items,
                    registerMobileCountryCode:'86',
                    verificationCode:null,
                    registerPassword:null
                };
                $scope.Zh={
                    name:$scope.user.name,
                    registername:null,
                    cpId:1
                };
                //注册实现
                $scope.secondStep=function(state){
                    if(!state){return;}
                    var typearr=noseService.judgeloginClass($scope.Zh.registername);
                    $scope.user.registerEmail=typearr[1][0];
                    $scope.user.registerMobileNo=typearr[1][1];
                    var promise = companyService.registerCompany({body:$scope.user});
                    promise.success(function(data, status, headers, config){
                        var status=data.body.status;
                        if(status.statusCode==0){
                            $scope.firstbox =! $scope.firstbox;
                            $scope.secondbox =! $scope.secondbox;
                        }else{
                            console.log(status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        debugger;
                    });
                };
                //发送验证码
                $scope.sendMSG=function(){
                    if(!$scope.Zh.registername){return;}
                    var typearr=noseService.judgeloginClass($scope.Zh.registername);
                    $scope.sendmsg = {
                        type:typearr[0],
                        email:typearr[1][0],
                        mobileNo:typearr[1][1],
                        mobileCountryCode:'86'
                    };
                    var promise = publicService.sendVerificationCode({body:$scope.sendmsg});
                    promise.success(function(data, status, headers, config){
                        debugger;
                        var status=data.body.status;
                        if(status.statusCode==0){
                            $scope.firstbox =! $scope.firstbox;
                            $scope.secondbox =! $scope.secondbox;
                        }else{
                            $scope.foodnearmeShop='';
                            console.log(status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        debugger;
                    });
                };

                $scope.ok = function () {
                    var typearr=noseService.judgeloginClass($scope.Zh.registername);
                    //登录
                    $scope.options={
                        "type":typearr[0],
                        "id":typearr[1][2],
                        "personalEmail":typearr[1][0],
                        "personalPhoneCountryCode":"86",
                        "personalPhone":typearr[1][1],
                        "password":$scope.user.registerPassword
                    };
                    Funlogin($scope.options,$modalInstance);
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

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.step1=true;
                $scope.step2=false;
                $scope.step3=false;
                //发送验证码
                $scope.sendMSG=function(){
                    if(!$scope.Zh.registername){return;}
                    var typearr=noseService.judgeloginClass($scope.Zh.registername);
                    $scope.sendmsg = {
                        type:typearr[0],
                        email:typearr[1][0],
                        mobileNo:typearr[1][1],
                        mobileCountryCode:'86'
                    };
                    var promise = publicService.sendVerificationCode({body:$scope.sendmsg});
                    promise.success(function(data, status, headers, config){
                        var status=data.body.status;
                        if(status.statusCode==0){
                            $scope.firstbox =! $scope.firstbox;
                            $scope.secondbox =! $scope.secondbox;
                        }else{
                            $scope.foodnearmeShop='';
                            console.log(status.errorDesc);
                        }
                    });
                    promise.error(function(data, status, headers, config){
                        debugger;
                    });
                };
                //检验验证码
                //第一步
                $scope.fdfirst={};
                $scope.firstStep=function(state){
/*                    if(!state){return;}
                    var typearr=noseService.judgeloginClass($scope.fdfirst.registername);
                    $scope.options = {
                        type:typearr[0],
                        email:typearr[1][0],
                        mobileNo:typearr[1][1],
                        mobileCountryCode:'86',
                        verificationCode:$scope.fdfirst.verificationCode
                    };
                    var promise = publicService.verifyCode({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var status=data.body.status;
                        if(status.statusCode==0){
                            $scope.step1 =false;
                            $scope.step2 =true;
                        }else{
                            notify({ message: status.errorDesc, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
                        }
                    });*/
                    $scope.step1 =false;
                    $scope.step2 =true;

                }
                //第二步
                $scope.secondStep=function(state){
                    if(!state){return;}
                    var typearr=noseService.judgeloginClass($scope.fdfirst.registername);
                    $scope.options = {
                        type:typearr[0],
                        personalEmail:typearr[1][0],
                        personalPhoneCountryCode:'86',
                        personalPhone:typearr[1][1],
                        verificationCode:$scope.fdfirst.verificationCode,
                        newPassword:$scope.fdfirst.registerPassword
                    };
                    var promise = publicService.resetPassword({body:$scope.options});
                    promise.success(function(data, status, headers, config){
                        var status=data.body.status;
                        if(status.statusCode==0){
                            $scope.step2 =false;
                            $scope.step3 =true;
                        }else{
                            notify({ message: status.errorDesc, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
                        }
                    });
                    promise.error(function(data, status, headers, config){
                    });
                    //$scope.step2 =false;
                    //$scope.step3 =true;
                }
                //第三步
                $scope.ok = function () {
                    //登录
                    var typearr=noseService.judgeloginClass($scope.fdfirst.registername);
                    $scope.options={
                        "type":typearr[0],
                        "id":typearr[1][2],
                        "personalEmail":typearr[1][0],
                        "personalPhoneCountryCode":"86",
                        "personalPhone":typearr[1][1],
                        "password":$scope.fdfirst.registerPassword
                    };

                    Funlogin($scope.options,$modalInstance);
                    //$modalInstance.close();
                    //$state.go('index');
                };

            };
        };

        $scope.findpwdModal=findpwd;


    }]
}

