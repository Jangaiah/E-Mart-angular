angular.module("ShopApp",['ngRoute','ngAnimate','ngCookies'])
.config(function($routeProvider,$locationProvider){   
    $routeProvider    
    .when('/home',{
        templateUrl:'public/view/home.html',
        controller: 'SearchCntrl as search'
    }).when('/login',{
        templateUrl:'public/view/login.html',
        controller: 'LoginCntrl as lgn'
    }).when('/loggout',{
        templateUrl:'public/view/loggout.html',
        controller: 'LoggoutCntrl as lgout'
    }).when('/signUp',{
        templateUrl:'public/view/signUp.html',
        controller: 'SignUpCntrl as sgn'
    })
    .otherwise({redirectTo: "/login"});
    $locationProvider.hashPrefix('');
})
.run( function($cookies, $location,$rootScope) {
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( $cookies.get('loggedUser') == null ) {
        if ( next.templateUrl == "public/view/home.html" ) {
          // already going to #login, no redirect needed
            alert("Home page is not accessable util you login, redirecting to login.");
            $location.path( "/login" );
        } 
          else if( next.templateUrl == "public/view/signUp.html"){$location.path( "/signUp" );}
          else if( next.templateUrl == "public/view/loggout.html"){$location.path( "/loggout" );}
          else {$location.path( "/login" );}
      }else{
          $rootScope.userName=$cookies.get('loggedUser')
          //alert($rootScope.userName+" user has already logged in. Redirecting to home page");
          $location.path( "/home" );}
    });
 })
.controller("MetaCntrl",function($scope){this.title = "E-Mart";})
.controller("MainController",function($scope,$rootScope,$cookies,$location){
    var self=this;
    self.loginLogout="Login";
    this.userName =$rootScope.userName;
    this.getUser=function(){console.log("seting user title");self.userName =$rootScope.userName;if(self.userName){self.loginLogout="Loggout";}};
    this.toggleLogInLoggout=function(){        
        if(self.userName){
            $cookies.remove("loggedUser");self.loginLogout="Login";self.userName=$rootScope.userName=null;$location.path( "/loggout");
        }else{
            $location.path( "/login");
        }
        
    };
});
