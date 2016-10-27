/**
 * MainCtrl - controller--by Nose
 */
angular.module('qiyi').controller('MainCtrl', ['$scope','$timeout','$modal',function($scope,$timeout,$modal) {
    $scope.collapsehset={toggleclick:"#infobtn",togglecom:".topinfo-com",setcomH:"-330px",openArrow:'right'};
/*    $scope.$on('$viewContentLoaded', function(){
        alert(11);
        //fix_height();
    });*/
    $scope.$on('$stateChangeSuccess', function(){
        //alert(11);
        $timeout(function(){
            fix_height();
        },0);
    });

    /*    $scope.load = function() {
            alert('code here');
        }*/
/*    $scope.$watch('$viewContentLoaded', function() {
        alert('1');
    });*/
}]);