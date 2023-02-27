var app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.run(function ($rootScope, $http) {
  $rootScope.hide;
  $rootScope.timer = 0;
  $rootScope.Student = null;
  $rootScope.checkKq = null;
  var ma = "";
  $rootScope.checkMail = null;
  $rootScope.Students = [];
  checkHref();
  loadingStudent();
  function loadingStudent() {
    var dbRef = firebase.database().ref().child("Students");
    dbRef.on(
      "value",
      (snapshot) => {
        var i = 0;
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          $rootScope.Students[i] = snapshot.child(key).val();
          i++;
        });
        autoLogin();
        
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.name);
      }
    );
    
  }
  
  $http.get("db/Subjects.json").then(function (response) {
    $rootScope.Subjects = response.data;
    $rootScope.subjects = angular.copy($rootScope.Subjects);
  });

  $rootScope.logout = function () {
    Swal.fire({
      title: "Bạn có chắc chắn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.value) {
        localStorage.setItem("user-name", "none");
        localStorage.setItem("user-pass", "none");
        Swal.fire({
          icon: "warning",
          title: "Đã đăng xuất!",
          text: "Quay lại trang chủ!",
          showConfirmButton: false,
          closeOnClickOutside: false,
          allowOutsideClick: false,
          timer: 2000,
        });
        $rootScope.Student = null;
        $rootScope.indexStudent = -1;
        window.location.href = "#!index";
        $rootScope.hide = 0;
      }
    });
  };

  $rootScope.search = function () {
    //Tìm kiếm nhanh
    $rootScope.count = 0;
    if ($rootScope.change == "") {
      $rootScope.subjects = angular.copy($rootScope.Subjects);
    } else {
      $rootScope.Subjectstemp = [];
      var dem = 0;
      for (let i = 0; i < $rootScope.Subjects.length; i++) {
        if (
          $rootScope.Subjects[i].Name.toLowerCase().includes(
            $rootScope.change.toLowerCase()
          )
        ) {
          $rootScope.Subjectstemp[dem] = angular.copy($rootScope.Subjects[i]);
          dem++;
        }
      }
      $rootScope.subjects = angular.copy($rootScope.Subjectstemp);
    }
  };
  $rootScope.changeSearch = function (x) {
    $rootScope.hide = x;
  };

  function checkHref() {
    var y = window.location.href;
    if (y.includes("index")) {
      $rootScope.hide = 0;
    } else {
      $rootScope.hide = 1;
    }
  }

  $rootScope.checkLogin = function (checkID) {
    if ($rootScope.Student == null) {
      Swal.fire({
        title:
          '<h1 style="color:red;font-weight:bold;font-size:30px">Bạn chưa đăng nhập</h1>',
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
        timer: 5000,
      }).then((result) => {
        if (result.value) {
          window.location.href = "#!login";
        }
      });
      return;
    } else {
      window.location.href = "#!viewtest/" + checkID;
    }
  };
  $rootScope.forgotPassWord = async function () {
    var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var forGotPass = null;
    const { value: text } = await Swal.fire({
      title:
        "<h1 style='color: red;font-weight: bold;'>QUÊN MẬT KHẨU</h1> <br>",
      input: "text",
      inputPlaceholder: "Nhập Email của bạn...",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "") {
            resolve("Bạn chưa nhập email :)");
          } else {
            resolve();
          }
        });
      },
    });
    if (text) {
      $rootScope.Students.forEach((arr) => {
        if (text == arr.email) {
          forGotPass = arr.password;
          return;
        }
      });
      if (forGotPass == null) {
        Swal.fire({
          title:
            "<h1 style='color: red;font-weight: bold;'>EMAIL KHÔNG TỒN TẠI</h1> <br>",
          icon: "error",
        });
        return;
      }
      if (!pattern.test(text)) {
        Swal.fire({
          title:
            "<h1 style='color: red;font-weight: bold;'>EMAIL KHÔNG ĐÚNG ĐỊNH DẠNG</h1> <br>",
          icon: "error",
        });
        return;
      } else {
        $rootScope.checkMail = text;
        for (var i = 0; i < 6; i++) {
          var ran = Math.floor(Math.random() * 9);
          ma += ran;
        }
        Email.send({
          SecureToken: "3bfe3a34-a8eb-4d31-8b8c-300024e2b434",
          To: text,
          From: "tracnghiemonlinedhs@gmail.com",
          Subject: "Mã của bạn ",
          Body: ma,
        }).then( checkMa());
      }
    }
  };
  async function checkMa() {
    const { value: textMa } = await Swal.fire({
      title:
        "<h1 style='color: red;font-weight: bold;'>Nhập mã của bạn</h1> <br>",
      input: "text",
      inputPlaceholder: "Nhập mã của bạn...",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "") {
            resolve("Bạn chưa nhập mã :)");
          } else {
            resolve();
          }
        });
      },
    });
    if (textMa) {
      if (textMa == ma) {
        $rootScope.Students.forEach((arr) => {
          if (arr.email == $rootScope.checkMail) {
            $rootScope.Student = arr;
            window.location.href = "#!changepassword";
          }
        });
        ma = "";
      }
    }
  }
