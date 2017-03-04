/**
 * Created by Nose on 2016/9/1.
 */
var app = angular.module('wechat.filters',[]);
//truncate
app.filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    });

//porject状态
app.filter('cutlast',function(){
    return function (input, breakOnWord) {
    	if(input.length<=breakOnWord) return input;
    	else{
    		return input.substr(input.length-breakOnWord, breakOnWord);
    	}
    }
});
