

var numberofguesses = 0
var guessesRemaining = numberofguesses;
var wordlength = 0;
let currentGuess = [];
let nextLetter = 0;
var net = null;

net = new Network((e)=>{
    let packet = JSON.parse(e);
    switch(packet.pid){
        case 0:
            break;
            case 1:
                localStorage.setItem('uid-private',packet.uidprivate);
                localStorage.setItem('uid-public',packet.uidpublic);
                break;
                case 2:{
                    if(!packet.valid){
                        //notify to the user the word doesn't exist
                    }else{
                        displayresult(packet.result);
                        guessesRemaining -= 1;
                        currentGuess = [];
                        nextLetter = 0;
                    }
                }
                    break;
                    case 3:{

                    }
                        break;
                        case 4:{
                            numberofguesses = packet.rows;
                            wordlength = packet.length;
                            guessesRemaining = numberofguesses;
                            //console.log(numberofguesses);
                            //console.log(wordlength);
                            initBoard();
                        }
                        break;
    }
});


function displaystatsforid(uid){
    document.getElementById("statsforid1").innerText="stats for uuid: "+uid;
    document.getElementById("statsforid2").innerText="score: 10";
    document.getElementById("statsforid3").innerText="current streak: 10";
    document.getElementById("statsforid4").innerText="max streak: 10";
}
function initBoard() {
    let board = document.getElementById("game-board");
    for (let i = 0; i < numberofguesses; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < wordlength; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
    
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter || letter===" " && elem.textContent==="Space") {
            let oldColor = elem.style.backgroundColor
            if (oldColor === "rgb(97,140,85)") {
                return
            } 

            if (oldColor === "rgb(177,160,76)" && color !== "rgb(97,140,85)") {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function deleteLetter () {
    if(currentGuess.length>0){
        let row = document.getElementsByClassName("letter-row")[numberofguesses - guessesRemaining]
        let box = row.children[nextLetter - 1]
        box.textContent = ""
        box.classList.remove("filled-box")
        currentGuess.pop()
        nextLetter -= 1
    }
    
}
function displayresult(result){
    let row = document.getElementsByClassName("letter-row")[numberofguesses - guessesRemaining]
    

    let high = result>>16&0xFFFF;
    let low = (result &0xFFFF);
    console.log(high+":"+low);
    for(let i = 0; i < currentGuess.length;++i){
        let letterColor = '';
        let box = row.children[i];
        let letter = currentGuess[i];
        if(high>>i&1){
            console.log("correct");
            letterColor = "rgb(97,140,85)";
            //correct
        }else if(low>>i&1){
            console.log("acceptable");
            letterColor = "rgb(177,160,76)";
            //acceptable
        }else{
            console.log("bad");
            letterColor = "rgb(25,25,25)";
            //totally wrong
        }
        let delay = 250 * i
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            console.log(letterColor);
            box.style.backgroundColor = letterColor;
            if(letterColor==="rgb(25,25,25)"){
                letterColor="rgb(40,40,40)";
            }
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }
}
function checkGuess () {
    


    ////THIS SHOULD BE HANDLED BY THE SERVER
    ////ASIDE FROM SETTING THE KEY LETTERS
/*
    for (let i = 0; i < wordlength; i++) {
        let letterColor = ''
        
        let letter = currentGuess[i]
        console.log(letter);
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                
            } else {
                // shade box yellow
                
            }

            rightGuess[letterPosition] = "#"
        }

        
    }
*/
    if (guessString === rightGuessString) {
        //toastr.success("You guessed right! Game over!")
        alert("You guessed it correct!");
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            /*
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
            */
           alert("You ran out of guesses!");
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === wordlength) {
        return
    }
    pressedKey = pressedKey.toUpperCase();
    
    let row = document.getElementsByClassName("letter-row")[numberofguesses - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});
document.addEventListener("keyup", (e) => {

    
    let pressedKey = String(e.key)
    
    if(pressedKey === "Escape"){
        document.getElementById("myNav").style.height = "0%";
    }

    if (guessesRemaining === 0) {
        return
    }


    if(document.getElementById("myNav").style.height==="100%"){
        return;
    }
    if(pressedKey === "Backspace"){
        if(nextLetter!==0){
            deleteLetter();
        }
        return
    }
    if (pressedKey === "Enter") {
        //checkGuess()
        if(net!=null){
            console.log("sending");
            console.log(currentGuess);
             net.sendwrapper({pid:2,guess:currentGuess.join('')});
        }
        return
    }
    let found = pressedKey.match(/[a-z ]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
    
    
    
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 
    if(key === "Space"){
        key = " ";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

//initBoard();
