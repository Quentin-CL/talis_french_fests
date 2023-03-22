const registerUsername = document.querySelector("#modal-register #rUsername");
const loginUsernameModal = document.querySelector("#modal-login #lUsername");
const loginUsername = document.querySelector(".form-login-container #lUsername");
const email = document.querySelector("#modal-register #email");
const registerPassword = document.querySelector("#modal-register #rPassword");
const loginPasswordModal = document.querySelector("#modal-login #lPassword");
const loginPassword = document.querySelector(".form-login-container #lPassword");
const passwordConfirmation = document.querySelector("#modal-register #password-confirm");

const showError = (input, msg) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    // formControl.classList.remove("success");
    formControl.classList.add("error");
    small.textContent = msg;
};

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.remove("error");
    formControl.classList.add("success");
};

const checkEmail = (input) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (re.test(input.value) && !input.parentElement.classList.contains("error")) {
        showSuccess(input);
    } else {
        showError(input, "L'adresse email est invalide");
        return false
    }
    return true
};

const checkPasswordMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input1, "Les mots de passe doivent correspondre");
        return false
    } else if (!input1.parentElement.classList.contains("error")) {
        showSuccess(input1);
    }
    return true
};

const getFieldName = (input) => {
    const firstLetter = input.id.charAt(0).toUpperCase();
    return firstLetter + input.id.slice(1);
};

const checkLength = (input, min, max) => {
    if (input.value.length < min || input.value.length > max) {
        showError(
            input,
            `Il doit y avoir entre ${min} and ${max} caractères`
        );
        return false
    }
    return true
};

const checkRequired = (inputArr) => {
    isConfirmed = true;
    inputArr.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `Le champs est obligatoire`);
            isConfirmed &&= false;
        } else {
            showSuccess(input);
        }
    });
    return isConfirmed
};

const validateRegisterForm = (e) => {
    const isRequired = checkRequired([registerUsername, email, registerPassword, passwordConfirmation])
    const isLenght = checkLength(registerPassword, 8, 30)
    const isEmail = checkEmail(email)
    const isPass = checkPasswordMatch(passwordConfirmation, registerPassword);
    const isValid = isRequired && isLenght && isEmail && isPass
    if (!isValid) e.preventDefault();
    return (isValid);
};

const validateLoginFormModal = (e) => {
    const isRequired = checkRequired([loginUsernameModal, loginPasswordModal])
    if (!isRequired) e.preventDefault();
    return (isRequired);
};

const validateLoginForm = (e) => {
    const isRequired = checkRequired([loginUsername, loginPassword])
    if (!isRequired) e.preventDefault();
    return (isRequired);
};
