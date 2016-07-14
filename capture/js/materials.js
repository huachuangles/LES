myApp.controller('matCon',function($scope,$http){
	$http.get('materials.json').success(function(d){
		$scope.matList=d.item;
		$scope.matListState=[];
		for (var i=0;i<6;i++) {
			$scope.matListState[i]=false;
		}
	}).error(function(e){
		console.log(e);
	})
	$scope.showMaterialsInfo=function($index,item){
		$scope.matListState[$index]=!$scope.matListState[$index];
	}
})