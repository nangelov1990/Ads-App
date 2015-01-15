'use strict'

/**
* The UserHomeController holds the presentation logic for the user home screen
*/

app.controller('UserHomeController',
	function ($scope, $rootScope, $location, adsService, userService, notifyService, pageSize) {

		$rootScope.pageTitle = 'Home';
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

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

	       	userService.getUserAds($scope.adsParams,
	            function success(data) {
	            	$scope.ads = data;
	            },
	            function error(err) {
	                notifyService.showError("Cannot load ads", err);
	            }
	        );
	    };

		$scope.editUserAd = function (params) {
			userService.editUserAd(
				params,
				function success (data) {
					notifyService.showInfo('Successfully edited user profile');
	            	$scope.loadUserAds(null);
				},
				function error(err) {
                    notifyService.showError("Cannot edit user profile", err);
                }
            );
		};

	    $scope.publishAgainAd = function (params) {
	    	userService.publishAgainAd(params.id,
	            function success(data) {
					notifyService.showInfo('Successfully republished ad');
	            	$scope.loadUserAds(null);
	            },
	            function error(err) {
	                notifyService.showError("Cannot republish ad", err);
	            }
	        );
	    }

	    $scope.deactivateAd = function (params) {
	    	userService.deactivateAd(params.id,
	            function success(data) {
					notifyService.showInfo('Successfully deactivated ad');
	            	$scope.loadUserAds(null);
	            },
	            function error(err) {
	                notifyService.showError("Cannot deactivate ad", err);
	            }
	        );
	    }

	    $scope.deleteAd = function (params) {
	    	userService.deleteAd(params.id,
	            function success(data) {
					notifyService.showInfo('Successfully deleted ad');
	            	$scope.loadUserAds(null);
	            },
	            function error(err) {
	                notifyService.showError("Cannot delete ad", err);
	            }
	        );
	    }

	    // $scope.goToEditUserAd = function (adId) {
	    // 	$location.path('/user/ad/edit/'); // + adId
	    // 	$rootScope.loadUserAd(adId);

	    // 	userService.editUserAd(params,
	    //         function success(data) {
					// notifyService.showInfo('Successfully deleted ad');
	    //         	$scope.loadUserAds(null);
	    //         },
	    //         function error(err) {
	    //             notifyService.showError("Cannot delete ad", err);
	    //         }
	    //     );
	    // }

        $scope.loadUserAds(null);
	}
);