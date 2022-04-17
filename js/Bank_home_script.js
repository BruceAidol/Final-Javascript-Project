const navbarToggleBtn = document.querySelector('.navbar-toggle-btn');
const navbarNav = document.querySelector('.navbar-nav');

const openButtonsPopup = document.getElementsByClassName('btn-open-popup');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const closeButtonPopup = document.getElementById('btn-close-popup');

for(let i=0;i<openButtonsPopup.length;i++) {
    openButtonsPopup[i].addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        popup.classList.add('active');
    });
}

closeButtonPopup.addEventListener('click', (e) => {
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

const navbarToggleFunc = () => {
    const navbarToggleBtnClass = navbarToggleBtn.classList;
    const navbarNavClass = navbarNav.classList;
    navbarToggleBtnClass.toggle('active');
    navbarNavClass.toggle('active');  /* Important */

}

navbarToggleBtn.addEventListener('click', navbarToggleFunc);








