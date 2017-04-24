/**
 * Created by Nose on 2016/9/1.
 */
var app = angular.module('qiyi.filters',[]);
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
    })
    //分割字符
    .filter('splitcharacters', function() {
        return function (input, chars) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                var prefix = input.substring(0, chars/2);
                var postfix = input.substring(input.length-chars/2, input.length);
                return prefix + '...' + postfix;
            }
            return input;
        };
    })
    //词
    .filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    //input = inputWords.slice(0, words).join(' ') + '…';
                    input = inputWords.slice(0, words).join(' ');
                }
            }
            return input;
        };
    })
    .filter('selected', ['$filter',function ($filter) {
        return function (files) {
            return $filter('filter')(files, { selected: true });
        };
    }
    ])
    //<tr ng-repeat="item in displayedItemsList | startFrom: currentPage * pageSize  | limitTo:pageSize" /tr>
    .filter('startFrom', function() {
        return function(input, start) {
            return input.slice(start);
        }
    })

;

//porject状态
app.filter('pjstatus',function(){
    return function (obj){
        if (obj.length <= 0) return;
        var val;
        switch (obj){
            case 'GREEN':
                val='正常';
                break;
            case 'RED':
                val='轻度';
                break;
            case 'YELLOW':
                val='严重';
                break;
            case 'COMPLETED':
                val='完成';
                break;
            default:
                val='无';
                break;
        }
        return val;
    }
});

app.filter('qystatus',function(){
    return function (obj){
        if (obj.length <= 0) return;
        var val;
        switch (obj){
            case 'NORMAL':
                val='一般';
                break;
            case 'IMPORTANT':
                val='重要';
                break;
            default:
                val='无';
                break;
        }
        return val;
    }
});
//营销
app.filter('activestatus',function(){
    return function (obj){
        if (obj.length <= 0) return;
        var val;
        switch (obj){
            case 'PLAN':
                val='计划中';
                break;
            case 'INPROGRESS':
                val='正在进行';
                break;
            case 'COMPLETED':
                val='已完成';
                break;
            case 'CANCELLED':
                val='已取消';
                break;
            default:
                val='无';
                break;
        }
        return val;
    }
});
