const wordElement = document.querySelector(".word");
const hintElement = document.querySelector(".hint span");
const refreshButton = document.querySelector(".refresh-word");
const checkButton = document.querySelector(".check-word");
const input = document.querySelector("input");
const timeElement = document.querySelector(".time span b");
const scoreElement = document.querySelector(".score span ");
const numOfPlays = document.querySelector(".num span");

let word = '';
let timer;
let score = 0;
let num = 3;
let time = 10;

function initGame(){
    let randomIndex = Math.floor(Math.random() * words.length);
    let randomObj = words[randomIndex];
    word = randomObj.word.toLowerCase();
    console.log(randomObj)
    let wordArr = word.split("").sort(() => Math.random() - 0.5);
    let scrambledWord = wordArr.join("");
    console.log(scrambledWord)

    if(scrambledWord === word)
        return initGame();


    numOfPlays.innerText = num;
    scoreElement.innerText = score;
    wordElement.innerText = scrambledWord;
    hintElement.innerText = randomObj.hint;
    timeElement.innerText = time;
    input.value = "";
    checkButton.setAttribute("disabled", true);

    timer = setInterval(() => {
        if(time > 0){
            time--;
            return timeElement.innerText = time;
        }

        loseGame(`Time Out! ${word.toUpperCase()} is a correct word`);
    
    }, 1000) 
}

initGame()

refreshButton.addEventListener("click", () => loseGame())

function refreshGame(msg){
    if(msg) alert(msg);
    word = '';
    time = 10;
    clearInterval(timer);
    initGame()
}

function gameOver(){
    let msg = `Game Over! You get ${score} points, play again!`;
    num = 3;
    score = 0;
    refreshGame(msg);
}

function loseGame(msg){
    num--;
    if(num < 0)
       return gameOver();
    
    refreshGame(msg)
   
}

function winGame(msg){
    score++;
    refreshGame(msg)
}

input.addEventListener("input", (e) => {
    if(!e.target.value.trim()){
        checkButton.setAttribute("disabled", true);
    }
    else{
        checkButton.removeAttribute("disabled");
    }
})

checkButton.addEventListener("click", () => {
    let answerText = input.value.toLowerCase().trim();
    if(answerText !== word)
        return loseGame(`Oops! ${answerText.toUpperCase()} is not a correct word`);
    
    return winGame(`Congrats! ${answerText.toUpperCase()} is a correct word`)
    console.log(answerText)
})

