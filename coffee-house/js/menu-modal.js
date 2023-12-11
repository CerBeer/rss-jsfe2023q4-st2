
let current_cost = 0.0;

function menu_item_modal_create(item) {
    
    const i = parseInt(item.dataset.index);
    
    const newCard = document.createElement("div");
    newCard.classList.add('modal-windows-card');
    newCard.classList.add('modal-windows-overlay');
    newCard.innerHTML = get_cardModal_markup(i);
    
    newCard.querySelector('.modal-card-right-button-close').addEventListener('click', menu_item_modal_close);
    newCard.addEventListener('click', menu_item_modal_close_overlay);

    newCard.querySelector('.mbtn1').addEventListener('click', mbtn1_click);
    newCard.querySelector('.mbtn2').addEventListener('click', mbtn2_click);
    newCard.querySelector('.mbtn3').addEventListener('click', mbtn3_click);
    newCard.querySelector('.mbtn4').addEventListener('click', mbtn4_click);
    newCard.querySelector('.mbtn5').addEventListener('click', mbtn5_click);
    newCard.querySelector('.mbtn6').addEventListener('click', mbtn6_click);

    document.body.appendChild(newCard);

    document.body.classList.add('block-scroll-card');
    setTimeout(menu_item_modal_create_continue, 100);

};

function menu_item_modal_create_continue() {
    document.body.querySelector('.modal-windows-card').classList.add('modal-windows-card-visible');
}

function menu_item_modal_close(e) {
    let modal_windows = document.body.querySelector('.modal-windows-card');
    modal_windows.classList.remove('modal-windows-card-visible');
    setTimeout(menu_item_modal_close_continue, 500);
}

function menu_item_modal_close_overlay(e) {
    e.stopPropagation();
    if (e.target.classList.contains('modal-windows-overlay')) {
        menu_item_modal_close(e);
    }
}

function menu_item_modal_close_continue() {
    let modal_windows = document.body.querySelector('.modal-windows-card');
    modal_windows.remove();
    document.body.classList.remove('block-scroll-card');
}

function mbtn1_click(e) {
    document.querySelector('.mbtn1').classList.add('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn2').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn3').classList.remove('modal-card-right-buttons-buttons-button-active');

    document.querySelector('.mbtn1').classList.add('modal-card-right-buttons-buttons-button-active-size');
    document.querySelector('.mbtn2').classList.remove('modal-card-right-buttons-buttons-button-active-size');
    document.querySelector('.mbtn3').classList.remove('modal-card-right-buttons-buttons-button-active-size');
    
    count_total();
}
function mbtn2_click() {
    document.querySelector('.mbtn1').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn2').classList.add('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn3').classList.remove('modal-card-right-buttons-buttons-button-active');

    document.querySelector('.mbtn1').classList.remove('modal-card-right-buttons-buttons-button-active-size');
    document.querySelector('.mbtn2').classList.add('modal-card-right-buttons-buttons-button-active-size');
    document.querySelector('.mbtn3').classList.remove('modal-card-right-buttons-buttons-button-active-size');

    count_total();
}
function mbtn3_click() {
    document.querySelector('.mbtn1').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn2').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn3').classList.add('modal-card-right-buttons-buttons-button-active');

    document.querySelector('.mbtn1').classList.remove('modal-card-right-buttons-buttons-button-active-size');
    document.querySelector('.mbtn2').classList.remove('modal-card-right-buttons-buttons-button-active-size');
    document.querySelector('.mbtn3').classList.add('modal-card-right-buttons-buttons-button-active-size');

    count_total();
}

function mbtn4_click(e) {
    document.querySelector('.mbtn4').classList.toggle('modal-card-right-buttons-buttons-button-active');
    count_total();
}
function mbtn5_click() {
    document.querySelector('.mbtn5').classList.toggle('modal-card-right-buttons-buttons-button-active');
    count_total();
}
function mbtn6_click() {
    document.querySelector('.mbtn6').classList.toggle('modal-card-right-buttons-buttons-button-active');
    count_total();
}

function count_total() {
    let total_cost = base_cost;
    const activeButtons = document.querySelectorAll('.modal-card-right-buttons-buttons-button-active');
    activeButtons.forEach((button) => {
        total_cost = total_cost + parseFloat(button.dataset.cost);
    });
    const formattedCost = total_cost.toFixed(2);
    document.querySelector('.modal-card-right-total-sum').innerText = `$${formattedCost}`;
}
