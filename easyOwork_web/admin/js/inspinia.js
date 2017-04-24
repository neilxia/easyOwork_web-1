/**
 * INSPINIA - Responsive Admin Theme
 * 2.3
 *
 * Custom scripts
 */
var pagewrapperH;
function fix_height() {
    var navbar = angular.element('nav.navbar-default');
    var pagewrapper = angular.element('#page-wrapper');
    //if(pagewrapperH==pagewrapper.outerHeight(true))return;
    pagewrapperH=pagewrapper.outerHeight(true);
    var winH=$(window).height();
    //var xxx=winH-98>pagewrapperH;
    //alert(winH);
    //alert(pagewrapperH);
    if(winH-98>pagewrapperH){
        pagewrapper.css("min-height", $(window).height()-98  + "px");
        navbar.css("min-height", $(window).height()-98  + "px");
    }else{
        navbar.css("min-height", pagewrapperH  + "px");
    }
}
angular.element(window).bind('load resize scroll', function() {
    //debugger;
    setTimeout(function(){
        fix_height();
    },0);
});
//$(window).bind("load resize scroll", function() {
/*
setTimeout(function(){
    fix_height();
},0);
*/
