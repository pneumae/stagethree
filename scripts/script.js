var combinationlist = [];
var correctvalue = "0";
var incorrectvalue = "0";
var unknownvalue = "0";
var enteredresponse = [];
var currentcombination = ["0","0","1","1"];
var images = {
    0 : "Resources/medal.gif",
    1 : "Resources/scroll.gif",
    2 : "Resources/wine.gif",
    3 : "Resources/food.gif"
}

var counter = 0

resetRadio();
addButt();
combinationGenerator();
document.getElementById("pText").innerHTML = combinationlist;
iconSetter(currentcombination);
document.getElementById("foodCount").innerHTML = checkFood("3"); 
document.getElementById("wineCount").innerHTML = checkFood("2"); 

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
    document.getElementById("pText").innerHTML = combinationlist;
    nextTry();
    iconSetter(currentcombination);
    document.getElementById("foodCount").innerHTML = checkFood("3"); 
    document.getElementById("wineCount").innerHTML = checkFood("2"); 
    resetRadio();
    counter++
    console.log(counter)
}

function resetRadio() {
    document.getElementById("correct0").checked = true;
    document.getElementById("incorrect0").checked = true;
}

function addButt() {
    document.getElementById("submitButton").addEventListener("click", function() {sumbitActions();});
    document.getElementById("refreshButton").addEventListener("click", function() {getNewCombination();});
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var icon = "icon" + i + j;
            document.getElementById(icon).addEventListener("click", function() {
                iconCombinationSetter(i,j);
                $(".dropdown-content").click(function() {
                $(".dropdown-content").css("display","none");
                });
            });
        }
    }
    $(document).ready(function() {
        $( "#pText" ).hide();
        $( "#togbut" ).click(function() {
            $( "#pText" ).toggle();
        });
        if (/Mobi/.test(navigator.userAgent)) {
            $(document).on("mousedown", function() { 
                if($(".dropdown-content").is(":visible")) {
                    $(".dropdown-content").hide();
                    };
            });
            $(".dropdown").on("mousedown", function(e) {
                e.stopPropagation();
                $(".dropdown-content").hide();
                $(".dropdown-content",this).show();
            });
        }
        else {
            $(".dropdown").hover(function() {
                $(".dropdown-content", this).show();
                },function() {
                $(".dropdown-content").hide();
            });
        }
    });
}

function iconSetter(currentcombination) {
    document.getElementById("icon0").src = images[currentcombination[0]];
    document.getElementById("icon1").src = images[currentcombination[1]];
    document.getElementById("icon2").src = images[currentcombination[2]];
    document.getElementById("icon3").src = images[currentcombination[3]];
}

function iconCombinationSetter(parent,child) {
    // Used in addButt(), sets the visible icon to dropdown-selected value
    currentcombination[parent] = child+"";
    iconSetter(currentcombination);
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
                    combinationlist.push(""+i+j+k+l);
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

function combinationComparer(enteredcombination, response) {
    // enteredcombination is an array ["0","0","0","0"] -> ["3","3","3","3"] CHAR NOT INT
    // assume that testingcombination is correct combination
    // response is [correct, incorrect, unknown] INT NOT CHAR 
    var temporarycombinationlist = [];
    for (var i = combinationlist.length - 1; i >= 0; i--) {
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
        }
    }
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

function randomCombo() {
    for (var i = 0; i < currentcombination.length; i++){
        currentcombination[i] = Math.floor(Math.random()*4)+"";
    }
    iconSetter(currentcombination);
}

function checkFood(item) {
    var foodcount = 0;
    if ( combinationlist.indexOf( "3333" ) > -1 ) {
        foodcount = 4;
        return foodcount;
    }
    else {
        for (var i = 0; i < combinationlist.length; i++) {
            var testingcombination = combinationlist[i].split("");
            var x = 0;
            for (var j = 0; j < 4; j++) {
                if (testingcombination[j] == item) {
                    x++;
                }
            }
            if (x>foodcount) {
                foodcount = x;
            }
        }
        return foodcount;
    }
}

function getNewCombination() {
    // Try to delay wine and food
    var temp = currentcombination;
    function twoOrThreeCheck (x) {
        for (var i = 0; i < combinationlist.length; i++) {
            var testingcombination = combinationlist[i].split("");
            if (currentcombination === testingcombination) {
                continue;
            }
            console.log(x)
            if (x === 0 && (testingcombination.includes("2") || testingcombination.includes("3"))) {
                continue;
            }
            else if (x === 1 && testingcombination.includes("3")) {
                continue;
            }
            else {
                currentcombination = testingcombination;
                iconSetter(currentcombination);
                break;
            }
        }
    }
    twoOrThreeCheck(0);
    if (temp === currentcombination) {
        twoOrThreeCheck(1);
    }
}

function getTime() {
    var x = performance.now();
    combinationGenerator();
    var y = performance.now();
    console.log(y,x);
}