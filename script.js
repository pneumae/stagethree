var combinationlist = [];
var correctvalue = "0";
var incorrectvalue = "0";
var unknownvalue = "0";
var enteredresponse = [];

var currentcombination = ['1','1','2','2']
var b = ['1','1','0','2'];

combinationGenerator();
function getRadioValue(radioname) {
    var radios = document.getElementsByName(radioname);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            if (radioname === "correct") {
                correctvalue = radios[i].value;
            }
            else if (radioname === "incorrect") {
                incorrectvalue = radios[i].value;
            }
            // else if (radioname === "unknown") {
            //  unknownvalue = radios[i].value;
            // }
            else {break;}
        }
    }
    unknownvalue = 4 - correctvalue - incorrectvalue;
    enteredresponse.length = 0;
    enteredresponse.push(Number(correctvalue), Number(incorrectvalue), unknownvalue);

    document.getElementById('pText').innerHTML = combinationlist;
    iconSetter(currentcombination);
}

function addButt() {
    var butx = document.getElementById("submitButton");
    butx.addEventListener("click", function() {
                                            getRadioValue("correct");
                                            getRadioValue("incorrect");
                                            // getRadioValue("unknown");
                                            });
    $(document).ready(function() {
        $( "#togbut" ).click(function() {
            $( "#pText" ).toggle();
        });
    });
}

function iconSetter(currentcombination) {
    var images = {
        0 : "Resources/medal.gif",
        1 : "Resources/scroll.gif",
        2 : "Resources/wine.gif",
        3 : "Resources/food.gif"
    }
    document.getElementById("imageone").src = images[currentcombination[0]];
    document.getElementById("imagetwo").src = images[currentcombination[1]];
    document.getElementById("imagethree").src = images[currentcombination[2]];
    document.getElementById("imagefour").src = images[currentcombination[3]];
}

function combinationGenerator() {
    var i = 0;
    while (i < 4) {
        var j = 0;
        while (j < 4) {
            var k = 0;
            while (k < 4) {
                var l = 0;
                while (l < 4){
                    combinationlist.push(''+i+j+k+l);
                    l++;
                }
                k++;
            }
            j++;
        }
        i++;
    }
    // return combinationlist;
}

function getIntersection(array1, array2) {
    var returnarray = [];
    for (var i = array1.length - 1; i >= 0; i--) {
        for (var j = array2.length - 1; j >= 0; j--) {
            if (array1[i] === array2[j]) {
                returnarray.push(array1[i]);
                array1.splice(i,1);
                array2.splice(j,1);
            }
            // else {continue;}
        }
    }
    return returnarray;
}

// enteredcombination is an array ['0','0','0','0'] -> ['3','3','3','3'] CHAR NOT INT
// assume that testingcombination is correct combination
// response is [correct, incorrect, unknown] INT NOT CHAR
function combinationComparer(enteredcombination, response) {
    var temporarycombinationlist = [];
    for (var i = combinationlist.length - 1; i >= 0; i--) {
            // console.log("hi")
            // console.log(combinationlist.length)
            // console.log(i)

        var temporaryenteredcombination = enteredcombination.slice();
        var testingcombination = combinationlist[i].split("");
        var generatedresponse = [0,0];
        // console.log(generatedresponse)
        // console.log(combinationlist[i]);
        if (response[2] === 4) {
            // all wrong
            // if no intersection, keep testingcombination
            if (getIntersection(testingcombination, temporaryenteredcombination).length === 0) {
                temporarycombinationlist.push(combinationlist[i]);
            }
            // else {continue;}
        }
        else {
            for (var j = testingcombination.length - 1; j >= 0; j--) {
                if (testingcombination[j] === temporaryenteredcombination[j]) {
                    // if they are the same, increment correct value and remove elements
                    generatedresponse[0]++;
                    testingcombination.splice(j,1);
                    temporaryenteredcombination.splice(j,1);
                    // console.log(combinationlist[i])
                }
                // else {continue;}
            }
            // console.log(testingcombination, temporaryenteredcombination)
            // break;
        
            generatedresponse[1] = generatedresponse[1] + getIntersection(testingcombination, temporaryenteredcombination).length


            // break;
            if (generatedresponse[0] === response[0] && generatedresponse[1] === response[1]) {
                temporarycombinationlist.push(combinationlist[i]);
                console.log("push")
                // break;
            }
            // else {
            //     console.log(arrayequality(generatedresponse,response))
            // }
        }
    }
    console.log(temporarycombinationlist)
    combinationlist = temporarycombinationlist.slice();
    temporarycombinationlist.length = 0;
}

function arrayequality(array1, array2) {
    var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
    return element === array2[index]; 
    });
    return is_same;
}
function getTime() {
    var x = performance.now();
    combinationGenerator();
    var y = performance.now();
    console.log(y,x);
}