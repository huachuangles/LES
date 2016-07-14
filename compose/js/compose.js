var myApp=angular.module('myApp',['ngAnimate','ngRoute','ui.bootstrap']);//,'ngRoute'
myApp.controller('leftShow',function($scope){
	$scope.mainLeft=false;
	$scope.leftShow=function(){
		$scope.mainLeft=!$scope.mainLeft;
	};
});
myApp.controller('stateBtn',function($scope,$http,$rootScope){
	console.log($scope.lang,"sa")
//	$scope.inputStateSel='{Current State}:Draft';
	$scope.detailsHeader=false;
	$scope.listItems = [];
	$scope.eListItems = [];
	$scope.treeItem=[];
	$http.get('./process.json').success(function(d){
		$scope.treeItem=d.items;
		console.log($scope.treeItem);
	}).error(function(e){
		console.log(e)
	});

	
});
myApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl : 'view/details.html',
//		controller: 'detailsInfo'
	}).when('/Details',{
		templateUrl : 'view/details.html'
	}).when('/Materials',{
		templateUrl : 'view/materials.html'
	}).when('/Equipment',{
		templateUrl : 'view/equipment.html'
	}).when('/Process',{
		templateUrl : 'view/process.html'
	}).when('/Flowchart',{
		cache:'false', 
		templateUrl : 'view/flowchart.html'
	}).when('/Instruction',{
		templateUrl : 'view/instruction.html'
	}).otherwise({
		redirectTo: 'view/details.html'
	})
});
myApp.controller('getUserName',function($scope){
	$scope.username=sessionStorage.getItem('name');
})
/*myApp.controller('setLanguage',function($scope,$http){
	$http.get('../language/lang.json').success(function(d){
		console.log(d);
		$scope.lang=d.ch;
		$scope.inputStateSel=$scope.lang.currentState+":"+$scope.lang.draft;
	}).error(function(d){
		console.log(d);
	})
})*/
myApp.controller('setLanguage',function($scope,$http){
	$http.get('../language/lang.json').success(function(d){
		console.log(d);
		$scope.allLang=d;
		if(localStorage.getItem("lang")==null||localStorage.getItem("lang")=="ch"){
			$scope.lang=$scope.allLang.ch;
		}else if(localStorage.getItem("lang")=="en"){
			$scope.lang=$scope.allLang.en;
		}
		$scope.inputStateSel=$scope.lang.currentState+":"+$scope.lang.draft;
	}).error(function(d){
		console.log(d);
	})
	$scope.setLang=function(i){
		if(i=="ch"){
			$scope.lang=$scope.allLang.ch;
			localStorage.setItem("lang","ch");
		}else if(i=="en"){
			$scope.lang=$scope.allLang.en;
			localStorage.setItem("lang","en");
		}
		$scope.inputStateSel=$scope.lang.currentState+":"+$scope.lang.draft;
	}
})