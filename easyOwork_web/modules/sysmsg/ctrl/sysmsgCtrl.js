/**
 * Created by Nose on 2016/9/7.
 */
function listCtrl(){
    return['$scope', '$modal' ,'LocalStorage','companyService','FileUploader','OSSService',function($scope,$modal,LocalStorage,companyService,FileUploader,OSSService){
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


        //上传开始
        var uploader = $scope.uploader = new FileUploader({
            url: '', //不使用默认URL上传
            queueLimit: 1,     //文件个数
            removeAfterUpload: true,   //上传后删除文件
            autoUpload:false
        });
        uploader.onAfterAddingFile = function(fileItem){
        	uploader.cancelAll();
        	var file = $("#licence").get(0).files[0];
        	var filePath = $scope.EPinfo.entId+'/company/licence/';
        	var key= filePath+file.name;
        	var promise = OSSService.uploadFile(filePath,file);
        	promise.success(function (data, status, headers, config) {
        		 var urlPromise = OSSService.getUrl({'body':{'key':key}});
        		 urlPromise.success(function (data, status, headers, config) {
        			 var sts=data.body.status;
                     if(sts.statusCode==0){
                    	 $scope.EPinfo.licenceUrl = data.body.data.url;
                    	 LocalStorage.setObject('companyinfo',$scope.EPinfo);
                    	 $scope.changeCompanyInfoFun($scope.EPinfo.licenceUrl,'licenceUrl');
                     }
        		 });
        		 
        	})
        };
        /*
        uploader.onSuccessItem = function(fileItem, response, status, headers) {

            localPhoto();
            function localPhoto(){
                var options={
                    id:$scope.Perdata.id,
                    photo:response.data
                };
                var promise = companyService.editcustomer(options);
                promise.success(function (data, status, headers, config) {
                    if (data.code == 201) {
                        $scope.Perdata.photo='./images/headportrait02.jpg';
                    } else {
                        $scope.Perdata.photo = response.data;
                        LocalStorage.setObject('usrinfo',$scope.Perdata);
                    }
                });
                promise.error(function (data, status, headers, config) {
                    ////alert(data.msg);
                });
            }

            //$scope.Perdata = angular.extend(data.data.photo,LocalStorage.getObject('usrinfo'));
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            debugger;
            console.info('onErrorItem', fileItem, response, status, headers);
        };
		*/
        var logoUploader = $scope.logoUploader = new FileUploader({
            url: '', //不使用默认URL上传
            queueLimit: 1,     //文件个数
            removeAfterUpload: true,   //上传后删除文件
            autoUpload:false
        });
        logoUploader.onAfterAddingFile = function(fileItem){
        	logoUploader.cancelAll();
        	var file = $("#logo").get(0).files[0];
        	var filePath = $scope.EPinfo.entId+'/company/logo/';
        	var key= filePath+file.name;
        	var promise = OSSService.uploadFile(filePath,file);
        	promise.success(function (data, status, headers, config) {
        		 var urlPromise = OSSService.getUrl({'body':{'key':key}});
        		 urlPromise.success(function (data, status, headers, config) {
        			 var sts=data.body.status;
                     if(sts.statusCode==0){
                    	 $scope.EPinfo.logoUrl = data.body.data.url;
                    	 LocalStorage.setObject('companyinfo',$scope.EPinfo);
                    	 $scope.changeCompanyInfoFun($scope.EPinfo.logoUrl,'logoUrl');
                     }
        		 });
        	})
        };


    }]
}




function cssetCtrl(){
    return['$scope','publicService',function($scope,publicService){
        $scope.initFun=function(){
            inquiryParameterFun();
        }
        //查询系统参数
        $scope.options={
            "name":""	//如为空则查询所有系统参数, 如有值则查询该参数
        };
        function inquiryParameterFun(){
            var promise = publicService.inquiryParameter({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    var datalist=data.body.data.settings;
                    angular.forEach(datalist,function(val,ind){
                        if(val.name=='LOGIN_EXPIRE_DURATION'){
                            val.nameas='登录超时';
                        }else if(val.name=='LOGIN_MAX_FAILED_COUNT'){
                            val.nameas='允许登录错误次数';
                        }
                    })
                    $scope.dataslist=datalist;
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        //修改系统参数
        $scope.changeParameterFun=function (data,name){
            $scope.options={
                "settings":[		//数组, 一次可修改多个参数
                    {
                        "name":name,	//必填项 , 参数名
                        "value":data		//必填项 , 参数值
                    }
                ]
            };
            var promise = publicService.changeParameter({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    MsgService.tomsg();
                    $modalInstance.close();
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
function searchCtrl(){
    return['$rootScope','$scope','$modal','employeesService',function($rootScope,$scope,$modal,employeesService){
        $scope.searchText=$rootScope.$stateParams.name;
        $scope.initFun=function(){
            inquiryEmployeeFun();
        }
        //查询本人/其他员工信息列表
        $scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
        function inquiryEmployeeFun(){
            $scope.options={
                "type":"NAME",
                "name":$rootScope.$stateParams.name
            };
            var promise = employeesService.inquiryEmployee({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datalist=data.body.data.userList;
                    $scope.searchcount=$scope.datalist.length;
                    //$scope.thispages.total=$scope.datalist.length;//分页总数
                }else{
                    MsgService.errormsg(data);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.errormsg(data);
            });
        };

        $scope.staffbase=function(row){
            var modalInstance = $modal.open({
                templateUrl: 'staffbase.html',
                //size:'md',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $modalInstance) {
                $scope.user=row;
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