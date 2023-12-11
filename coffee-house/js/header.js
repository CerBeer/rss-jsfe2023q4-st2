// Open and close the main menu, user menu.

function burgerMenu_ClickOpen(e) {
    e.stopPropagation();
    if (burgerMenu_Menu.classList.contains('header-burger-menu-active')) {
        burgerMenu_Close();
    }
    else {
        burgerMenu_Menu.classList.add('header-burger-menu-active');
        burgerMenu_Button.classList.add('burger-menu-button-active');
        document.body.classList.add('block-scroll');
    }
}

function burgerMenu_Click(e) {
    if (e.target.classList.contains('burger-menu-close')) {
        if (burgerMenu_Menu.classList.contains('header-burger-menu-active')) {
            burgerMenu_Close();
        }
    }
}

function burgerMenu_Close() {
    burgerMenu_Menu.classList.remove('header-burger-menu-active');
    burgerMenu_Button.classList.remove('burger-menu-button-active');
    document.body.classList.remove('block-scroll');
}

const burgerMenu_Button = document.querySelector('.burger-menu-button');
const burgerMenu_Menu = document.querySelector('.header-nav');

burgerMenu_Button.addEventListener('click', burgerMenu_ClickOpen);
burgerMenu_Menu.addEventListener('click', burgerMenu_Click);