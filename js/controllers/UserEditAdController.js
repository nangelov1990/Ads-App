'use strict'

/**
* The UserEditAdController holds the presentation logic for the user home screen
*/

app.controller('UserEditAdController',
	function ($scope, $rootScope, $location, $routeParams, adsService, userService, townsService, categoriesService, notifyService, pageSize) {

		$rootScope.pageTitle = 'Edit Ad';
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

		$rootScope.loc = '';

		$scope.id = $routeParams.id;
		$scope.towns = townsService.getTowns();
		$scope.categories = categoriesService.getCategories();
		$scope.adData = {};

		$scope.fileSelected = function (fileInputField) {
			delete $scope.adData.imageDataUrl;

			if (fileInputField) {
				var file = fileInputField.files[0];

				if (file.type.match(/image\/.*/)) {
					$scope.adData.changeImage = true;

					var reader = new FileReader();

					reader.onload = function() {
			            $scope.adData.imageDataUrl = reader.result;
			            $(".image-box").html("<img src='" + reader.result + "'>");
			        };

					reader.readAsDataURL(file);
				} else {
					$("#image").val('');
					$('.image-box').html('<p>File type not supported!</p>');
				}
			} else {
				$("#image").val('');
				$('.image-box').html('<p>Image Preview</p>');
			}
		};

		$scope.deleteImg = function () {
			$scope.adData.changeImage = true;
			$scope.fileSelected(null);
		}

		$scope.loadUserAd = function (adId) {
			userService.loadUserAd(
				adId,
	            function success(data) {
					notifyService.showInfo('Successfully loaded ad');
					$scope.ad = data;
	            },
	            function error(err) {
	                notifyService.showError("Cannot load ad", err);
	            }
	        );
		}

	    $scope.editUserAd = function (params) {
            if($scope.adData.changeImage == true) {
                params.changeImage = true;
                params.imageDataUrl = $scope.adData.imageDataUrl;
            }

	    	userService.editUserAd(params,
	            function success(data) {
					notifyService.showInfo('Ad successfully edited. Please republish.');
					$location.path('/user/ads');
	            },
	            function error(err) {
	                notifyService.showError("Cannot edit ad", err);
	            }
	        );
	    }

        $scope.loadUserAd($scope.id);
	}
);