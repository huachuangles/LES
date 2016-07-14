myApp.controller('detCon',function($scope){
	$scope.signatureTrShow=[false,false,false,false];
	$scope.changeSignatureTrShow=function(i){
		$scope.signatureTrShow[i]=!$scope.signatureTrShow[i];
	}
})