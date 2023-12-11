window.addEventListener(
    "resize",
    function (event) {
        burgerMenu_Close();
        current_products_count_calc();
        current_products_calc_state();
    },
    true
);

function current_products_count_calc() {
    let window_resolution = window.innerWidth;
    if (window_resolution > 768) {
        current_products_count_perPage = 8;
    }
    else {
        current_products_count_perPage = 4;
    }
    current_products_count_visible = current_products_count_perPage * current_products_pages;
    current_products_count_all = products.filter(item => item.category === current_category).length;
}

function current_products_calc_state() {
    let i =0;
    for (let element of menu_cards_grid.children) {
        if (i < current_products_count_visible) {
            element.classList.remove('menu-card-hide');
        } else {
            element.classList.add('menu-card-hide');
        }
        i += 1;
    }
    if (current_products_count_visible < current_products_count_all) {
        menu_cards_button_dark.classList.add('menu-cards-button-dark-visible');
    } else {
        menu_cards_button_dark.classList.remove('menu-cards-button-dark-visible');
    }
}

async function products_getData() {
    const requestURL = "https://rolling-scopes-school.github.io/cerbeer-JSFE2023Q4/coffee-house/resources/products.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    products_dataRead(superHeroes);
}

function products_dataRead(obj) {
    products = structuredClone(obj);
    menu_cards_grid.classList.add('menu-cards-grid-change');
    setTimeout(products_create_cards_continue, 200);
}

function products_create_cards() {
    menu_cards_grid.classList.add('menu-cards-grid-change');
    setTimeout(products_create_cards_continue, 500);
}
    
function products_create_cards_continue() {
    
    current_products_count_calc();

    menu_cards_grid.innerHTML = '';

    let cards_created_count = 0;
    let i = 0;
    while (cards_created_count < current_products_count_all && i < products.length) {
        
        if (products[i].category === current_category) {
            const newCard = document.createElement("article");
            newCard.classList.add('menu-card');
            if (cards_created_count >= current_products_count_visible) {
                newCard.classList.add('menu-card-hide');
            }
            newCard.innerHTML = get_card_markup(cards_created_count, products[i]);
            newCard.dataset.index = i;
            newCard.addEventListener('click', () => {
                menu_item_modal_create(newCard);
            });
            menu_cards_grid.appendChild(newCard);

            cards_created_count += 1;
        }

        i += 1;
    }
    menu_cards_grid.classList.remove('menu-cards-grid-change');
    current_products_calc_state();
}

function menu_cards_button_dark_click(e) {
    menu_cards_grid.classList.add('menu-cards-grid-change');
    current_products_pages += 1;
    current_products_count_calc();
    setTimeout(menu_cards_button_dark_click_continue, 300);
}

function menu_cards_button_dark_click_continue() {
    current_products_calc_state();
    menu_cards_grid.classList.remove('menu-cards-grid-change');
}

function menu_tabs_coffee_click(e) {
    menu_tabs_coffee.classList.add("menu-tabs-tab-active");
    menu_tabs_tea.classList.remove("menu-tabs-tab-active");
    menu_tabs_dessert.classList.remove("menu-tabs-tab-active");
    current_category = product_categories.coffee;
    current_products_pages = 1;
    products_create_cards();
}

function menu_tabs_tea_click(e) {
    menu_tabs_coffee.classList.remove("menu-tabs-tab-active");
    menu_tabs_tea.classList.add("menu-tabs-tab-active");
    menu_tabs_dessert.classList.remove("menu-tabs-tab-active");
    current_category = product_categories.tea;
    current_products_pages = 1;
    products_create_cards();
}

function menu_tabs_dessert_click(e) {
    menu_tabs_coffee.classList.remove("menu-tabs-tab-active");
    menu_tabs_tea.classList.remove("menu-tabs-tab-active");
    menu_tabs_dessert.classList.add("menu-tabs-tab-active");
    current_category = product_categories.dessert;
    current_products_pages = 1;
    products_create_cards();
}

const product_categories = {
    'coffee': 'coffee',
    'tea': 'tea',
    'dessert': 'dessert',
};

let current_category = product_categories.coffee;
let current_products_count_all = 8;
let current_products_count_perPage = 8;
let current_products_pages = 1;
let current_products_count_visible = 8;

let products = [];

const menu_cards_grid = document.querySelector(".menu-cards-grid");
const menu_cards_button_dark = document.querySelector(".menu-cards-button-dark");
menu_cards_button_dark.addEventListener('click', menu_cards_button_dark_click);

const menu_tabs = document.querySelector(".menu-tabs");
const menu_tabs_coffee = document.querySelector(".menu-tabs-tab-coffee");
menu_tabs_coffee.addEventListener('click', menu_tabs_coffee_click);
const menu_tabs_tea = document.querySelector(".menu-tabs-tab-tea");
menu_tabs_tea.addEventListener('click', menu_tabs_tea_click);
const menu_tabs_dessert = document.querySelector(".menu-tabs-tab-dessert");
menu_tabs_dessert.addEventListener('click', menu_tabs_dessert_click);

products_getData();
