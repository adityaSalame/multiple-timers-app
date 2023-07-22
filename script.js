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

function timerfunction(timerid,time){
    const thistimer = setInterval(sayHello, 1000,timerid);
    timerMap.set(timerid,thistimer);
    let timerDiv = document.getElementById('timerid');
    setTimeout(FinishTimer,time,intervalId,timerid)
}


function deleteTimer(divId){
    timers--;
    
    const divToRemove = document.getElementById(divId);
    let interval = timerMap.get(divId); // getting unique setInterval id related to this timer div
    timerMap.delete(divId);
    if (divToRemove) {
        // Remove the div element from its parent
        document.body.removeChild(divToRemove);
        clearInterval(interval);

    } else {
        console.log("The specified div doesn't exist.");
    }
    if(timers>0) document.getElementById("timers").style.visibility="hidden";
    else document.getElementById("timers").style.visibility="visible";
}

if(timers>0) document.getElementById("timers").style.visibility="hidden";
else document.getElementById("timers").style.visibility="visible";