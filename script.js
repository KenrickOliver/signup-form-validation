//getting access to all the necessary elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show Error on Submit Function
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}

//Show Success on Submit Function
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//Check Email validation using regEX and displaying success or error accordingly
function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not Valid')
    }
}

//General Check Function for all input fields 
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    })
}

//Check Lengths of inputs function
function checkLength(input, min, max) {
   if(input.value.length < min){
       showError(input, `${getFieldName(input)} must be at least ${min} characters`)
   } else if(input.value.length > max) {
       showError(input, `${getFieldName(input)} must be less than${max} characters`)
   } else {
       showSuccess(input);
   }
}

//Function to check that BOTH password fields match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Password do not match');
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1) 
}

//Event Listner on the Submit button
form.addEventListener('submit',  (event)=> {
    event.preventDefault(); // prevents default behavior of html5 submit button

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    isValidEmail(email);
    checkPasswordsMatch(password,  password2)
})