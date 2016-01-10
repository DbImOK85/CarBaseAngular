/**
 * Created by dbimok on 02.01.16.
 */

'user strict';

var carBase = angular
    .module('carBase',[])
    .controller('carBaseCtrl', function($scope, $http){
        var maxYearElem = angular.element(document.querySelector('#maxYear'));
        $scope.carID ='';
        $scope.carYear='';
        $scope.carModel = '';
        $scope.carModelArr = [];
        $scope.BASE_URL = 'http://www.carqueryapi.com/api/0.3/?callback=?';
        $scope.arrYear=[];
        $scope.cars = [];
        $scope.carsAll=[];
        $scope.models=[];


        $scope.changeID = function(val){
            $scope.carID = val;
        };

        $scope.minChangeYear = function(val){
            $scope.carYear = val;
            console.log($scope.carYear)
        };

        $scope.maxChangeYear = function(val){
            $scope.maxCarYear = val;
            console.log($scope.maxCarYear)
        };

        $scope.carGetModel = function(val){
         $scope.carModel = val;
            console.log($scope.carModel);
        };



        function arrYears(){
            var delta;
            $scope.arrYear.splice(0, $scope.arrYear.length);
            delta = $scope.maxCarYear - $scope.carYear;
            console.log(delta);
            for (var i = 0; i <= delta; i++){
                $scope.arrYear.push(+$scope.carYear + i);

            }
            console.log($scope.arrYear);
        }

        $scope.getDate = function(){

            $http({
                method:'jsonp',
                url:$scope.BASE_URL + '&' + 'cmd=getYears',
                headers: {
                    'Access-Control-Allow-Origin': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
                },
                withCredentials: true,
                params : {callback : 'JSON_CALLBACK'}
            })
                .success(function(date){
                    $scope.years = fillYear(date);
                    //console.log($scope.years);
                });
            maxYearElem.removeAttr('disabled');
            
        };

        $scope.maxYear = function(){
            $scope.yearMax = [];
            for (var i = 0; i <= $scope.years.length; i++){
                if($scope.years[i] > $scope.carYear){
                    $scope.yearMax.push($scope.years[i])
                }
            }

        };

        function fillYear(data){
            var min = +data.Years.min_year,
                max = +data.Years.max_year,
                result = [];
            for (;max >= min; max--){
                result.push(max);
            }
            return result
        }


        $scope.getData = function(){
           arrYears();
            $scope.cars.splice(0, $scope.cars.length);
           for (var i = 0; i <= $scope.arrYear.length; i++){
               $http({
                   method:'jsonp',
                   url:$scope.BASE_URL + '&' + 'cmd=getMakes' + '&' + 'year=' + $scope.arrYear[i],
                   headers: {
                       'Access-Control-Allow-Origin': 'GET, POST, PUT, DELETE, OPTIONS',
                       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                       'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
                   },
                   withCredentials: true,
                   params : {callback : 'JSON_CALLBACK'}
               })
                   .success(function(data){
                       console.log(data);
                       for (var j = 0; j <= data.Makes.length; ++j){
                           if(typeof (data.Makes[j]) != 'undefined'){
                               $scope.cars.push(data.Makes[j]);
                           }

                       }

                   });

           }



        };

        $scope.carsData = function(){
            $scope.carsAll = $scope.cars.slice(0);
            console.log($scope.carsAll);

        };




        $scope.getModel = function(){
            $scope.carModelArr.splice(0, $scope.carModelArr.length);
            for (var i = 0; i <= $scope.arrYear.length; i++){
                $http({
                    method:'jsonp',
                    url:$scope.BASE_URL + '&' + 'cmd=getModels' + '&' + 'make=' + $scope.carModel + '&' +
                    'year=' + $scope.arrYear[i],
                    headers: {
                        'Access-Control-Allow-Origin': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
                    },
                    withCredentials: true,
                    params : {callback : 'JSON_CALLBACK'}
                })
                    .success(function(data){
                        for (var j = 0; j <= data.Models.length; ++j){
                            if(typeof (data.Models[j]) != 'undefined'){
                                $scope.carModelArr.push(data.Models[j]);
                            }

                        }
                        console.log($scope.carModelArr);
                    });
            }

        }






});