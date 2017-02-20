/**
 * Created by Nose on 2016/9/7.
 */
function permissionsCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','notify',function($scope,$modal,$compile,$state,roleService,notify){
        
    	function FuncListAllRoles(){
        	var promise = roleService.inquiryRole({body:{}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 $scope.fullRoles = data.roles;
                	 $scope.roles = $scope.fullRoles;
                 }else{
                     notify({ message: status.errorDesc, classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
                 }
        	})
        };
        $scope.form={
        	"searchRoleName":"",
        	"selectedRoles":{}
        };
        $scope.initFun=function(){
        	FuncListAllRoles();
        };
        
        $scope.add = function(){
        	$state.go('permissions.addpromis');
        };
        
        $scope.searchRole = function(){
        	var roleName = $scope.form.searchRoleName;
        	if(roleName=="" || roleName==undefined){
        		$scope.roles = $scope.fullRoles;
        	}else{
        		var filterRoles = [];
        		for(var i=0;i<$scope.fullRoles.length;i++){
    			   if($scope.fullRoles[i].roleName.indexOf(roleName)>=0){
    				   filterRoles.push($scope.fullRoles[i]);
    			   }
        		}
        		$scope.roles = filterRoles;
        	}
        }
    	//删除
        $scope.delete=function(roleName){
        	//多条删除
        	if(roleName == "" || roleName == undefined){
	        	if($('input:checkbox[name=selectedFunction]:checked').length==0){
	        		notify({ message: '请选择角色', classes: 'orange iconfont icon-one', templateUrl:'modules/common/prompt.html' ,prompt:true});
	        		return;
	        	}
        	}
            var modalInstance = $modal.open({
                templateUrl: 'delete.html',
                size:'sm',
                controller: modalCtrl
            });
            function modalCtrl ($scope, $state, $modalInstance,notify) {
                $scope.ok = function () {
                    $modalInstance.close();
                    //多条删除
                    if(roleName != "" && roleName != undefined){
                    	var body = {
	                    	"actionType":"DELETE",
	                    	"roleName":roleName
	                    };
                    	var promise = roleService.changeRole({body:body});
                        promise.success(function(data, status, headers, config){
                   		 	var sts=data.body.status;
                            var data=data.body.data;
                            if(sts.statusCode==0){
                            	FuncListAllRoles();//refresh the list
                            }
                        })
                    }else{
                    	//多条删除
                    	var selectedFunctions = [];
                    	$('input:checkbox[name=selectedFunction]:checked').each(function(i){
                    		var selectedFunction = {};
                    		selectedFunction.roleName=$(this).val();
                    		selectedFunctions.push(selectedFunction);
                    	});
                    	var body = {
    	                    	"roles":selectedFunctions
    	                    };
                        	var promise = roleService.deleteRoles({body:body});
                            promise.success(function(data, status, headers, config){
                       		 	var sts=data.body.status;
                                var data=data.body.data;
                                if(sts.statusCode==0){
                                	FuncListAllRoles();//refresh the list
                                }
                            })
                    }
	                    
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        };
        $scope.changeRole=function(roleName){
        	for(var i=0;i<$scope.roles.length;i++){
 			   if($scope.roles[i].roleName==roleName){
 				  $state.go('permissions.editpromis',{selectedRole:$scope.roles[i]});
 				  break;
 			   }
     		}
        };
        $scope.viewRole=function(roleName){
        	for(var i=0;i<$scope.roles.length;i++){
 			   if($scope.roles[i].roleName==roleName){
 				  $state.go('permissions.viewpromis',{selectedRole:$scope.roles[i]});
 				  break;
 			   }
     		}
        };
        
        $scope.initFun();

    }]
}

