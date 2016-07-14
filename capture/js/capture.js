var myApp=angular.module('myApp',['ngAnimate','ngRoute']);
myApp.controller('getUserName',function($scope){
	$scope.username=sessionStorage.getItem('name');
});
myApp.controller('captureMain',function($scope,$route,$http){
	$scope.aTabIndex=0;
	$scope.$on('$routeChangeSuccess',function(){
		$scope.aTabIndex=$route.current.loadedTemplateUrl;
	})
	/*$http.get('../language/lang.json').success(function(d){
		console.log(d);
		$scope.lang=d.ch;
	}).error(function(d){
		console.log(d);
	})*/
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
myApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl : 'view/instructions.html',
	}).when('/Instructions',{
		templateUrl : 'view/instructions.html'
	}).when('/Flowchart',{
		templateUrl : 'view/flowchart.html'
	}).when('/Details',{
		templateUrl : 'view/details.html'
	}).when('/Materials',{
		templateUrl : 'view/materials.html'
	}).when('/Equipment',{
		templateUrl : 'view/equipment.html'
	}).otherwise({
		redirectTo: 'view/instructions.html'
	})
});