
function analysisCtrl(){
    return['$scope', '$modal' ,'$compile','$state','roleService','notify','analysisService','$stateParams',function($scope,$modal,$compile,$state,roleService,notify,analysisService,$stateParams){
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
        	            name: '访问来源',
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
		$scope.init = function(){
			$scope.getOrgEmployeeChart();
    	};
    	$scope.getOrgEmployeeChart = function(){
    		var type = $stateParams.type;
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
    		var type = $stateParams.type;
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

