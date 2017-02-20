/**
 * Created by Nose on 2016/9/7.
 */
function accountCtrl() {
	return [
			'$scope',
			'$modal',
			'$compile',
			'$state',
			'roleService',
			'MsgService',
			'employeesService',
			function($scope, $modal, $compile, $state, roleService, MsgService,
					employeesService) {
				
				$scope.initFun = function(){
					inquiryEmployeeFun();
				}

				$scope.thispages = {
					total : null,
					pageNum : 1,
					pageSize : 10
				};
				function inquiryEmployeeFun() {
					$scope.options = {
						"type" : "ALL"
					};
					var promise = employeesService.inquiryEmployee({
						body : $scope.options
					});
					promise.success(function(data, status, headers, config) {
						var sts = data.body.status;
						if (sts.statusCode == 0) {
							var datalist = data.body.data.userList;
							$scope.datalist = datalist;
							$scope.thispages.total = $scope.datalist.length;// 分页总数
						} else {
							MsgService.tomsg(data.body.status.errorDesc);
						}
					});
					promise.error(function(data, status, headers, config) {
						MsgService.tomsg(data.body.status.errorDesc);
					});
				};
				$scope.editAccountFun = function (row) {
		            var modalInstance = $modal.open({
		                templateUrl: 'editAccount.html',
		                controller: modalCtrl
		            });
		            function modalCtrl ($scope, $modalInstance) {
		                $scope.gwoptions='gw';
		                
		                $scope.modalform=row;
		                
		                $scope.ok = function (state) {
		                    if(!state){return;}
		                    /*if($scope.modalform.roleList==null||$scope.modalform.roleList.length==0)
		                    	MsgService.tomsg("请选择用户角色");*/
		                    else changeEmployeeFun('MODIFY',$scope.modalform,$modalInstance);
		                };
		                $scope.cancel = function () {
		                    $modalInstance.dismiss('cancel');
		                };
		            };
		        };
				function changeEmployeeFun(change,row,$modalInstance){
		            var roleList=[];
		            angular.forEach(row.roleList,function(val,ind){
		                roleList.push({"name":val.text || val.name})
		            });
		            $scope.options={
		                "actionType":change,			// ADD, MODIFY, DELETE
		                "userUuid":row.userUuid,
		                "id":row.id,		//员工编号
		                "photoUrl":row.photoUrl || "",		//头像地址
		                "name":row.name,		//姓名
		                "sex":row.sex,			//性别
		                "birthDate":row.birthDate,		//出生日期  yyyyMMdd
		                "university":row.university,		//毕业院校
		                "personalEmail":row.personalEmail,		//电子邮箱
		                "personalPhone":row.personalPhone,		//手机号码
		                "personalPhoneCountryCode":'86',
		                "joiningDate":row.joiningDate,		//入职日期
		                "roleList":roleList,	//角色数组, 可多个角色
		                "currentSalary":row.currentSalary,
		                "currentSalaryStartDate":row.currentSalaryStartDate,
		                "position":row.position,
		                "idType":row.idType,
		                "idNo":row.idNo,
		                "nation":row.nation,
		            	"politicalStatus":row.politicalStatus,
		            	"firstJobDate":row.firstJobDate,
		            	"confirmationDate":row.confirmationDate,
		            	"qualification":row.qualification,
		            	"birthOfOrigin":row.birthOfOrigin,
		            	"homeAddress":row.homeAddress,
		            	"urgentContactName1":row.urgentContactName1,
		            	"urgentContactNo1":row.urgentContactNo1
		            };
		            var promise = employeesService.changeEmployee({body:$scope.options});
		            promise.success(function(data, status, headers, config){
		                var sts=data.body.status;
		                if(sts.statusCode==0){
		                    inquiryEmployeeFun();
		                    $modalInstance.close();
		                }else{
		                    MsgService.tomsg(data.body.status.errorDesc);
		                }
		            });
		            promise.error(function(data, status, headers, config){
		                MsgService.tomsg(data.body.status.errorDesc);
		            });
		            return promise;
		        }
			} ]
}
