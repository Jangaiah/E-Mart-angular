angular.module("ShopApp")
.controller("SearchCntrl",function(filterFilter,$http,PaginationService){
    var self=this,no_records_page=8;
    PaginationService.clearData();
    
    self.Items=[];self.pages=[];self.fullDataLabel="";self.active_class=0,self.isFullData=PaginationService.isFullData;
    self.noPrev=PaginationService.noPrev;self.noNext=PaginationService.noNext;
        
    $http({method: 'GET',url: 'public/model/data.json'})
     .then(function successCallback(response) {        
        //console.log("In side http service");
        PaginationService.registerData({data:response.data,records_page:no_records_page});        
        self.Items=PaginationService.getPage();
        self.active_class=PaginationService.active_class;
        self.fullDataLabel=PaginationService.fullDataLabel;
        self.pages=PaginationService.pages;self.isFullData=PaginationService.isFullData;
        },
        function errorCallback(response) {});
    
    this.prevPage=function(){        
        if(!PaginationService.noPrev && !self.isFullData){
        self.Items=PaginationService.prevPage();
        self.active_class=PaginationService.active_class;
        }
        self.noPrev=PaginationService.noPrev;self.noNext=PaginationService.noNext;
        self.isFullData=PaginationService.isFullData;
    };
    this.nextPage=function(){        
        if(!PaginationService.noNext && !self.isFullData){
        self.Items=PaginationService.nextPage();
        self.active_class=PaginationService.active_class;
        }
        self.noPrev=PaginationService.noPrev;self.noNext=PaginationService.noNext;
        self.isFullData=PaginationService.isFullData;
    };
    
    this.getThisPage=function(_index){        
        if(!self.isFullData){
        self.Items=PaginationService.getThisPage(_index);
        self.active_class=PaginationService.active_class;
        }
        self.noPrev=PaginationService.noPrev;self.noNext=PaginationService.noNext;
        self.isFullData=PaginationService.isFullData;
    };
    
    this.fullPage=function(){
        self.Items=PaginationService.fullPage();
        self.active_class=PaginationService.active_class;
        self.fullDataLabel=PaginationService.fullDataLabel;
        self.isFullData=PaginationService.isFullData;
    };    
});