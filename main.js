// This function is for submit button we get user input name
// and we check if the raidio button selected or not

function submitfunc() {
    event.preventDefault();    
    var username = document.getElementById("fname").value;
    if (document.getElementById("clearbtn") != null){
        document.getElementById("clearbtn").remove();
    }
    
    if (document.querySelector('input[name="sex"]:checked') != null) {
        var sex = document.querySelector('input[name="sex"]:checked').value;
    }
    else{
        sex = '';
    }
// Here we double-check that our input only contains letters and spaces. 
// In HTML, maxlen was used to handle the input size.

    if (!onlyLettersAndSpaces(username)) {
        alert("username must contain only letters and spaces");
    }
    // If everything be ok we send a get request to given url and get pridiction of our name 
    else {
        res = httpGet(`https://api.genderize.io/?name=${username}`);
        resobj = JSON.parse(res);
        if (localStorage.getItem(username) != null) {
            if(document.getElementById("saved_result") == null){
                let elem = document.createElement("div");
                elem.id = "saved_result";
                document.getElementById("gridItem").appendChild(elem);
            }
            document.getElementById("saved_result").style.border = "thin dotted";
            document.getElementById("saved_result").style.borderRadius = "25px";
            document.getElementById("saved_result").style.padding = "5px";
            document.getElementById("saved_result").style.marginRight = "20px";
            if(document.getElementById("saved_answer") == null){
                let elem = document.createElement("h2");
                elem.id = "saved_answer";
                document.getElementById("saved_result").appendChild(elem)
            }
            document.getElementById("saved_answer").innerHTML = "Saved Answer";

            if (document.getElementById("result_from_saved") == null){
                let elem = document.createElement("p");
                elem.id = "result_from_saved";
                document.getElementById("saved_result").appendChild(elem)
            }
            document.getElementById("result_from_saved").innerHTML = localStorage.getItem(username);
            let btn = document.createElement("button");
            btn.innerHTML = "Clear";
            btn.classList.add("button");
            btn.classList.add("button5");
            btn.id = "clearbtn";
            btn.onclick = function () {
                clearStorage(username);
                document.getElementById("saved_result").remove();
            };
            document.getElementById("saved_result").appendChild(btn);
        }
        else{
            if (document.getElementById("saved_result") != null){
                document.getElementById("saved_result").remove();
            }
           
        }
     
        if (resobj["gender"] == null) {
            error_msg = document.getElementById("predictsex");
            error_msg.style.color = 'rgb(138, 5, 5)';
            document.getElementById("prediction_number").innerHTML = '';
            document.getElementById("predictsex").innerHTML = "The input name is not available";
        }
        else {
            document.getElementById("predictsex").style.color = "Black";
            document.getElementById("predictsex").innerHTML = capitalizeFirstLetter(resobj["gender"]);
            document.getElementById("prediction_number").innerHTML = resobj["probability"];
        }


    }
}
// Save button handled in this function 
// The important thing here is that if user is not selected any gender and click save
// the answer from url will be save in local storage 
// else we are going to save the user name and gender
function saveItem() {
    var username = document.getElementById("fname").value;
    var sex = '';
    if (document.querySelector('input[name="sex"]:checked') != null) {
        sex = document.querySelector('input[name="sex"]:checked').value;
        localStorage.setItem(username, sex);
    }
    else{
        res = httpGet(`https://api.genderize.io/?name=${username}`);
        resobj = JSON.parse(res);
        sex = capitalizeFirstLetter(resobj["gender"]);
        localStorage.setItem(username , sex);

    }
}

// This function check if a string contain only letter and spaces.
function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
}

// This function is send a GET request to our url and return the response
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// This function is only used for aesthetic purposes.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// For clearing local storage we are going to use below function
function clearStorage(item) {
    localStorage.removeItem(item);
}
