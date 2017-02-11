
function analysisListCtrl(){
    return['$rootScope','$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams',function($rootScope,$scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams){
    	
    	$scope.initFun=function(){
    		$scope.getAnalysisSummary();
    	}
    	$scope.getAnalysisSummary = function(){
	        var promise = analysisService.getAnalysisSummary({body:{}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 $scope.summaryMap = data.summaryMap;
                 }
        	})
    	}
    
    }]
}

function analysisEmployeeCtrl(){
    return['$rootScope','$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams',function($rootScope,$scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams){
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
			var chartType=$rootScope.$stateParams.type;
			if(chartType == 'org')
				$scope.getOrgEmployeeChart();
			else if(chartType == 'role')
				$scope.getRoleEmployeeChart();
			else if(chartType == 'salary')
				$scope.getSalaryEmployeeChart();
    	};
    	$scope.getOrgEmployeeChart = function(){
	        var promise = analysisService.getOrgEmployeeChart({body:{}});
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
    	$scope.getRoleEmployeeChart = function(){
	        var promise = analysisService.getRoleEmployeeChart({body:{}});
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
    	$scope.getSalaryEmployeeChart = function(){
	        var promise = analysisService.getSalaryEmployeeChart({body:{}});
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
function analysisProjectCtrl(){
    return['$rootScope','$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams',function($rootScope,$scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams){
    	
    	
    	var chartType=$rootScope.$stateParams.type;
    	
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
        	            name: '项目分析',
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
			var currentYear = new Date().getFullYear();
			$scope.currentYear = currentYear;
			$scope.changeYear(currentYear);
    	};
    	
    	$scope.changeYear = function(sYear){
			var chartType=$rootScope.$stateParams.type;
			if(chartType == 'status')
				$scope.getProjectStatusChart(sYear);
			else if(chartType == 'health')
				$scope.getProjectHealthChart(sYear);
    	};
    	
    	$scope.getProjectHealthChart = function(year){
	        var promise = analysisService.getProjectHealthChart({body:{'year':year}});
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
    	$scope.getProjectStatusChart = function(year){
	        var promise = analysisService.getProjectStatusChart({body:{'year':year}});
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
function analysisCustomerCtrl(){
    return['$rootScope','$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams',function($rootScope,$scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams){
    	
    	
    	var chartType=$rootScope.$stateParams.type;
    	
    	var myChart = echarts.init(document.getElementById('chart'));
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
        	        boundaryGap: false,
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
        	            type: 'line',
        	            data:[],
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
			var chartType=$rootScope.$stateParams.type;
			if(chartType == 'customer')
				$scope.getCustomerCustomerChart();
			else if(chartType == 'sale')
				$scope.getCustomerSaleChart();
s    	};
    	$scope.go = function(aType, aSubType){
    		$rootScope.$state.go('analysis.'+aType,{type:aSubType});
    	}
    	$scope.getCustomerCustomerChart = function(){
    		var type = $stateParams.type;
	        var promise = analysisService.getCustomerCustomerChart({body:{}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 option.xAxis.data = data.nameArray;
                	 option.series[0].data=data.valueArray;
                	 option.title.text='客户年增长';
                	 myChart.setOption(option);
                 }
        	})
    	};
    	$scope.getCustomerSaleChart = function(){
    		var type = $stateParams.type;
	        var promise = analysisService.getCustomerSaleChart({body:{}});
        	promise.success(function(data, status, headers, config){
        		 var sts=data.body.status;
                 var data=data.body.data;
                 if(sts.statusCode==0){
                	 option.xAxis.data = data.nameArray;
                	 option.series[0].data=data.valueArray;
                	 option.title.text='销售年增长';
                	 myChart.setOption(option);
                 }
        	})
    	};
    }]
}

