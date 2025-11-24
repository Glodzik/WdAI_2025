let minutes = 0;
let seconds = 1;
let stoperInterval;
let text = "";

function start() {
    clearInterval(stoperInterval);
    stoperInterval = setInterval(stoper, 1000);
}

function stoper() {
    text = "";

    if(minutes == 0) {
        text = seconds + "s";
    } else {
        text = minutes + "min " + seconds + "s";
    }

    seconds += 1;
    if(seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }

    document.getElementById("stoper").innerHTML = text;
}

function stop() {
    clearInterval(stoperInterval);
}

function reset() {
    seconds = 1;
    minutes = 0;

    document.getElementById("stoper").innerHTML = "0s";
}