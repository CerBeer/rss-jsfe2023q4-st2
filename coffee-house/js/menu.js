window.addEventListener(
    "resize",
    function (event) {
        burgerMenu_Close();
    },
    true
);

const menu_cards_grid = document.querySelector(".menu-cards-grid");

const product_categories = {
    'coffee': 'coffee',
    'tea': 'tea',
    'dessert': 'dessert',
};

let current_category = product_categories.coffee;
let current_products_count = 8;

let products = [];
async function products_getData() {
    //const requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const requestURL = "https://rolling-scopes-school.github.io/cerbeer-JSFE2023Q4/coffee-house/resources/products.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    products_dataRead(superHeroes);
}

function products_dataRead(obj) {
    console.log(obj);
    products = structuredClone(obj);
    products_create_cards();
    menu_cards_grid.classList.add('menu-cards-grid-change');
    products_create_cards_continue();
}

function products_create_cards() {
    menu_cards_grid.classList.add('menu-cards-grid-change');
    setTimeout(products_create_cards_continue, 500);
}
    
function products_create_cards_continue() {
    
    menu_cards_grid.innerHTML = '';

    let cards_created_count = 0;
    let i = 0;
    while (cards_created_count < current_products_count && i < products.length) {
        
        if (products[i].category === current_category) {
            const newCard = document.createElement("article");
            newCard.classList.add('menu-card');
            newCard.innerHTML = get_card_markup(cards_created_count, products[i]);
            // newCard.addEventListener('click', () => {
            //   toggle_Modal();
            //   create_MenuItemModal(listItem, item);
            // });
            menu_cards_grid.appendChild(newCard);

            // for (const power of superPowers) {
            //     const listItem = document.createElement("li");
            //     listItem.textContent = power;
            //     myList.appendChild(listItem);
            // }

            cards_created_count += 1;
        }

        i += 1;
    }
    menu_cards_grid.classList.remove('menu-cards-grid-change');
}

products_getData();

const menu_tabs = document.querySelector(".menu-tabs");
const menu_tabs_coffee = document.querySelector(".menu-tabs-tab-coffee");
menu_tabs_coffee.addEventListener('click', menu_tabs_coffee_click);
const menu_tabs_tea = document.querySelector(".menu-tabs-tab-tea");
menu_tabs_tea.addEventListener('click', menu_tabs_tea_click);
const menu_tabs_dessert = document.querySelector(".menu-tabs-tab-dessert");
menu_tabs_dessert.addEventListener('click', menu_tabs_dessert_click);

function menu_tabs_coffee_click(e) {
    menu_tabs_coffee.classList.add("menu-tabs-tab-active");
    menu_tabs_tea.classList.remove("menu-tabs-tab-active");
    menu_tabs_dessert.classList.remove("menu-tabs-tab-active");
    current_category = product_categories.coffee;
    products_create_cards();
}

function menu_tabs_tea_click(e) {
    menu_tabs_coffee.classList.remove("menu-tabs-tab-active");
    menu_tabs_tea.classList.add("menu-tabs-tab-active");
    menu_tabs_dessert.classList.remove("menu-tabs-tab-active");
    current_category = product_categories.tea;
    products_create_cards();
}

function menu_tabs_dessert_click(e) {
    menu_tabs_coffee.classList.remove("menu-tabs-tab-active");
    menu_tabs_tea.classList.remove("menu-tabs-tab-active");
    menu_tabs_dessert.classList.add("menu-tabs-tab-active");
    current_category = product_categories.dessert;
    products_create_cards();
}
