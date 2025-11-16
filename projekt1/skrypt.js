let countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
let clockInfoElem = document.getElementById("clock-info");
let clockElem = document.getElementById("clock");

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate();
let hour = now.getHours();

let weekDay = now.getDay();
let clockInfo = "";

// Nd po 18 || Pn-Pt po 20
if ((weekDay == 0 && hour >= 18 ) || (weekDay >= 1 && weekDay <= 5 && hour >= 20)) {
    clockInfo = "Do otwarcia:";
    countDownDate = new Date(year, month, day+1, 8);
}
// Sb po 18
else if(weekDay == 6 && hours >= 18) {
    clockInfo = "Do otwarcia:";
    countDownDate = new Date(year, month, day+1, 11);
} 
// Pn-Pt 8-20
else if(weekDay >= 1 && weekDay <= 5 && hour >= 8 && hour <= 19) {
    clockInfo = "Do zamknięcia:";
    countDownDate = new Date(year, month, day, 20);
}
// Sb 8-18 || Nd 11-18
else if((weekDay == 6 && hour >= 8 && hour <= 17) || (weekDay == 0 && hour >= 11 && hour <= 17)) {
    clockInfo = "Do zamknięcia:";
    countDownDate = new Date(year, month, day, 18);
}

let x = setInterval(function() {
  let now = new Date().getTime();

  let distance = countDownDate - now;

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("clock").innerHTML = hours + ":"
  + minutes + ":" + seconds;
  document.getElementById("clock-info").innerHTML = clockInfo
  
}, 1000);

function validateForm() {
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let reasonInput = document.getElementById("reason");
    let messageInput = document.getElementById("message");

    let username = usernameInput.value;
    let email = emailInput.value;
    let reason = reasonInput.value;
    let message = messageInput.value;
    
    let text = "";
    const usernameRegEx = new RegExp("^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]{2,}[\\s][A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]{2,}$");
    const emailRegEx = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]{2,}.[a-zA-Z]{2,}$");
    const messageRegEx = new RegExp("^.{5,}$");

    if (username == "" || !username.match(usernameRegEx)) {
        text += "Wprowadź odpowiednie imię i nazwisko\n";
    } 
    
    if (email == "" || !email.match(emailRegEx)) {
        text += "Wprowadź odpowiedni email\n";
    } 
    
    if (reason == 'default') {
        text += "Wybierz temat wiadomości\n";
    } 
    
    if (message == "" || !message.match(messageRegEx)) {
        text += "Napisz wiadomość\n";
    }

    if (text == "") {
        alert("Wiadomość została wysłana");
        /* 
            Obsługa danych 
        */
        usernameInput.value = "";
        emailInput.value = "";
        reasonInput.value = "default"
        messageInput.value = "";
    } else {
        alert(text);
    }

    return false;
}