

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
 *
 * Pass all functions into module
 */
angular
    .module('wechat.directives',[])
    .directive('multipleEmail', multipleEmail) // 手机和邮箱验证
    .directive('getCode', getCode) //获取验证码
    .directive('icheck', icheck)
;
