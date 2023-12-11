
let base_cost = 0.0;

function get_card_markup(i, item) { 
    return `
        <div class="menu-card-top ">
            <img class="menu-card-top-img" src="./img/png/${item.category}-${i + 1}.png" alt="${item.name}">
        </div>
        <div class="menu-card-bottom">
            <h2 class="menu-card-bottom-title typo-desktop-heading-heading3">${item.name}</h2>
            <div class="menu-card-bottom-descr typo-desktop-body-medium">${item.description}</div>
            <div class="menu-card-bottom-price typo-desktop-heading-heading3">$${item.price}</div>
        </div>
        `;
};

function get_cardModal_markup(i) {
    item = products[i];
    base_cost = parseInt(item.price);
    if (item.category === product_categories.tea) i = i - 8;
    if (item.category === product_categories.dessert) i = i - 12;
    return `
        <div class="modal-windows-window-card typo-desktop-body-medium">
            <div class="modal-card-left">
                <div class="modal-card-left-pic">
                    <img class="modal-card-left-pic-img" src="./img/png/${item.category}-${i + 1}.png" alt="${item.name}">
                </div>
            </div>
            <div class="modal-card-right">
                <div class="modal-card-right-title typo-desktop-heading-heading3">${item.name}</div>
                <div class="modal-card-right-descr">${item.description}</div>
                <div class="modal-card-right-buttons">
                    <div class="modal-card-right-buttons-text typo-desktop-body-medium">Size</div>
                    <div class="modal-card-right-buttons-buttons typo-desktop-action-linkNbutton">
                        <button data-cost="${Object.values(item.sizes)[0]['add-price']}" class="modal-card-right-buttons-buttons-button typo-desktop-action-linkNbutton mbtn1 modal-card-right-buttons-buttons-button-active"><span class="modal-card-right-buttons-buttons-button-name">${Object.keys(item.sizes)[0].toUpperCase()}</span>${Object.values(item.sizes)[0].size}</button>
                        <button data-cost="${Object.values(item.sizes)[1]['add-price']}" class="modal-card-right-buttons-buttons-button typo-desktop-action-linkNbutton mbtn2"><span class="modal-card-right-buttons-buttons-button-name">${Object.keys(item.sizes)[1].toUpperCase()}</span>${Object.values(item.sizes)[1].size}</button>
                        <button data-cost="${Object.values(item.sizes)[2]['add-price']}" class="modal-card-right-buttons-buttons-button typo-desktop-action-linkNbutton mbtn3"><span class="modal-card-right-buttons-buttons-button-name">${Object.keys(item.sizes)[2].toUpperCase()}</span>${Object.values(item.sizes)[2].size}</button>
                    </div>
                </div>
                <div class="modal-card-right-buttons">
                    <div class="modal-card-right-buttons-text typo-desktop-body-medium">Additives</div>
                    <div class="modal-card-right-buttons-buttons typo-desktop-action-linkNbutton">
                        <button data-cost="${Object.values(item.additives)[0]['add-price']}" class="modal-card-right-buttons-buttons-button typo-desktop-action-linkNbutton mbtn4"><span class="modal-card-right-buttons-buttons-button-name">1</span>${item.additives[0].name}</button>
                        <button data-cost="${Object.values(item.additives)[0]['add-price']}" class="modal-card-right-buttons-buttons-button typo-desktop-action-linkNbutton mbtn5"><span class="modal-card-right-buttons-buttons-button-name">2</span>${item.additives[1].name}</button>
                        <button data-cost="${Object.values(item.additives)[0]['add-price']}" class="modal-card-right-buttons-buttons-button typo-desktop-action-linkNbutton mbtn6"><span class="modal-card-right-buttons-buttons-button-name">3</span>${item.additives[2].name}</button>
                    </div>
                </div>
                <div class="modal-card-right-total typo-desktop-heading-heading3">
                    <span class="modal-card-right-total-text">Total:</span>
                    <span class="modal-card-right-total-sum">$${item.price}</span>
                </div>
                <div class="modal-card-right-info">
                    <svg class="modal-card-right-info-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_268_9737)">
                            <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_268_9737">
                            <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="modal-card-right-info-text typo-desktop-body-caption">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
                </div>
                <button class="modal-card-right-button-close typo-desktop-action-linkNbutton">Close</button>
            </div>
        </div>
        `;
};