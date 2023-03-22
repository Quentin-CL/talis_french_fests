const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        480: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 480px
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        1248: {
            slidesPerView: 3,
            spaceBetween: 75
        }
    }
});