
function sendreportCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
    	$scope.initFun=function(){
    		inquiryCreatedReports();
    	};
    	function inquiryCreatedReports(){
            $scope.options={
        		"userDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = reportService.inquiryCreatedReports({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.reportlist=data.body.data.reports;
                    $scope.thispages.total=$scope.reportlist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	}
    	$scope.deleteReport = function(report){
    		Common.openConfirmWindow().then(function() {
    			$scope.options={
        			"actionType":'DELETE',
                    "reportUuid":report.reportUuid
                };
        		var promise = reportService.changeReport({body:$scope.options});
                promise.success(function(data, status, headers, config){
                	var sts=data.body.status;
                    if(sts.statusCode==0){
                    	$scope.initFun();
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                	MsgService.tomsg(data.body.status.errorDesc);
                });
            })
    	}
    	
    	$scope.deleteMultipleReports = function(){
    		var selectedReports = [];
    		angular.forEach($scope.reportlist, function(obj, key) {
				if(obj.checked) selectedReports.push({'reportUuid':obj.reportUuid});
			})
			if(selectedReports.length == 0){
				MsgService.tomsg('请选择报告');
				return;
			}
    		Common.openConfirmWindow().then(function() {
    			$scope.options={
                    "reports":selectedReports
                };
        		var promise = reportService.deleteReports({body:$scope.options});
                promise.success(function(data, status, headers, config){
                	var sts=data.body.status;
                    if(sts.statusCode==0){
                    	$scope.initFun();
                    }else{
                        MsgService.tomsg(data.body.status.errorDesc);
                    }
                });
                promise.error(function(data, status, headers, config){
                	MsgService.tomsg(data.body.status.errorDesc);
                });
            })
    	}
    	
    	$scope.editReport = function(report){
    		$state.go('report.editreport',{selectedReport:report});
    	}

    }]
}

function receivereportCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,Common){
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
    	$scope.initFun=function(){
    		inquiryAssignedReports();
    	};
    	function inquiryAssignedReports(){
            $scope.options={
        		"userDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = reportService.inquiryAssignedReports({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.reportlist=data.body.data.reports;
                    $scope.thispages.total=$scope.reportlist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	}
    	
    	$scope.viewReport = function(report){
    		$state.go('report.viewreport',{selectedReport:report});
    	}

    }]
}

function addreportCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','$stateParams','noseService',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,$stateParams,noseService){
    	
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.editMode = false;
    	$scope.initFun=function(){
	    	$scope.report={
	    		"reportType":"",
	    		"title":"",
	    		"content":"",
	    		"startDate":null,
	    		"endDate":null,
	    		"userDTO":{},
	    		"userDTOList":[]
	    	};
	    	var selectedReport = $stateParams.selectedReport;
	    	if(selectedReport != undefined && selectedReport != null){
	    		$scope.editMode = true;
	    		$scope.report = selectedReport;
	    		$scope.theapply={
	                 userDTOList:selectedReport.userDTOList
                };
	    		if($scope.report.month != null)
	    			$scope.report.month = new Date($scope.report.year,$scope.report.month-1,1);
	    		if($scope.report.year != null)
	    			$scope.report.year = new Date($scope.report.year,0,1);
	    	}
    	};
    	
    	$scope.submit = function(){
    		
    		if($scope.theapply && $scope.theapply.selectedallarr){
                var userDTOList=[];
                var orgDTOList=[];
                if($scope.theapply.selectedallarr[1].length>0){
                    angular.forEach($scope.theapply.selectedallarr[1],function(val,ind){
                        userDTOList.push({		//适用人员
                            "id":$scope.theapply.selectedallarr[1][ind].id || '',
                            "personalEmail":$scope.theapply.selectedallarr[1][ind].personalEmail || '',
                            "personalPhoneCountryCode":$scope.theapply.selectedallarr[1][ind].personalPhoneCountryCode || '',
                            "personalPhone":$scope.theapply.selectedallarr[1][ind].personalPhone || ''
                        })
                    });
                }
                if($scope.theapply.selectedallarr[0].length>0){
                    angular.forEach($scope.theapply.selectedallarr[0],function(val,ind){
                        orgDTOList.push({		//适用角色
                            "name":$scope.theapply.selectedallarr[0][ind].text || ''
                        })
                    });
                }
                $scope.report.userDTOList=userDTOList;
                $scope.report.orgDTOList=orgDTOList;
            }
    		
    		$scope.options={
    			"actionType":'ADD',
        		"userDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                },
                "reportType":$scope.report.reportType,
                "title":$scope.report.title,
                "content":$scope.report.content,
                //"startDate":$scope.report.startDate,
                //"endDate":$scope.report.endDate,
                //"year":$scope.report.year,
                //"quarter":$scope.report.quarter,
                //"month":$scope.report.month,
                "userDTOList":$scope.report.userDTOList
            };
    		if($scope.editMode){
    			$scope.options.actionType = 'MODIFY';
    			$scope.options.reportUuid = $scope.report.reportUuid;
    		}
    		if($scope.report.reportType == '日报'){
    			$scope.options.startDate=$scope.report.startDate;
    		}else if($scope.report.reportType == '周报'){
    			$scope.options.startDate=$scope.report.startDate;
    			$scope.options.endDate=$scope.report.endDate;
    		}else if($scope.report.reportType == '月报'){
    			$scope.options.month=$scope.report.month.getMonth()+1;
    			$scope.options.year=$scope.report.month.getFullYear();
    		}else if($scope.report.reportType == '季报'){
    			$scope.options.year=$scope.report.year.getFullYear();
    			$scope.options.quarter=$scope.report.quarter;
    		}else if($scope.report.reportType == '年报'){
    			$scope.options.year=$scope.report.year.getFullYear();
    		}
    		var promise = reportService.changeReport({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                	$state.go('report.sendlist');
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	}
    	
    }]
}
function viewreportCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','reportService','LocalStorage','$stateParams','noseService',function($scope,$modal,$compile,$state,roleService,MsgService,reportService,LocalStorage,$stateParams,noseService){
    	
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.initFun=function(){
	    	var selectedReport = $stateParams.selectedReport;
	    	if(selectedReport != undefined && selectedReport != null){
	    		$scope.report = selectedReport;
	    		$scope.theapply={
	                 userDTOList:selectedReport.userDTOList
                };
	    		if($scope.report.month != null)
	    			$scope.report.month = new Date($scope.report.year,$scope.report.month-1,1);
	    		if($scope.report.year != null)
	    			$scope.report.year = new Date($scope.report.year,0,1);
	    	}
    	};
    	
    }]
}
