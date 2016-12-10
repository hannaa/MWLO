var app = angular.module('workload', []);

app.controller('mainController', function($scope){
  $scope.courses = [
    { name: 'Projekti', credits: 20, hours: 200 },
    { name: 'Algoritmit', credits: 2, hours: 40 },
    { name: 'Videot', credits: 5, hours: 20 },
    { name: 'Keikka', credits: 1, hours: 10 },
    { name: 'Ohjelmointi', credits: 9, hours: 90 },
    { name: 'Lopputyö', credits: 17, hours: 100 }
  ];

  //original https://gist.github.com/danwoods/7496329, changed few things to fit our program
  $scope.knapsack = function(capacity) {
      var idxItem = 0,
      idxWeight = 0,
      oldMax = 0,
      newMax = 0,
      numItems = $scope.courses.length,
      weightMatrix = new Array(numItems+1),
      keepMatrix = new Array(numItems+1),
      solutionSet = [];
      // Setup matrices
      for(idxItem = 0; idxItem < numItems + 1; idxItem++){
        weightMatrix[idxItem] = new Array(capacity+1);
        keepMatrix[idxItem]   = new Array(capacity+1);
      }

      // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
      for (idxItem = 0; idxItem <= numItems; idxItem++){
          for (idxWeight = 0; idxWeight <= capacity; idxWeight++){

              // Fill top row and left column with zeros
              if (idxItem === 0 || idxWeight === 0){
                  weightMatrix[idxItem][idxWeight] = 0;
              }

              // If item will fit, decide if there's greater value in keeping it,
              // or leaving it
              else if ($scope.courses[idxItem-1].hours <= idxWeight){
                  newMax = $scope.courses[idxItem-1].credits + weightMatrix[idxItem-1][idxWeight-$scope.courses[idxItem-1].hours];
                  oldMax = weightMatrix[idxItem-1][idxWeight];

              // Update the matrices
                if(newMax > oldMax){
                    weightMatrix[idxItem][idxWeight]  = newMax;
                    keepMatrix[idxItem][idxWeight]    = 1;
                }
                else{
                    weightMatrix[idxItem][idxWeight]  = oldMax;
                    keepMatrix[idxItem][idxWeight]    = 0;
                }
              }

              // Else, item can't fit; value and weight are the same as before
              else{
                  weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem-1][idxWeight];
              }
          }
      }

      // Traverse through keepMatrix ([numItems][capacity] -> [1][?])
      // to create solutionSet
      idxWeight = capacity;
      idxItem   = numItems;
      for(idxItem; idxItem > 0; idxItem--){
          if(keepMatrix[idxItem][idxWeight] === 1){
            solutionSet.push($scope.courses[idxItem - 1]);
            idxWeight = idxWeight - $scope.courses[idxItem - 1].hours;
          }
      }
      return {"maxValue": weightMatrix[numItems][capacity], "set": solutionSet};
  }

  $scope.addNew = function(){
    var newCourse = $scope.courses.length + 1;
    $scope.courses.push({'name':'choice'+newItemNo});
  };

  $('#optimize').on('click', function(){
      var result = $scope.knapsack(200);
      var set = result.set;
      console.log(set);
      for(i = 0; i < set.length; i++){
      $("#results").append('<tr><td>'+set[i].name+'</td><td>'+set[i].credits+'</td><td>'+set[i].hours+'</td>');
    }
  });
});