function permissionsaddCtrl(){
    return['$scope','$modal','$state','roleService','$stateParams','MsgService',function($scope,$modal,$state,roleService,$stateParams,MsgService){
    	
    	$scope.treegirdoptions={
    			id:"Function",
                displayLevel:2,
                columns:[
                    {headerText: "功能名称", dataField: "name", width:'200'},
                    {headerText: "功能描述", dataField: "gndescribe",width:'auto'}
                ],
                data:[/**
                    {id:'A001',name:'平台管理',children:[
                        {id:'A001-001',name:'公司信息管理',gndescribe:'公司基本信息, 公司组织架构'},
                        {id:'A001-002',name:'平台参数设置',gndescribe:'平台相关系统参数设置'},
                        {id:'A001-003',name:'角色管理',gndescribe:'添加修改删除公司角色'}
                    ]},
                    {id:'A002',name:'流程管理',children:[
                        {id:'A002-1',name:'流程设置',gndescribe:'添加修改删除企业流程设置'}
                    ]}**/
                ],
                showCheckbox:true,
                autoChecked:true
            }
    	
    	$scope.FuncListAllFunctions = function(){
        	var promise = roleService.inquiryFunction({body:{}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 $scope.functionList = data.functionList;
                	 $scope.populateTreeGrid();
                	 $scope.functionGrid = $("#functionGrid").TreeGrid($scope.treegirdoptions);
                	
                	//如果从编辑页面过来, 则默认填充角色名称和描述, 以及相关的权限
                	 //var selectedRole = $stateParams.selectedRole;
                 	 if($scope.editMode){	//编辑模式
                 		$scope.thisform.roleName = $scope.selectedRole.roleName;
                 		$scope.thisform.roleDesc = $scope.selectedRole.roleDesc;
                 		//$('input:checkbox[name=selectedFunction]:checked')
                 		var roleFunctionList = $scope.selectedRole.functionList;
                 		for(var i=0; i<roleFunctionList.length; i++){
                 			var functionName = roleFunctionList[i].functionName;
                 			var tridValue = $('tr.dataTr td:contains('+functionName+') span').attr('trid');
                 			debugger;
                 			$("tr.dataTr[id="+tridValue+"] td:first div").addClass('checked');
                 			$("tr.dataTr input[type='checkbox'][trid="+tridValue+"]").attr('checked',true);
                 			//$("tr.dataTr[id="+tridValue+"] td:first div").click();
                 		}
                 	 }
                	 
                 }else{
                	 MsgService.tomsg(sts.errorDesc);
                 }
        	})
        };
        $scope.populateTreeGrid = function(){
        	$scope.treegirdoptions.data = [];	//clean grid data
        	for(var i=0;i<$scope.functionList.length;i++){
 			   var appCode = $scope.functionList[i].applicationCode;
 			   var appDesc = $scope.functionList[i].applicationDesc;
 			   var appName = $scope.functionList[i].applicationName;
 			   var functionCode = $scope.functionList[i].functionCode;
 			   var functionName = $scope.functionList[i].functionName;
 			   var functionDesc = $scope.functionList[i].functionDesc;
 			   var level1 = {"id":appCode,"name":appName,"children":[]};
 			   var level2 = {"id":functionCode,"name":functionName,"gndescribe":functionDesc};
 			   var isFound = false;
 			   for(var j=0;j<$scope.treegirdoptions.data.length;j++){
 				  if($scope.treegirdoptions.data[j].id == appCode){
 					 $scope.treegirdoptions.data[j].children.push(level2);
 					 isFound = true;
 					 break;
 				  }
 			   }
 			   if(!isFound){
 				  level1.children.push(level2);
 				  $scope.treegirdoptions.data.push(level1);			  
 			   }
     		}
        }
        $scope.thisform = {
        		"roleName":"",
        		"roleDesc":""
        	};
		//$scope.thisform=$scope.thisform;
        $scope.initFun=function(){
        	$scope.editMode = false;
        	var selectedRole = $stateParams.selectedRole;
        	if(selectedRole != undefined && selectedRole != ""){	//编辑模式
        		$scope.editMode = true;
        		$scope.selectedRole = selectedRole;
        	}
        	$scope.FuncListAllFunctions();
        }
    	$scope.submit=function (){
            var selectedFunctionRows = $scope.treegird.TreeGrid("getCheckedRows");
            var selectedFunctionList = []; //转换为可以发送到服务器的格式
            for(var i=0;i<selectedFunctionRows.length;i++){
            	var functionRow = selectedFunctionRows[i];
            	var desc = functionRow.gndescribe;
            	if(desc == undefined)	//只提取第二级
            		continue;
            	else{
            		var functionCode = functionRow.id;
            		var appCode = functionCode.substr(0,4);
            		var selectedFunction = {};
            		selectedFunction.applicationCode = appCode;
            		selectedFunction.functionCode = functionCode;
            		selectedFunctionList.push(selectedFunction);
            	}
            	
            }
            //构造服务器调用参数
            var body = {
            		"actionType":"ADD",
            		"roleName":$scope.thisform.roleName,
            		"roleDesc":$scope.thisform.roleDesc,
            		"functionList":selectedFunctionList
            };
            if($scope.editMode){
            	body.actionType = "MODIFY";
            	body.roleName = $scope.selectedRole.roleName;
            	body.newRoleName = $scope.thisform.roleName;
            }
            var promise = roleService.changeRole({body:body});
            promise.success(function(data, status, headers, config){
       		 	var sts=data.body.status;
                var data=data.body.data;
                if(sts.statusCode==0){
                	$state.go('permissions.list');
                }else{
                	MsgService.tomsg(sts.errorDesc);
                }
            })
            
        };
        $scope.initFun();
    }]
}

