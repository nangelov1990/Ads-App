'use strict'

/**
* The HomeController holds the presentation logic for the home screen
*/

app.controller('HomeController',
	function ($scope, $rootScope, adsService, userService, notifyService, pageSize) {

		$rootScope.pageTitle = 'Home';
		$rootScope.showRightSidebar = true;

		$scope.adsParams = {
			'startPage': 1,
			'pageSize': pageSize
		};

		$scope.$on('categorySelectionChanged', function (event, selectedCategoryId) {
			$scope.adsParams.categoryId = selectedCategoryId;
			$scope.adsParams.startPage = 1;
			$scope.loadAds();
		});

		$scope.$on('loadUserAds', function (event) {
			$scope.loadUserAds();
		});

		$scope.$on('townSelectionChanged', function (event, selectedTownId) {
			$scope.adsParams.townId = selectedTownId;
			$scope.adsParams.startPage = 1;
			$scope.loadAds();
		});

		$scope.loadAds = function() {
			$rootScope.loc = '/';
			adsService.getAds(
	            $scope.adsParams,
	            function success(data) {
	            	$scope.ads = data;
	            },
	            function error(err) {
	                notifyService.showError("Cannot load ads", err);
	            }
	        );
       };

       $scope.loadAds();
	}
);