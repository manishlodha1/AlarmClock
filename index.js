const display = document.getElementById('clock');


//audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;

const addAlarm = document.querySelector('.setAlarm');
const myList = document.querySelector('#myList');

//set alarm are stored
const alarmList = [];

//audio is played
function ring(song){
    audio.play();
   location.href = "alarm.html";
   //alert(`Hey! it is ${song}`)
}


// update time every second

function updateTime() {
    var date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    const song = `${hour}:${minutes}:${seconds}`;

    display.innerText=`${hour} : ${minutes} : ${seconds}`;

    // if list includes current time then ring 
    if(alarmList.includes(song) ){
        ring(song);
    } 
}

//set correct format of time

function formatTime(time){
    if(time < 10 && time.length !=2) {
        return '0' + time;
    }
    return time;
}

// stop alarm function
function clearAlarm(){
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }

}

// function setAlarmTime(value) {
//     alarmTime = value;
//     console.log(alarmTime);
// }

// removes an alarm when delete button is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}

// add new alarm to the list
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm whenever the form is submitted
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();

    let newhr=formatTime(addAlarm.hr.value);
    if(newhr === '0'){
        newhr = '00'
    }
    let newmin=formatTime(addAlarm.min.value);
    if(newmin === '0'){
        newmin = '00'
    }
    let newsec=formatTime(addAlarm.sec.value);
    if(newsec === '0'){
        newsec = '00'
    }

    const newAlarm = `${newhr}:${newmin}:${newsec}`

    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
         alarmList.push(newAlarm);
             console.log(alarmList);
             console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})

// call update time every second
setInterval(updateTime, 1000);


