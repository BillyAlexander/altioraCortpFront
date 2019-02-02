var clientControllers = angular.module('clientControllers', []),
url = 'http://localhost:8080/',
editModel = null,
items = null;
clientControllers.controller('clientCrudCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', function ($scope,  $http, $routeParams, $location, $window) {
    function cargarData() {
        
        $http.get(url+'client/getAll').then(function (r) {
            $scope.model = r.data;
            editModel=r.data;
        })
        
        var path =$location.path();
        var order =path.includes('order/create');
        if(order)
        {
            cargarItem();            
        } 
    }
    

    function cargarItem() {        
        $http.get(url+'item/getAll').then(function (r) {
            $scope.items = r.data;
        })
    }

    cargarData();

    var id = $routeParams.id;
    var existe = typeof (id) !== 'undefined';

    if (existe) {
        if(editModel!=null)
        {
            editModel.forEach(function(entry) {
                if (entry.id == id)
                {
                    $scope.nameClient = entry.nameClient;
                    $scope.lastNameClient = entry.lastNameClient;
                    $scope.orderList = entry.orders;
                }
            });
            
        }
    }

    $scope.titulo = existe ? $scope.nameClient  +' '+ $scope.lastNameClient: 'Nuevo registro';

    function save (url,data) {
        $http.post(url+'client/save', data).then(function (r) {
            cargarData();
            $scope.nameClient = null;
            $scope.lastNameClient = null;
            $location.path('/');
        })
    };


    $scope.guardarOrder = function () {
        if(existe)
        {
            var items_selected = [] ;
            for (i = 0; i < $scope.items_selected.length; i++) {
                items_selected.push({id : $scope.items_selected[i]});
              }

            var data = {
                id: id,
                nameClient:$scope.nameClient,
                lastNameClient: $scope.lastNameClient,
                orders: [{
                    dateOrder: new Date().getTime(),
                    items:items_selected,
                }]
                
            };
            save(url,data);
        }
    }

    
    $scope.guardar = function () {
        
        if (typeof ($scope.nameClient) !== 'undefined' && typeof ($scope.lastNameClient) !== 'undefined') {
            
                var data = {
                    nameClient: $scope.nameClient,
                    lastNameClient: $scope.lastNameClient,
                };

                if(!existe)
                {
                    save(url,data);
                }
                else
                {
                    editModel.forEach(function(entry) {
                        if (entry.id == id)
                        {
                            entry.nameClient= $scope.nameClient;
                            entry.lastNameClient= $scope.lastNameClient;                             
                            save(url,entry);                                
                        }
                    });
                }     
        }

        return false;
    }

    $scope.retirar = function (id) {
        if (confirm('¿Estas seguro de eliminar esta publicación?')) {
            $http.post(url+'client/delete/' + id).then(function (r) {
                cargarData();
            })
        }
    }

    var pathList =$location.path();
    var orderList =pathList.includes('order/list');
    if(orderList)
    {
                
    } 
}]);