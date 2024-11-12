(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
     $scope.lunchItems = '';
     $scope.message = '';

     $scope.checkLunch = function() {
          if (!$scope.lunchItems.trim()) {
                $scope.message = "Please enter data first";
                return;
          }

          const items = $scope.lunchItems.split(',');
          const itemCount = items.length;

          if (itemCount <= 3) {
              $scope.message = "Enjoy!";
          } else {
              $scope.message = "Too much!";
          }
      };
  }
})();
