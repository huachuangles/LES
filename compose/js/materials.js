myApp.controller('materialsInfo',function($scope){
/*	$scope.materialName='New Material';
	$scope.materialRole='Input';
	$scope.materialAmount='aa';*/
	$scope.activeindex='';
	$scope.activeitem='';
	$scope.listItem = {'name':'New Material',
					'role':$scope.lang.input,
					'amount':'aa'};
	/*点击添加一行*/
	$scope.addMaterialsList=function(){
		$scope.listItems.push($scope.listItem);
		$scope.listItem = {'name':'New Material',
					'role':$scope.lang.input,
					'amount':'aa'};
	};
	/*点击删除一行*/
	$scope.removeMaterialsList=function(){
		console.log($scope.listItems[$scope.activeindex]);
		if(	$scope.activeitem == $scope.listItems[$scope.activeindex]){
			$scope.listItems.splice($scope.activeindex,1);
		};
		
	};
	/*点击给添加样式*/
	$scope.read=function(a,b){
		$scope.activeitem=a;
		$scope.activeindex=b;
	};
	/*双击更改name*/
	$scope.nChange=function(a,b){
		angular.element(document.querySelectorAll('.Material-name'))[b].style.display='none';
		angular.element(document.querySelectorAll('.name-box'))[b].style.display='block';
		angular.element(document.querySelectorAll('.name-box input'))[b].focus();
	};
	$scope.nBlur=function(a,b){
		angular.element(document.querySelectorAll('.Material-name'))[b].style.display='block';
		angular.element(document.querySelectorAll('.name-box'))[b].style.display='none';
	};
	/*双击更改role*/
	$scope.rChange=function(a,b){
		angular.element(document.querySelectorAll('.Material-role'))[b].style.display='none';
		angular.element(document.querySelectorAll('.role-box'))[b].style.display='block';
		angular.element(document.querySelectorAll('.role-box select'))[b].focus();
	};
	$scope.rBlur=function(a,b){
		angular.element(document.querySelectorAll('.Material-role'))[b].style.display='block';
		angular.element(document.querySelectorAll('.role-box'))[b].style.display='none';
	};
	/*双击更改amount*/
	$scope.aChange=function(a,b){
		angular.element(document.querySelectorAll('.Material-amount'))[b].style.display='none';
		angular.element(document.querySelectorAll('.amount-box'))[b].style.display='block';
		angular.element(document.querySelectorAll('.amount-box input'))[b].focus();
	};
	$scope.aBlur=function(a,b){
		angular.element(document.querySelectorAll('.Material-amount'))[b].style.display='block';
		angular.element(document.querySelectorAll('.amount-box'))[b].style.display='none';
	}
})
