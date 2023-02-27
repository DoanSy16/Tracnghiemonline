app.controller("feedbackCtrl", function ($rootScope, $scope) {
  localStorage.setItem("conTro","#!feedback");
  $scope.check = 0;
  $scope.checkNull = function () {
    if ($scope.content == "") {
      $scope.check = 0;
    } else {
      $scope.check = 1;
    }
  };
  $scope.sendMail = function () {
    var Mon="";
    if($scope.mon==""){
      Mon="";
    }else {
      Mon="<h2>Môn học: "+$scope.mon+"</h2>"
    }
    Email.send({
      SecureToken: "3bfe3a34-a8eb-4d31-8b8c-300024e2b434",
      To: "tracnghiemonlinedhs@gmail.com",
      From: "tracnghiemonlinedhs@gmail.com",
      Subject: "Phản hồi người dùng",
      Body:
        "<h2>Từ: " +
        $scope.Student.fullname +
        "<br> Email: " +
        $scope.Student.email +
        "<br>"+Mon+"</h2>" +
        "<h3>Nội dung:</h3>"+
        $scope.content,
    }).then(
      Swal.fire({
        title:
          '<h1 style="color:red;font-weigh:bold;font-size:15px">Gửi phản hồi thành công</h1>',
        icon: "success",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        timer: 2000,
      })
    );
  };
});
