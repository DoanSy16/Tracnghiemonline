app.controller("changepasswordCtrl", function ($rootScope, $scope) {
  $rootScope.hide = 1;
  $scope.changePass = function () {
    if (
      $rootScope.Student.password != $scope.oldpassword &&
      $rootScope.checkMail == null
    ) {
      Swal.fire({
        title:
          '<h1 style="color: red;font-weight:bold;font-size:15px">Mật khẩu cũ sai</h1>',
        icon: "error",
        showButton: false,
        timer: 2500,
      });
    } else if ($rootScope.Student.password == $scope.student.password) {
      Swal.fire({
        title:
          '<h1 style="color: red;font-weight:bold;font-size:10px">Mật khẩu trùng với mật khẩu cũ</h1>',
        icon: "error",
        showButton: false,
        timer: 2500,
      });
    } else {
      $rootScope.Student.password = $scope.student.password;
      firebase.database().ref("Students/" + $rootScope.Student.username).set($rootScope.Student);
      Swal.fire({
        title:
          '<h1 style="color: red;font-weight:bold;font-size:15px">Đổi mật khẩu thành công</h1>',
        text: "Bạn có muốn quay lại trang chủ?",
        icon: "success",
        showCancelButton: true,
        showConfirmButtonColor: "#d33",
        showCancelButtonText: "Không",
        showConfirmButtonText: "Có",
      }).then((result) => {
        if (result.value) {
          $rootScope.checkMail = null;
          window.location.href = "#!index";
        }
      });
      $scope.oldpassword = "";
      $scope.student.password = "";
      $scope.newrepassword = "";
    }
  };
});
app.directive("newRepass", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, mCtrl) {
      function newRepass(value) {
        var pass = scope.student.password;
        if (pass == value) {
          mCtrl.$setValidity("charE", true);
        } else {
          mCtrl.$setValidity("charE", false);
        }
        return value;
      }
      mCtrl.$parsers.push(newRepass);
    },
  };
});
