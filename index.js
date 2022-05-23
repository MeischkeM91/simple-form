// Get the page to append terms prompt
const wrapper = document.querySelector('#wrapper');
// Get the form, email, input box, error span element
const form  = document.getElementsByTagName('form')[0];
const inputArr = document.querySelectorAll('input');
const submitBtn = document.getElementById('submitBtn');
let emailValid, countryValid, zipValid, passwordValid, passwordConfValid = false;
// set zipValid to true by default since it is not required;
zipValid=true;

// This adds an eventlistener to update as form is filled out
inputArr.forEach(el => {
  el.addEventListener('input', (event)=>{
    selectTest(el);
  });
});

// Switch will determine which error to throw
function selectTest(el) {
  switch (el.id){
    case 'email':
      testEmailInput(el);
      break;
    case 'country':
      testCountryInput(el);
      break;
    case 'zip-code':
      testZipCodeInput(el);
      break;
    case 'password':
      testPasswordInput(el);
      break;
    case 'password-conf':
      testPasswordConfirmationInput(el);
      break;
    default:
      console.log('default');
      break;
  };
};

// This functions validates the Email field and displays customized error detailing requirements.
function testEmailInput(el){
  const emailError = document.querySelector('#email + span.error');
  if(el.validity.valid){
    // If the field is valid, clear the error
    const errorToClear = el.nextElementSibling;
    errorToClear.textContent = ''; 
    errorToClear.className = 'error';
    // Set email validity to true
    emailValid = true;
  }else {
    if(el.validity.valueMissing) {
        // If the field is empty, display the following error message.
        emailError.textContent = 'You need to enter an e-mail address.';
    } else if(el.validity.typeMismatch) {
        // If the field doesn't contain an email address, display the following error message.
        emailError.textContent = 'Entered value needs to be an e-mail address.';
    } else if(el.validity.tooShort) {
        // If the data is too short, display the following error message.
        emailError.textContent = `Email should be at least ${ el.minLength } characters; you entered ${ el.value.length }.`;
    }
    //Set email validity variable to false
    emailValid = false;
    // Set the styling appropriately
    emailError.className = 'error active';
    };
};

// This functions validates the Country field and displays customized error detailing requirements.
function testCountryInput(el){
  const countryError = document.querySelector('#country + span.error');
    // This is the regex we will test the input against
  let countryRegEx = new RegExp(/\b[A-Za-z]+\b/g);
  if(countryRegEx.test(el.value)){
    // If the field is valid, clear the error
    el.classList.remove('invalid');
    const errorToClear = el.nextElementSibling;
    errorToClear.textContent = ''; 
    errorToClear.className = 'error'; 
    // Set country validity to true
    countryValid = true;
  }else {
    el.classList.add('invalid');
    countryError.textContent = "Please use only alphabetic characters."
    //Set country validity variable to false
    countryValid = false;
    // Set the styling appropriately
    countryError.className = 'error active';
  };
};

// This functions validates the Zip Code field and displays customized error detailing requirements.
function testZipCodeInput(el){
  const zipError = document.querySelector('#zip-code + span.error');
  // This is the regex we will test the input against
  let zipRegEx = new RegExp(/[0-9]+/g);
  // Check the zip reqs and length, if empty -dont display error
  if(zipRegEx.test(el.value) && !el.validity.tooShort || el.value==''){
    // If the field is valid, clear the error
    el.classList.remove('invalid');
    const errorToClear = el.nextElementSibling;
    errorToClear.textContent = ''; 
    errorToClear.className = 'error'; 
    // Set zip validity to true
    zipValid = true;
  }else {
    el.classList.add('invalid');
    zipError.textContent = "Please enter a 5-digit zip code."
    //Set zip validity variable to false
    zipValid = false;
    // Set the styling appropriately
    zipError.className = 'error active';
  };
};

