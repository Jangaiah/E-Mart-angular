angular.module("ShopApp")
.controller("LoginCntrl",function($http,$location,$cookies,$window,$rootScope){
    this.usrName="";this.pswd="";this.loadShow=false;this.errShow=false;this.btnDisable=true;this.userStatus="Next";
    var self=this;self.showPwd=false;self.pswStatus="";self.warnMsg="";
    
    if ( $cookies.get('loggedUser')) {
        self.usrName=$cookies.get('loggedUser');self.showPwd=true;self.pswStatus="Login";
    }
        jQuery("#lginModal").modal({backdrop: "static"});    
    
    this.validateUser = function(){
        self.errShow=false;
        self.loadShow=true;
        self.userStatus="Processing ...";
        $http({method:'POST',url:'/',data:{username:this.usrName,u:true}})
        .then(function successCallback(response) {
            self.loadShow=false;self.showPwd=true;self.pswStatus="Login";
        },function errorCallback(response) {
            self.loadShow=false;self.errShow=true;self.warnMsg="Sorry, User ID is incorrect.";self.userStatus="Next";
        });    
    };
    
    this.validatePassword = function(){
        self.errShow=false;
        self.loadShow=true;
        self.pswStatus="Logging in ...";
        $http({method:'POST',url:'/',data:{username:this.usrName,password:this.pswd,p:true}})
        .then(function successCallback(response) {
            var now=new $window.Date();
            var exp = new $window.Date(now.getFullYear(), now.getMonth(), now.getDate()+7);
            self.loadShow=false; 
            $cookies.put('loggedUser',self.usrName,{expires:exp});
            //alert("Cookie set"+$cookies.get("loggedUser"));
            jQuery("#lginModal").modal('hide');$location.path('/home');
        },function errorCallback(response) {
            self.loadShow=false;self.errShow=true;self.warnMsg="Sorry, Password is incorrect.";self.pswStatus="Login";
        });    
    };
        
    this.anotherUserLogin=function(){
        self.showPwd=false;self.usrName=self.pswd="";self.errShow=false;self.userStatus="Next";$rootScope.userName=null;
        $cookies.remove("loggedUser");
    };
    this.closeModal = function(){
        jQuery("#lginModal").modal('hide');
    };  
});