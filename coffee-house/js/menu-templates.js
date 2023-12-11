
function get_card_markup(i, item) { 
    return `
        <div class="menu-card-top">
            <img class="menu-card-top-img" src="./img/png/${item.category}-${i + 1}.png" alt="${item.name}">
        </div>
        <div class="menu-card-bottom">
            <h2 class="menu-card-bottom-title typo-desktop-heading-heading3">${item.name}</h2>
            <div class="menu-card-bottom-descr typo-desktop-body-medium">${item.description}</div>
            <div class="menu-card-bottom-price typo-desktop-heading-heading3">$${item.price}</div>
        </div>`
};

function get_cardModal_markup(i, item) { 
    return `
        <div class="menu-card-top">
            <img class="menu-card-top-img" src="./img/png/${item.category}-${i + 1}.png" alt="${item.name}">
        </div>
        <div class="menu-card-bottom">
            <h2 class="menu-card-bottom-title typo-desktop-heading-heading3">${item.name}</h2>
            <div class="menu-card-bottom-descr typo-desktop-body-medium">${item.description}</div>
            <div class="menu-card-bottom-price typo-desktop-heading-heading3">$${item.price}</div>
        </div>`
};