// This functions validates the Password field and displays customized error detailing requirements.
function testPasswordInput(el){
    const passwordError = document.querySelector('#password + span.error');
    // This is the regex we will test the input against
    let passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g);
    // Checking password reqs and length 
    if(passwordRegEx.test(el.value) && !el.validity.tooShort){
        // If the field is valid, clear the error
        el.classList.remove('invalid');
        const errorToClear = el.nextElementSibling;
        errorToClear.textContent = ''; 
        errorToClear.className = 'error'; 
        // Set password validity to true
        passwordValid = true;
    }
    // Check the length
    else if(el.validity.tooShort){
        el.classList.add('invalid');
        passwordError.textContent = "Your password must be at least 8 characters."
        //Set password validity to false
        passwordValid = false;
        // Set the styling appropriately
        passwordError.className = 'error active';
    } 
    // Next we'll check the pattern
    else if(!passwordRegEx.test(el.value)){
        el.classList.add('invalid');
        passwordError.textContent = "Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        //Set password validity to false
        passwordValid = false;
        // Set the styling appropriately
        passwordError.className = 'error active';
    };
};

// This functions validates the Password Confirmation field and displays customized error detailing requirements.
function testPasswordConfirmationInput(el){
    const passwordConfirmationError = document.querySelector('#password-conf + span.error');
    const passwordInputField = document.querySelector('#password');
    // Test that each input matches
    if(el.value == passwordInputField.value){
        // If the field is valid, clear the error
        el.classList.remove('invalid');
        const errorToClear = el.nextElementSibling;
        errorToClear.textContent = ''; 
        errorToClear.className = 'error'; 
        // Set password confirmation validity to true
        passwordConfValid = true;
    }
    else{
        el.classList.add('invalid');
        passwordConfirmationError.textContent = "Your passwords must match.";
        //Set password confirmation validity to false
        passwordConfValid = false;
        // Set the styling appropriately
        passwordConfirmationError.className = 'error active';
  }
};

// This function display a prompt telling the user to agree to Terms
const promptForAgreement = () =>{
    const termsPromptBg = document.createElement('div');
    termsPromptBg.classList.add('terms-prompt-bg');
    const termsPrompt = document.createElement('div');
    termsPrompt.classList.add('terms-prompt');
    termsPrompt.innerText = "To proceed, please agree to our Terms of Use and Privacy Policy."
    // This eventListener will close prompt if clicked outside of container
    termsPromptBg.addEventListener('click', (e)=>{
        if (!termsPrompt.contains(e.target)){
            termsPrompt.parentElement.remove();
        }
    });
    // Append the prompt
    wrapper.appendChild(termsPromptBg);
    termsPromptBg.appendChild(termsPrompt);
};

// This function displays whether the submission was successful or not
const displaySubmission = (bool) =>{
    const subPromptBg = document.createElement('div');
    subPromptBg.classList.add('sub-prompt-bg');
    const subPrompt = document.createElement('div');
    subPrompt.classList.add('sub-prompt');
    // This eventListener will close prompt if clicked outside of container
    subPromptBg.addEventListener('click', (e)=>{
        if (!subPrompt.contains(e.target)){
            subPrompt.parentElement.remove();
        }
    });
    // display correct prompt based on validity of form
    if(bool==false){
        subPrompt.innerText = "Submission failed, please fill the form out accordingly."
    } else {
        subPrompt.innerText = "Submission successful!Thank you for signing up."
    }    
    wrapper.appendChild(subPromptBg);
    subPromptBg.appendChild(subPrompt);
};

// This checks if each field is valid
function checkFormValidity(){
    const termsCheckbox = document.getElementById('terms-check');
    let formValidity = false;
    if (emailValid==true && countryValid==true && zipValid==true && passwordValid==true && passwordConfValid==true){
        if(termsCheckbox.checked == true){
            formValidity = true;    
            displaySubmission(formValidity);
        }
        else{
            promptForAgreement(); 
        }
    }
    else {displaySubmission(formValidity)};
};

// Submit button functionality
submitBtn.addEventListener('click', ()=>{
    checkFormValidity();
});