

function orgUserAnalysisCtrl(){
    return['$rootScope','$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams','LocalStorage','MsgService',function($rootScope,$scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams,LocalStorage,MsgService){
    	
    	var userinfo=LocalStorage.getObject('userinfo');
        $scope.userinfo = userinfo;
    	var orgName = $scope.userinfo.orgList[0].name;
    	//获取部门经理ID
    	var mangerUuid = $scope.userinfo.orgList[0].managerUuid;
    	
    	var myChart = echarts.init(document.getElementById('chart'));
        var option = {
        	    tooltip : {
        	        trigger: 'item',
        	        formatter: "{a} <br/>{b} : {c} ({d}%)"
        	    },
        	    legend: {
        	        orient: 'vertical',
        	        left: 'left',
        	        data: []
        	    },
        	    series : [
        	        {
        	            name: '员工分析',
        	            type: 'pie',
        	            radius : '55%',
        	            center: ['50%', '60%'],
        	            data:[],
        	            itemStyle: {
        	                emphasis: {
        	                    shadowBlur: 10,
        	                    shadowOffsetX: 0,
        	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
        	                },
        	                normal:{ 
        	                    label:{ 
        	                      show: true, 
        	                      formatter: '{b} : {c} ({d}%)' 
        	                    }, 
        	                    labelLine :{show:true} 
        	                } 
        	            }
        	        }
        	    ]
    	};
		$scope.initFun=function(){
			//如果当前用户ID和部门经理ID不一致则不能使用该功能
        	if($scope.userinfo.userUuid != mangerUuid){
        		MsgService.tomsg('您不是'+orgName+'的负责人, 如信息有误, 请联系管理员设置您为负责人员');
        	}else{
				var chartType=$rootScope.$stateParams.type;
				if(chartType == 'position')
					$scope.getPositionEmployeeChartByOrg(orgName);
				else if(chartType == 'salary')
					$scope.getSalaryEmployeeChartByOrg(orgName);
        	}
    	};
    	$scope.getPositionEmployeeChartByOrg = function(orgName){
	        var promise = analysisService.getPositionEmployeeChartByOrg({body:{'name':orgName}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 option.legend.data = data.nameArray;
                	 option.series[0].data=data.dataList;
                	 myChart.setOption(option);
                 }
        	})
    	};
    	$scope.getSalaryEmployeeChartByOrg = function(orgName){
	        var promise = analysisService.getSalaryEmployeeChartByOrg({body:{'name':orgName}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 option.legend.data = data.nameArray;
                	 option.series[0].data=data.dataList;
                	 myChart.setOption(option);
                 }
        	})
	
	       
    	};
    	
    }]
}

