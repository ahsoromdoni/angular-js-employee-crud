'use strict';

var passingData = angular.module('myApp.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2/:id', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

passingData.controller('View2Ctrl', function ($scope, $http, $location) {

  $http({
    method: 'GET',
    url: 'http://localhost:9090/employee/0'
  }).then(function success(response) {
    $scope.value = response.data.positionList
  })

  $scope.name = null;
  $scope.birthDate = null;
  $scope.positionId = null;
  $scope.idNumber = null;
  $scope.gender = null;
  $scope.postData = function (name, birthDate, positionId, idNumber, gender) {
    let said = confirm('Are you sure want to submit this ?');
    if (said == true) {
      let data = {
        name: name,
        birthDate: birthDate,
        positionId: positionId,
        idNumber: idNumber,
        gender: gender,
        isDelete: 0
      };
      if (data.name != null && data.birthDate != null && data.positionId != null && data.idNumber != null && data.gender != null) {
        $http.post('http://localhost:9090/employee', JSON.stringify(data)).then(function (respon) {
          if (respon.data) {
            $scope.msg = "Post Data Submitted Successfully!"
            alert("Data has been submit !")
            $location.path("#!/view1")
          }
        }, function (respon) {
          console.log("ini status " + respon.status);
          if (respon.status == 406) {
            alert("Employee ID Number Already Exist")
          }
        }
        )
      }
      else {
        alert("Please fill all the form")
      }


    } else {
      console.log('you out');
    }

  }
})

