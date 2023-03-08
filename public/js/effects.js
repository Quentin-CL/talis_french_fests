const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');
const navLink = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    burger.classList.toggle('burger-open');
    navLink.forEach(link => {
        link.classList.toggle('nav-link-open');
    })
});


const register = document.querySelector('.btn-register');
const modal = document.querySelector('#modal-register');
const close = document.querySelector('#modal-register .close')

register.addEventListener('click', () => {
    modal.classList.toggle('display-none');
})

close.addEventListener('click', () => {
    modal.classList.add('display-none');
})
window.addEventListener('click', (e) => {
    if (e.target.id === 'modal-register')
        modal.classList.add('display-none');
})