$rootScope.checkUsername=null;
  function autoLogin() {
    //username password
    let userName = localStorage.getItem("user-name");
    let userPass = localStorage.getItem("user-pass");
    var dbRef = firebase.database().ref().child("Students/"+userName);
          dbRef.on(
            "value",
            (snapshot) => {
              $rootScope.Student=snapshot.val();
            },
            (errorObject) => {
              console.log("The read failed: " + errorObject.name);
            }
          );
          let pointer = localStorage.getItem("conTro");
          if(pointer == "#!review"){
            pointer = "#!index";
            //window.location.href = "#!index";
          }
          if(pointer==null){
            pointer = "#!login";
          }
          if (pointer != "#!viewtest") {
            window.location.href = pointer;
          }

  }
  $rootScope.checkMN = 0;
  $rootScope.checkMenu = function () {
    if ($rootScope.checkMN % 2 == 0) {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("mySidenav").style.marginTop = "30px";
      document.getElementById("mySidenav").style.width = "330px";
      if (window.screen.width > 900) {
        document.getElementById("main").style.marginLeft = "350px";
      }
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    } else {
      document.getElementById("mySidenav").style.width = "0";
      if (window.screen.width > 900) {
        document.getElementById("main").style.marginLeft = "5%";
      }
      document.body.style.backgroundColor = "white";
    }
    $rootScope.checkMN++;
  };
});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/index", { templateUrl: "html/index.html", controller: "indexCtrl" })
    .when("/about", { templateUrl: "html/about.html", controller: "aboutCtrl" })
    .when("/contact", {
      templateUrl: "html/contact.html",
      controller: "contactCtrl",
    })
    .when("/feedback", {
      templateUrl: "html/feedback.html",
      controller: "feedbackCtrl",
    })
    .when("/FAQ", { templateUrl: "html/FAQ.html" })
    .when("/login", { templateUrl: "html/login.html", controller: "loginCtrl" })
    .when("/register", {
      templateUrl: "html/register.html",
      controller: "registerCtrl",
    })
    .when("/updateaccount", {
      templateUrl: "html/updateaccount.html",
      controller: "updateaccountCtrl",
    })
    .when("/changepassword", {
      templateUrl: "html/changepassword.html",
      controller: "changepasswordCtrl",
    })
    .when("/viewtest/:id", {
      templateUrl: "html/viewtest.html",
      controller: "viewtestCtrl",
    })
    .when("/test/:id", {
      templateUrl: "html/test.html",
      controller: "testCtrl",
    })
    .when("/review", {
      templateUrl: "html/review.html",
      controller: "reviewCtrl",
    })
    .otherwise({ redirectTo: "/index" });
});
