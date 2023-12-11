
let current_cost = 0.0;

function menu_item_modal_create(item) {
    
    const i = parseInt(item.dataset.index);
    console.log(item.dataset.index);
    
    const newCard = document.createElement("div");
    newCard.classList.add('modal-windows-card');
    newCard.classList.add('modal-windows-overlay');
    newCard.innerHTML = get_cardModal_markup(i);
    
    newCard.querySelector('.modal-card-right-button-close').addEventListener('click', menu_item_modal_close);

    newCard.querySelector('.mbtn1').addEventListener('click', mbtn1_click);
    newCard.querySelector('.mbtn2').addEventListener('click', mbtn2_click);
    newCard.querySelector('.mbtn3').addEventListener('click', mbtn3_click);
    newCard.querySelector('.mbtn4').addEventListener('click', mbtn4_click);
    newCard.querySelector('.mbtn5').addEventListener('click', mbtn5_click);
    newCard.querySelector('.mbtn6').addEventListener('click', mbtn6_click);

    document.body.appendChild(newCard);
    document.body.querySelector('.modal-windows-card').classList.add('modal-windows-card-visible');

    document.body.classList.add('block-scroll');

};

function menu_item_modal_close() {
    let modal_windows = document.body.querySelector('.modal-windows-card');
    modal_windows.classList.remove('modal-windows-card-visible');
    setTimeout(menu_item_modal_close_continue, 500);
}

function menu_item_modal_close_continue() {
    let modal_windows = document.body.querySelector('.modal-windows-card');
    modal_windows.remove();
    document.body.classList.remove('block-scroll');
}

function mbtn1_click() {
    document.querySelector('.mbtn1').classList.add('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn2').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn3').classList.remove('modal-card-right-buttons-buttons-button-active');
    
    let cost = parseFloat(document.querySelector('.mbtn1').dataset.cost);
    current_cost = base_cost + cost;
    document.querySelector('.modal-card-right-total-sum').innerText = `$${current_cost}`;

}
function mbtn2_click() {
    document.querySelector('.mbtn1').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn2').classList.add('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn3').classList.remove('modal-card-right-buttons-buttons-button-active');

    let cost = parseFloat(document.querySelector('.mbtn2').dataset.cost);
    current_cost = base_cost + cost;
    document.querySelector('.modal-card-right-total-sum').innerText = `$${current_cost}`;
}
function mbtn3_click() {
    document.querySelector('.mbtn1').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn2').classList.remove('modal-card-right-buttons-buttons-button-active');
    document.querySelector('.mbtn3').classList.add('modal-card-right-buttons-buttons-button-active');
}

function mbtn4_click() {
    document.querySelector('.mbtn4').classList.toggle('modal-card-right-buttons-buttons-button-active');
}
function mbtn5_click() {
    document.querySelector('.mbtn5').classList.toggle('modal-card-right-buttons-buttons-button-active');
}
function mbtn6_click() {
    document.querySelector('.mbtn6').classList.toggle('modal-card-right-buttons-buttons-button-active');
}
