const accordion = document.querySelector(".accordion");
const more = document.querySelector('.more');
let isOpen = false
more.addEventListener('click', () => {
    accordion.classList.toggle('open');
    isOpen = !isOpen;
    more.innerText = isOpen ? "Voir moins ..." : "Voir plus ...";

})