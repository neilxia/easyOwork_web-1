/**
 * Created by Nose on 2016/9/7.
 */
function listCtrl(){
    return['$scope', '$modal' ,'LocalStorage','companyService',function($scope,$modal,LocalStorage,companyService){
        var companyinfo;
        $scope.initFun=function(){
            companyinfo=LocalStorage.getObject('companyinfo');
            $scope.EPinfo={
                "entId":companyinfo.entId,	//企业号
                "name":companyinfo.name,	//公司名称
                "shortName":companyinfo.shortName,	//公司简称
                "entPhone":companyinfo.entPhone,	//公司电话
                "entEmail":companyinfo.entEmail,	//公司电子邮箱
                "contactName":companyinfo.contactName,		//联系人姓名
                "contactPhone":companyinfo.contactPhone,	//联系人电话
                "logoUrl":companyinfo.logoUrl,		//logo图片地址
                "licenceUrl":companyinfo.licenceUrl		//营业执照图片地址
            }
        }

        //修改公司基本信息
        $scope.changeCompanyInfoFun=function (data,name){
            if(!data){return;}
            switch(name){
                case 'name':{$scope.EPinfo.name=data; break;}
                case 'shortName':{$scope.EPinfo.shortName=data; break;}
                case 'entPhone':{$scope.EPinfo.entPhone=data; break;}
                case 'entEmail':{$scope.EPinfo.entEmail=data; break;}
                case 'contactName':{$scope.EPinfo.contactName=data; break;}
                case 'contactPhone':{$scope.EPinfo.contactPhone=data; break;}
                case 'logoUrl':{$scope.EPinfo.logoUrl=data; break;}
                case 'licenceUrl':{$scope.EPinfo.licenceUrl=data; break;}
            }
            debugger;
            var promise = companyService.changeCompanyInfo({body:$scope.EPinfo});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    LocalStorage.setObject('companyinfo',$scope.EPinfo);
                    //MsgService.tomsg();
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
            return promise;
        };


    }]
}




function cssetCtrl(){
    return['$scope',function($scope){

        $scope.Param={
            Vcode:'3'
        }
    }]
}
function searchCtrl(){
    return['$scope','$modal',function($scope,$modal){
        $scope.staffbase=function(){
            var modalInstance = $modal.open({
                templateUrl: 'staffbase.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
    }]
}