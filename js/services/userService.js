'use strict'

app.factory('userService',
	function ($http, baseServiceUrl, authService) {
		
		function createNewAd (adData, success, error) {
			var request = {
				method: 'POST',
				url: baseServiceUrl + 'user/ads',
				headers: authService.getAuthHeaders(),
				data: adData
			};

			$http(request).success(success).error(error);
		};

		function getUserAds (params, success, error) {
			var request = {
				method: 'GET',
				url: baseServiceUrl + 'user/ads',
				headers: authService.getAuthHeaders(),
				params: params
			};

			$http(request).success(success).error(error);
		};

		function deactivatedAd (argument) {
			// body...
		};

		function publishedAgainAd (argument) {
			// body...
		};

		return {
			createNewAd: createNewAd,
			getUserAds: getUserAds,
			deactivatedAd: deactivatedAd,
			publishedAgainAd: publishedAgainAd
		}
	}
);