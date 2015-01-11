'use strict'

app.controller('UserPublishNewAdController',

	function ($scope, $rootScope, $location, townsService, categoriesService, userService, notifyService){
		$rootScope.showRightSidebar = false;
		document.getElementById("main-view").style.width = '83.33333333%';

		$rootScope.loc = 'PublishNewAd';

		$scope.adData = {townId: null, categoryId: null};
		$scope.categories = categoriesService.getCategories();
		$scope.towns = townsService.getTowns();

		$scope.publishAd = function (adData) {
			userService.createNewAd(adData,
				function success () {
					notifyService.showInfo('Ad submitted for approval. Once approved, it will be published.');
					$location.path('/user/ads');
				},
				function error (error) {
					notifyService.showError('Publish ad failed', error);
				}
			);
		};

		$scope.fileSelected = function (fileInputField) {
			delete $scope.adData.imageDataUrl;

			if (fileInputField) {
				var file = fileInputField.files[0];

				if (file.type.match(/image\/.*/)) {
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
			$scope.fileSelected(null);
		}
	}
);