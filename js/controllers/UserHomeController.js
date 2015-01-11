'use strict'

/**
* The UserHomeController holds the presentation logic for the user home screen
*/

app.controller('UserHomeController',
	function ($scope, $rootScope, adsService, userService, notifyService, pageSize) {

		$rootScope.pageTitle = 'Home';
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

		$scope.adStatus = userService.getUserAds();

		$scope.adsParams = {
			'startPage': 1,
			'pageSize': pageSize
		};

		$scope.$on('categorySelectionChanged', function (event, selectedCategoryId) {
			$scope.adsParams.categoryId = selectedCategoryId;
			$scope.adsParams.startPage = 1;
			$scope.loadAds();
		});

		$scope.$on('townSelectionChanged', function (event, selectedTownId) {
			$scope.adsParams.townId = selectedTownId;
			$scope.adsParams.startPage = 1;
			$scope.loadAds();
		});

       $rootScope.loadUserAds = function (adsStatus) {
       	$rootScope.loc = 'MyAds';
       	$rootScope.stat = adsStatus;
       	console.log(adsStatus);

       	$scope.adsParams.status = adsStatus;

       	userService.getUserAds($scope.adsParams,
	            function success(data) {
	            	$scope.ads = data;
	            },
	            function error(err) {
	                notifyService.showError("Cannot load ads", err);
	            }
	        );
	    };

       $scope.loadUserAds(null);
	}
);