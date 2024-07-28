document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('#menu-btn');
    const navBar = document.querySelector('.navbar');
    const navClose = document.querySelector('#nav-close');

    menuBtn.addEventListener('click', () => {
        navBar.classList.add('active');
    });

    navClose.addEventListener('click', () => {
        navBar.classList.remove('active');
    });
});
