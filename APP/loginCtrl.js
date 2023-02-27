app.controller("loginCtrl", function($scope, $rootScope) {
    localStorage.setItem("conTro","#!login");
    $rootScope.hide = 1;
   var check=0;
    $scope.login = function() {
        if ($scope.userName != null && $scope.passWord != null) {
            $rootScope.Students.forEach(arr => {
                if (arr.username == $scope.userName && arr.password == $scope.passWord) {
                    $rootScope.Student = arr;
                    localStorage.setItem("user-name", arr.username);
                    localStorage.setItem("user-pass", arr.password);
                    $rootScope.indexStudent = arr.index;
                    check = 1;
                    return;
                }
            });
            if (check == 1) {
                Swal.fire({
                    title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Đăng nhập thành công</h1>',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000

                });
                window.location.href = "#!index";
            } else {
                Swal.fire({
                    title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tài khoản hoặc mật khẩu không đúng</h1>',
                    icon: 'warning',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 3000

                });
            }
        }
    }
})