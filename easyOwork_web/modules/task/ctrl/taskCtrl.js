
function sendtaskCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','taskService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,taskService,LocalStorage,Common){
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
    	$scope.initFun=function(){
    		inquiryCreatedTasks();
    	};
        
        
        $scope.addRenwu = function () {
            var modalInstance = $modal.open({
                templateUrl: 'addRenwu.html',
                //size:'sm',
                controller: modalCtrl,
                resolve:{
                    listClass : function() {
                        return $scope.listClass;
                    }
                }
            });
            function modalCtrl ($scope, $modalInstance,listClass) {
                $scope.listClass=listClass;                        
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        };



    	function inquiryCreatedTasks(){
            $scope.options={
        		"userDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = taskService.inquiryCreatedTasks({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.tasklist=data.body.data.tasks;
                    $scope.thispages.total=$scope.tasklist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	}
    	$scope.deleteTask = function(task){
    		Common.openConfirmWindow().then(function() {
    			$scope.options={
        			"actionType":'DELETE',
                    "taskUuid":task.taskUuid
                };
        		var promise = taskService.changeTask({body:$scope.options});
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
    	
    	$scope.deleteMultipleTasks = function(){
    		var selectedTasks = [];
    		angular.forEach($scope.tasklist, function(obj, key) {
				if(obj.checked) selectedTasks.push({'taskUuid':obj.taskUuid});
			})
			if(selectedTasks.length == 0){
				MsgService.tomsg('请选择任务');
				return;
			}
    		Common.openConfirmWindow().then(function() {
    			$scope.options={
                    "tasks":selectedTasks
                };
        		var promise = taskService.deleteTasks({body:$scope.options});
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
    	
    	$scope.editTask = function(task){
    		$state.go('task.edittask',{selectedTask:task});
    	}

    }]
}

function receivetaskCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','taskService','LocalStorage','Common',function($scope,$modal,$compile,$state,roleService,MsgService,taskService,LocalStorage,Common){
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.thispages={
            total:null,
            pageNum:1,
            pageSize:10
        };
    	$scope.initFun=function(){
    		inquiryAssignedTasks();
    	};
        $scope.styleObj={
            "width":"10%"
        }
    	function inquiryAssignedTasks(){
            $scope.options={
        		"userDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                }
            };
            var promise = taskService.inquiryAssignedTasks({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.tasklist=data.body.data.tasks;
                    $scope.thispages.total=$scope.tasklist.length;	//分页
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	}
    	
    	$scope.viewTask = function(task){
    		$state.go('task.viewtask',{selectedTask:task});
    	}

    }]
}

function addtaskCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','taskService','LocalStorage','$stateParams','noseService','Common','OSSService',function($scope,$modal,$compile,$state,roleService,MsgService,taskService,LocalStorage,$stateParams,noseService,Common,OSSService){
    	
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.editMode = false;
        var companyinfo;
    	$scope.initFun=function(){
            getduanDateFun();
            // companyinfo=LocalStorage.getObject('companyinfoR');
	    	$scope.task={
	    		"taskType":"",
	    		"title":"",
	    		"content":"",
	    		"startDate":$scope.currentDate.cdate,
	    		"endDate":null,
	    		"userDTO":{},
	    		"userDTOList":[]
                // "sourseUrl":companyinfo.sourseUrl
	    	};
	    	var selectedTask = $stateParams.selectedTask;
	    	if(selectedTask != undefined && selectedTask != null){
	    		$scope.editMode = true;
	    		$scope.task = selectedTask;
	    		$scope.theapply={
	                 userDTOList:selectedTask.userDTOList
                };
	    	}
    	};
    	//上传开始
        // var uploader = $scope.uploader = new FileUploader({
        //     url: '', //不使用默认URL上传
        //     queueLimit: 1,     //文件个数
        //     removeAfterUpload: true,   //上传后删除文件
        //     autoUpload:false
        // });
        // uploader.onAfterAddingFile = function(fileItem){
        //     uploader.cancelAll();
        //     var file = $("#licence").get(0).files[0];
        //     var filePath = $scope.task.userDTO+'/company/sourse/';
        //     var key= filePath+file.name;
        //     var promise = OSSService.uploadFile(filePath,file);
        //     promise.success(function (data, status, headers, config) {
        //          var urlPromise = OSSService.getUrl({'body':{'key':key}});
        //          urlPromise.success(function (data, status, headers, config) {
        //              var sts=data.body.status;
        //              if(sts.statusCode==0){
        //                  $scope.EPinfo.sourseUrl = data.body.data.url;
        //                  LocalStorage.setObject('companyinfoR',$scope.EPinfo);
        //                  $scope.changeCompanyInfoFun($scope.EPinfo.sourseUrl,'licenceUrl');
        //              }
        //          });
                 
        //     })
        // };


        function getduanDateFun(){
           $scope.currentDate= Common.getduanDate(0,1)[0];
        }

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
                $scope.task.userDTOList=userDTOList;
                $scope.task.orgDTOList=orgDTOList;
            }
    		
    		$scope.options={
    			"actionType":'ADD',
        		"userDTO":{
                    "id":userinfo.id,	//员工号
                    "personalEmail":userinfo.personalEmail,	//邮件地址
                    "personalPhoneCountryCode":userinfo.personalPhoneCountryCode,	//电话号码
                    "personalPhone":userinfo.personalPhone		//电话号码
                },
                "taskType":$scope.task.taskType,
                "title":$scope.task.title,
                "content":$scope.task.content,
                "startDate":$scope.task.startDate,
                "endDate":$scope.task.endDate,
                "userDTOList":$scope.task.userDTOList
            };
    		if($scope.editMode){
    			$scope.options.actionType = 'MODIFY';
    			$scope.options.taskUuid = $scope.task.taskUuid;
    		}
    		var promise = taskService.changeTask({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                	$state.go('task.sendlist');
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
function viewtaskCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','MsgService','taskService','LocalStorage','$stateParams','noseService',function($scope,$modal,$compile,$state,roleService,MsgService,taskService,LocalStorage,$stateParams,noseService){
    	
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.initFun=function(){
	    	var selectedTask = $stateParams.selectedTask;
	    	if(selectedTask != undefined && selectedTask != null){
	    		$scope.task = selectedTask;
	    		$scope.theapply={
	                 userDTOList:selectedTask.userDTOList
                };
	    	}
    	};
        $scope.styleObj = {
            "width":"10%"
        }
        $scope.isBtnTrue="false";
        $scope.isBtnFalse="true";
        $scope.submitFinish=function(){
            $scope.isBtnTrue="false";
            $scope.isBtnFalse="true";
        }
        $scope.changeFinish=function(){
            $scope.isBtnTrue="true";
            $scope.isBtnFalse="false";
        }
        // $scope.editProgress = function () {
        //     var modalInstance = $modal.open({
        //         templateUrl: 'editprogressR.html',
        //         controller: modalCtrl,
        //         resolve:{
        //             datadt : function() {
        //                 return $scope.datadt;
        //             }
        //         }
        //     });
        //     function modalCtrl ($scope, $modalInstance,datadt) {
        //         $scope.progress = datadt.projectProgress;
        //         $scope.ok = function (state) {
        //             if(!state){return;} //状态判断
        //             //判断格式
        //             if($scope.progress!=undefined && $scope.progress<=100){
        //                 var promise = projectService.changeProject({body:{"actionType":'MODIFY',"projectName":datadt.projectName,'projectProgress':$scope.progress}});
        //                 promise.success(function(data, status, headers, config){
        //                     var sts=data.body.status;
        //                     if(sts.statusCode==0){
        //                         datadt.projectProgress = $scope.progress;
        //                         $modalInstance.close();
        //                     }else{
        //                         MsgService.tomsg(data.body.status.errorDesc);
        //                     }
        //                 });
        //                 promise.error(function(data, status, headers, config){
        //                     MsgService.tomsg(data.body.status.errorDesc);
        //                 });
        //             }
        //         };
        //         $scope.cancel = function () {
        //             $modalInstance.dismiss('cancel');
        //         };
        //     };
        // };

    	$scope.updateTask = function(actionType){
    		$scope.options={
    			"actionType":actionType,
                "taskUuid":$scope.task.taskUuid
            };
    		var promise = taskService.changeTask({body:$scope.options});
            promise.success(function(data, status, headers, config){
            	var sts=data.body.status;
                if(sts.statusCode==0){
                	$state.go('task.receivelist');
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
            	MsgService.tomsg(data.body.status.errorDesc);
            });
    	};
    	
    }]
}
