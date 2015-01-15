'use strict'

/**
* The UserHomeController holds the presentation logic for the user home screen
*/

app.controller('UserEditProfileController',
	function ($scope, $rootScope, userService, townsService, notifyService) {
		$rootScope.loc = 'EditProfile';

		$rootScope.pageTitle = 'Profile';
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

		$scope.towns = townsService.getTowns();

		$scope.editUserProfile = function (params) {
			userService.editUserProfile(
				params,
				function success (data) {
					notifyService.showInfo('Successfully edited user profile');
					$scope.loadUserProfile();
				},
				function error(err) {
                    notifyService.showError("Cannot edit user profile", err);
                }
            );
		};

		$scope.editUserPassword = function (params) {
			userService.editUserPassword(
				params,
				function success (data) {
					notifyService.showInfo('Successfully changed password');
					$scope.loadUserProfile();
				},
				function error(err) {
                    notifyService.showError("Password change failed", err);
                }
            );
		};

		$scope.loadUserProfile = function() {
			userService.getUserProfile(
	            function success(data) {
	                $scope.userData = data;
	            },
	            function error(err) {
	                notifyService.showError("Cannot load user info", err);
	            }
	        );
       };

   //     $scope.deactivateAd = function() {
			// userService.deactivateAd(
	  //           function success(data) {
	  //               $scope.userData = data;
	  //           },
	  //           function error(err) {
	  //               notifyService.showError("Cannot load user info", err);
	  //           }
	  //       );
   //     };

       $scope.loadUserProfile();
	}
);