window.addEventListener(
    "resize",
    function (event) {
        burgerMenu_Close();
    },
    true
);

// const products;

async function products_getData() {
    //const requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const requestURL = "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/coffee-house/products.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    products_dataRead(superHeroes);
}

function products_dataRead(obj) {

    console.log(obj);
    return;

    const section = document.querySelector(".menu-cards-grid");
    const heroes = obj.members;

    for (const hero of heroes) {
        const myArticle = document.createElement("article");
        const myH2 = document.createElement("h2");
        const myPara1 = document.createElement("p");
        const myPara2 = document.createElement("p");
        const myPara3 = document.createElement("p");
        const myList = document.createElement("ul");

        myH2.textContent = hero.name;
        myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = "Superpowers:";

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement("li");
            listItem.textContent = power;
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}

products_getData();
