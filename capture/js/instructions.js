myApp.controller('inscon',function($scope,$http,$timeout){
	$http.get('process.json').success(function(d){
		$scope.treeData=d.items;
	}).error(function(e){
		console.log(e);
	});
	$scope.leftIsShow=false;
	$scope.showLeft=function(){
		$scope.leftIsShow=!$scope.leftIsShow;
	};
	$scope.thisTree='0';
	$scope.thisName='';
	$scope.insRightIsShow=false;
	$scope.treeIndex=[];
	$scope.observation='';
	$scope.getThisTree=function(i,$index){
		$scope.thisTree=i;
		$scope.thisName=i.processName||i.testName||i.stepName;
		$scope.insRightIsShow=true;
		if(i.isSaved){
			$scope.insRightBtn=false;
		}else{
			$scope.insRightBtn=true;
		}
		$scope.insRightInpText=i.observation||'';
	}
	$scope.insRightBtn=true;
	$scope.insRightInp=function(){
		$scope.insRightBtn=!$scope.insRightBtn;
		console.log($scope.treeIndex);
		if($scope.treeIndex.length==1){
			$scope.treeData[$scope.treeIndex[0]-1].isSaved=true;
		}else{
			$scope.treeIndex[2]? $scope.treeData[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].stepList[$scope.treeIndex[2]-1].isSaved=true:$scope.treeData[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].isSaved=true;
		}
	}
	$scope.insRightInpText='';
	$scope.savedState=$scope.lang.saved;
	$scope.$watch('insRightInpText',function(n,o){
		$timeout.cancel(timer);
		if($scope.insRightInpText!=''){
			$scope.savedState=$scope.lang.saving;
			var timer=$timeout(function(){
				if($scope.treeIndex.length==1){
					$scope.treeData[$scope.treeIndex[0]-1].observation=$scope.insRightInpText;
				}else{
					$scope.treeIndex[2]? $scope.treeData[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].stepList[$scope.treeIndex[2]-1].observation=$scope.insRightInpText:$scope.treeData[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].observation=$scope.insRightInpText;
				}
				$scope.savedState=$scope.lang.saved;
			},1000)
		}
	});
})
myApp.directive('ngThisindex',function(){
	return{
		link : function(scope,element,attrs){
			element[0].addEventListener('click',function(){
				scope.treeIndex.length=0;
				var trIndex=this.children[0].children;
				for (var i=0;i<trIndex.length-1;i++) {
					scope.treeIndex.push(trIndex[i].innerHTML);
				}
			})
		}
	}
})