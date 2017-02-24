
function orgSaleCtrl(){
    return['$rootScope','$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams','LocalStorage','MsgService',function($rootScope,$scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams,LocalStorage,MsgService){
    	var userinfo=LocalStorage.getObject('userinfo');
    	$scope.userinfo = userinfo;
    	var orgName = $scope.userinfo.orgList[0].name;
    	//获取部门经理ID
    	var mangerUuid = $scope.userinfo.orgList[0].managerUuid;
    	
    	var myChart = echarts.init(document.getElementById('chart'));
    	$scope.radioModel = "year";
        var option = {
        		title: {
        	        text: ''
        	    },
        	    tooltip : {
        	        trigger: 'axis'
        	    },
        	    legend: {
        	        orient: 'vertical',
        	        left: 'left',
        	        data: []
        	    },
        	    xAxis:  {
        	        type: 'category',
        	        boundaryGap: true,
        	        data: []
        	    },
        	    yAxis: {
        	        type: 'value',
        	        axisLabel: {
        	            formatter: '{value}'
        	        }
        	    },
        	    series : [
        	        {
        	            name: '客户销售曲线',
        	            type: 'bar',
        	            data:[],
        	            barWidth:20,
        	            markPoint: {
        	                data: [
        	                    {type: 'max', name: '最大'},
        	                    {type: 'min', name: '最小'}
        	                ]
        	            }
        	        }
        	    ]
    	};
		$scope.initFun=function(){
			if($scope.userinfo.userUuid != mangerUuid){
        		MsgService.tomsg('您不是'+orgName+'的负责人, 如信息有误, 请联系管理员设置您为负责人员');
        	}else{
				$scope.options={
		                "orgDTO":{		//如查询某个部门数据
		                    "name":orgName
		                },
		                "year":0,
		                "month":0
		        };
				$scope.changeType();
        	}
			
    	};
    	$scope.changeType = function(){	
    		chartType = $scope.radioModel;
    		if(chartType == 'year'){
    			$scope.options.year = 0;
    			$scope.options.month = 0;
				option.title.text='年销售额(元)';
			}else if(chartType == 'month'){
				$scope.options.year=new Date().getFullYear();
				$scope.options.month = 0;
				option.title.text=$scope.options.year+'年月销售额(元)';
			}
			else if(chartType == 'day'){
				$scope.options.year=new Date().getFullYear();
				$scope.options.month=new Date().getMonth()+1;
				option.title.text=$scope.options.year+'年'+$scope.options.month+'月'+'日销售额(元)';
			}
    		$scope.getCustomerSaleChart($scope.options);
    	}
    	$scope.go = function(aType, aSubType){
    		$rootScope.$state.go('analysis.'+aType,{type:aSubType});
    	}
    	$scope.getCustomerSaleChart = function(options){
	        var promise = analysisService.getCustomerSaleChart({body:options});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 option.xAxis.data = data.nameArray;
                	 option.series[0].data=data.valueArray;
                	 myChart.setOption(option);
                 }
        	})
    	};
    }]
}

function orgProjectDetailCtrl(){
    return['$rootScope','$scope','$modal','$filter','projectService','MsgService','LocalStorage','Common','OSSService','FileUploader','noseService',function($rootScope,$scope,$modal,$filter,projectService,MsgService,LocalStorage,Common,OSSService,FileUploader,noseService){
        var userinfo=LocalStorage.getObject('userinfo');
        $scope.userinfo = userinfo;
        $scope.editingProgress = false;
        $scope.editingHealth = false;
        $scope.initFun = function(){
            inquiryProjectFun();
        };
        //查询项目
        function inquiryProjectFun(){
            $scope.options={
                "projectName":$rootScope.$stateParams.name		//按照项目名称查询
            };
            var promise = projectService.inquiryProject({body:$scope.options});
            promise.success(function(data, status, headers, config){
                var sts=data.body.status;
                if(sts.statusCode==0){
                    $scope.datadt=data.body.data.projects[0];
                    debugger;
                }else{
                    MsgService.tomsg(data.body.status.errorDesc);
                }
            });
            promise.error(function(data, status, headers, config){
                MsgService.tomsg(data.body.status.errorDesc);
            });
        }
        
        /*=======任务=======*/
        $scope.projectStatusArr=[
            {name:'全部状态',val:''},
            {name:'已分配',val:'已分配'},
            {name:'已开始',val:'已开始'},
            {name:'已拒绝',val:'已拒绝'},
            {name:'未分配',val:'未分配'},
            {name:'已完成',val:'已完成'},
            {name:'已取消',val:'已取消'}
        ]
    }]
}
