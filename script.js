//console.log('test3');
let arr=[];
document.getElementById("set-button").addEventListener("click",addTimer);
let timers=0;
let timerMap = new Map();

function addTimer(){
    timers++;
    if(timers>0) document.getElementById("timers").style.visibility="hidden";
    else document.getElementById("timers").style.visibility="visible";
    let timerid=createTimer(timers);
    if(timers>0) document.getElementById("timers").style.visibility="hidden";
    else document.getElementById("timers").style.visibility="visible";
    
}

function createTimer(t){
    let timerid=t+"";
    let h=document.getElementById("hh").value;
    if(h=="") h="0";
    let m=document.getElementById("mm").value;
    if(m=="") m="0";
    let s=document.getElementById("ss").value;
    if(s=="") s="0";
    if(h<0 || m<0 || s<0 ||(h==0 && m==0 && s==0) || m>60 || s>60){
        alert("Enter a valid value");
        timers--;
        if(timers>0) document.getElementById("timers").style.visibility="hidden";
        else document.getElementById("timers").style.visibility="visible";
        return; 
     }
    
    let timer=document.createElement("div");
    timer.setAttribute("class","time");
    timer.setAttribute("id",timerid);
    timer.innerHTML=`
    <div class="set-time">Time left:</div>
    <input type="number" id="${timerid}hh" class="hh" style="text-decoration:none">
    :
    <input type="number"    id="${timerid}mm" class="mm" style="text-decoration:none">
    :
    <input type="number" id="${timerid}ss" class="ss" style="text-decoration:none">
    <button clas="delete" onclick="deleteTimer(${timerid})" class="set">Stop timer</button>
    `;
    document.body.appendChild(timer);

    
    document.getElementById(timerid+"hh").value= (h<10)? "0"+h : h;
    document.getElementById(timerid+"mm").value= (m<10)? "0"+m : m;
    document.getElementById(timerid+"ss").value = (s<10)? "0"+s : s;
    

    let time=h*3600+m*60+s;
    timerfunction(timerid,time);
    
    
}  

function updateTimer(timerid) {
    let timerDiv = document.getElementById(timerid); 
    let hrs = parseInt(document.getElementById(timerid+"hh").value); 
    
    let mins = parseInt(document.getElementById(timerid+"mm").value);
    let seconds = parseInt(document.getElementById(timerid+"ss").value);
    let time = hrs * 60 * 60 + mins * 60 + seconds; 
    time--; 
    if(time === 0){
       
       
        timerDiv.style.backgroundColor='yellow'
        timerDiv.style.color='black'
        timerDiv.innerHTML=`
            <div class="time-up" style="background-color:transparent;color:black;font-weight:bold"> "Timer is Up!"</div>
            <button clas="delete" onclick="deleteTimer(${timerid})" class="set">Stop timer</button>
        `;
    //     timerDiv.children[0].innerHTML = "Timer is Up!";
    //    console.log(timerDiv.children[2]);
    //     document.getElementById(timerid+"hh").style.display = 'none';
    //     document.getElementById(timerid+"mm").style.display = 'none';
    //     document.getElementById(timerid+"ss").style.display = 'none';

        playNotificationSound(timerid);
       
        // setTimeout(() => {
        //    clearInterval(thistimer)
        // },4000)
       

    }
    else{
        
        hrs = Math.floor(time / (60 * 60));
        time = time - hrs*3600;
        mins = Math.floor(time / (60));
        time=time-mins*60;
        //time = time % 60;
        seconds = time;
        document.getElementById(timerid+"hh").value= (hrs<10)? "0"+hrs : hrs;
        document.getElementById(timerid+"mm").value= (mins<10)? "0"+mins : mins;
        document.getElementById(timerid+"ss").value = (seconds<10)? "0"+seconds : seconds;
    }

}


function timerfunction(timerid,time){
    const thistimer = setInterval(updateTimer, 1000,timerid);
    timerMap.set(timerid,thistimer);
    let timerDiv = document.getElementById(timerid);
    setTimeout(FinishTimer,time,thistimer,timerid)
}

function FinishTimer(thistimer,timerid){
   //clearInterval(thistimer);
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

function playNotificationSound(timerid) {
    var audio = document.createElement('audio');
    audio.setAttribute("src","bicycle-bell.mp3");
    audio.style.display="none";
    audio.play();
}

if(timers>0) document.getElementById("timers").style.visibility="hidden";
else document.getElementById("timers").style.visibility="visible";