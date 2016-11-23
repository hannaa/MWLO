
$(document).ready(function () {
    var myArray = [
         { name: "Projekti", credits: 20, time: 200 },
         { name: "Algoritmit", credits: 2, time: 40 },
         { name: "Videot", credits: 5, time: 20 },
         { name: "Keikka", credits: 1, time: 10 },
         { name: "Ohjelmointi", credits: 9, time: 90 },
         { name: "Lopputyö", credits: 17, time: 100 }

    ]

    for(i = 0; i < myArray.length; i++){
  	    $("#coursetable").append('<tr><th scope="row">'+(i+1)+'</th><td>'+myArray[i].name+'</td><td>'+myArray[i].credits+'</td><td>'+myArray[i].time+'</td></tr>');
  	}
    //original https://gist.github.com/danwoods/7496329, changed few things to fit our program
    function knapsack(capacity) {
        var idxItem = 0,
        idxWeight = 0,
        oldMax = 0,
        newMax = 0,
        numItems = myArray.length,
        weightMatrix = new Array(numItems+1),
        keepMatrix = new Array(numItems+1),
        solutionSet = [];
        console.log(myArray);
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
                else if (myArray[idxItem-1].time <= idxWeight){
                    newMax = myArray[idxItem-1].credits + weightMatrix[idxItem-1][idxWeight-myArray[idxItem-1].time];
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
      solutionSet.push(myArray[idxItem - 1]);
      idxWeight = idxWeight - myArray[idxItem - 1].time;
    }
  }
  return {"maxValue": weightMatrix[numItems][capacity], "set": solutionSet};
}
var result = knapsack(200);
			var set = result.set;
			console.log(set);
});
