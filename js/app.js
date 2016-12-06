
$(document).ready(function () {

  var courseArray = [];

  function Course(name, credits, time){
    this.name = name;
    this.credits = credits;
    this.time = time;
  }

  function setCourses(){
    courseArray.push(new Course('Projekti', 20, 200));
    courseArray.push(new Course('Algoritmit', 2, 40));
    courseArray.push(new Course('Videot', 5, 20));
    courseArray.push(new Course('Keikka', 1, 10));
    courseArray.push(new Course('Ohjelmointi', 9, 90));
    courseArray.push(new Course('Lopputyö', 17, 100));

    for(i = 0; i < courseArray.length; i++){
  	    $("#coursetable").append('<tr><td>'+courseArray[i].name+'</td><td>'+courseArray[i].credits+'</td><td>'+courseArray[i].time+'</td></tr>');
  	}
  }

  function addCourse(){
    var n = $('#courseName').val();
    var c = parseInt($('#courseCredits').val());
    var h = parseInt($('#courseHours').val());
      courseArray.push(new Course(n, h, c));
      $("#coursetable").append('<tr><td>'+n+'</td><td>'+c.toString()+'</td><td>'+h.toString()+'</td><td><button class="btn btn-default delete">DELETE</button></td></tr>');
      console.log(courseArray);
  }
    //original https://gist.github.com/danwoods/7496329, changed few things to fit our program
    function knapsack(capacity) {
        var idxItem = 0,
        idxWeight = 0,
        oldMax = 0,
        newMax = 0,
        numItems = courseArray.length,
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
                else if (courseArray[idxItem-1].time <= idxWeight){
                    newMax = courseArray[idxItem-1].credits + weightMatrix[idxItem-1][idxWeight-courseArray[idxItem-1].time];
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
              solutionSet.push(courseArray[idxItem - 1]);
              idxWeight = idxWeight - courseArray[idxItem - 1].time;
            }
        }
        return {"maxValue": weightMatrix[numItems][capacity], "set": solutionSet};
    }

    setCourses();

    $('#add').on('click', function(){
      addCourse();
    });

    $('#optimize').on('click', function(){
        var result = knapsack(200);
        var set = result.set;
        console.log(set);
        for(i = 0; i < set.length; i++){
        $("#results").append('<tr><td>'+set[i].name+'</td><td>'+set[i].credits+'</td><td>'+set[i].time+'</td>');
      }
    });
});
