var chars = "qwertyuiopasdfghjklzxcvbnm0123456789"
var upperChars = "QWERTYUIOPASDFGHJKLZXCVBNM"
var specialChars = "!@#$%^&*_-+."

function generatePass() {
    let minLength = document.getElementById("minLength").value;
    let maxLength = document.getElementById("maxLength").value;
    let useUpperCases = document.getElementById("upperCases").checked;
    let useSpecialChars = document.getElementById("specialChars").checked;

    const intRegEx = new RegExp("^[1-9]{1}[0-9]{0,}$");

    if(minLength == "" || maxLength == "" || !minLength.match(intRegEx) || !maxLength.match(intRegEx) 
        || parseInt(minLength, 10) > parseInt(maxLength, 10)) {
        alert("Wprowadź odpowiednie dane");
    } else {
        let password = "";
        let characters = chars;
        minLength = parseInt(minLength, 10)
        maxLength = parseInt(maxLength, 10)

        if(useUpperCases) characters += upperChars;
        if(useSpecialChars) characters += specialChars
        
        var passwordLength = Math.floor(Math.random() * (maxLength-minLength+1)) + minLength;
        var charactersLength = characters.length

        for(let i = 0; i < passwordLength; i++) {
            password += characters[Math.floor(Math.random() * charactersLength)]
        }

        alert(password)
    }
}