function permissionsviewCtrl(){
    return['$scope','$modal','$state','roleService','$stateParams','MsgService',function($scope,$modal,$state,roleService,$stateParams,MsgService){
    	
    	$scope.treegirdoptions={
    			id:"Function",
                displayLevel:2,
                columns:[
                    {headerText: "功能名称", dataField: "name", width:'200'},
                    {headerText: "功能描述", dataField: "gndescribe",width:'auto'}
                ],
                data:[
                ],
                showCheckbox:true,
                autoChecked:true
            }
    	
    	$scope.FuncListAllFunctions = function(){
        	var promise = roleService.inquiryFunction({body:{}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 $scope.functionList = data.functionList;
                	 $scope.populateTreeGrid();
                	 $scope.functionGrid = $("#functionGrid").TreeGrid($scope.treegirdoptions);
                	
                	//如果从编辑页面过来, 则默认填充角色名称和描述, 以及相关的权限
                	 //var selectedRole = $stateParams.selectedRole;
                 	 //if($scope.editMode){	//编辑模式
                 		$scope.thisform.roleName = $scope.selectedRole.roleName;
                 		$scope.thisform.roleDesc = $scope.selectedRole.roleDesc;
                 		var roleFunctionList = $scope.selectedRole.functionList;
                 		for(var i=0; i<roleFunctionList.length; i++){
                 			var functionName = roleFunctionList[i].functionName;
                 			var tridValue = $('tr.dataTr td:contains('+functionName+') span').attr('trid');
                 			debugger;
                 			$("tr.dataTr[id="+tridValue+"] td:first div").addClass('checked');
                 			$("tr.dataTr input[type='checkbox'][trid="+tridValue+"]").attr('checked',true);
                 			//$("tr.dataTr[id="+tridValue+"] td:first div").click();
                 		}
                 	 //}
                	 
                 }else{
                	 MsgService.tomsg(sts.errorDesc);
                 }
        	})
        };
        $scope.populateTreeGrid = function(){
        	$scope.treegirdoptions.data = [];	//clean grid data
        	for(var i=0;i<$scope.functionList.length;i++){
 			   var appCode = $scope.functionList[i].applicationCode;
 			   var appDesc = $scope.functionList[i].applicationDesc;
 			   var appName = $scope.functionList[i].applicationName;
 			   var functionCode = $scope.functionList[i].functionCode;
 			   var functionName = $scope.functionList[i].functionName;
 			   var functionDesc = $scope.functionList[i].functionDesc;
 			   var level1 = {"id":appCode,"name":appName,"children":[]};
 			   var level2 = {"id":functionCode,"name":functionName,"gndescribe":functionDesc};
 			   var isFound = false;
 			   for(var j=0;j<$scope.treegirdoptions.data.length;j++){
 				  if($scope.treegirdoptions.data[j].id == appCode){
 					 $scope.treegirdoptions.data[j].children.push(level2);
 					 isFound = true;
 					 break;
 				  }
 			   }
 			   if(!isFound){
 				  level1.children.push(level2);
 				  $scope.treegirdoptions.data.push(level1);			  
 			   }
     		}
        }
        $scope.thisform = {
        		"roleName":"",
        		"roleDesc":""
        	};
		//$scope.thisform=$scope.thisform;
        $scope.initFun=function(){
        	$scope.editMode = false;
        	var selectedRole = $stateParams.selectedRole;
        	if(selectedRole != undefined && selectedRole != ""){	//编辑模式
        		$scope.editMode = true;
        		$scope.selectedRole = selectedRole;
        	}
        	$scope.FuncListAllFunctions();
        }
        $scope.initFun();
    }]
}