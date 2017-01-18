var app = angular.module('qiyi.sales',[]);
app.controller('customermsgCtrl',customermsgCtrl());
app.controller('customerdtmainmsgCtrl',customerdtmainmsgCtrl());

app.controller('PtcustomermsgCtrl',PtcustomermsgCtrl());
app.controller('PtcustomerdtmainmsgCtrl',PtcustomerdtmainmsgCtrl());

app.controller('assetsmsgCtrl',assetsmsgCtrl());
app.controller('assetsdtmainmsgCtrl',assetsdtmainmsgCtrl());

app.controller('assetsmpmsgCtrl',assetsmpmsgCtrl());
app.controller('assetsmpdtmainmsgCtrl',assetsmpdtmainmsgCtrl());

app.controller('activityCtrl',activityCtrl());
app.controller('activitydtmainCtrl',activitydtmainCtrl());
