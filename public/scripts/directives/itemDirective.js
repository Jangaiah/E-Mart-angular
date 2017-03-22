angular.module("ShopApp")
.directive("myItem",function(){
    return {
        restrict : 'EA',
        templateUrl : 'public/view/ItemDirective.html',
        scope:{
            val:'='
        },
        controller: function($scope) {            
            $scope.addToCart=function(){alert($scope.val.name+" added to cart");};
        }
    }
});