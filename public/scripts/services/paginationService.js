angular.module("ShopApp")
.factory("PaginationService",function(){
var page={};
    page.data=[];
    page.fullDataLabel="All Items";
    page.isFullData=false;
    page.pages=[];
    page.active_class=0;
    page.noPrev=true;
    page.noNext=false;
    
    var no_records_page=0, tot_records=0, curr_page=0,noOfPages = 0,temp_active=-1,lastPageIndex=0;
    
    page.clearData=function(){
        page.data=[];page.fullDataLabel="All Items";page.isFullData=false;page.pages=[];page.active_class=0;page.noPrev=true;page.noNext=false;
        no_records_page=0;tot_records=0;curr_page=0;noOfPages=0;temp_active=-1;
    }
    page.registerData=function(data_set){
        //console.log("Registering data in service");
        page.data=data_set.data;
        tot_records=page.data.length;
        no_records_page=data_set.records_page;
        noOfPages = Math.ceil(tot_records/no_records_page);
        for(let i=0;i<noOfPages;i++) page.pages.push(i);
        lastPageIndex=page.pages.length-1;
    };
    
   page.getPage=function(){
        if(!page.isFullData){
            //console.log("Servicing data");
            return page.data.slice(curr_page,curr_page+no_records_page);
        }else{            
            return page.data;
        }
    };
        
    page.prevPage=function(){
        if(curr_page-no_records_page==0) page.noPrev=true;
        if(curr_page-no_records_page>=0 && !page.isFullData){
            curr_page-=no_records_page;
            this.active_class-=1;
            page.noNext=false;
            return page.getPage();
        }
    };
    page.nextPage=function(){
        if((curr_page+no_records_page)==(lastPageIndex*no_records_page)) page.noNext=true;
        if(!((curr_page+no_records_page)>tot_records) && !page.isFullData){
          curr_page+=no_records_page;
          page.active_class+=1;
          page.noPrev=false;
          return page.getPage();
        }
    };
    page.getThisPage=function(_index){
        if(_index==0) { page.noPrev=true;page.noNext=false; }
        else if(_index==lastPageIndex){ page.noPrev=false;page.noNext=true; }
        else { page.noPrev=false;page.noNext=false; }
        
        if(!page.isFullData){
        curr_page=_index*no_records_page;
        page.active_class=_index;
        return page.getPage();
        }
   };
    page.fullPage=function(){
        page.isFullData=!page.isFullData;
        if(page.isFullData) {
            page.fullDataLabel="Back to pages"
            temp_active=page.active_class;
            page.active_class=-1;
        }
        else{
            page.fullDataLabel="All Items"
            page.active_class=temp_active;
        }
        return page.getPage();
    };
    
    return page;
});