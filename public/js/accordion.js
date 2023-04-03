const accordion = document.querySelector(".accordion");
const more = document.querySelector('.more');
let isOpen = false
more.addEventListener('click', () => {
    accordion.classList.toggle('open');
    isOpen = !isOpen;
    more.innerText = isOpen ? "Voir moins ..." : "Voir plus ...";

})

const textarea = document.querySelector("textarea");
function auto_grow() {
    textarea.style.height = "5px";
    textarea.style.height = (textarea.scrollHeight - 7) + "px";

}
textarea.addEventListener('input', auto_grow)