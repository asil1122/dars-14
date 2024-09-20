const header_bottom_list = document.querySelector(".header_bottom_list");
const hero_list = document.querySelector(".hero_list");
const korzinka = document.querySelector(".korzinka_block");

import { getData, getPath } from "./service.js";

const saveInfo = (item) => {
    const oldnumbers = JSON.parse(localStorage.getItem("numbers")) || [];
    const exists = oldnumbers.some(existingItem => existingItem.id === item.id);
    
    if (!exists) {
        localStorage.setItem("numbers", JSON.stringify([item, ...oldnumbers]));
    }
};

const renderBuy = () => {
    const data = JSON.parse(localStorage.getItem("numbers")) || [];
    korzinka.innerHTML = data.map((item) => `
        <div class="korzinka_div">
            <img class="korzinka_img" src="${item.img}" alt=""/>
            <div class = "korzinka_title_block">
                <h1 class="korzinka_title">${item.title}</h1>
                <p class="korzinka_price">${item.price}</p>
            </div>
            <button class="delete_btn" data-id="${item.id}"></button>
        </div>
    `).join("");
};

const renderItems = async (path) => {
    const data = await getPath(path);
    hero_list.innerHTML = data.map((item) => `
        <li class="hero_item">
            <img class="hero_item_img" src="${item.img}" alt="img"/>
            <h1 class="hero_item_title">${item.title}</h1>
            <p class="hero_item_price">${item.price}</p>
            <p class="hero_item_text">${item.text}</p>
            <button class="hero_buy" data-item='${JSON.stringify(item)}'>Buy</button>
        </li>
    `).join("");
};

const renderCatalog = async () => {
    const data = await getData();
    console.log(data);

    header_bottom_list.innerHTML = data.map((item) => `
        <li class="header_bottom_item">
            <button class="header_btns" data-path="${item.path}">${item.name}</button>
        </li>
    `).join("");

    renderItems(data[0].path);
};

renderCatalog();

header_bottom_list.addEventListener("click", async (e) => {
    const path = e.target.dataset.path;
    const btn = document.querySelectorAll(".header_btns");

    if (path) {
        await renderItems(path);

        btn.forEach((button) => {
            button.style.color = "";
        });
        e.target.style.color = "red";
    }
});

hero_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("hero_buy")) {
        const item = JSON.parse(e.target.dataset.item);
        saveInfo(item);
        renderBuy();
    }
});

korzinka.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        let data = JSON.parse(localStorage.getItem("numbers")) || [];
        data = data.filter(item => item.id != id);
        localStorage.setItem("numbers", JSON.stringify(data));
        renderBuy();
});
