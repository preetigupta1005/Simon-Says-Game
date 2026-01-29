let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "purple"];

let level = 0;
let started = false;
let h2 = document.querySelector("h2");


let highScore = localStorage.getItem("highScore") || 0;

document.addEventListener("keydown", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function levelup() {
    userseq = [];
    level++;
    
    
    h2.innerHTML = `Level ${level} <br> High Score: ${highScore}`;
    
    // choose random button
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    gameflash(randBtn);
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function btnPressed() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.classList[1]; // color from class
    userseq.push(usercolor);

    checkAns(userseq.length - 1);
}

function checkAns(index) {

    if (userseq[index] === gameseq[index]) {

        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }

    } else {
      
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game Over! Your Score was <b>${level}</b>.
        <br>High Score: <b>${highScore}</b>
        <br>Press any key to restart`;

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }

}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}

function reset() {
    level = 0;
    started = false;
    gameseq = [];
    userseq = [];
}
