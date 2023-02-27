app.controller("reviewCtrl",function($rootScope,$scope){
    localStorage.setItem("conTro","#!review");
    $scope.ques = [];
    $scope.answers = [];
    $scope.elem = [];
    $scope.kq=$rootScope.KQ;
    for (var i = 0; i < $rootScope.checkKq.length; i++) {
        $scope.ques[i] = {
            id: i,
            name: $rootScope.checkKq[i].Text,
            ans: $rootScope.checkKq[i].Answers,
            AnswerId: $rootScope.checkKq[i].AnswerId
        };
        $scope.elem[i]=$scope.ques[i].AnswerId;
        $scope.answers[i]=$scope.ques[i].ans;
    }
})