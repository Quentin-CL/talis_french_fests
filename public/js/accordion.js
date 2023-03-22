const accordion = document.querySelector(".accordion");
const more = document.querySelector('.more');
let isOpen = false
more.addEventListener('click', () => {
    accordion.classList.toggle('open');
    isOpen = !isOpen;
    more.innerText = isOpen ? "Voir moins ..." : "Voir plus ...";

})

const textarea = document.querySelector("#fest-show-container .new-comment textarea");
const btnComment = document.querySelector(".btn-comment")
function auto_grow() {
    textarea.style.height = "5px";
    textarea.style.height = (textarea.scrollHeight - 7) + "px";
    btnComment.classList.remove('display-none');

}
textarea.addEventListener('input', auto_grow)