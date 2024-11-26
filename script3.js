let step_1, step_2, result;
let state = null;
let square = false;
let prevOutputArr = ["THE END"];
result = document.querySelector(".equality");
let numbers = document.querySelectorAll(".NUM")
let nums = Array.from(numbers)
let x_sq = document.querySelector(".x-sq");
let sqrt = document.querySelector(".sqrt");
let percent = document.querySelector(".percent");

let percentArr = Array.from(percent);
percent.addEventListener(
    "click", () => {
        step_1 = SCREEN.value += "%";
        if (step_1.includes("%")) {
            let step_1_array = step_1.match(/(\d+\.?\d*|[a-zA-Z]+|[^\s]|%)/g)

            for (let i = 0; i < step_1_array.length; i++) {
                if (step_1_array[i] === "%") {

                    step_1_array[i] = "*(1/100)";
                }

            }
            step_1 = step_1_array.join("");
        }
    }
)


// inversion
let inv = document.querySelector(".inv");
let reverse = document.querySelector(".reverse");
let inverse = document.querySelector(".inverse");

inv.addEventListener(
    "click", () => {
        reverse.classList.toggle("hidden");
        inverse.classList.toggle("show");
    }
)

// AC button                                     
let ac = document.querySelector(".ac");
ac.addEventListener(
    "click", () => {
        step_1 = SCREEN.value = "";
        step_2 = null;
    }
)

//accesing numerals and showing on screen
let num_simpleOperator = document.querySelectorAll(".num");//nodeList of numbers from 00-09
let SCREEN = document.querySelector(".inputArea")
let num_simpleOperatorArr = Array.from(num_simpleOperator);
SCREEN.value = "";
num_simpleOperatorArr.forEach(
    (input) => {
        input.addEventListener(
            "click", () => {
                step_1 = SCREEN.value += input.innerText;

                // degree conversion in trigo and inverse trigo 
                if ((step_1.includes("asin") || step_1.includes("acos") || step_1.includes("atan")) && state === 0) {

                    let step_1_array = step_1.match(/(\d+\.?\d*|[a-zA-Z]+|\S)/g)
                    for (let i = 0; i < step_1_array.length; i++) {
                        if (step_1_array[i] === "asin" || step_1_array[i] === "acos" || step_1_array[i] === "atan") {
                            step_1_array.splice(i, 0, "(")
                            step_1_array.splice(i + 5, 0, ")*(180/pi)");
                            i += 5;
                        }
                    }
                    step_1 = step_1_array.join("");
                }

                if ((step_1.includes("sin") || step_1.includes("cos") || step_1.includes("tan")) && state === 0) {
                    let step_1_array = step_1.match(/(\d+\.?\d*|[a-zA-Z]+|\S)/g)
                    for (let i = 0; i < step_1_array.length; i++) {
                        if (step_1_array[i] === "sin" || step_1_array[i] === "cos" || step_1_array[i] === "tan") {
                            step_1_array.splice(i + 3, 0, "*(pi/180)");
                            i += 3;
                        }
                    }

                    step_1 = step_1_array.join("");
                }

                // manipulations for X^2
                if (square === true) {
                    let step_1_array = step_1.match(/(\d+\.?\d*|[a-zA-Z]+|\S)/g);
                    step_1_array[step_1_array.length] = ")^2";
                    step_1 = step_1_array.join("");

                }

                //for exponent[exp(] , natural logarithm [ln] and normal logarithm [log()]
                if (input.innerText === "exp") {
                    step_1 = SCREEN.value += "(";
                }
                if (input.innerText === "log") {
                    step_1 = SCREEN.value += "(";
                }

                if(input.innerText==="√"){
                    step_1 = SCREEN.value += "("

                }

                if(step_1.includes("√")){
                    step_1 = step_1.replaceAll("√" ,"sqrt");
                }

                console.log(step_1)
            }
        )
    }
)

// delete button
let del = document.querySelector(".del");

del.addEventListener(
    "click", () => {
        step_1 = step_1.slice(0, step_1.length - 1);
        SCREEN.value = step_1;
        if (square === true) {
            square = false
        }
        console.log(step_1)
    }
)

//results
result.addEventListener(
    "click", () => {
        //evaluating the final result 
        step_2 = String(math.evaluate(step_1));
        if (step_2 == "0") {
            SCREEN.value = "0"
        } else if (step_2 === null) {
            SCREEN.value = "";
        } else {

            SCREEN.value = step_2;
            prevOutputArr.push(step_2);// pushing values inside array
        }

        if (square === true) {
            square = false
        }

    }
)

//accessing previous Output for present session 
let prev = document.querySelector(".prevOutput");
prev.addEventListener(
    "click", () => {
        let previousOutput = prevOutputArr.pop();
        if (previousOutput == undefined) {
            SCREEN.value = "";
        } else {
            SCREEN.value = previousOutput;
        }

    }
)

//power button [^]
let pow = document.querySelector(".pow")
pow.addEventListener(
    "click", () => {
        step_1 = SCREEN.value += pow.innerText + "("
    }
)

//sqaring a number using X^(2)
function showOnScreen(str, strFunc) {
    SCREEN.value = str;
    setTimeout(
        () => {
            if (strFunc) {
                strFunc();
            }
        }, 500
    )
}

x_sq.addEventListener(
    "click", () => {
        square = true;
        showOnScreen("clearing screen!", () => {
            showOnScreen("write your expression buddy", () => {
                showOnScreen("(")
            })
        })

    }
)

//trigonometric functions extraction

//start the conversion between radian and degree
let rad = document.querySelector(".rad");
let deg = document.querySelector(".deg");
let indicatorDeg = document.querySelector(".indicator-Deg")
let indicatorRad = document.querySelector(".indicator-Rad")

rad.addEventListener("click",
    () => {
        state = 1;
        indication(state)

    }
)
deg.addEventListener("click",
    () => {
        state = 0;
        indication(state)
    }
)
function indication(state) {
    if (state == 1) {
        indicatorRad.classList.add("active");
        indicatorDeg.classList.remove("active")
    } else {
        indicatorRad.classList.remove("active");
        indicatorDeg.classList.add("active");
    }
}

let numTrigo = document.querySelectorAll(".numTrigo");
let trigo = Array.from(numTrigo);
trigo.forEach(
    (input) => {
        input.addEventListener(
            "click", () => {
                if (state === 1) {
                    step_1 = SCREEN.value += input.innerText + "(";
                } else {
                    step_1 = SCREEN.value += input.innerText + "(";
                }
            }
        )
    }
)

let numITrigo = document.querySelectorAll(".numITrigo");
let iTrigo = Array.from(numITrigo);
iTrigo.forEach(
    (input) => {
        input.addEventListener(
            "click", () => {
                let str = input.innerText;
                step_1 = SCREEN.value += "a" + str.replace("-1", "(");
            }
        )
    }
)