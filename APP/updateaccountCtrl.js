app.controller("updateaccountCtrl", function($rootScope, $scope) {
    $rootScope.hide = 1;
    $scope.update = function() {
        firebase.database().ref("Students/" + $rootScope.Student.username).set($rootScope.Student);
        Swal.fire({
            icon: 'success',
            title: 'Cập nhật thông tin cá nhân thành công!',
        });

    }
});
app.directive("schoolFee", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, mCtrl) {
            function Sfee(value) {
                var pass = parseInt(value);
                if (pass >= 2000000) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(Sfee);
        }
    }
});