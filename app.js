let gameseq=[];
let userseq=[];

let btns=["yellow","red","green","purple"];

let level=0;
let started=false;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
        started=true;
        levelup();
    }
});

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    //choose random btn
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    
    //console.log(randColor)
    gameseq.push(randColor);
    console.log(gameseq)
    gameflash(randBtn);
}

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function btnPressed(){
   // console.log(this);
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}

function checkAns(index){
   
    if(userseq[index]===gameseq[index]){
        if(userseq.length===gameseq.length){
            setTimeout(levelup,1000);
    }
    }
    else{
        h2.innerHTML=`Game Over! Your Score was <b> ${level}</b>.<br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }

}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPressed);
}

function reset(){
    level=0;
    started=false;
    gameseq=[];
    userseq=[];
}