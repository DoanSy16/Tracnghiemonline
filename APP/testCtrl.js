app.controller("testCtrl", function($scope, $http, $routeParams, $rootScope, $interval) {
    $rootScope.hide = 1;
    $rootScope.timer = 600;
    $rootScope.KQ=[];
    $rootScope.checkKq=[];
    $scope.indexQues = 0;
    $scope.marks = 0;
    $scope.elem = [];
    $scope.checkAnswerTrue = [];
    var checkOut = 0;
    $scope.checkAn = 0;
    var mark = 0;
    $rootScope.Subjects.forEach(arr => {
        if (arr.Id == $routeParams.id) {
            $scope.subject = angular.copy(arr);
            return;
        }
    });

    $http.get('db/Quizs/' + $routeParams.id + '.json').then(function(response) {
        $scope.Questions = response.data;
        ranDom();
         document.getElementById("main").style.marginLeft = "5%";

    });

    function ranDom() {
        //random 10 câu hỏi 
        var dem = 0;
        $scope.questions = [];
        for (var i = 0; i < 10; i++) {
            let ran = Math.floor(Math.random() * $scope.Questions.length);
            $scope.questions[dem] = $scope.Questions[ran];
            $scope.Questions.splice(ran, 1);
            dem++;
        }
        $rootScope.checkKq=$scope.questions;
        check(0);
    }


    function check(x) {
        //câu trả lời
        $scope.answers = angular.copy($scope.questions[x].Answers);
    }
    $scope.move = function(x) {
        $scope.indexQues = x;
        check($scope.indexQues);
    };

    // $scope.checkAnswer = function();

    function checkAnswer() {
        $scope.checkAn = 0;
        $rootScope.KQ[$scope.indexQues]= $scope.elem[$scope.indexQues].answer;
        if ($scope.questions[$scope.indexQues].AnswerId == $scope.elem[$scope.indexQues].answer) {
            Swal.fire({
                icon: 'success',
                title: 'Chúc mừng bạn đã chọn đúng!',
                text: 'Bạn được cộng ' + $scope.questions[$scope.indexQues].Marks + ' điểm',
                showConfirmButton: false,
                timer: 2000
            });
            $scope.marks = $scope.marks + $scope.questions[$scope.indexQues].Marks;
            mark++;
            $rootScope.Student.marks = angular.copy($scope.questions[$scope.indexQues].Marks + parseInt($rootScope.Student.marks));
            $scope.checkAnswerTrue[$scope.indexQues] = 1;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Rất tiết! bạn đã chọn sai đáp án.',
                showConfirmButton: false,
                timer: 2000
            });
            $scope.checkAnswerTrue[$scope.indexQues] = 0;
        }
    }
    $scope.checkAns = function() {
        Swal.fire({
            title: 'Bạn chắc chắn với câu trả lời?',
            html: '<img src="images/Confused.jpg" style="width:200px">',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                $scope.checkAn = 1;
                $scope.elem[$scope.indexQues].sub = 0;
                checkAnswer();
            }
        })
    }
    $scope.finish = function() {
        //kết thúc
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn thật sự muốn kết thúc bài thi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                $rootScope.timer = 3;
                checkOut = 1;
                Swal.fire({
                    title: 'Kết thúc bài thi',
                    html: '<h2 style="font-weigh:bold;color:red">Điểm của bạn là: ' + mark + '</h2>' +
                        '<h3>Bài thi sẽ kết thúc sau ' + $rootScope.timer + ' giây</h3>',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 3000
                });

            }
        })
    };

    var stop = $interval(function() {
        //thời gian
        if ($rootScope.timer > 0) {
            $rootScope.timer -= 1;
        } else if ($rootScope.timer == 0) {
            if (checkOut == 0) {
                Swal.fire({
                    title: 'Hết thời gian làm bài',
                    html: '<h2 style="font-weigh:bold;color:red">Điểm của bạn là: ' + mark + '</h2>',
                    icon: 'success',
                    showConfirmButton: true,
                    closeOnClickOutside: false,
                    confirmButtonText: 'Thoát',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        window.location.href = "#!viewtest/" + $scope.subject.Id;

                    }
                });

            } else {
                window.location.href = "#!viewtest/" + $scope.subject.Id;
            }
            firebase.database().ref("Students/" + $rootScope.Student.username).set($rootScope.Student);
            $interval.cancel(stop);
        }
    }, 1000);
})