/**
 * Created by Gustavo on 19/06/2017.
 */
angular.module("petrastreio-web").factory('meuInterceptor', function ($q) {
    return {
        response: function (response) {
            // do something on success
            alert("ok");
            return response;
        },
        responseError: function (response) {
            alert("error");
            return $q.reject(response);
        }
    };
});

//angular.module("petrastreio-web").config(function ($httpProvider) {
//    $httpProvider.interceptors.push('meuInterceptor');
//});