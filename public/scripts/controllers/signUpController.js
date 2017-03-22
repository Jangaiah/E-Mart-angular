angular.module("ShopApp")
.controller("SignUpCntrl",function($http){    
    var self=this;self.firstName='';self.lastName='';self.email='';self.mobile='';self.uid='';self.pswd='';self.cnfPswd='';
    self.status="Submit";self.successMsg=false;self.loadShow=false;self.warnMsg="";    
    
    self.submitDetils = function(){
        self.status="Submitting...";
        self.loadShow=true;
        self.errShow=false;
        if(self.pswd===self.cnfPswd){
         $http({method:'POST',url:'/',data:{username:self.uid,password:self.pswd,signUp:true}})
        .then(function successCallback(response) { self.loadShow=false;self.status="Submit";  self.successMsg=true;
        },function errorCallback(response) {
            self.loadShow=false;self.errShow=true;self.status="Submit";self.successMsg=false;self.warnMsg="This user id has already been used. Please try with other one.";
        });
        }else{
            self.warnMsg="Password is not matching with confirm password. Please make sure you provide same.";
            self.status="Submit";
            self.loadShow=false;
            self.errShow=true;
        }
        
    };
});