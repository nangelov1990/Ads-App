'use strict'

/**
* The UserHomeController holds the presentation logic for the user home screen
*/

app.controller('UserEditProfileController',
	function ($scope, $rootScope, authService, userService, townsService, notifyService) {
		$rootScope.loc = 'EditProfile';

		$rootScope.pageTitle = 'Profile';
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

		$scope.towns = townsService.getTowns();

		$scope.loadUserProfile = function() {
			authService.getUserProfile(
	            null,
	            function success(data) {
	            	$scope.user = data;
	            },
	            function error(err) {
	                notifyService.showError("Cannot load profile", err);
	            }
	        );
       };

       $scope.loadUserProfile();

		// $rootScope.pageTitle = 'Edit User Profile';
		// $rootScope.showRightSidebar = false;
		// document.getElementById("main-view").style.width = '83.33333333%';

		// $scope.adStatus = userService.getUserAds();

		// $scope.adsParams = {
		// 	'startPage': 1,
		// 	'pageSize': pageSize
		// };

		// $scope.$on('categorySelectionChanged', function (event, selectedCategoryId) {
		// 	$scope.adsParams.categoryId = selectedCategoryId;
		// 	$scope.adsParams.startPage = 1;
		// 	$scope.loadAds();
		// });

		// $scope.$on('townSelectionChanged', function (event, selectedTownId) {
		// 	$scope.adsParams.townId = selectedTownId;
		// 	$scope.adsParams.startPage = 1;
		// 	$scope.loadAds();
		// });

  //      $rootScope.loadUserAds = function (adsStatus) {
  //      	$rootScope.loc = 'EditProfile';
  //      	$rootScope.stat = adsStatus;
  //      	console.log(adsStatus);

  //      	$scope.adsParams.status = adsStatus;

  //      	userService.getUserAds($scope.adsParams,
	 //            function success(data) {
	 //            	$scope.ads = data;
	 //            },
	 //            function error(err) {
	 //                notifyService.showError("Cannot load ads", err);
	 //            }
	 //        );
	 //    };

  //      $scope.loadUserAds(null);
	}
);