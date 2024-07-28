document.addEventListener('DOMContentLoaded', () => {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        },
    
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });

    document.addEventListener('scroll',() => {
        const header=document.querySelector('header');
        if(window.scrollY>0){
            header.classList.add('scrolled')

        }else{
            header.classList.remove('scrolled')
        }
    })
})     