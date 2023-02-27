app.controller("viewtestCtrl", function($scope, $routeParams, $rootScope) {
    localStorage.setItem("conTro","#!viewtest/"+$routeParams.id);
    $rootScope.hide = 1;
    $rootScope.Subjects.forEach(arr => {
        if (arr.Id == $routeParams.id) {
            $scope.subject = angular.copy(arr);
            return;
        }
    });
    $scope.Start = function(id) {
        Swal.fire({
            title: '<h1 style="color:red;font-weigh:bold;font-size:30px">Bắt đầu làm bài?</h1>',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.value) {
                window.location.href = "#!test/" + id;
            }
        })
    }


})