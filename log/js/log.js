var app = angular.module('myApp', []);
app.controller('getItem', function($scope, $http, $log) {
	$scope.username=sessionStorage.getItem('name');
	console.log($scope.username);
	$http.get('./logJson.json').success(function(d) {
		console.log(d.items);
		$scope.itemList = d.items;
	}).error(function(error) {
		console.log(error);
	});
	$scope.activeitem ="";
	$scope.readstatus=false;
	$scope.isChange =true;
	$scope.read = function(item, $index) {
		if($scope.activeitem == item){
			$scope.activeitem ="1";
		}else{
			$scope.activeitem = item;
		}		
	};
	$scope.leave=function(item, $index){
		if($scope.activeitem == "1"){
			item.read=true;
			$scope.activeitem = "";
		}
	};
	$scope.change = function(row) {
		$scope.isChange = !$scope.isChange;
		if($scope.isChange==false){
			$scope.readstatus="";
		}else{
			$scope.readstatus=!$scope.isChange;
		}
	};
});

