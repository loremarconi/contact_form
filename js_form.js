const firstNameEl = document.querySelector('#firstName');
const lastNameEl = document.querySelector('#lastName');
const addressEl = document.querySelector('#address');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirmPassword');

const form = document.querySelector('#signup');

//First name e last name, non possono essere vuoti ed ho aggiunto un minimo/massimo di caratteri
const checkfirstName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const firstName = firstNameEl.value.trim();

    if (!isEmpty(firstName)) {
        showError(firstNameEl, 'This field cannot be empty.');
    } else if (!isBetween(firstName.length, min, max)) {
        showError(firstNameEl, `First Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const lastName = lastNameEl.value.trim();

    if (!isEmpty(lastName)) {
        showError(lastNameEl, 'This field cannot be empty.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastNameEl, `firstName must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};
//Controlla l'address, può essere vuoto, ma se compilato deve avere un minimo di 10 caratteri
const checkAddress = () => {

    let valid = false;

    const address = addressEl.value.trim();

    if (address != '' && address.length < 10) {
        showError(addressEl, 'Address must be 10 characters or more.');
    } else {
        showSuccess(addressEl);
        valid = true;
    }
    return valid;
    
};
//Controlla che l'email utilizzi un format valido, non può essere vuoto
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isEmpty(email)) {
        showError(emailEl, 'This field cannot be empty.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
//Controlla che la password contenga almeno 10 caratteri di cui un numero, 3 caratteri speciali, nessuno spazio all'interno e che non contenga nome/cognome dell'utente
const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();
    const firstName = firstNameEl.value.trim();
    const lastName = lastNameEl.value.trim();

    if (!isEmpty(password)) {
        showError(passwordEl, 'This field cannot be empty.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, `Password must have at least: 
                               10 characters, 
                               1 lowercase character, 
                               1 uppercase character, 
                               1 number, 
                               3 special characters in (!@#$%^&*). It can't contain spaces and your name/surname.`);
    } else if (password.includes(firstName) || password.includes(lastName) || password.includes(" ")) {
        showError(passwordEl, 'Password cannot contain First Name or Last Name.');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};
//Confirm Password, controlla che sia uguale al campo Password, non può essere vuoto
const checkConfirmPassword = () => {
    let valid = false;

    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    
    if (!isEmpty(confirmPassword)) {
        showError(confirmPasswordEl, 'Please repeat the password.');
    }
    else if (password == confirmPassword) {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]{3,})(?=.{10,})");
    return re.test(password);
};
const isEmpty = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isfirstNameValid = checkfirstName(),
        isLastNameValid = checkLastName(),
        isAddressValid = checkAddress(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isfirstNameValid &&
        isLastNameValid &&
        isAddressValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        alert("Form is valid!");
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'firstName':
            checkfirstName();
            break;
        case 'lastName':
            checkLastName();
            break;
        case 'address':
            checkAddress();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirmPassword':
            checkConfirmPassword();
            break;
    }
}));