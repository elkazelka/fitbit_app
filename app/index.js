let document = require("document");
import { HeartRateSensor } from "heart-rate";
import { vibration } from "haptics";

let hrLabel = document.getElementById("hrm");
let updatedLabel = document.getElementById("updated");
let message = document.getElementById("message");
let notify = document.getElementById("notify");

let j = 0;
let i = 0;

let lastValueTimestamp = Date.now();

hrLabel.text = "---";
updatedLabel.text = "...";

function convertMsAgoToString(millisecondsAgo) {
  if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000) + "s ago";
  }
  else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000)) + "min ago";
  }
  else {
    return Math.round(millisecondsAgo / (60*60*1000)) + "h ago";
  }
}

function updateDisplay() {
  if (lastValueTimestamp !== undefined) {
    updatedLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
  }
}

var hrm = new HeartRateSensor();

hrm.onreading = function() {
  hrLabel.text = hrm.heartRate;  
   if (hrm.heartRate>=100) {
    message.style.display = "inline";
    vibration.start("ping");
    i = i+1;
  } else {
    if (i/i==1){
       j = (i/i) + j;    
    }
    i=0;
    message.style.display = "none";
     if(j==0){
      notify.text = `No changes detected`;
     }
    else if(j==1){
      notify.text = `${j} change detected`;
    } else{
       notify.text = `${j} changes detected`;
    }
    vibration.stop();
  }
  lastValueTimestamp = Date.now();
}

hrm.start();
setInterval(updateDisplay, 1000);