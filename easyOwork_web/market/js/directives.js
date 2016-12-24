

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


/**
 *
 * Pass all functions into module
 */
angular
    .module('market.directives',[])
    .directive('multipleEmail', multipleEmail) // 手机和邮箱验证
;
