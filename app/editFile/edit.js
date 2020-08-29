'use strict';

var passingData = angular.module('Edit', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Edit/:id', {
      templateUrl: 'editFile/edit.html',
      controller: 'getEmployeeById'
    });
  }])

passingData.controller('getEmployeeById', function ($scope, $http, $routeParams) {
  $http({
    method: 'GET',
    url: 'http://localhost:9090/employee/' + $routeParams.id
  }).then(function success(response) {
    $scope.employee = response.data.employee
    $scope.positions = response.data.positionList
  })
});

passingData.controller('putEmployee', function ($scope, $http, $location) {

  $scope.putData = function (id, name, birthDate, positionId, idNumber, gender) {
    let said = confirm('Are you sure want to update this ?');
    if (said == true) {
      let data = {
        id: id,
        name: name,
        birthDate: birthDate,
        positionId: positionId,
        idNumber: idNumber,
        gender: gender,
        isDelete: 0
      }
      if (data.name != null && data.birthDate != null && data.positionId != null && data.idNumber != null && data.gender != null) {
        $http.put('http://localhost:9090/employee', JSON.stringify(data)).then(function (respon) {
          if (respon.data)
            $scope.msg = "Update Data Submitted Successfully!"
          $location.path("#!/view1")
        }, function (respon) {
          $scope.msg = "Service not Exists";
          $scope.statusval = respon.status;
          $scope.statustext = respon.statusText;
          $scope.headers = respon.headers();
        }
        )
      }
      else {
        alert("Please fill all the form")
      }
    }

  }
})

