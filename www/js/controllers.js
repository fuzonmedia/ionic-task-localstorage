angular.module('starter.controllers', [])

.controller('TaskCtrl', function($scope,Document) {
  // pull task which are ongoing (isCompleted=0)
  Document.all(0,function(result){
    $scope.$apply(function () {
      $scope.documents=result;
       });


  });


    $scope.complete = function(task,idx) {
      Document.MarkDone(task.id,function(validate,result){
        $scope.$apply(function () {
        if(validate){
          $scope.documents.splice(idx, 1);
        }
        else {
          /// log issue
          console.log(result);
        }

     });
    });
  };
})

.controller('TaskCompletedCtrl', function($scope, Document) {
  // pull task which are completed (isCompleted=1)
  Document.all(1,function(result){
    $scope.$apply(function () {
      $scope.documents=result;
       });


  });

})

.controller('TaskDetailCtrl', function($scope,$rootScope, $stateParams, Document) {
  Document.getById($stateParams.taskID,function(result){
    $scope.$apply(function () {
    $scope.document=result;
  });
});
})

.controller('TaskAddCtrl', function($scope,$state,Document) {


  $scope.AddNew = function(task) {
    Document.AddTask(task,function(validate,result){
      $scope.$apply(function () {
      if(validate){
        //redirect to the Task page
        $state.go('tab.task');
      }
      else {
        /// log issue
        console.log(result);
      }

         });
  });
};


});
