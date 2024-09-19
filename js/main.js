const header_bottom_list = document.querySelector(".header_bottom_list")
const hero_list = document.querySelector(".hero_list")
const btn = document.getElementsByClassName(".header_btns")

import { getData, getPath } from "./service.js";

const renderItems = async (path) => {
    const data  = await getPath(path)
    hero_list.innerHTML = data.map((item) => `
        <li class = "hero_item">
            <img class = "hero_item_img" src = "${item.img}" alt ="img"/>
            <h1 class = "hero_item_title">${item.title}</h1>
            <p class = "hero_item_price">${item.price}</p>
            <p class = "hero_item_text">${item.text}</p>
        </li>
    `).join("")
}

const renderCatalog = async () => {
    const data = await getData()
    console.log(data);
    
    header_bottom_list.innerHTML = data.map((item) => 
        `
        <li class = "header_bottom_item">
            <button class = "header_btns" data-path ="${item.path}">${item.name}</button>
        </li>
        `
    ).join("")
 
    renderItems(data[0].path)
}

renderCatalog()


header_bottom_list.addEventListener("click", async (e) => {
    const path = e.target.dataset.path

    if(path){
        await renderItems(path)
        for (let i of btn) {
            i.style.color = "";
          }
          e.target.style.color = "red";
        }
    }
)