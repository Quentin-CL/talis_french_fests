const btnCloses = document.querySelectorAll('.badge button')

for (const btnClose of btnCloses) {
    closeBadge(btnClose)
}

function updateCategoryArray(isDeleting, element) {
    const inputHidden = document.querySelector('input[name="fest[category]"]')
    const categories = inputHidden.value === '' ? [] : inputHidden.value.split(',');
    if (isDeleting) {
        categories.splice(categories.indexOf(element.value), 1)
    } else {
        categories.push(element.value);
    }
    inputHidden.value = categories;
    return ''
}


function closeBadge(btnClose) {
    btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        updateCategoryArray(true, btnClose);
        btnClose.parentElement.remove();
    })
}

function addCategory(category) {
    const span = document.createElement('span');
    span.classList.add("badge", "rounded-pill", "text-bg-primary", "p-2", "m-1", "fw-normal");
    span.innerText = category + ' '
    const btn = document.createElement('button');
    btn.classList.add('btn-close');
    btn.setAttribute('value', category);
    closeBadge(btn);
    span.append(btn);
    document.querySelector('.edit-categories').prepend(span)
}

document.querySelector('.edit-categories>div>button').addEventListener('click', (e) => {
    e.preventDefault();
    const catInput = document.querySelector('.edit-categories>div input');
    addCategory(catInput.value);
    updateCategoryArray(false, catInput);
    catInput.value = '';

})

