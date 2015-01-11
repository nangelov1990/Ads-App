'use strict'

/**
* The RegisterController is responsible for the "Register" screen
*/

app.controller('RegisterController', 
	function ($scope, $rootScope, $location, authService, townsService, notifyService) {

		$rootScope.loc = '/register';

		$rootScope.pageTitle = 'Register';
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

		$scope.userData = {townId: null};

		townsService.getTowns()
			.$promise
			.then(function (data) {
				$scope.towns = data;
			});

		$scope.register = function (userData) {
			authService.register(userData,
				function success () {
					notifyService.showInfo("Registration successful.");
					$location.path('/');
				},
				function error (err) {
					notifyService.showError("Registration unsuccessful", err);
				})
		}
	}	
);