console.log('test3');
let arr=[];
document.getElementById("set-button").addEventListener("click",addTimer);
let timers=0;
let timerMap = new Map();

function addTimer(){
    timers++;
    if(timers>0) document.getElementById("timers").style.visibility="hidden";
    else document.getElementById("timers").style.visibility="visible";
    let timerid=createTimer(timers);
    
}

function createTimer(t){
    let timerid=t+"";
    let timer=document.createElement("div");
    timer.setAttribute("class","time");
    timer.setAttribute("id",timerid);
    timer.innerHTML=`
    <div class="set-time">Time left:</div>
    <input type="number" id="${timerid}hh" class="hh">
    :
    <input type="number"    id="${timerid}mm" class="mm">
    :
    <input type="number" id="${timerid}ss" class="ss">
    <button clas="delete" onclick="deleteTimer(${timerid})" class="set">Stop timer</button>
    `;
    document.body.appendChild(timer);

    let h=document.getElementById("hh").value;
    if(h=="") h="0";
    let H=document.getElementById(timerid+"hh");
    H.value=h;

    let m=document.getElementById("mm").value;
    if(m=="") m="0";
    let M=document.getElementById(timerid+"mm");
    M.value=m;

    let s=document.getElementById("ss").value;
    if(s=="") s="0";
    let S=document.getElementById(timerid+"ss");
    S.value=s;

    let time=h*3600+m*60+s;
    timerfunction(timerid,time);
    
    
}  

function sayHello(timerid) {
    let timerDiv = document.getElementById(timerid); 
    let hrs = parseInt(document.getElementById(timerid+"hh").value); 
    
    let mins = parseInt(document.getElementById(timerid+"mm").value);
    let seconds = parseInt(document.getElementById(timerid+"ss").value);
    let time = hrs * 60 * 60 + mins * 60 + seconds; 
    time--; 
    if(time === 0){
       
       
        timerDiv.style.backgroundColor='yellow'
        timerDiv.style.color='black'
        timerDiv.children[0].innerHTML = "Timer is Up!";
       
        document.getElementById(timerid+"hh").style.display = 'none';
        document.getElementById(timerid+"mm").style.display = 'none';
        document.getElementById(timerid+"ss").style.display = 'none';

        playNotificationSound();
       
        setTimeout(() => {
           clearInterval(intervalId)
        },4000)
       

    }
    else{
        
        hrs = Math.floor(time / (60 * 60));
        time = time - hrs*3600;
        mins = Math.floor(time / (60));
        time=time-mins*60;
        //time = time % 60;
        seconds = time;
        document.getElementById(timerid+"hh").value= hrs;
        document.getElementById(timerid+"mm").value= mins;
        document.getElementById(timerid+"ss").value = seconds;
    }

}


function timerfunction(timerid,time){
    const thistimer = setInterval(sayHello, 1000,timerid);
    timerMap.set(timerid,thistimer);
    let timerDiv = document.getElementById(timerid);
    setTimeout(FinishTimer,time,thistimer,timerid)
}

function FinishTimer(thistimer,timerid){
    clearInterval(intervalId);
}

function deleteTimer(divId){
    timers--;
    
    const divToRemove = document.getElementById(divId);
    let interval = timerMap.get(divId); 
    timerMap.delete(divId);
    if (divToRemove) {
        
        document.body.removeChild(divToRemove);
        clearInterval(interval);

    } else {
        console.log("The specified div doesn't exist.");
    }
    if(timers>0) document.getElementById("timers").style.visibility="hidden";
    else document.getElementById("timers").style.visibility="visible";
}

function playNotificationSound() {
    var audio = document.getElementById('notificationSound');
    audio.play();
}

if(timers>0) document.getElementById("timers").style.visibility="hidden";
else document.getElementById("timers").style.visibility="visible";