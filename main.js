function submitfunc(){
    event.preventDefault();
    var username = document.getElementById("fname").value;
    var sex = document.querySelector('input[name="sex"]:checked').value;
    if (!onlyLettersAndSpaces(username)){
        alert("username must contain only letters and spaces");
    }
    else{
       res = httpGet(`https://api.genderize.io/?name=${username}`);
       resobj = JSON.parse(res);
       console.log(res);
       console.log(resobj["name"]);
       document.getElementById("predictsex").innerHTML = capitalizeFirstLetter(resobj["gender"]);
       document.getElementById("prediction_number").innerHTML = resobj["probability"];
       if (localStorage.getItem(username) != null){
           document.getElementById("saved_answer").innerHTML = "Saved Answer";
           document.getElementById("result_from_saved").innerHTML = localStorage.getItem(username);
           let btn = document.createElement("button");
           btn.innerHTML = "Clear";
           btn.classList.add("button");
           btn.classList.add("button5");
           btn.onclick = function () {
            clearStorage(username);
            document.getElementById("saved_result").remove();
           };
           document.getElementById("saved_result").appendChild(btn);
       }

    
    }
    console.log(username);
    console.log(sex);

}

function saveItem(){
    var username = document.getElementById("fname").value;
    var sex = document.querySelector('input[name="sex"]:checked').value;
    localStorage.setItem(username, sex);
}

function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function clearStorage(item){
    localStorage.removeItem(item);
}  