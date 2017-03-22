angular.module("ShopApp")
.controller("LoginCntrl",function($http,$location,$cookies){
    this.usrName="";this.pswd="";this.loadShow=false;this.errShow=false;this.btnDisable=true;this.userStatus="Next";
    var self=this;self.showPwd=false;self.pswStatus="";self.warnMsg="";
        jQuery("#lginModal").modal({backdrop: "static"});    
    
    this.validateUser = function(){
        self.errShow=false;
        self.loadShow=true;
        self.userStatus="Processing ...";
        $http({method:'POST',url:'/',data:{username:this.usrName,u:true}})
        .then(function successCallback(response) {
            self.loadShow=false;self.showPwd=true;self.pswStatus="Login";
        },function errorCallback(response) {
            self.loadShow=false;self.errShow=true;self.warnMsg="Sorry, User name is incorrect.";self.userStatus="Next";
        });    
    };
    
    this.validatePassword = function(){
        self.errShow=false;
        self.loadShow=true;
        self.pswStatus="Logging in ...";
        $http({method:'POST',url:'/',data:{username:this.usrName,password:this.pswd,p:true}})
        .then(function successCallback(response) {
            self.loadShow=false; jQuery("#lginModal").modal('hide');$location.path('/home');
        },function errorCallback(response) {
            self.loadShow=false;self.errShow=true;self.warnMsg="Sorry, Password is incorrect.";self.pswStatus="Login";
        });    
    };
        
    this.loggout=function(){
        alert("")
        $cookies.remove("LoginStatus");
    };
    this.closeModal = function(){
        jQuery("#lginModal").modal('hide');
    };  
});