'use strict'

app.factory('userService',
	function ($http, baseServiceUrl, authService) {

        function getUserProfile (success, error) {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'user/profile',
                headers: authService.getAuthHeaders()
            };

            $http(request).success(success).error(error);
        };

        function editUserProfile (userData, success, error) {
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'user/profile',
                headers: authService.getAuthHeaders(),
                data: userData
            };

            $http(request)
                .success(success)
                .error(error);
        };
		
        function editUserPassword (userData, success, error) {
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'user/changePassword',
                headers: authService.getAuthHeaders(),
                data: userData
            };

            $http(request)
                .success(success)
                .error(error);
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

		function createNewAd (adData, success, error) {
			var request = {
				method: 'POST',
				url: baseServiceUrl + 'user/ads',
				headers: authService.getAuthHeaders(),
				data: adData
			};

			$http(request).success(success).error(error);
		};

		function deleteAd (adId, success, error) {
			var request = {
				method: 'DELETE',
				headers: authService.getAuthHeaders(),
				url: baseServiceUrl + 'user/ads/' + adId
			};

			$http(request).success(success).error(error);
		}

		function deactivateAd (adId, success, error) {
			var request = {
				method: 'PUT',
				headers: authService.getAuthHeaders(),
				url: baseServiceUrl + 'user/ads/deactivate/' + adId
			};

			$http(request).success(success).error(error);
		};

		function publishAgainAd (adId, success, error) {
			var request = {
				method: 'PUT',
				headers: authService.getAuthHeaders(),
				url: baseServiceUrl + 'user/ads/publishagain/' + adId
			};

			$http(request).success(success).error(error);
		};

		function loadUserAd (adId, success, error) {
			var request = {
				method: 'GET',
				url: baseServiceUrl + 'user/ads/' + adId,
				headers: authService.getAuthHeaders()
			};

			$http(request).success(success).error(error);
		}

		function editUserAd (adData, success, error) {
			var request = {
				method: 'PUT',
				url: baseServiceUrl + 'user/ads/' + adData.id,
				headers: authService.getAuthHeaders(),
				data: adData
			};

			$http(request).success(success).error(error);
		}

		return {
			getUserProfile: getUserProfile,
			editUserProfile: editUserProfile,
			editUserPassword: editUserPassword,
			createNewAd: createNewAd,
			getUserAds: getUserAds,
			deactivateAd: deactivateAd,
			publishAgainAd: publishAgainAd,
			deleteAd: deleteAd,
			editUserAd: editUserAd,
			loadUserAd:loadUserAd
		}
	}
);