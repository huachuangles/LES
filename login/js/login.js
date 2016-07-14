var myApp=angular.module('myApp',[]);
myApp.controller('loginCtl',function($scope){
	$scope.username='';
	$scope.pwd='';
	$scope.login=function(){
		sessionStorage.setItem('name',$scope.username);
		window.location.href="../log/log.html";
	}
})