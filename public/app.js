angular.module("ShopApp",['ui.router','ngAnimate','ngCookies'])
.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise("login");
    $stateProvider
    .state('home',{
        url:'/home',
        templateUrl:'public/view/home.html',
        controller: 'SearchCntrl as search'
    })
    .state('login',{
        url:'/login',
        templateUrl:'public/view/login.html',
        controller: 'LoginCntrl as lgn'
    }).state('signUp',{
        url:'/signUp',
        templateUrl:'public/view/signUp.html',
        controller: 'SignUpCntrl as sgn'
    });
    $locationProvider.hashPrefix('');
})
.controller("MetaCntrl",function($scope){this.title = "Online Shop";});
