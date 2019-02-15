var combinationlist = [];
var correctvalue = "0";
var incorrectvalue = "0";
var unknownvalue = "0";
var enteredresponse = [];

var currentcombination = ['1','1','2','2']

addButt();
combinationGenerator();
document.getElementById('pText').innerHTML = combinationlist;
iconSetter(currentcombination);

// TODO: default radio values
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
            // else {break;}
        }
    }
    unknownvalue = 4 - correctvalue - incorrectvalue;
    enteredresponse.length = 0;
    enteredresponse.push(Number(correctvalue), Number(incorrectvalue), unknownvalue);


}

function sumbitActions() {
    getRadioValue("correct");
    getRadioValue("incorrect");
    combinationComparer(currentcombination,enteredresponse)
    document.getElementById('pText').innerHTML = combinationlist;
    nextTry();
    iconSetter(currentcombination);
}

function addButt() {
    var butx = document.getElementById("submitButton");
    butx.addEventListener("click", function() {
                                            sumbitActions();
                                            // getRadioValue("correct");
                                            // getRadioValue("incorrect");
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
        // console.log(combinationlist.length)
        // console.log(i)

        var temporaryenteredcombination = enteredcombination.slice();
        var testingcombination = combinationlist[i].split("");
        var generatedresponse = [0,0];
        if (response[2] === 4) {
            // all wrong
            // if no intersection, keep testingcombination
            if (getIntersection(testingcombination, temporaryenteredcombination).length === 0) {
                temporarycombinationlist.push(combinationlist[i]);
            }
        }
        else {
            for (var j = testingcombination.length - 1; j >= 0; j--) {
                if (testingcombination[j] === temporaryenteredcombination[j]) {
                    // if they are the same, increment correct value and remove elements
                    generatedresponse[0]++;
                    testingcombination.splice(j,1);
                    temporaryenteredcombination.splice(j,1);
                }
            }
            generatedresponse[1] = generatedresponse[1] + getIntersection(testingcombination, temporaryenteredcombination).length
            if (generatedresponse[0] === response[0] && generatedresponse[1] === response[1]) {
                temporarycombinationlist.push(combinationlist[i]);
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

function nextTry() {
    currentcombination = combinationlist[0].split("")
    iconSetter(currentcombination)
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