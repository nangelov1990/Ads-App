'use strict';

/**
* The authService is responsible for performing login / logout / register
* and keeping the information about the currently logged in user (anonymous
* site visitor / normal user / administrator).
*/

app.factory('authService',
    function ($http, $resource, baseServiceUrl) {
        var key = 'user';

        function login (userData, success, error) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'user/login',
                data: userData
            };

            $http(request)
                .success(function (data) {
                    localStorage.setItem(key, JSON.stringify(data));
                    success(data);
                }).error(error);
        };

        function register (userData, success, error) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'user/register',
                data: userData
            };

            $http(request)
                .success(function (data) {
                    localStorage.setItem(key, JSON.stringify(data));
                    success(data);
                }).error(error);
        };

        function getUserProfile () {
            // var userProfileResource = $resource(
            //   baseServiceUrl + 'user/profile',
            //   null,
            //   {
            //       'getAll': {method:'GET'}
            //   }
            // );

            // function getUserProfile (params, success, error) {
            //   return userProfileResource.getAll(params, success, error);
            // }

            // return {
            //   getUserProfile: getUserProfile
            // }

            var request = {
                method: 'GET',
                url: baseServiceUrl + 'user/profile'
            };

            $http(request).success(success).error(error);
        };

        function logout () {
            localStorage.removeItem(key);
        };

        function getCurrentUser () {
            var user = JSON.parse(localStorage.getItem(key));

            if (user) {
                return user;
            }
        };

        function isLoggedIn () {
            return localStorage.getItem(key) != undefined;
        };

        function isAnonymous () {
            return localStorage.getItem(key) == undefined;
        };

        function isNormalUser () {
            var currentUser = this.getCurrentUser();
            return (currentUser != undefined) && (!currentUser.isAdmin);
        };

        function isAdmin () {
            var currentUser = this.getCurrentUser();
            return (currentUser != undefined) && (currentUser.isAdmin);
        };

        function getAuthHeaders () {
            var headers = {};
            var currentUser = this.getCurrentUser();
            if (currentUser) {
                headers['Authorization'] = 'Bearer ' + currentUser.access_token;
            }
            return headers;
        };

        return {
            login: login,
            register: register,
            logout: logout,
            getCurrentUser: getCurrentUser,
            getUserProfile: getUserProfile,
            isLoggedIn: isLoggedIn,
            isAnonymous: isAnonymous,
            isNormalUser: isNormalUser,
            isAdmin: isAdmin,
            getAuthHeaders: getAuthHeaders
        };
    }
);
