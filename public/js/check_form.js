const registerUsername = document.querySelector("#modal-register #rUsername");
const loginUsernameModal = document.querySelector("#modal-login #lUsername");
const email = document.querySelector("#modal-register #email");
const registerPassword = document.querySelector("#modal-register #rPassword");
const loginPasswordModal = document.querySelector("#modal-login #lPassword");
const passwordConfirmation = document.querySelector("#modal-register #password-confirm");


const activateValidation = function (form, validation) {
    form.addEventListener('submit', (event) => { validation(event) })
}

const showError = (input, msg) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
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

const checkStarResult = (inputZeroStar) => {
    if (inputZeroStar.checked === true) {
        showError(inputZeroStar, `Champs requis`);
        return false;
    }
    showSuccess(inputZeroStar);
    return true

};

function sanitizeHTML(input) {
    return input.replace(/[&<>]/g, '');
}

const validateRegisterForm = (e) => {
    const isRequired = checkRequired([registerUsername, email, registerPassword, passwordConfirmation]);
    const isLenght = checkLength(registerPassword, 8, 30);
    const isEmail = checkEmail(email);
    const isPass = checkPasswordMatch(passwordConfirmation, registerPassword);
    const isValid = isRequired && isLenght && isEmail && isPass;
    if (!isValid) e.preventDefault();
    return (isValid);
};
activateValidation(document.querySelector('#modal-register form'), validateRegisterForm)


const validateLoginFormModal = (e) => {
    const isRequired = checkRequired([loginUsernameModal, loginPasswordModal])
    if (!isRequired) e.preventDefault();
    return (isRequired);
};
activateValidation(document.querySelector('#modal-login form'), validateLoginFormModal)

const validateLoginForm = (e) => {
    const loginUsername = document.querySelector(".form-login-container #lPageUsername");
    const loginPassword = document.querySelector(".form-login-container #lPagePassword");
    const isRequired = checkRequired([loginUsername, loginPassword])
    if (!isRequired) e.preventDefault();
    return (isRequired);
};
document.querySelector('.form-login-container form') ? activateValidation(document.querySelector('.form-login-container form'), validateLoginForm) : void (0);

const validateReviewForm = (e) => {
    const isValid = checkStarResult(document.querySelector('#no-rate'));
    const comment = document.querySelector('.new-comment textarea');
    comment.value = sanitizeHTML(comment.value);
    if (!isValid) e.preventDefault();
    return;
}
document.querySelector('.new-comment') ? activateValidation(document.querySelector('.new-comment'), validateReviewForm) : void (0);


const validateContactForm = (e) => {
    const contactName = document.querySelector("#contact-name")
    const contactEmail = document.querySelector("#contact-email")
    const contactSubject = document.querySelector("#contact-subject")
    const contactMessage = document.querySelector("#contact-message")
    const isRequired = checkRequired([contactName, contactEmail, contactSubject, contactMessage]);
    const isEmail = checkEmail(contactEmail);
    const isValid = isRequired && isEmail;
    if (!isValid) e.preventDefault();
    return (isValid);
}
document.querySelector('#contact-section form') ? activateValidation(document.querySelector('#contact-section form'), validateContactForm) : void (0);

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()