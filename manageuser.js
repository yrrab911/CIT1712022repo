//© 2021 Sean Murdock

let phonenumber = "";
let onetimepassword = "";
let verifyonetimepassword = "";
let onetimepasswordRegEx=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{6,40})/;

function setphonenumber(){
    phonenumber = $("#phonenumber").val();
}

function setuseronetimepassword(){
    onetimepassword = $("#onetimepassword").val();
    
}

function setverifyonetimepassword(){
    verifyonetimepassword = $("#verifyonetimepassword").val();
    if (verifyonetimepassword!=onetimepassword){
        alert('onetimePasswords must be entered the same twice');
    }
}

function savetoken(token){
// whatever passes as token should save into local storage
    if (window.localStorage){
     localStorage.setItem("token", token);
    }

}

function checkexpiredtoken(token){
// read token from local storage - check with ajax call
    if(window.localStorage){
    usertoken = localStorage.getItem("token");
    $.ajax({
       type: 'GET',
        url: 'https://dev.stedi.me/validate/'+token,
        data: JSON.stringify({usertoken}),
        success: function(data){savetoken(data)},
        contentType: "application/text",
        dataType: 'text' })
    }
}

function userlogin(){
    setuseronetimepassword();
    setusername();
    $.ajax({
        type: 'POST',
        url: 'https://dev.stedi.me/login',
        data: JSON.stringify({userName, onetimepassword}),
        success: function(data) {
            window.location.href = "/timer.html#"+data;//add the token to the url
        },
        contentType: "application/text",
        dataType: 'text'
    });

}

function readonlyforms(formid){
    form = document.getElementById(formid);
    elements = form.elements;
    for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    createbutton();
}
 function pwsDisableInput( element, condition ) {
        if ( condition == true ) {
            element.disabled = true;

        } else {
            element.removeAttribute("disabled");
        }

 }

function createbutton(){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "OK";
    button.onclick = window.location.href = "/index.html";
    context.appendChild(button);
}


function createuser(){
    $.ajax({
        type: 'POST',
        url: 'https://dev.stedi.me/login',
        data: JSON.stringify({userName, 'email': userName, onetimepassword, 'verifyonetimePassword': vpwd, 'accountType':'Personal'}),//we are using the email as the user name
        success: function(data) { alert(data);
//        readonlyforms("newUser");
//        alert(readonlyforms("newUser"));
        window.location.href = "/index.html"},
        contentType: "application/text",
        dataType: 'text'
    });
}

function getstephistory(){
      $.ajax({
            type: 'POST',
            url: 'https://dev.stedi.me/stephistory',
            data: JSON.stringify({userName}),
            success: function(data) { alert(data);
            json = $.parseJSON(data);
            $('#results').html(json.name+' Total Steps: ' + json.stepTotal)},
            contentType: "application/text",
            dataType: 'text'
        });
}

var enterFunction = (event) =>{
    if (event.keyCode === 13){
        event.preventDefault();
        $("#loginbtn").click();
    }
}

var onetimepasswordField = document.getElementById("onetimepassword");

onetimepasswordField.addEventListener("keyup", enterFunction);