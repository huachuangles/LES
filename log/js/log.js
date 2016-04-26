var app = angular.module('myApp', []);
app.controller('tabChange', function($scope) {
				 $scope.isChange = false;
                 $scope.change = function(row) {
            		$scope.isChange = !$scope.isChange;
       			 };
			});