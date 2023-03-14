
//đây là nơi để điều hướng route
angular.module('app-route', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/trangchu.html',
        controller: TrangChuController
    }).when('/dang-ky', {
        templateUrl: 'views/dangky.html',
        controller: DangKyController
    }).when('/tin-tuc', {
        templateUrl: 'views/tintuc.html',
        controller: TinTucController
    })
})
