/**
 * Created by Sam on 11/03/2018.
 */
var app = angular.module('handcraftsApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    
    $routeProvider
        .when("/home", {
            templateUrl: "views/home.html",
            controller: "HomeController"
        })
        .when("/admin", {
            templateUrl: "views/login.html",
            controller: "loginController"
        })
        .when("/product", {
            templateUrl: "views/products.html",
            controller: "productController"
        })
        .when("/addproduct", {
            templateUrl: "views/addProduct.html",
            controller: "productController"
        })
        .when("/contact", {
            templateUrl: "views/contact.html",
            controller: "mapController"
        })
        .otherwise({
            redirectTo: "/home"
        })
});
app.controller('HomeController', ["$scope", "$window", 'otisService', function ($scope, $window, otisService) {
    $scope.loggedIn = otisService.loggedIn;
}]);
app.controller('loginController', ["$scope", "$location", 'otisService', function ($scope, $location, otisService) {
    $scope.loggedIn = otisService.loggedIn;
    $scope.login = function () {
        if ($scope.username == 'admin' && $scope.password == 'admin') {
            $location.path('/home');
            otisService.loggedIn = true;
            otisService.username = $scope.username;
            $scope.loggedIn = otisService.loggedIn;
            document.getElementById('logoutNav').style.display = '';
            document.getElementById('adminNav').style.display = 'none';
            return true;
        } else {
            alert("Wrong Credentials!!!")
        }
    }
    $scope.logout = function () {
        $location.path('/admin');
        otisService.loggedIn = false;
        otisService.username = '';
        $scope.loggedIn = otisService.loggedIn;
        document.getElementById('logoutNav').style.display = 'none';
        document.getElementById('adminNav').style.display = '';
    }
}]);

app.controller('productController', ['$scope', '$http', '$location', 'productService', 'otisService', function ($scope, $http, $location, productService, otisService) {
    $scope.addProductLocation = function (path) {
        $location.path(path);
    };
    $scope.products = productService.products;
    $scope.addProduct = function () {
        productService.addProduct($scope.newProduct);
        $location.path("/product");
    };
    $scope.loggedIn = otisService.loggedIn;
}]);

app.controller('mapController', ['$scope', function ($scope) {
    $scope.initialize = function () {
        var map = new google.maps.Map(document.getElementById('map_div'), {
            center: { lat: 53.3488, lng: -6.2432 },
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        $scope.mymapdetail = new google.maps.Map(document.getElementById('map_div'), map);

        $scope.mymarker = new google.maps.Marker({
            map: $scope.mymapdetail,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(53.3488, -6.2432),
            title: "Our Location"
        });
    }

    google.maps.event.addDomListener(window, 'click', $scope.initialize);
    google.maps.event.addDomListener(window, 'load', $scope.initialize);

    $scope.submitForm = function () {
        alert("Send Request");
    }
}]);

app.service("productService", function(){

    var productService = {};

    productService.products = [{
        id: "01",
        name: "Greeting Card",
        description: " This is greeting card made with love. Hand made greeting cards are personalized and customized as you wish to your loved ones.",
        price: 20,
        availability: " In Stock ",
        desginer: "Samraj",
        img: "../../images/products/img1.png"
    },
    {
        id: "01",
        name: "Greeting Card",
        description: " This is greeting card made with love. Hand made greeting cards are personalized and customized as you wish to your loved ones.",
        price: 20,
        availability: " In Stock ",
        desginer: "Samraj",
        img: "../../images/products/img1.png"
    },
    {
        id: "01",
        name: "Greeting Card",
        description: " This is greeting card made with love. Hand made greeting cards are personalized and customized as you wish to your loved ones.",
        price: 20,
        availability: " In Stock ",
        desginer: "Samraj",
        img: "../../images/products/img1.png"
    }];

    var count = 0;
    var getNewId = productService.products.length;
    productService.addProduct = function (entry) {
        count++;
        var setNewId = parseInt(getNewId) + count;
        entry.img = "../../images/products/img1.png";
        entry.id = setNewId;
        productService.products.push(entry);
    };

    return productService;

});

app.factory('otisService', function($http){
    var service = {            
        loggedIn: false,
        username: ""
    };   
    return service;
});