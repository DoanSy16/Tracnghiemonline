app.controller("registerCtrl", function ($scope, $rootScope) {
  localStorage.setItem("conTro", "#!register");
  $rootScope.hide = 1;
  $scope.maxn = null;
  $scope.check = 0;
  var ma = null;
  var kt = 3;
  var title = null;
  var text = null;
  var icon = "error";
  $scope.change = function () {
    if ($scope.Student.email == null) {
      $scope.check = 0;
    }
    else {
      $scope.check = 1;
    }
  }
  $scope.sendMa = function () {
    var check = 0;
    $rootScope.Students.forEach((arr) => {
      if ($scope.Student.username == arr.username && $scope.Student.email == arr.email) {
        check = 1;
        return;
      }
      if ($scope.Student.username == arr.username) {
        check = 2;
        return;
      }
      if ($scope.Student.email == arr.email) {
        check = 3;
        return;
      }
    });
    if (check == 1) {
      title = "Tài khoản và Emailđã tồn tại";
      swal();
    } else if (check == 2) {
      title = "Tài khoản đã tồn tại";
      swal();
    } else if (check == 3) {
      title = "Email đã tồn tại";
      swal();
    } else {
      $scope.maxn = Math.floor(Math.random() * 1000000);
      Email.send({
        SecureToken: "3bfe3a34-a8eb-4d31-8b8c-300024e2b434",
        To: $scope.Student.email,
        From: "tracnghiemonlinedhs@gmail.com",
        Subject: "Mã của bạn ",
        Body: $scope.maxn,
      }).then(
        Swal.fire({
          title:
              '<h1 style="color: red; font-size: 15px;font-weight: bold;">Mã của bạn đã được gửi</h1>',
              text:'Vui lòng kiểm tra email',
            icon: "success",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 3000,
        })
      );
      check = 0;
    }
  };
  $scope.register = function () {
    if ($scope.ma == $scope.maxn) {
      var name = $scope.Student.username;
      firebase.database().ref("Students/" + $scope.Student.username).set($scope.Student);
      Swal.fire({
        title:
          "<h2 style='color:red; font-size=10px'>Bạn có muốn đăng nhập với tài khoản " +
          $scope.Student.username +
          " không?</h2>",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          var dbRef = firebase.database().ref().child("Students/"+name);
          dbRef.on(
            "value",
            (snapshot) => {
              $rootScope.Student=snapshot.val();
            },
            (errorObject) => {
              console.log("The read failed: " + errorObject.name);
            }
          );
          Swal.fire({
            title:
              '<h1 style="color: red; font-size:20px;font-weight: bold;">Đăng nhập thành công</h1>',
            icon: "success",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 3000,
          });
          window.location.href = "#!index";
        } else {
          Swal.fire({
            title:
              '<h1 style="color: red; font-size:20px;font-weight: bold;">Đăng ký thành công</h1>',
            icon: "success",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 3000,
          });
          window.location.href = "#!login";
        }
      });
      $scope.Student = {};
    }
    else {
      kt--;
      if (kt == 0) {
        $scope.maxn = null;
      }
      Swal.fire({
        title:
          '<h1 style="color: red; font-size:20px;font-weight: bold;">Mã không hợp lệ</h1>',
        text: 'Bạn còn ' + kt + ' lần nhập lại mã',
        icon: "error",
        showConfirmButton: false,
        closeOnClickOutside: false,
        allowOutsideClick: false,
        timer: 3000,
      });
    }
  };

  function swal() {
    Swal.fire({
      title:
        '<h1 style="color: red;font-weight:bold;font-size:15px">' +
        title +
        "</h1>",
      text: text,
      icon: icon,
      closeOnClickOutside: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2000,
    });
  }
});

app.require;
app.directive("rePass", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, mCtrl) {
      function rePas(value) {
        var pass = scope.Student.password;
        if (pass == value) {
          mCtrl.$setValidity("charE", true);
        } else {
          mCtrl.$setValidity("charE", false);
        }
        return value;
      }
      mCtrl.$parsers.push(rePas);
    },
  };
});
