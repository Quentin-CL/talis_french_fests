const burger = document.querySelector('.burger');
const navbar = document.querySelector('.nav-bar');
const navLink = document.querySelectorAll('.nav-link');
burger.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    burger.classList.toggle('burger-open');
    navLink.forEach(link => {
        link.classList.toggle('nav-link-open');
    })
});

function setModal(btn, modal, close) {
    btn.addEventListener('click', () => {
        modal.classList.toggle('display-none');
    })
    close.addEventListener('click', () => {
        modal.classList.add('display-none');
    })
    window.addEventListener('click', (e) => {
        if (e.target.id === modal.id) {
            modal.classList.add('display-none');
        }
    })
}

if (document.querySelector('.btn-register')) {
    setModal(document.querySelector('.btn-register'), document.querySelector('#modal-register'), document.querySelector('#modal-register .close'));
    setModal(document.querySelector('.btn-login'), document.querySelector('#modal-login'), document.querySelector('#modal-login .close'));
}

if (document.querySelector('.btn-show-more')) {
    setModal(document.querySelector('.btn-show-more'), document.querySelector('#modal-comments'), document.querySelector('#modal-comments .close'));
}

if (document.querySelector('.btn-locate')) {
    setModal(document.querySelector('.btn-locate'), document.querySelector('#modal-locate'), document.querySelector('#modal-locate .close'));
}

function setFlash(btn, flash) {
    btn.addEventListener('click', () => {
        flash.classList.add('display-none');
    })
    window.setTimeout(() => {
        flash.classList.add('display-none');
    }, 4000)

}
if (document.querySelector('.flash')) {
    setFlash(document.querySelector('.flash .close'), document.querySelector('.flash'))
}

