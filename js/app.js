'use strict'

/**
* Main App Module
*
* Description
* It defines this Angular application, a few constants and
* a few routes for the home, login and register screens.
*/

var app = angular.module('app', ['ngRoute', 'ngResource', 'angular-loading-bar', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api/');
app.constant('pageSize', 2);

app.config(function ($routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	});
	
	$routeProvider.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	});
	
	$routeProvider.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'RegisterController'
	});

	$routeProvider.when('/user/ads/publish', {
		templateUrl: 'templates/user/ads/publish-new-ad.html',
		controller: 'UserPublishNewAdController'
	});

	$routeProvider.when('/user/ads', {
		templateUrl: 'templates/home.html',
		controller: 'UserHomeController'
	});

	$routeProvider.when('/user/profile/edit', {
		templateUrl: 'templates/user/profile/edit-profile.html',
		controller: 'UserEditProfileController'
	});

	$routeProvider.otherwise(
		{ redirectTo: '/'}
	);

});

app.run(function ($rootScope, $location, authService) {
	$rootScope.$on('$locationChangeStart', 	function (event) {
		if ($location.path().indexOf('/user/') != -1 && !authService.isLoggedIn()) {
			$location.path('/');
		}
	});
});

app.run(function ($rootScope, $location, authService) {
	$rootScope.$on('$locationChangeStart', 	function (event) {
		if ($location.path().indexOf('/admin/') != -1 && !authService.isLoggedIn() && !authService.isAdmin()) {
			$location.path('/');
		}
	});
});